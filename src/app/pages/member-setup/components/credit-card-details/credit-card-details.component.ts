import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnlyNumberValidator, OnlyPositiveNumberValidator } from 'src/app/core/helper/basicValidators';
import { CommonService } from '../../../../core/services/common/common.service';

import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
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
export class CreditCardDetailsComponent implements OnInit {

  cardForm: FormGroup
  submitted: boolean;

  btnDisable : boolean;
  today = new Date();

  isLoading : boolean;
  @ViewChild(MatDatepicker) picker;

  constructor(
    protected _commonService: CommonService,
    protected fb: FormBuilder) {
      this.cardForm = fb.group({
        'number': [, Validators.compose([OnlyPositiveNumberValidator.insertonlypositivenumber, OnlyNumberValidator.insertonlycardnumber, Validators.required])],
        'expiry': [, Validators.required],
        'csv': [, Validators.compose([OnlyPositiveNumberValidator.insertonlypositivenumber, OnlyNumberValidator.insertonlythreenumber, Validators.required])],
        'holdername': ['', Validators.required],
        'terms': [false],
        'status': ['valid'],
        'editmode': [false],
      });
  }

  ngOnInit(): void {
  }

  
  monthSelected(params) {
    var date = params._d ? params._d : params;
    this.cardForm.controls['expiry'].setValue(date);
    this.picker.close();
  }
 
 
  async onSubmitMethod(value: any, valid: boolean) {
    console.log('valid =>', valid);
    console.log('value =>', value);
  }


}
