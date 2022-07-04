import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';

import {
  BasicValidators, ValidUrlValidator, OnlyNumberValidator, ValidMobileNumberValidator, OnlyNumberOrDecimalValidator,
  ValidPercValidator, equalValidator, matchingPasswords
} from '../../../../shared/components/basicValidators';

import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

declare var $: any;

@Component({
  selector: 'app-bussiness-contact-detail-page',
  templateUrl: './bussiness-contact-detail-page.component.html'
})
export class BussinessContactDetailPageComponent extends BaseComponemntComponent implements OnInit  {

  @Input('submitData') submitData: any = {};
  @Output() contactSubmitData: EventEmitter<any> = new EventEmitter<any>();
  
  

  disableBtn = false;
  form: FormGroup;
  submitted: boolean = false;

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  country_fields = {
    fieldname: "country",
    fieldtype: "lookup",
    formfield: "code",
    displayvalue: "name",
    search: [
      { searchfield: "status", searchvalue: "active", criteria: "eq" },
      { searchfield: "lookup", searchvalue: "country", criteria: "eq" }
    ],
    select: [
      { fieldname: "_id", value: 1 },
      { fieldname: "data", value: 1 },
    ],
    modelValue: {},
    dbvalue: {},
    visibility: true,
    class: "mat-form-field-space-remove"
  };

  selectedCountryISO = CountryISO.India;


  constructor(
    private fb: FormBuilder
  ) {
    super();

    this.pagename = "app-bussiness-contact-detail-page";

    this.form = fb.group({
      'fullname': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, BasicValidators.email])],
      'phone': [''],
      'country': ['', Validators.required],
      'city': [''],
      
    });

   }

   async ngOnInit() {
    try {
      await this.initlizationVariables();
      await this.loadData();
    } catch(error) {
      console.error("error", error);
    } finally {
    }
  }

  async initlizationVariables() {
    // console.log(Intl)
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    return;
  }

  get f() { return this.form.controls; }

  async loadData() {

    
    if(this.submitData && this.submitData.contactPostData) {

      if(this.submitData.contactPostData && this.submitData.contactPostData.fullname) {
        this.form.get("fullname").setValue(this.submitData.contactPostData.fullname);
      }

      if(this.submitData.contactPostData && this.submitData.contactPostData.email) {
        this.form.get("email").setValue(this.submitData.contactPostData.email);
      }

      if(this.submitData.contactPostData && this.submitData.contactPostData.phone && this.submitData.contactPostData.phone.e164Number) {
        this.form.get("phone").setValue(this.submitData.contactPostData.phone.e164Number);
      }

      if(this.submitData.contactPostData && this.submitData.contactPostData.phone && this.submitData.contactPostData.phone.countryCode) {
        this.selectedCountryISO = this.submitData.contactPostData.phone.countryCode;
      }

      if(this.submitData.contactPostData && this.submitData.contactPostData.country && this.submitData.contactPostData.country.autocomplete_id) {
        this.country_fields.visibility = false;
        setTimeout(() => {
          this.country_fields.dbvalue = this.submitData.contactPostData.country.autocomplete_id
          this.country_fields.visibility = true;
        });
      }

      if(this.submitData.contactPostData && this.submitData.contactPostData.city) {
        this.form.get("city").setValue(this.submitData.contactPostData.city);
      }

      

    }
    return;
  }


  changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  async onSubmit(value: any, isValid: boolean) {
    this.submitted = true;
    if (!isValid) {
       this.showNotification("top", "right", "Fill required fields !!", "danger");
      return;
    } else {
      this.contactSubmitData.emit(value);
    }
  }

}
