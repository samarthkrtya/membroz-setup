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

  @Input('designationLists') designationLists: any = [];
  @Input('submitData') submitData: any = {};
  @Output() staffsSubmitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() staffsPreviousData: EventEmitter<any> = new EventEmitter<any>();

  disableBtn = false;
  form: FormGroup;
  items: FormArray;
  submitted: boolean;

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
      if(this.submitData && this.submitData.staffPostData && this.submitData.staffPostData.items && this.submitData.staffPostData.items.length > 0 ) {
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
    console.log("Records", Records);
    return;
  }

  createItem(item: any): FormGroup {
    return this.fb.group({
      'designation':[item.designation, Validators.required],
      'name': [item.name, Validators.required],
      'email': [item.name, Validators.compose([Validators.required, BasicValidators.email])],
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
    this.submitData.staffPostData.items.forEach(staff => {
      this.addItem(staff)
    })
  }

  addNewItem(designation: any) {
    let items = {};
    items["designation"] = designation;
    items["name"] = "";
    items["email"] = "";
    this.addItem(items);
  }

  async addCloneItem(index: any) {
    var designation = ((this.form.get('items') as FormArray).at(index) as FormGroup).get('designation').value;
    this.addNewItem(designation)
  }

  previous() {
    this.staffsPreviousData.emit();
  }

}
