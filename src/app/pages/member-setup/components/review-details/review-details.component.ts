import { Component, Input, OnInit } from '@angular/core';
import { BaseComponemntComponent } from 'src/app/shared/base-componemnt/base-componemnt.component';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html'
})
export class ReviewDetailsComponent extends BaseComponemntComponent implements OnInit {

  @Input() carddetails : any;
  @Input() memberdetails : any;

  constructor() {
    super();
  }

  async ngOnInit(){
    await super.ngOnInit();
  }

}
