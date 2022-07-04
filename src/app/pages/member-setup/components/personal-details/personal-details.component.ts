import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponemntComponent } from '../../../../shared/base-componemnt/base-componemnt.component';
import { CommonService } from '../../../../core/services/common/common.service';


declare var $ : any;

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html', 
  styles : [
     `.center {
       text-align: center;
     }
     ::ng-deep .custom-class {
       border: 0;
       border-bottom: 1px solid #000;
       height: auto;
       font-size: 14px;
       font-family: 'Poppins', arial;
     }
     `
  ],
})

export class PersonalDetailsComponent extends BaseComponemntComponent implements OnInit , AfterViewChecked , AfterViewInit {

  doctemplate : any = {};
  isLoading : boolean = false;

  @Input() memberdetails : any;
  @Input() branchdetails : any; 

  formfields: any [] = [];
 

  @Output() onPrevious : EventEmitter<any> = new EventEmitter<any>();
  @Output() onNextPD : EventEmitter<any> = new EventEmitter<any>();

  checked : boolean = false;
  selectedField : any; 
  formFieldVisibile: boolean = false;

  public classes: any;

  constructor(
    private _commonService : CommonService,
    private elementRef:ElementRef
    ) {
      super();
    }

  async ngOnInit() {
    try{
      this.isLoading = true;
      await super.ngOnInit();
      await this.getformFields();
      await this.getLoadForm(); 
      this.isLoading = false;
      console.log('memberdetails =>', this.memberdetails);
    }catch(e){
      this.isLoading = false;
    }
  }

  ngAfterViewChecked(){
    this.classes = this.elementRef.nativeElement.querySelectorAll('.signaturepad');
    if(this.classes){
      this.classes.forEach((cls : HTMLElement) => {
        cls.addEventListener('click', this.handleAnchorClick);
      });
    }
  }

  ngAfterViewInit(){
  }

  public handleAnchorClick = (event: Event) => {
    const elemnt = event.target as HTMLElement;
    this.selectedField = null;
    this.formFieldVisibile = false;
    setTimeout(() => {
      this.selectedField = this.getformfieldObj(elemnt.id);
       if(this.selectedField && this.selectedField.fieldtype !== "checkbox" && this.selectedField.fieldtype !== "text" && this.selectedField.fieldtype !== "list" && this.selectedField.fieldtype !== "long_text") {
          $('#myModalFormfield').appendTo("body")
          $("#myModalFormfieldPopup").click();
          this.formFieldVisibile = true;
       }
    });
  }
 
  async getformFields() {
    const url = "formfields/filter";
    const method = "POST";

    let postData = {};
    postData['search'] = [];
    postData["search"].push({"searchfield": "formname", "searchvalue": "Membership Contract", "criteria": "eq" });
    postData["search"].push({"searchfield": "status", "searchvalue": "active", "criteria": "eq"});

    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, postData)
      .then((data: any) => {
        if(data) {
          this.formfields = [];
          this.formfields = data;
        }
    }, (error) =>{
      console.error(error);
    });

  }

  getformfieldObj(id: any) {
    return this.formfields.find(p=>p._id == id)
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-')
  }

  getDayClassNames(value: any) {
    // if(value == "") {
    //   return "color: transparent"
    // } else {
    //   return "color: black";
    // }
  }

  async getLoadForm() {

    let postData = {};
    postData['search'] = [];
    postData["search"].push({"searchfield": "formname", "searchvalue": "Membership Contract", "criteria": "eq"});
    postData["search"].push({"searchfield": "status", "searchvalue": "active", "criteria": "eq"});

    const url =  "forms/filter";
    const method =  "POST";
    
    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, postData)
      .then( (data: any) => {
        if(data) {
            if(data && data[0] && data[0]["doctemplate"]) {
              this.doctemplate = data[0]["doctemplate"];
              this.setupDocument();
            }
        }
    }, (error) =>{
      console.error(error);
    });

  }

  setupDocument(){
    var shortcode_regex_constant = /\[(\w+)+\.?(\w+)\.?(\w+)\]/mg;
    var th_constant: any = this;
    this.doctemplate.replace(shortcode_regex_constant, function (match_constant, code_constant) {
    var replace_str_constant = match_constant.replace('[', '');
    replace_str_constant = replace_str_constant.replace(']', '');
      if(replace_str_constant == "branchlogo" && th_constant.branchdetails && th_constant.branchdetails.branchlogo) {
        var branchlogo = th_constant.branchdetails.branchlogo
        var string_value = "<img id='" + replace_str_constant +"' src='"+ branchlogo +"' style='max-height: 150px; max-width: 200px;''>";
        th_constant.doctemplate = th_constant.doctemplate.replace("$[" + replace_str_constant + "]", string_value);
      }
    });
    let textDisplay;

    var shortcode_regex_user = /\[\((\w+)+\.?(\w+)\.?(\w+)\@?([\w ]+)\@?\#?([\w ]+)?\#?\)]/mg;
    var th_user: any = this;
    this.doctemplate.replace(shortcode_regex_user, function (match_user, code_user) {
      
      var replace_str_user = match_user.replace('[(', '');
      replace_str_user = replace_str_user.replace(')]', '');


      var displayname = replace_str_user.substring(
        replace_str_user.indexOf("@") + 1, 
        replace_str_user.lastIndexOf("@")
      );

      var fieldtype = replace_str_user.substring(
        replace_str_user.indexOf("#") + 1, 
        replace_str_user.lastIndexOf("#")
      );

      var fieldname = replace_str_user.replace('@' + displayname + '@','');
      fieldname = fieldname.replace('#' + fieldtype + '#','');

      let res = fieldname.split(".");
      var value = "";

      if(res[2]) {
        if(th_user.memberdetails && th_user.memberdetails[res[0]] && th_user.memberdetails[res[0]][res[1]] && th_user.memberdetails[res[0]][res[1]][res[2]]) {
          value = th_user.memberdetails[res[0]][res[1]][res[2]]
        }
      } else if (res[1]) {
        if(th_user.memberdetails && th_user.memberdetails[res[0]] && th_user.memberdetails[res[0]][res[1]]) {
          value = th_user.memberdetails[res[0]][res[1]]
        }
      } else {
        value = th_user.memberdetails[res[0]]
      }
      
      if(fieldtype && fieldtype == 'image' && value && value !== '') {
        value = `<img src='${value}'>` 

      } else if (fieldtype && fieldtype == 'date' && value && value !== '') {
        value = `<span style='background-color: yellow'> ${new Date(value).toLocaleDateString(th_user._commonService.currentLocale())} </span>`;
      } else {
        value = `<span style='background-color: yellow'>${value ? value : displayname} </span>`;
      }
      th_user.doctemplate = th_user.doctemplate.replace("$[(" + replace_str_user + ")]", value ? value : displayname);
    });
    var shortcode_regex = /\[{(\w+)+\.?(\w+)\.?(\w+)\}]/mg;
    var th: any = this;
    this.doctemplate.replace(shortcode_regex, function (match: any, code: any) {
      var replace_str = match.replace('[{', '');
      replace_str = replace_str.replace('}]', '');
      var formfieldObj = th.getformfieldObj(replace_str);
      if(formfieldObj) {
        var htmlTemplate = "";
        if(formfieldObj.fieldtype == "text") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          htmlTemplate = "<input type='text' name='attributename_" + replace_str +"' id='" + replace_str +"' value='"+ value +"'>"
        } else if (formfieldObj.fieldtype  == "long_text") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          htmlTemplate = "<textarea row='6' cols='50' name='attributename_" + replace_str +"' id='" + replace_str +"'>" + value + " </textarea>"
        } else if (formfieldObj.fieldtype == "checkbox") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          if(formfieldObj.lookupdata && formfieldObj.lookupdata.length > 0) {
            formfieldObj.lookupdata.forEach(element => {
              var checkedString = '';
              if(value && value.length > 0) {
                var valueObj = value.find(p=>p == element.key);
                if(valueObj)  checkedString = 'checked="checked"';
              }
              htmlTemplate += " <input type='checkbox' name='attributename_"+replace_str+"' id='" + replace_str +"' "+ checkedString +">"
            });
          }
        } else if (formfieldObj.fieldtype == "datepicker") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          htmlTemplate = "<input type='date' name='attributename_" + replace_str +"' id='" + replace_str +"' value='"+ th.convertDate(value) +"' style='" + th.getDayClassNames(value) +  "'>"

        } else if (formfieldObj.fieldtype == "lookup" || formfieldObj.fieldtype == "form") {
          var value = formfieldObj && formfieldObj.value && formfieldObj.value.autocomplete_displayname ? formfieldObj.value.autocomplete_displayname : formfieldObj && formfieldObj.value ? formfieldObj.value : formfieldObj.displayname
          htmlTemplate = "<input type='text' id='" + replace_str +"' value='"+ value +"'>"
        } else if (formfieldObj.fieldtype == "signaturepad") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          if(value == "") {
            htmlTemplate = "<input type='text' class='"+ formfieldObj.fieldtype +"'  id='" + replace_str +"' val='"+ value +"' placeholder='Signature ....' class='custom-class'>"
          } else {
            htmlTemplate = "<img id='" + replace_str +"' src='"+ value +"' style='height: 100px; width: 100px'>"
          }
        } else if (formfieldObj.fieldtype == "list") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          var checkedString = '';
          var optionString = "";
          optionString += "<option value=''></option>";
          if(formfieldObj.lookupdata && formfieldObj.lookupdata.length > 0) {
            formfieldObj.lookupdata.forEach(elementLookup => {
              if(value == elementLookup.value) {
                checkedString = "selected"
              }
              optionString += "<option value='"+ elementLookup.value +"' "+ checkedString +">"+ elementLookup.value +"</option>"
            });
          }
          htmlTemplate = "<select name='attributename_" + replace_str +"' id='" + replace_str +"'> "+ optionString +" </select>"
        } else {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          htmlTemplate = "<input type='text' id='" + replace_str +"' value='"+ value +"'>"
        }
        if(formfieldObj.fieldtype == "mobile" || formfieldObj.fieldtype == "alternatenumber" || formfieldObj.fieldtype == "whatsappnumber") {
          textDisplay = formfieldObj && formfieldObj.value && formfieldObj.value.number ? formfieldObj.value.number : formfieldObj.value ? formfieldObj.value : formfieldObj.displayname
        } else if (formfieldObj.fieldtype == "lookup" || formfieldObj.fieldtype == "form") {
          textDisplay = formfieldObj && formfieldObj.value && formfieldObj.value.autocomplete_displayname ? formfieldObj.value.autocomplete_displayname : formfieldObj && formfieldObj.value ? formfieldObj.value : formfieldObj.displayname
        } else {
          textDisplay = formfieldObj && formfieldObj.value ? formfieldObj.value : formfieldObj.displayname
        }

        // if (data[0].addedby == th._loginUserId){
        //   th.btnDisable = true;
        // }

        // if(th.btnDisable) {
        //   formcontrol = `<span id="${replace_str}">${htmlTemplate}</span>`;
        // } else {
          // formcontrol = `<a id="${replace_str}">${htmlTemplate}</a>`;
        //}
      }
      if (htmlTemplate) {
        th.doctemplate = th.doctemplate.replace("$[{" + replace_str + "}]", htmlTemplate);
      }
    });
  }

  onNextPDS(){
    let confirmModel = {};
    confirmModel['property'] = {};
    this.formfields.forEach(element => {
      if(element.fieldtype == "text" || element.fieldtype == "list" || element.fieldtype == "long_text") {
        confirmModel['property'][element['fieldname']] = $(`#${element._id}`).val();
      } else if(element.fieldtype == "checkbox") {
        var elems = document.getElementsByName("attributename_" + element._id);
        for(var i = 0; i < elems.length; i++) {
          if(elems[i]["checked"] == true) {
            if(element.lookupdata && element.lookupdata.length > 0 && element.lookupdata[i] && element.lookupdata[i]["key"]) {
              if(!element.value) {
                element.value = [];
              }
              element.value.push(element.lookupdata[i]["key"]);
              if(!confirmModel['property'][element['fieldname']]) {
                confirmModel['property'][element['fieldname']] = [];
              }
              confirmModel['property'][element['fieldname']].push(element.lookupdata[i]["key"]);
            }
          }
        }
      } else if(element.fieldtype == "datepicker") {
        var elems = document.getElementsByName("attributename_" + element._id);
        for(var i = 0; i < elems.length; i++) {
          if(elems[i]["value"] && elems[i]["value"] !== "") {
            var dateString = elems[i]["value"].split("-");
            if(dateString && dateString[2]) {
              var d = new Date();
              d.setFullYear(dateString[0]);
              d.setMonth(dateString[1] - 1);
              d.setDate(dateString[2]);
              element.value = d;
              confirmModel['property'][element['fieldname']] = d;
            }
          }
        }
      }
    });
    this.onNextPD.emit(confirmModel);
  }

 async onSaveSign(selectedField : any){
    this.selectedField = selectedField;
    let fieds = this.formfields.find(a=>a._id == selectedField._id);
    fieds  = this.selectedField;
    this.isLoading = true;
    await this.getLoadForm();
    this.isLoading = false;
  }

  previous(){
    this.onPrevious.emit(1);
  }

 


}
