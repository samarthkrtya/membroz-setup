import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponemntComponent } from 'src/app/shared/base-componemnt/base-componemnt.component';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html'
})
export class ReviewDetailsComponent extends BaseComponemntComponent implements OnInit {

  @Input() carddetails : any;
  @Input() memberdetails : any;
  @Input() packagedetails : any;

  @Output() submit : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  async ngOnInit(){
    await super.ngOnInit();
    console.log('memberdetails =>', this.memberdetails);
    console.log('carddetails =>', this.carddetails);
    console.log('packagedetails =>', this.packagedetails);
  }



  onSubmit(){
    this.submit.emit();
  }
}
