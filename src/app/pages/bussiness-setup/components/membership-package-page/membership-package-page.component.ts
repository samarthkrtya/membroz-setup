import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';

declare var $: any;
@Component({
  selector: 'app-membership-package-page',
  templateUrl: './membership-package-page.component.html',
  styles: [
  ]
})
export class MembershipPackagePageComponent extends BaseComponemntComponent implements OnInit {

  @Input('submitData') submitData: any = {};
  @Output() membershipSubmitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() membershipPreviousData: EventEmitter<any> = new EventEmitter<any>();
  @Output() membershipSkipData: EventEmitter<any> = new EventEmitter<any>();

  disableBtn = false;
  form: FormGroup;
  submitted: boolean;
  items: FormArray;

  constructor(private fb: FormBuilder) {

    super();
    this.pagename = "app-membership-package-page";

    this.form = fb.group({
      items: new FormArray([])
    });

  }

  async ngOnInit() {
    try {
      await super.ngOnInit()
      await this.initializeVariables();
      if(this.submitData && this.submitData.unitSizePostData && this.submitData.unitSizePostData.items && this.submitData.unitSizePostData.items.length > 0 ) {
        await this.loadData();
      }
    } catch(error) {
      console.error("error", error);
    } finally {
      // console.log("unitsize submitData", this.submitData);
    }
    
  }

  async initializeVariables() {
    return;
  }

  createItem(item: any): FormGroup {
    return this.fb.group({
      'unittype': [item.unittype],
      'size': [item.size, Validators.required],
      'charge': [item.charge],
    });
  }
  
  addItem(item: any): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.createItem(item));
  }

  removeItem(index: number)  {
    const control = <FormArray>this.form.controls['items'];
    control.removeAt(index);
  }

  async onSubmit(value: any, isValid: boolean) {
    this.submitted = true;
    if (!isValid) {
      this.showNotification("top", "right", "Fill required fields !!", "danger");
      return;
    } else {
      this.membershipSubmitData.emit(value);
    }
  }

  previous() {
    this.membershipPreviousData.emit();
  }

  skip() {
    this.membershipSkipData.emit();
  }

  next() {
    this.membershipSubmitData.emit();
  }

  async addCloneItem(index: any) {
    var unittype = ((this.form.get('items') as FormArray).at(index) as FormGroup).get('unittype').value;
    this.addNewItem(unittype)
  }

  async loadData() {
    this.submitData.unitSizePostData.items.forEach(unit => {
      this.addItem(unit)
    })
  }

  addNewItem(unittype: any) {
    let items = {};
    items["unittype"] = unittype;
    items["size"] = 1000;
    items["charge"] = 1000;
    this.addItem(items);
  }

}
