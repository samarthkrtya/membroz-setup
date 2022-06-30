import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignaturePadComponent } from './signature-pad.component';
import { NgxSignaturePadModule } from "@o.krucheniuk/ngx-signature-pad";
 
@NgModule({
  declarations: [
    SignaturePadComponent,
  ],
  imports: [
    CommonModule,
    NgxSignaturePadModule
  ],
  exports : [
    SignaturePadComponent,
  ]
})
export class SignaturePadModule { }
