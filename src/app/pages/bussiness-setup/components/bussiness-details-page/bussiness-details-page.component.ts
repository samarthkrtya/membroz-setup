import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';

declare var $: any;
@Component({
  selector: 'app-bussiness-details-page',
  templateUrl: './bussiness-details-page.component.html',
  styles: [
  ]
})
export class BussinessDetailsPageComponent extends BaseComponemntComponent implements OnInit {

  @ViewChild('targetstarttime', { static: false }) targetstarttime: ElementRef;
  @ViewChild('targetendtime', { static: false }) targetendtime: ElementRef;
  
  @Input('submitData') submitData: any = {};
  @Output() bussinessPreviousData: EventEmitter<any> = new EventEmitter<any>();
  @Output() bussinessSkipData: EventEmitter<any> = new EventEmitter<any>();
  @Output() bussinessSubmitData: EventEmitter<any> = new EventEmitter<any>();


  disableBtn = false;
  form: FormGroup;
  submitted: boolean = false;

  uploader: FileUploader | undefined;
  response: any;
  customeUploader: any;

  formImageArray: any[] = [];
  
  defaultlogo: any;


  timezone_fields = {
    fieldname: "timezone",
    fieldtype: "lookup",
    search: [
      { searchfield: "status", searchvalue: "active", criteria: "eq" },
      { searchfield: "lookup", searchvalue: "timezone", criteria: "eq" }
    ],
    select: [
      { fieldname: "_id", value: 1 },
      { fieldname: "data", value: 1 },
    ],
    form: {
      formfield: "code",
      displayvalue: "name",
    },
    modelValue: {},
    dbvalue: {},
    visibility: true
  }

  currency_fields = {
    fieldname: "currency",
    fieldtype: "lookup",
    search: [
      { searchfield: "status", searchvalue: "active", criteria: "eq" },
      { searchfield: "lookup", searchvalue: "currency", criteria: "eq" }
    ],
    select: [
      { fieldname: "_id", value: 1 },
      { fieldname: "data", value: 1 },
    ],
    form: {
      formfield: "code",
      displayvalue: "name",
    },
    modelValue: {},
    dbvalue: {},
    visibility: true
  }

  wdoptions = [
    { value: "Monday", checked: false },
    { value: "Tuesday", checked: false },
    { value: "Wednesday", checked: false },
    { value: "Thursday", checked: false },
    { value: "Friday", checked: false },
    { value: "Saturday", checked: false },
    { value: "Sunday", checked: false },
  ];


  constructor(
    private cloudinary: Cloudinary,
    private fb: FormBuilder,
  ) { 

    super();

    this.pagename = "app-bussiness-details-page";

    this.form = fb.group({
      'logo': [''],
      'bussinessname': ['', Validators.required],
      'starttime': ['', Validators.required],
      'endtime': ['', Validators.required],
      'timezone': ['', Validators.compose([Validators.required])],
      'currency': ['', Validators.compose([Validators.required])],
    });

  }

  async ngOnInit() {
    console.log("second ")
    try {
      await this.initlizationVariables();
      await this.imageConfigration();
      await this.loadData();
    } catch(error) {
      console.error("error", error);
    } finally {
    }
    
  }

  get f() { return this.form.controls; }

  async initlizationVariables() {
    return;
  }

  async imageConfigration() {

    var auth_cloud_name = this.cloudinary.config().cloud_name;
    var auth_upload_preset = this.cloudinary.config().upload_preset;

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${auth_cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: "X-Requested-With",
          value: "XMLHttpRequest",
        },
      ],
    };

    this.customeUploader = new FileUploader(uploaderOptions);
    this.customeUploader.onBuildItemForm = (
      fileItem: any,
      form: FormData
    ): any => {
      form.append("upload_preset", auth_upload_preset);
      form.append("context", `photo=${"item_logo"}`);
      form.append("tags", "item_logo");
      form.append("file", fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = (fileItem: any) => {
      $(".loading").show();
      if (fileItem && fileItem.status == 200) {

        let fieldnameTags = fileItem.data.tags[0];

        if (!this.formImageArray) {
          this.formImageArray = [];
        }

        let extension: any;
        if (fileItem.file) {
          extension = fileItem.file.name.substr(
            fileItem.file.name.lastIndexOf(".") + 1
          );
        }
        let fileInfo = {
          attachment: fileItem.data.secure_url,
          extension: extension,
          originalfilename: fileItem.data.original_filename,
        };

        this.defaultlogo = fileInfo.attachment;

        this.f.logo.setValue(this.defaultlogo);
        
        $("#" + fieldnameTags).val(fileItem.data.secure_url);

        $(".loading").hide();
      }
    };

    this.customeUploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });
    this.customeUploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse({
        file: fileItem.file,
        progress,
      });
    
    return;
  }

  async loadData() {

    console.log("this.submitData", this.submitData);

    if(this.submitData && this.submitData.bussinessPostData) {

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.logo) {
        this.form.get("logo").setValue(this.submitData.bussinessPostData.logo);
        this.defaultlogo = this.submitData.bussinessPostData.logo;
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.bussinessname) {
        this.form.get("bussinessname").setValue(this.submitData.bussinessPostData.bussinessname);
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.timezone && this.submitData.bussinessPostData.timezone.autocomplete_id) {
        this.timezone_fields.visibility = false;
        setTimeout(() => {
          this.timezone_fields.dbvalue = this.submitData.bussinessPostData.timezone.autocomplete_id;
          this.timezone_fields.visibility = true;
        });
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.currency && this.submitData.bussinessPostData.currency.autocomplete_id) {
        this.currency_fields.visibility = false;
        setTimeout(() => {
          this.currency_fields.dbvalue = this.submitData.bussinessPostData.currency.autocomplete_id;
          this.currency_fields.visibility = true;
        });
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.starttime) {
        this.form.get("starttime").setValue(this.submitData.bussinessPostData.starttime);
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.endtime) {
        this.form.get("endtime").setValue(this.submitData.bussinessPostData.endtime);
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.days && this.submitData.bussinessPostData.days.length > 0) { 
        this.wdoptions = [];
        this.wdoptions = [...this.submitData.bussinessPostData.days];
      }
    }
    return;
  }

  async onSubmit(value: any, isValid: boolean) {
    this.submitted = true;
    if (!isValid) {
       this.showNotification("top", "right", "Fill required fields !!", "danger");
      return;
    } else {
      value.days = [];
      value.days = this.wdoptions;
      this.bussinessSubmitData.emit(value);
    }
  }

  previous() {
    this.bussinessPreviousData.emit();
  }

  skip() {
    this.bussinessSkipData.emit();
  }

  isAllSelected(){
    return this.wdoptions.filter(a => a.checked == true).length == 7;
  }

  setAllDays(checked: boolean){
    this.wdoptions.map(a => a.checked = checked);
  }

  focusFunction(event: any) {
    if (event == "starttime") {
      this.targetstarttime.nativeElement.click();
    } else {
      this.targetendtime.nativeElement.click();
    }
  }


}
