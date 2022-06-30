import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';

import { BaseComponemntComponent } from '../../shared/base-componemnt/base-componemnt.component';

import { CommonService } from '../../core/services/common/common.service';
@Component({
  selector: 'app-bussiness-setup',
  templateUrl: './bussiness-setup.component.html',
  styles: [
  ]
})
export class BussinessSetupComponent extends BaseComponemntComponent implements OnInit, OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  _tabLists: any [] = [
    {index: 0, tabname: "Bussiness", class: "disable", disable: false},
    {index: 1, tabname: "Bussiness Type", class: "disable", disable: true},
    {index: 2, tabname: "Services", class: "disable", disable: true},
    {index: 3, tabname: "Membership", class: "disable", disable: true},
    {index: 4, tabname: "Staffs", class: "disable", disable: true},
    
  ];
  
  _defaultTabIndex: number;

  submitData: any = {};
  visible: boolean = false;

  designationLists: any [] = [];

  constructor(
    private _commonService: CommonService
  ) {

    super();

    this.pagename = "app-bussiness-setup";
   }
  

  async ngOnInit() {
    try {
      await super.ngOnInit();
      await this.initializeVariables();
      await this.getDesignation();
    } catch(error) {
      console.error(error)
    } finally {
      this._defaultTabIndex = 0;
    }
    
  }

  async initializeVariables() {

    this.submitData = {};
    this.submitData["bussinessPostData"] = {};
    this.submitData["solutiontype"] = "";
    this.submitData["productServiceFacilityPostData"] = [];
    this.submitData["membershipPostData"] = {};
    this.submitData["staffsPostData"] = {};

    this.designationLists = [];
    return;
  }

  
 

  async onTabClick(current: any) {
    this._defaultTabIndex = current;
    var tabObj = this._tabLists.find(p=>p.index == current);
    if(tabObj) {
      tabObj.disable = false;
    }
    return;
  }

  getBussinessSubmittedData(submit_data: any) {
    this.submitData["bussinessPostData"] = {};
    this.submitData["bussinessPostData"] = {...submit_data};
    this.onTabClick(1);
  }


  bussinessTypePrevious() {
    //Current 1
    this.onTabClick(0);
  }

  bussinessTypeSkip() {
    //Current 1
    this.onTabClick(2);
  }

  getBussinessTypeSubmittedData(submit_data: any) {
    //Current 1
    this.submitData["solutiontype"] = "";
    this.submitData["solutiontype"] = submit_data;
    this.onTabClick(2);
  }


  productServiceFacilityPreviousData() {
    //Current 2
    this.onTabClick(1);
  }

  productServiceFacilitySkipData() {
    //Current 2
    this.onTabClick(3);
  }

  getProductServiceFacilitySubmittedData(submit_data: any) {
    //Current 2
    this.submitData["productServiceFacilityPostData"] = [];
    this.submitData["productServiceFacilityPostData"] = [...submit_data];
    this.onTabClick(3);
  }

  membershipPreviousData() {
    //Current 3
    this.onTabClick(2);
  }

  membershipSkipData() {
    //Current 3
    this.onTabClick(4);
  }

  getMembershipSubmittedData(submit_data: any) {
    //Current 3
    this.onTabClick(4);
  }


  staffsPreviousData() {
    //Current 4
    this.onTabClick(3);
  }

  staffsSkipData() {
    //Current 4
    this.onTabClick(5);
  }

  getStaffsSubmittedData(submit_data: any) {
    //Current 4
    this.onTabClick(5);
  }


  reviewPreviousData() {
    //Current 5
    this.onTabClick(4);
  }

  getReviewSubmittedData(submit_data: any) {
    // API CALL
  }


  getDesignation() {

    let method = "POST";
    let url = "designations/filter";

    let postData = {};
    postData["search"] = [];
    postData["search"].push({ "searchfield": "status", "searchvalue": "active", "criteria": "eq" });

    console.log("method", method);
    console.log("url", url);
    console.log("postData", postData);

    return this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, postData)
      .then((data: any) => {
        if (data) {
          this.designationLists = [];
          this.designationLists = data;
          return;
        }
      }, (error) => {
        console.error(error);
      })
      
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
