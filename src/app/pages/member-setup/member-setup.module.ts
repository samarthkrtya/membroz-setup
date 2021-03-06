import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberSetupRoutingModule } from './member-setup-routing.module';
import { MemberSetupComponent } from './member-setup.component'; 
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackagesComponent } from './components/packages/packages.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ParqFormComponent } from './components/parq-form/parq-form.component';
import { SafeHtmlPipe } from '../../shared/components/safehtml.pipe';
import { CreditCardDetailsComponent } from './components/credit-card-details/credit-card-details.component';
import { CurrencyPipe } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { config } from '../../config';
import { SignaturePadModule } from '../../shared/signature-pad/signature-pad.module';
import { ReviewDetailsComponent } from './components/review-details/review-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  declarations: [
    MemberSetupComponent,
    MemberProfileComponent,
    PackagesComponent,
    PersonalDetailsComponent,
    ParqFormComponent,
    CreditCardDetailsComponent,
    SafeHtmlPipe, 
    ReviewDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MemberSetupRoutingModule, 
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinaryLib, config),
    SignaturePadModule,
    SharedModule,
  ],
  providers :[
    CurrencyPipe
  ]
})
export class MemberSetupModule { }
