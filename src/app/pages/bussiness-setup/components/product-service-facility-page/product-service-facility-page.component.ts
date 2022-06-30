import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';

import Records from '../../../../../assets/json/records.json';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
  _id: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  _id: string;
  item: string;
  level: number;
  expandable: boolean;
}

declare var $: any;

@Component({
  selector: 'app-product-service-facility-page',
  templateUrl: './product-service-facility-page.component.html',
  styles: [
  ]
})
export class ProductServiceFacilityPageComponent extends BaseComponemntComponent implements OnInit {

  @ViewChild('tree') tree;
  @Input('submitData') submitData: any = {};
  @Output() productServiceFacilitySubmitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() productServiceFacilityPreviousData: EventEmitter<any> = new EventEmitter<any>();
  @Output() productServiceFacilitySkipData: EventEmitter<any> = new EventEmitter<any>();

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  disableBtn: boolean = false;

  serviceLists: any [] = [];
  groupWiseServiceLists: any [] = [];

  visible: boolean = false;

  constructor() { 

    super();
    this.pagename = "app-product-service-facility-page";

  }

  async ngOnInit() {
    try {
      await super.ngOnInit()
      await this.initializeVariables();
      await this.treeSetup();
      await this.loadData();
    } catch(error) {
      console.error("error", error);
    } finally {
      this.visible = true;
      setTimeout(() => {
        this.tree.treeControl.expandAll();
      });
    }
  }
  
  ngAfterViewInit() {
  }

  async initializeVariables() {

    this.serviceLists = [];
    
    if(Records && Records.length > 0 && this.submitData && this.submitData.solutiontype !== "") {
      var solutiontype = this.submitData.solutiontype;
      this.serviceLists = Records.filter(function(item){
        return item?.solution.toLowerCase() == solutiontype.toLowerCase() && item.type == "service";
      });
    }

    this.serviceLists.map(p => p.item = p.service);
    this.groupWiseServiceLists = [];
    this.groupWiseServiceLists = this.groupBy(this.serviceLists, 'category');
    return;

  }

  async loadData() {
    
    if(this.submitData && this.submitData.productServiceFacilityPostData && this.submitData.productServiceFacilityPostData.length > 0) {
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        var obj = this.submitData.productServiceFacilityPostData.find(p=>p == this.treeControl.dataNodes[i]._id);
        if(obj && this.treeControl.dataNodes[i].level == 1) {
          this.todoItemSelectionToggle(this.treeControl.dataNodes[i]);
        }
      }
    }
    return;
  }

  async treeSetup() {

    this.treeFlattener = new MatTreeFlattener( this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    
    this.dataSource.data = [...this.groupWiseServiceLists];

    return;
  }

  groupBy(collection: any, property: any) {
    let i = 0, val, result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      var resultObj = result.find(p=>p.item == val);
      if(!resultObj) {
        let obj = {
          item: val,
          children: []
        }
        obj.children.push(collection[i])
        result.push(obj);
      } else {
        resultObj.children.push(collection[i]);
      }
      
    }
    return result;
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
    flatNode._id = node._id;
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  
  previous() {
    this.productServiceFacilityPreviousData.emit();
  }

  skip() {
    this.productServiceFacilitySkipData.emit();
  }

  next() {
    var ids = this.checklistSelection.selected.filter(opt => opt._id !== undefined).map(choice => (choice._id));
    this.productServiceFacilitySubmitData.emit(ids);
  }


}
