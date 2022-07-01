import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnlyNumberValidator, OnlyPositiveNumberValidator } from 'src/app/core/helper/basicValidators';
import { CommonService } from '../../../../core/services/common/common.service';

import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { BaseComponemntComponent } from 'src/app/shared/base-componemnt/base-componemnt.component';
const _moment = _rollupMoment || moment;


class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    var formatString = 'MM/YYYY';
    return _moment(date).format(formatString);
  }
}

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  providers : [
    {
      provide: DateAdapter, useClass: CustomDateAdapter
    }
  ]
})
export class CreditCardDetailsComponent extends BaseComponemntComponent implements OnInit {

  cardForm: FormGroup
  submitted: boolean;

  btnDisable : boolean;
  today = new Date();

  isLoading : boolean;
  @ViewChild(MatDatepicker) picker;
  @Input() memberdetails : any;
  @Output() onPrevious : EventEmitter<any> = new EventEmitter<any>();
  @Output() onNextCard : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    protected _commonService: CommonService,
    protected fb: FormBuilder) {
      super();
      
  }

  async ngOnInit() {
   await super.ngOnInit();

   this.cardForm = this.fb.group({
    'number': [, Validators.compose([OnlyPositiveNumberValidator.insertonlypositivenumber, OnlyNumberValidator.insertonlycardnumber, Validators.required])],
    'expiry': [, Validators.required],
    'csv': [, Validators.compose([OnlyPositiveNumberValidator.insertonlypositivenumber, OnlyNumberValidator.insertonlythreenumber, Validators.required])],
    'holdername': [this.memberdetails?.fullname, Validators.required],
    'terms': [false],
    'status': ['valid']
  });

   
  }
  
  monthSelected(params) {
    var date = params._d ? params._d : params;
    this.cardForm.controls['expiry'].setValue(date);
    this.picker.close();
  }
  
  async onSubmitMethod(value: any, valid: boolean) {
    if(!valid){
      super.showNotification("top", "right", "Validation Failed !!", "danger");
      return;
    }
    this.onNextCard.emit(value)
  }

  previous(){
    this.onPrevious.emit(3);
  }


}
