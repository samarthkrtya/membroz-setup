import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonService } from '../../../../core/services/common/common.service';

import Records from '../../../../../assets/json/records.json';

import {
  BasicValidators, ValidUrlValidator, OnlyNumberValidator, ValidMobileNumberValidator, OnlyNumberOrDecimalValidator,
  ValidPercValidator, equalValidator, matchingPasswords
} from '../../../../shared/components/basicValidators';

declare var $: any;
@Component({
  selector: 'app-bussiness-staffs-page',
  templateUrl: './bussiness-staffs-page.component.html',
  styles: [
  ]
})
export class BussinessStaffsPageComponent extends BaseComponemntComponent implements OnInit {

  @Input('submitData') submitData: any = {};
  @Output() staffsSubmitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() staffsPreviousData: EventEmitter<any> = new EventEmitter<any>();

  disableBtn = false;
  form: FormGroup;
  items: FormArray;
  submitted: boolean;

  designationLists: any [] = [];

  constructor(
    private fb: FormBuilder,
    private _commonService: CommonService
  ) { 

    super();

    this.form = fb.group({
      items: new FormArray([])
    });

  }

  async ngOnInit() {
    try {
      await super.ngOnInit()
      await this.initializeVariables()
      if(this.submitData && this.submitData.staffsPostData && this.submitData.staffsPostData.items && this.submitData.staffsPostData.items.length > 0 ) {
        await this.loadData();
      } else {
        //this.addNewItem(this.designationLists[0]['_id']);
      }
    } catch(error) {
      console.error("error", error);
    } finally {
      //console.log("staff submitData", this.submitData);
    }
  }

  async initializeVariables() {
    
    this.designationLists = [];

    if(Records && Records.length > 0 && this.submitData && this.submitData.solutiontype !== "") {
      var solutiontype = this.submitData.solutiontype;
      this.designationLists = Records.filter(function(item){
        return item?.solution.toLowerCase() == solutiontype.toLowerCase() && item.type == "role";
      });
    }
    return;
  }

  createItem(item: any): FormGroup {
    return this.fb.group({
      'designation':[item.designation, Validators.required],
      'role':[item.role],
      'name': [item.name, Validators.required],
      'email': [item.email, Validators.compose([Validators.required, BasicValidators.email])],
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
      this.staffsSubmitData.emit(value);
    }
  }

  async loadData() {
    this.submitData.staffsPostData.items.forEach(staff => {
      this.addItem(staff)
    })
  }

  addNewItem(item: any) {
    let items = {};
    items["designation"] = item.designationid;
    items["role"] = item.roleid;
    items["name"] = "";
    items["email"] = "";
    this.addItem(items);
  }

  async addCloneItem(index: any) {
    var designation = ((this.form.get('items') as FormArray).at(index) as FormGroup).get('designation').value;
    var role = ((this.form.get('items') as FormArray).at(index) as FormGroup).get('role').value;
    let item = {
      designationid: designation,
      roleid: role
    }
    this.addNewItem(item)
  }

  previous() {
    this.staffsPreviousData.emit();
  }

}
