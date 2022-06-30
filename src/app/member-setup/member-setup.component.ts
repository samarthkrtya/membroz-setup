import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-member-setup',
  templateUrl: './member-setup.component.html',
})
export class MemberSetupComponent implements OnInit {

  index : number  = 0;
  
  memberdetails : any;
  packagedetails : any;
  personaldetails : any;
  parqform : any;
  

  constructor() { }

  ngOnInit(): void { 
  }
  
  onSaveSuccessMember(member :  any){
    this.index = 1;
    this.memberdetails = member;
  }

  onSaveSuccessPackage(packages){ 
    this.index = 2;
    this.packagedetails = packages;
  }
   
  onSaveSuccessPd(model : any){ 
    this.index = 3;
    this.personaldetails = model;
  }

  onSaveSuccessPQ(model : any){ 
    this.index = 4;
    this.parqform = model;
  }

  
}
