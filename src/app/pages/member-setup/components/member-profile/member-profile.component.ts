import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { CommonService } from '../../../../core/services/common/common.service';

import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { BasicValidators, ValidMobileNumberValidator } from 'src/app/core/helper/basicValidators';
import { Subject } from 'rxjs';

declare var $ : any;

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styles :[
    `.mat-radio-button~.mat-radio-button {
      margin-left: 16px;
  }`
  ]
})
export class MemberProfileComponent implements OnInit , OnDestroy {

  allFields : any[] = [];

  dynamicForm : FormGroup;

  uploader: FileUploader;
  response: any[] = [];
  customeUploader: any[] = [];
  formImageArray: any[] = [];
  allowedFileType = ["xlsx", "xls", "doc", "docx", "ppt", "pptx", "csv", "pdf", "jpg", "jpeg", "gif", "png", "tif", "tiff"]
  maxFileSize = 5 * 1024 * 1024;

  destroy$: Subject<boolean> = new Subject<boolean>();

  dynamicSubmitted : boolean;
  _defaultAllFields: any = {};
  _needToSave: any = {};

  formObj : any;
  disableBtn : boolean = false;
  isLoading: boolean = false;
 
  @Output() onSaveSuccess : EventEmitter<any> = new EventEmitter<any>();

  constructor(private _commonService : CommonService , private fb : FormBuilder ,private cloudinary: Cloudinary ) { }

 async ngOnInit(){
  try {
      this.isLoading = true;
      await this.getForms();
      await this.LoadData();
      setTimeout(async () => {
        await this.imageConfigration();
        this.isLoading = false;
      }, 500);
    } catch(e){
        this.isLoading = false;
    }
  }

async  getForms(){
    let postData = {};
    postData["search"] = [];
    postData["search"].push({ searchfield: "formname", searchvalue: 'member', criteria: "eq", });

    const url =  "forms/filter";
    const method =  "POST";
    
    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, postData)
      .then((data : any) => {
        if (data && data.length != 0) {
          this.formObj = data[0];
        }
      });
  }

  async LoadData() {

    let postData = {};
    postData["search"] = [];
    postData["search"].push({ searchfield: "formid", searchvalue: '599673a925f548d7dbbd7c86', criteria: "eq", "datatype": "ObjectId" });
    postData["sort"] = "formorder";

    var url = "formfields/filter";
    var method = "POST";
 
    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, postData)
      .then((data: any) => {
        console.log('data =>', data);
          this.allFields = [];
          this.allFields = data;

          this._defaultAllFields = {};
         
          const group: any = {};
          this.allFields.forEach((element, i) => {
            this._defaultAllFields[element.fieldname] = null;
            group[element.fieldname] = this.setupFormControl(element);
          });
 
          if (this.formObj && this.formObj["rootfields"] && this.formObj["rootfields"].length > 0) {
            this.formObj["rootfields"].forEach((element) => {
              let fieldname = element["fieldname"];
              this._defaultAllFields[fieldname] = null;
              group[element.fieldname] = this.setupFormControl(element);
              this.allFields.unshift(element);
          });
        }
        this.dynamicForm = this.fb.group(group); // root fields from forms collection
        // console.log('this.dynamicForm =>', this.dynamicForm); 
      },(e)=>{
        console.log('e =>', e);
      });
  }

  setupFormControl(element : any){
    if (element.fieldtype == 'checkbox') {
      return new FormControl([])
    } else if (element.fieldtype == 'mobile' || element.fieldtype == 'alternatenumber') {
      if (element.required) {
        if(element.min && element.max){
          return new FormControl(null, Validators.compose([Validators.required, Validators.minLength(element.min), Validators.maxLength(element.max)]));
        }else{
          return new FormControl(null, Validators.compose([Validators.required, ValidMobileNumberValidator.onlyvalidmobilenumber]));
        }
      } else {
        if(element.min && element.max){
          return new FormControl(null, Validators.compose([Validators.minLength(element.min), Validators.maxLength(element.max)]));
        }else{
          return new FormControl(null, Validators.compose([ValidMobileNumberValidator.onlyvalidmobilenumber]));
        }
      }
    } else if (element.fieldtype == 'primaryemail' || element.fieldtype == 'secondaryemail') {
      if (element.required) {
        return new FormControl(null, Validators.compose([Validators.required, BasicValidators.email]));
      } else {
        return new FormControl(null, Validators.compose([BasicValidators.email]));
      }
    } else if (element.fieldtype == 'number') {

      if (element.required) {
        if(element.min && element.max){
          return new FormControl(null, Validators.compose([Validators.required, Validators.min(element.min), Validators.max(element.max)]));
        } else {
          return new FormControl(null, Validators.compose([Validators.required]));
        }
      } else {
        if(element.min && element.max){
          return new FormControl(null, Validators.compose([Validators.min(element.min), Validators.max(element.max)]));
        } else {
          return new FormControl(null);
        }
      }
    } else {
      if (element.required) {
        return new FormControl(null, Validators.compose([Validators.required]));
      } else {
        return new FormControl(null);
      }
    }
  }

  async imageConfigration() {
    console.log('imageConfigration  allFields=>', this.allFields);
    this.allFields.forEach((element,i) => {

        if (element.fieldtype == 'image' || element.fieldtype == 'multi_image' || element.fieldtype == "attachment" || element.fieldtype == "gallery") {
          // var auth_cloud_name = this._authService && this._authService.auth_cloudinary && this._authService.auth_cloudinary.cloud_name ? this._authService.auth_cloudinary.cloud_name : this.cloudinary.config().cloud_name;
          // var auth_upload_preset = this._authService && this._authService.auth_cloudinary && this._authService.auth_cloudinary.upload_preset ? this._authService.auth_cloudinary.upload_preset : this.cloudinary.config().upload_preset;

          let auth_cloud_name =  "dlopjt9le";
          let auth_upload_preset =  "gs95u3um";

          const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${auth_cloud_name}/upload`,
            autoUpload: true,
            isHTML5: true,
            removeAfterUpload: true,
            headers: [
              {
                name: 'X-Requested-With',
                value: 'XMLHttpRequest'
              }
            ],
            // allowedFileType: element.allowedfiletype ? element.allowedfiletype : this.allowedFileType,
            //maxFileSize: element.maxfilesize ? element.maxfilesize : Number(this.maxFileSize)
          };

          if (element.fieldtype == 'gallery') {
            uploaderOptions.allowedFileType = ['image']
          }

          let fieldname = element.fieldname;
          this.customeUploader[fieldname] = new FileUploader(uploaderOptions);

          this.customeUploader[fieldname].onBuildItemForm = (fileItem: any, form: FormData): any => {
            console.log('fileItem =>', fileItem);
            form.append('upload_preset', auth_upload_preset);
            form.append('context', `photo=${element.fieldname}`);
            form.append('tags', element.fieldname);
            form.append('file', fileItem);

            fileItem.withCredentials = false;
            return { fileItem, form };
          };

          const upsertResponse = fileItem => {
            console.log('fileItem =>', fileItem);
            $(".loading_" + element.fieldname).show();

            if (fileItem && fileItem.status == 200) {

              let fieldnameTags = fileItem.data.tags[0];

              if (!this.formImageArray[fieldnameTags]) {
                this.formImageArray[fieldnameTags] = [];
              }

              if (!element.value) {
                element.value = "";
              }

              let extension: any;
              if (fileItem.file) {
                extension = fileItem.file.name.substr(fileItem.file.name.lastIndexOf('.') + 1);
              }
              let fileInfo = {
                attachment: fileItem.data.secure_url,
                extension: extension,
                originalfilename: fileItem.data.original_filename
              };
              if (element.multiselect == false) {
                this.formImageArray[fieldnameTags] = [];
              }
              this.formImageArray[fieldnameTags].push(fileInfo);
              console.log('this.formImageArray =>', this.formImageArray);
              element.value = fileItem.data.secure_url;
              $('#' + fieldnameTags).val(fileItem.data.secure_url);
              this.dynamicForm.controls[element.fieldname].setValue(fileItem.data.secure_url);
              $(".loading_" + element.fieldname).hide();
          }
        };
          this.customeUploader[fieldname].onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => upsertResponse({ file: item.file, status, data: JSON.parse(response)})
          this.customeUploader[fieldname].onProgressItem = (fileItem: any, progress: any) => upsertResponse({ file: fileItem.file, progress});
          this.customeUploader[fieldname].onWhenAddingFileFailed = (item: any, filter: any) => {
            let message = '';
            switch (filter.name) {
              case 'fileSize':
                message = 'Warning ! \nThe uploaded file \"' + item.name + '\" is ' + this.formatBytes(item.size) + ', this exceeds the maximum allowed size of ' + this.formatBytes(element.maxfilesize ? element.maxfilesize : (Number(this.maxFileSize) * 1024 * 1024));
                // this.showNotification("top", "right", message, "danger");
                alert(message);
                break;
              default:
                //message = 'Error trying to upload file '+item.name;
                message = 'Please upload image file only.';
                // this.showNotification("top", "right", message, "danger");
                alert(message);
                break;
            }
          };
        }

    });
    return;
  }

  downloadlink(link: any) {
    window.open(link, '_blank');
    return true;
  }

  removeImg(url: any, filedname: any) {
    for (const i in this.dynamicForm.value[filedname]) {
      if (this.dynamicForm.value[filedname][i] == url['attachment']) {
        this.dynamicForm.value[filedname].splice(i, 1);
      }
    }
    for (const key in this.formImageArray) {
      if (key == filedname) {
        this.formImageArray[key].forEach(element => {
          if (element == url) {
            this.formImageArray[key].splice(element, 1);
          }
        });
      }
    }
    this.allFields.forEach(ele => {
      ele.forEach(element => {
        if (element.fieldname == filedname) {
          if (this.formImageArray[filedname].length == 0) {
            element.value = "";
          }
        }
      });
    });
  }

  formatBytes(bytes: any, decimals?: any) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onDynamicFormSubmit(value : any , valid: boolean){
    try{

    
      console.log(valid, value);
      this.dynamicSubmitted = true;
      if (!valid) {
        this.showNotification("top", "right", 'Please enter required fields !!', "danger");
        return;
      } else {
        this.disableBtn = true;
        this.allFields.forEach(ele2 => {
            if (ele2.fieldtype == 'lookup' || ele2.fieldtype == 'form') {
              if (this.dynamicForm.value[ele2.fieldname] && this.dynamicForm.value[ele2.fieldname]['autocomplete_id']) {
                this.dynamicForm.value[ele2.fieldname] = this.dynamicForm.value[ele2.fieldname]['autocomplete_id'];
              }
            } else if (ele2.fieldtype == 'image' || ele2.fieldtype == 'multi_image' || ele2.fieldtype == 'attachment' || ele2.fieldtype == 'gallery') {
              for (let key in this.formImageArray) {
                if (key == ele2.fieldname) {
                  this.dynamicForm.value[ele2.fieldname] = this.formImageArray[key];
                }
              }
            }
        });
        this._needToSave["property"] = this._defaultAllFields;
        setTimeout(() => {
          for (let submitKey in value) {
            if (!this._needToSave["property"][submitKey]) {
              this._needToSave["property"][submitKey] = null;
            }
            for (let key in this._needToSave["property"]) {
              if (key == submitKey.toLowerCase()) {
                this._needToSave["property"][key] = value[submitKey];
              }
            }
          }
  
          const url = this.formObj.addurl["url"]+'/';
          const method = this.formObj.addurl["method"];
  
          for (let key in this._needToSave["property"]) {
              if (Object.prototype.toString.call(this._needToSave["property"][key]) === "[object Array]") {
              for (let k in this._needToSave["property"][key]) {
                if (typeof this._needToSave["property"][key][k] == "undefined") {
                  this._needToSave["property"][key][k] = null;
                }
              }
            } else {
              if (typeof this._needToSave["property"][key] == "undefined") {
                this._needToSave["property"][key] = null;
              }
            }
          }
          if (this.formObj && this.formObj["rootfields"]) {
              this.formObj["rootfields"].forEach((element) => {
              for (let key in this._needToSave["property"]) {
                if (element["fieldname"] == key) {
                  if(element["fieldtype"] == "hidden") {
                    this._needToSave[key] = element["defaultvalue"];
                    this._needToSave['property'][key] = element["defaultvalue"];
                  } else {
                    this._needToSave[key] = this._needToSave["property"][key];
                  }
                }
              }
            });
          }
          this.onSaveSuccess.emit(this._needToSave);
          // this.addRecord(url, method);
          this.disableBtn = false;
        }, 1000);
        //console.log("this.dynamicForm.value", this.dynamicForm.value);
      }
    }catch(e){
      console.error('e =>', e);
      this.disableBtn = false;
    }
  }

  addRecord(url: string, method: string) {
    this._commonService
      .commonServiceByUrlMethodData(url, method, this._needToSave)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) =>{
        this.showNotification("top", "right",  this.formObj?.dispalyformname+' added successfully !!', "success");
        this.onSaveSuccess.emit(data);
      },(err)=>{
        if (err.status == 500) {
          this.showNotification("top", "right", err.error.message, "danger");
        }
      });
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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
