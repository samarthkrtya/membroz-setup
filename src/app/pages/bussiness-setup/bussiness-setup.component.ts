import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';

import { BaseComponemntComponent } from '../../shared/base-componemnt/base-componemnt.component';

import { CommonService } from '../../core/services/common/common.service';
import { style } from '@angular/animations';

declare var $: any;
@Component({
  selector: 'app-bussiness-setup',
  templateUrl: './bussiness-setup.component.html',
  styleUrls: ['./bussiness-setup.component.scss']
})
export class BussinessSetupComponent extends BaseComponemntComponent implements OnInit, OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  _tabLists: any [] = [
    {index: 0, tabname: "Contact", class: "disable", disable: false},
    {index: 1, tabname: "Bussiness", class: "disable", disable: true},
    {index: 2, tabname: "Bussiness Type", class: "disable", disable: true},
    {index: 3, tabname: "Services", class: "disable", disable: true},
    {index: 4, tabname: "Membership", class: "disable", disable: true},
    {index: 5, tabname: "Staffs", class: "disable", disable: true},
    {index: 6, tabname: "Review", class: "disable", disable: true},
  ];
  
  _defaultTabIndex: number;

  submitData: any = {};
  visible: boolean = false;

  progress = 0;
  
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
      await this.getLocaleFromBrowser();
      //await this.getDefaultValue()
    } catch(error) {
      console.error(error)
    } finally {
      this._defaultTabIndex = 0;
    }
    
  }

  async initializeVariables() {

    this.submitData = {};
    this.submitData["contactPostData"] = {};
    this.submitData["bussinessPostData"] = {};
    this.submitData["solutiontype"] = "";
    this.submitData["productServiceFacilityPostData"] = [];
    this.submitData["membershipPostData"] = {};
    this.submitData["staffsPostData"] = {};

    return;
  }

  
  async onTabClick(current: any) {

    switch (current) {
      case 0:
        this.progress = 0;
        $(".progress-right .progress-bar").css("animation", "loading-0 0.5s linear forwards");
        $(".progress-left .progress-bar").css("animation", "0");
        break;
      case 1:
        this.progress = 20;
        $(".progress-right .progress-bar").css("animation", "loading-20 0.5s linear forwards");
        $(".progress-left .progress-bar").css("animation", "0");
        break;
      case 2:
         this.progress = 40;
         $(".progress-right .progress-bar").css("animation", "loading-40 0.5s linear forwards");
         $(".progress-left .progress-bar").css("animation", "0");
        break;
      case 3:
        this.progress = 50;
        $(".progress-right .progress-bar").css("animation", "loading-50 0.5s linear forwards");
        $(".progress-left .progress-bar").css("animation", "0");
        break;
      case 4:
        this.progress = 60;
        $(".progress-right .progress-bar").css("animation", "loading-50 0.5s linear forwards");
        $(".progress-left .progress-bar").css("animation", "loading-10 0.5s linear forwards 0.5s");
        break;
      case 5:
        this.progress = 80;
        $(".progress-right .progress-bar").css("animation", "loading-50 0.5s linear forwards");
        $(".progress-left .progress-bar").css("animation", "loading-30 0.5s linear forwards 0.5s");
        break;
      case 6:
        this.progress = 100;
        $(".progress-right .progress-bar").css("animation", "loading-50 0.5s linear forwards");
        $(".progress-left .progress-bar").css("animation", "loading-50 0.5s linear forwards 0.5s");
    }

    $('.progress').attr('data-percent', this.progress);

    this._defaultTabIndex = current;
    var tabObj = this._tabLists.find(p=>p.index == current);
    if(tabObj) {
      tabObj.disable = false;
    }
    return;
  }


  getContactSubmittedData(submit_data: any) {
    this.submitData["contactPostData"] = {};
    this.submitData["contactPostData"] = {...submit_data};
    this.onTabClick(1);
  }

  bussinessPrevious() {
    //Current 1
    this.onTabClick(0);
  }

  bussinessSkip() {
    //Current 1
    this.onTabClick(2);
  }

  getBussinessSubmittedData(submit_data: any) {
    this.submitData["bussinessPostData"] = {};
    this.submitData["bussinessPostData"] = {...submit_data};
    //Current 1
    this.onTabClick(2);
  }

  bussinessTypePrevious() {
    //Current 2
    this.onTabClick(1);
  }

  bussinessTypeSkip() {
    //Current 2
    this.onTabClick(3);
  }

  getBussinessTypeSubmittedData(submit_data: any) {
    //Current 2
    this.submitData["solutiontype"] = "";
    this.submitData["solutiontype"] = submit_data;
    this.onTabClick(3);
  }


  productServiceFacilityPrevious() {
    //Current 3
    this.onTabClick(2);
  }

  productServiceFacilitySkip() {
    //Current 3
    this.onTabClick(4);
  }

  getProductServiceFacilitySubmittedData(submit_data: any) {
    //Current 3
    this.submitData["productServiceFacilityPostData"] = [];
    this.submitData["productServiceFacilityPostData"] = [...submit_data];
    this.onTabClick(4);
  }

  membershipPrevious() {
    //Current 4
    this.onTabClick(3);
  }

  membershipSkip() {
    //Current 4
    this.onTabClick(5);
  }

  getMembershipSubmittedData(submit_data: any) {
    //Current 4
    this.submitData["membershipPostData"] = {};
    this.submitData["membershipPostData"] = {...submit_data};
    
    this.onTabClick(5);
  }


  staffsPrevious() {
    //Current 5
    this.onTabClick(4);
  }

  staffsSkip() {
    //Current 5
    this.onTabClick(5);
  }

  getStaffsSubmittedData(submit_data: any) {
    //Current 5
    this.submitData["staffsPostData"] = {};
    this.submitData["staffsPostData"] = {...submit_data};
    this.onTabClick(6);
  }


  reviewPrevious() {
    //Current 6
    this.onTabClick(5);
  }

  getReviewSubmittedData(submit_data: any) {

    // API CALL

    // console.log("submitData", this.submitData);
    // console.log("Api Call");

    let method = "POST";
    let url = "public/bussinessconfiguration";

    console.log("method", method);
    console.log("url", url);
    console.log("submitData", this.submitData);

    return;

    return this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, this.submitData)
      .then((data: any) => {
        if (data) {
           console.log("data", data);
          //this._router.navigate(['pages/dynamic-dashboard']);

          return;
        }
      }, (error) => {
        console.error(error);
      })

  }

  getLocaleFromBrowser() {
    console.log("navigator", navigator)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }


    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

    return;
  }



  handleError(error) {
    let errorStr;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorStr = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorStr = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorStr = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        errorStr = 'An unknown error occurred.';
        break;
      default:
        errorStr = 'An unknown error occurred.';
    }
    console.error('Error occurred: ' + errorStr);
  }
  
  showPosition(position) {

    console.log( "Latitude", position.coords.latitude);
    console.log( "longitude", position.coords.longitude);

    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key={GOOGLE_MAP_KEY}`)
    .then( res => res.json())
    .then(response => {
        console.log("User's Location Info: ", response)
     })
     .catch(status => {
        console.log('Request failed.  Returned status of', status)
     })
  }


  reverseGeocodingWithGoogle(latitude, longitude) {
    console.log("reverseGeocodingWithGoogle")
    
  }


  async getDefaultValue() {

    // Contact Data
    this.submitData["contactPostData"] = {};

    this.submitData["contactPostData"]["fullname"] = "Samarth Magdallawala";
    this.submitData["contactPostData"]["email"] = "samarth.magdallawala@gmail.com";

    this.submitData["contactPostData"]["phone"] = {};
    this.submitData["contactPostData"]["phone"]["number"] = "9909600918";
    this.submitData["contactPostData"]["phone"]["internationalNumber"] = "+91 99096 00918";
    this.submitData["contactPostData"]["phone"]["nationalNumber"] = "099096 00918";
    this.submitData["contactPostData"]["phone"]["e164Number"] = "+919909600918";
    this.submitData["contactPostData"]["phone"]["countryCode"] = "IN";
    this.submitData["contactPostData"]["phone"]["dialCode"] = "+91";

    this.submitData["contactPostData"]["country"] = {};
    this.submitData["contactPostData"]["country"]["code"] = "India";
    this.submitData["contactPostData"]["country"]["name"] = "India";
    this.submitData["contactPostData"]["country"]["autocomplete_id"] = "India";
    this.submitData["contactPostData"]["country"]["autocomplete_displayname"] = "India";

    this.submitData["contactPostData"]["city"] = "SURAT";

    // Bussinee Data
    this.submitData["bussinessPostData"] = {};
    this.submitData["bussinessPostData"]["logo"] = "";
    this.submitData["bussinessPostData"]["bussinessname"] = "Code Mantra";
    this.submitData["bussinessPostData"]["starttime"] = "10:00";
    this.submitData["bussinessPostData"]["endtime"] = "18:00";

    this.submitData["bussinessPostData"]["timezone"] = {};
    this.submitData["bussinessPostData"]["timezone"]["code"] = "Asia/Kolkata";
    this.submitData["bussinessPostData"]["timezone"]["name"] = "Asia/Kolkata";
    this.submitData["bussinessPostData"]["timezone"]["autocomplete_id"] = "Asia/Kolkata";
    this.submitData["bussinessPostData"]["timezone"]["autocomplete_displayname"] = "Asia/Kolkata";

    this.submitData["bussinessPostData"]["currency"] = {};
    this.submitData["bussinessPostData"]["currency"]["code"] = "INR";
    this.submitData["bussinessPostData"]["currency"]["name"] = "Indian rupee";
    this.submitData["bussinessPostData"]["currency"]["autocomplete_id"] = "INR";
    this.submitData["bussinessPostData"]["currency"]["autocomplete_displayname"] = "Indian rupee";

    this.submitData["bussinessPostData"]["days"] = [];
    this.submitData["bussinessPostData"]["days"].push({ "value": "Monday", "checked": true });
    this.submitData["bussinessPostData"]["days"].push({ "value": "Tuesday", "checked": true });
    this.submitData["bussinessPostData"]["days"].push({ "value": "Wednesday", "checked": true });
    this.submitData["bussinessPostData"]["days"].push({ "value": "Thursday", "checked": true });
    this.submitData["bussinessPostData"]["days"].push({ "value": "Friday", "checked": true });
    this.submitData["bussinessPostData"]["days"].push({ "value": "Saturday", "checked": false });
    this.submitData["bussinessPostData"]["days"].push({ "value": "Sunday", "checked": false });
  
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
