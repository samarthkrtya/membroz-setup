import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';
@Component({
  selector: 'app-bussiness-setup',
  templateUrl: './bussiness-setup.component.html',
  styles: [
  ]
})
export class BussinessSetupComponent  implements OnInit, OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  _tabLists: any [] = [
    {index: 0, tabname: "Bussiness", class: "disable", disable: true},
    {index: 1, tabname: "Bussiness Type", class: "disable", disable: true},
    {index: 2, tabname: "Product / Service / Facility", class: "disable", disable: true},
    {index: 3, tabname: "Membership / Package", class: "disable", disable: true},
    {index: 4, tabname: "Staffs", class: "disable", disable: true},
    
  ];
  
  _defaultTabIndex: number;

  submitData: any = {};
  visible: boolean = false;

  constructor() {
   }
  

  async ngOnInit() {
    try {
      await this.initializeVariables();
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
    this.submitData["productServiceFacilityPostData"] = {};
    this.submitData["membershipPostData"] = {};
    this.submitData["staffsPostData"] = {};
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


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
