import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';

declare var $: any;
@Component({
  selector: 'app-bussiness-review-page',
  templateUrl: './bussiness-review-page.component.html',
  styles: [
  ]
})
export class BussinessReviewPageComponent extends BaseComponemntComponent implements OnInit {

  @Input('designationLists') designationLists: any = [];
  @Input('submitData') submitData: any = {};
  @Output() reviewSubmitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() reviewPreviousData: EventEmitter<any> = new EventEmitter<any>();

  disableBtn: boolean = false;

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

    if(this.submitData && this.submitData.staffsPostData && this.submitData.staffsPostData.items && this.submitData.staffsPostData.items.length > 0 ) {
      this.submitData.staffsPostData.items.forEach(element => {
        var designObj = this.designationLists.find(p=>p._id == element.designation);
        if(designObj) {
          element.designationname = designObj.title;
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
