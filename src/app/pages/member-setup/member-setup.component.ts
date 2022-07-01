import { Component, OnInit } from '@angular/core';
import { BaseComponemntComponent } from 'src/app/shared/base-componemnt/base-componemnt.component';


@Component({
  selector: 'app-member-setup',
  templateUrl: './member-setup.component.html',
})
export class MemberSetupComponent extends BaseComponemntComponent implements OnInit {

  index : number  = 0;
  
  memberdetails : any;
  packagedetails : any;
  personaldetails : any;
  parqform : any;
  carddetails : any;

  visitTabs : number[] = [0];

  constructor() { 
    super();
  }

  async ngOnInit() {
    await super.ngOnInit();
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
  
  onPreviousIndex(event : number){ 
    this.index = event;
  }
  

}
