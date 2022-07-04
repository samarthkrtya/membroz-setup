import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { CommonService } from 'src/app/core/services/common/common.service';
import { BaseComponemntComponent } from 'src/app/shared/base-componemnt/base-componemnt.component';
@Component({
  selector: 'app-member-setup',
  templateUrl: './member-setup.component.html',
})
export class MemberSetupComponent extends BaseComponemntComponent implements OnInit {

  index : number  = 0;
  
  branchdetails : any;
  memberdetails : any;
  packagedetails : any;
  personaldetails : any;
  parqform : any;
  carddetails : any;

  visitTabs : number[] = [0];

  token : string;

  decode = {
       '_id': '613074c9bfd7602f90774d32',
       'branchid': '619f698507f63663cdf59381',
       'iat': 1656675229,
       'exp': 1656761629
  };
  
  public headers: HttpHeaders = new HttpHeaders();

  constructor(private _commonService : CommonService , private _route: ActivatedRoute) {
    super();

    this._route.params.forEach((param)=>{
      this.token = param['token'];
    })
  }

  async ngOnInit() {
    await super.ngOnInit();
    localStorage.setItem('authKey',this.decode?._id);
    await this.getDetailsByToken();
    await this.getBranchDetails();
  }


  async getDetailsByToken(){
      
    const url = `auth/verifytoken/${this.token}`;
    const method = "GET"; 

    await this._commonService
      .commonServiceByUrlMethodIdOrDataAsync(url, method,'')
      .then((data: any) => { 
        this.decode = data;
      });
  }

  async getBranchDetails(){

    const url = "branches/";
    const method = "GET"; 

    await this._commonService
      .commonServiceByUrlMethodIdOrDataAsync(url, method, this.decode.branchid)
      .then((data: any) => {
        console.log('Branch details =>', data);
        this.branchdetails = data;
      });
  }
  
  onNextSuccessMember(member :  any){
    this.index = 1;
    this.memberdetails = member;
    this.visitTabs.push(this.index); 
  }

  onNextPackage(packages){
    this.index = 2;
    this.packagedetails = packages;
    this.visitTabs.push(this.index);
  }
   
  onNextPd(model : any){ 
    this.index = 3;
    this.personaldetails = model;
    this.visitTabs.push(this.index);
  }

  onNextPF(model : any){ 
    this.index = 4;
    this.parqform = model;
    this.visitTabs.push(this.index);
  }

  onNextCard(card : any){
    this.index = 5;
    this.carddetails = card;
    this.visitTabs.push(this.index);
  }
  
  onSaveSuccessReview(event : any){
    this.index = 6;
    this.visitTabs.push(this.index);
  }

  onPreviousIndex(event : number){ 
    this.index = event;
  }




 async onSubmit(){
    let model = {};
    let member = {};
    member = this.memberdetails;
    member['membershipid'] = this.packagedetails._id;
    member['membershipstart'] = new Date();
    let newDate = new Date();
    let endDateMoment = moment();
    endDateMoment.add(this.packagedetails.property.tenure, 'months');
    newDate = endDateMoment.toDate();
    member['membershipend'] = newDate;
    model['member'] = member;

    console.log('onSubmit model =>', model);  

    const url = "common/quickmembersetup";
    const method = "POST"; 

    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, model)
      .then((data: any) => {
        console.log('onSubmit res details =>', data);
      });
    
  }
  

}
