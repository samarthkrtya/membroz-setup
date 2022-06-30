import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Input('submitData') submitData: any = {};
  @Output() bussinessSubmitData: EventEmitter<any> = new EventEmitter<any>();


  disableBtn = false;
  form: FormGroup;
  submitted: boolean = false;

  uploader: FileUploader | undefined;
  response: any;
  customeUploader: any;

  formImageArray: any[] = [];
  
  defaultlogo: any;


  constructor(
    private cloudinary: Cloudinary,
    private fb: FormBuilder,
  ) { 

    super();

    this.pagename = "app-bussiness-details-page";

    this.form = fb.group({
      'logo': [''],
      'fullname': ['', Validators.required],
      'email': [],
      'city': [],
      'phone': [],
      'workinghours': [],
      'timezone': [],
      'currency': []
    });

  }

  async ngOnInit() {
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
    console.log("first tab");
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

    if(this.submitData && this.submitData.bussinessPostData) {

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.logo) {
        this.form.get("logo").setValue(this.submitData.bussinessPostData.logo);
        this.defaultlogo = this.submitData.bussinessPostData.logo;
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.fullname) {
        this.form.get("fullname").setValue(this.submitData.bussinessPostData.fullname);
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.city) {
        this.form.get("city").setValue(this.submitData.bussinessPostData.city);
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.phone) {
        this.form.get("phone").setValue(this.submitData.bussinessPostData.phone);
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.workinghours) {
        this.form.get("workinghours").setValue(this.submitData.bussinessPostData.workinghours);
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.timezone) {
        this.form.get("timezone").setValue(this.submitData.bussinessPostData.timezone);
      }

      if(this.submitData.bussinessPostData && this.submitData.bussinessPostData.currency) {
        this.form.get("currency").setValue(this.submitData.bussinessPostData.currency);
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
      this.bussinessSubmitData.emit(value);
    }
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
