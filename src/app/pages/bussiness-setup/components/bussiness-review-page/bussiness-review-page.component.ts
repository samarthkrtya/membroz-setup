import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';

import Records from '../../../../../assets/json/records.json';

declare var $: any;
@Component({
  selector: 'app-bussiness-review-page',
  templateUrl: './bussiness-review-page.component.html',
  styles: [
  ]
})
export class BussinessReviewPageComponent extends BaseComponemntComponent implements OnInit {

  
  @Input('submitData') submitData: any = {};
  @Output() reviewSubmitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() reviewPreviousData: EventEmitter<any> = new EventEmitter<any>();

  disableBtn: boolean = false;

  designationLists: any [] = [];

  constructor() {

    super();
    this.pagename = "app-bussiness-review-page";

  }

  async ngOnInit() {
    try {
      await super.ngOnInit();
      await this.initializeVariables()
    } catch(error) {
      console.error("error", error);
    } finally {
      
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

    if(this.submitData && this.submitData.staffsPostData && this.submitData.staffsPostData.items && this.submitData.staffsPostData.items.length > 0 ) {
      this.submitData.staffsPostData.items.forEach(element => {
        var designObj = this.designationLists.find(p=>p.designationid == element.designation);
        if(designObj) {
          element.designationname = designObj.itemname;
        }
      });
    }
    return;
  }

  finished() {
    $("#setup").removeClass("d-block").addClass("d-none");
    $("#done").removeClass("d-none").addClass("d-block");
    this.reviewSubmitData.emit();
  }

  previous() {
    this.reviewPreviousData.emit();
  }

}
