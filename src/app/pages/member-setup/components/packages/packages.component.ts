import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponemntComponent } from 'src/app/shared/base-componemnt/base-componemnt.component';
import { CommonService } from '../../../../core/services/common/common.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html', 
})
export class PackagesComponent extends BaseComponemntComponent implements OnInit {

  constructor(private _commonService : CommonService) { 
    super();
   }

  @Input() memberdetails: any;
  membershipList : any[]= [];

  isLoading : boolean = false;

  @Output() onPrevious : EventEmitter<number> = new EventEmitter<number>();
  @Output() onNextPackage : EventEmitter<any> = new EventEmitter<any>();
  
  async ngOnInit() {
    await super.ngOnInit();
    try{
      this.isLoading = true;
      await this.LoadData();
      this.isLoading = false;
    }catch(e){
      this.isLoading = false;
    }
  }

  async LoadData() {

    let postData = {};
    postData["search"] = [];
    postData["search"].push({ "searchfield": "status", "searchvalue": 'active', "criteria": "eq", "datatype": "text" });
    postData["search"].push({"searchfield": "property.type", "searchvalue": false, "criteria": "exists"});

    const url = "memberships/filter";
    const method = "POST";

    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, postData)
      .then((data: any) => {
          this.membershipList = [];
          this.membershipList = data;
          this.membershipList.map(a=>a.checked = false);
      },(e)=>{
        console.log('e =>', e);
      });
  }

  onChange(event : any){
    this.membershipList.map(a=>a.checked = a._id == event.source.id);
  }

  
  previous(){
    console.log('previous to =>',0);
    this.onPrevious.emit(0);
  }

  onNext(){
    let packages = this.membershipList.find(a=>a.checked == true);
    if(!packages){
      super.showNotification("top", "right", "Please Select any Membership !!", "danger");
      return;
    }
    this.onNextPackage.emit(packages);
  }

}
