import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';

declare var $: any;
@Component({
  selector: 'app-bussiness-type-page',
  templateUrl: './bussiness-type-page.component.html',
  styles: [
  ]
})
export class BussinessTypePageComponent extends BaseComponemntComponent implements OnInit {

  @Input('submitData') submitData: any = {};
  @Output() bussinessTypeSubmitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() bussinessTypePreviousData: EventEmitter<any> = new EventEmitter<any>();
  @Output() bussinessTypeSkipData: EventEmitter<any> = new EventEmitter<any>();

  disableBtn = false;
  form: FormGroup;
  submitted: boolean = false;  

  items: any [] = [];

  visible: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { 

    super();
    this.pagename = "app-bussiness-type-page";

    this.form = fb.group({
      items: new FormArray([])
    });

  }

  async ngOnInit() {
    try {
      await super.ngOnInit();
      await this.initializeVariables()
      await this.loadData();
      await this._patchValues();
    } catch(error) {
      console.error("error", error);
    } finally {
      this.visible = true;
    }
  }

  get f() {return this.form.get('items') as FormControl;}

  getControls() {
    return (this.form.get('items') as FormArray).controls;
  }


  async initializeVariables() {

    console.log("second-tab");

    this.items = [];
    this.items.push({ name: "club", title: "Club, Resort & Hotel", checked: false });
    this.items.push({ name: "tour", title: "Tour, Travel & Timeshare", checked: false });
    this.items.push({ name: "gym", title: "Gym, Yoga & Fitness Center", checked: false });
    this.items.push({ name: "salon", title: "Spa, Salon & Wellness Center", checked: false });
    this.items.push({ name: "restaurant", title: "Restaurant, Pubs & Bar", checked: false });
    this.items.push({ name: "workshop", title: "Service, Workshop & Maintenance", checked: false });
    this.items.push({ name: "dietician", title: "Dietician & Nutritionist", checked: false });
    this.items.push({ name: "society", title: "Community, Association & Society", checked: false });
    this.items.push({ name: "agency", title: "Franchise, Distributor & Agency", checked: false });
    this.items.push({ name: "event", title: "Venue, Facility & Event Booking", checked: false });
    this.items.push({ name: "coaching", title: "Consulting and Coaching", checked: false });
    this.items.push({ name: "rental", title: "Fleet & Rental Management", checked: false });
    return;
  }

  async loadData() {
    if(this.submitData && this.submitData.solutiontype !== "") {
      var itemObj = this.items.find(p=>p.name.toLowerCase() == this.submitData.solutiontype.toLowerCase());
      if(itemObj) {
        itemObj.checked = true;
      }
    }
    return;
  }

  async _patchValues() {
    const formArray = this.form.get('items') as FormArray;
    this.items.forEach((item) => {
      formArray.push(new FormGroup({ name: new FormControl(item.name), title: new FormControl(item.title), checked: new FormControl(item.checked)}));
    });
    return;
  }

  async onSubmit(values: any, isValid: boolean) {
    this.submitted = true;
    if (!isValid) {
      this.showNotification("top", "right", "Fill required fields !!", "danger");
      return;
    } else {

      var solutiontype: any;

      var validation = false;
      for (const property in values.items) {
        if(values.items[property]['checked'] == true) {
          validation = true;
          solutiontype = values.items[property]['name'];
        }
      }

      if(!validation) {
        this.showNotification("top", "right", "Bussiness Type is required!!", "danger");
        return;
      }
      this.bussinessTypeSubmitData.emit(solutiontype);
      
    }
  }

  showOptions(i: number, event: MatCheckboxChange): void {
    if(event.checked) {
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        ((this.form.get('items') as FormArray).at(index) as FormGroup).get('checked').patchValue(false);
        if(index == i) {
          ((this.form.get('items') as FormArray).at(index) as FormGroup).get('checked').patchValue(true);
        }
      }
    }
  }

  previous() {
    this.bussinessTypePreviousData.emit();
  }

  skip() {
    this.bussinessTypeSkipData.emit();
  }

}
