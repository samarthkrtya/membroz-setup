import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../../../../core/services/common/common.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html', 
})
export class PackagesComponent implements OnInit {

  constructor(private _commonService : CommonService) { }

  @Input() memberdetails: any;
  membershipList : any[]= [];

  isLoading : boolean = false;

  @Output() onSaveSuccess : EventEmitter<any> = new EventEmitter<any>();
  
 async ngOnInit() {
    console.log('packages =>');
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


  onNext(){
    let packages = this.membershipList.find(a=>a.checked == true);
    this.onSaveSuccess.emit(packages);
  }

}
