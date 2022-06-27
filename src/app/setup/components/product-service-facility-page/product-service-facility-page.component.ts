import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import Records from '../../../../assets/json/records.json';

declare var $: any;

@Component({
  selector: 'app-product-service-facility-page',
  templateUrl: './product-service-facility-page.component.html',
  styles: [
  ]
})
export class ProductServiceFacilityPageComponent implements OnInit {

  @Input('submitData') submitData: any = {};
  @Output() productServiceFacilitySubmitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() productServiceFacilityPreviousData: EventEmitter<any> = new EventEmitter<any>();
  @Output() productServiceFacilitySkipData: EventEmitter<any> = new EventEmitter<any>();

  disableBtn = false;
  form: FormGroup;
  submitted: boolean = false;

  items: any [] = [];
  visible: boolean = false;

  serviceLists: any [] = [];
  productLists: any [] = [];
  facilityLists: any [] = [];
  
  constructor(
    private fb: FormBuilder,
  ) { 

    this.form = fb.group({
      items: new FormArray([])
    });

  }

  async ngOnInit() {
    try {
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

    this.items = [];
    this.serviceLists = [];
    this.productLists = [];
    this.facilityLists = [];

    console.log("Records", Records)

    if(Records && Records.length > 0 && this.submitData && this.submitData.solutiontype !== "") {

      var solutiontype = this.submitData.solutiontype;

      this.serviceLists = Records.filter(function(item){
        return item?.solution.toLowerCase() == solutiontype.toLowerCase() && item.type == "service";
      });

      this.productLists = Records.filter(function(item){
        return item?.solution.toLowerCase() == solutiontype.toLowerCase() && item.type == "product";
      });

      this.facilityLists = Records.filter(function(item){
        return item?.solution.toLowerCase() == solutiontype.toLowerCase() && item.type == "facility";
      });

    }

    console.log("serviceLists", this.serviceLists);
    console.log("productLists", this.productLists);
    console.log("facilityLists", this.facilityLists);
    
    return;
  }

  async loadData() {
    for( var key in this.submitData.bussinessTypePostData ) {
      if(this.submitData.bussinessTypePostData.hasOwnProperty(key)) {
        var value = this.submitData.bussinessTypePostData[key];
        var itemObj = this.items.find(p=>p.name.toLowerCase() == value.name.toLowerCase());
        if(itemObj) {
          itemObj.checked = this.submitData.bussinessTypePostData[key].checked;
        }
      }
    }
    return;
  }

  async _patchValues() {
    const formArray = this.form.get('items') as FormArray;
    this.items.forEach((item) => {
      formArray.push(new FormGroup({ name: new FormControl(item.name), checked: new FormControl(item.checked)}));
    });
    return;
  }

  async onSubmit(values: any, isValid: boolean) {

    this.submitted = true;
    if (!isValid) {
      this.showNotification("top", "right", "Fill required fields !!", "danger");
      return;
    } else {
      // console.log("values", values);
      // this.productServiceFacilitySubmitData.emit(values.items);
    }
  }

  previous() {
    this.productServiceFacilityPreviousData.emit();
  }

  skip() {
    this.productServiceFacilitySkipData.emit();
  }

  showNotification(from: any, align: any, msg: any, type: any) {
    $.notify(
      {
        icon: "notifications",
        message: msg,
      },
      {
        type: type,
        timer: 3000,
        placement: {
          from: from,
          align: align,
        },
        z_index: 1070
      }
    );
  }

}
