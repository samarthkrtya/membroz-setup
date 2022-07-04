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

      if(this.submitData && this.submitData.membershipPostData && this.submitData.membershipPostData.items && this.submitData.membershipPostData.items.length > 0 ) {
        await this.loadData();
      } else {
        this.addNewItem();
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
      'membershipname': [item.membershipname, Validators.required],
      'duration': [item.duration, Validators.required],
      'charge': [item.charge, Validators.required],
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
      console.log("value", value);
      this.membershipSubmitData.emit(value);
    }
  }

  previous() {
    this.membershipPreviousData.emit();
  }

  skip() {
    this.membershipSkipData.emit();
  }

  async loadData() {
    console.log("this.submitData" , this.submitData.membershipPostData)
    this.submitData.membershipPostData.items.forEach(membership => {
      this.addItem(membership)
    })
  }

  addNewItem() {
    let items = {};
    items["membershipname"] = "";
    items["duration"] = 12;
    items["charge"] = 1000;
    this.addItem(items);
  }

}
