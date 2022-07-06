import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { Configuration } from 'src/app/app.constants';
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

  disableBtn : boolean = false;

  // decode = {
  //      '_id': '613074c9bfd7602f90774d32',
  //      'branchid': '619f698507f63663cdf59381',
  //      'iat': 1656675229,
  //      'exp': 1656761629
  // };
  decode = {};
  
  public headers: HttpHeaders = new HttpHeaders();

  constructor(private _commonService : CommonService , private _route: ActivatedRoute , private configuration : Configuration) {
    super();

    this._route.params.forEach((param)=>{
      this.token = param['token'];
    })
  }

  async ngOnInit() {
    await super.ngOnInit();
    await this.getDetailsByToken();
    await this.getBranchDetails();
  }


  async getDetailsByToken(){
      
    const url = `auth/verifytoken/`;
    const method = "GET"; 
    
    await this._commonService
      .commonServiceByUrlMethodIdOrDataAsync(url, method,this.token)
      .then((data: any) => {
        console.log('getDetailsByToken data =>', data);
        if(data.error){
          this.showNotification('top', 'right', `${data.error}`, 'danger');
          this._router.navigate(['/not-found']);          
          return;
        }else{ 
          this.decode = data;
          localStorage.setItem('authKey',data._id);
          localStorage.setItem('domain',data?.domain);
        }
      });
  }

  async getBranchDetails(){

    const url = "branches/";
    const method = "GET"; 

    await this._commonService
      .commonServiceByUrlMethodIdOrDataAsync(url, method, this.decode['branchid'])
      .then((data: any) => {
        // console.log('Branch details =>', data);
        if(data.Error == 403){
          this.showNotification('top', 'right', `${data.message}`, 'danger');
          this._router.navigate(['/not-found']);
        }else{
          this.branchdetails = data;
        }
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
    member['paymentterms'] = [];
    member['paymentterms'] = this.packagedetails.paymentterm;
    member['membershipid'] = this.packagedetails._id;
    member['membershipstart'] = new Date();
    let newDate = new Date();
    let endDateMoment = moment();
    endDateMoment.add(this.packagedetails.property.tenure, 'months');
    newDate = endDateMoment.toDate();
    member['membershipend'] = newDate;
    member['property']['credit_card_no'] = this.carddetails.number;
    member['property']['exp_month'] = moment(this.carddetails.expiry).get('M');
    member['property']['exp_year'] = moment(this.carddetails.expiry).get('y');
    member['property']['name_on_account'] = this.carddetails.holdername;
    model = member;
    model['personaldetail'] = this.personaldetails?.property;
    model['parq'] = this.parqform?.property;
    
    console.log('onSubmit model =>', model);

    const url = "common/quickmembersetup";
    const method = "POST"; 

    this.disableBtn = true;
    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, model)
      .then((data: any) => {
        console.log('onSubmit res details =>', data);
        this.disableBtn = false;
        this.showNotification('top', 'right', "Member added successfully !!", 'success');

        let Server;
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
          Server = 'http://localhost:4200/';
        } else {
          Server = this.decode['domain'];
        }

        window.location.href = `${Server}auto-login/${this.token}?url=/pages/members/profile/${data?._id}`;
        // window.location.href = `http://localhost:4200/auto-login/${this.token}?url=/pages/members/profile/${data._id}`;
      },(e)=>{
        console.log('e ===>', e);
        this.disableBtn = false;
        this.showNotification('top', 'right', "Something went wrong !!", 'danger');
      });
    
  }
  

}
