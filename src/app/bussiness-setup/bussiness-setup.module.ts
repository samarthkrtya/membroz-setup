import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './bussiness-setup-routing';
import { BussinessSetupComponent } from './bussiness-setup.component';
import { BussinessDetailsPageComponent } from './components/bussiness-details-page/bussiness-details-page.component';
import { BussinessTypePageComponent } from './components/bussiness-type-page/bussiness-type-page.component';
import { ProductServiceFacilityPageComponent } from './components/product-service-facility-page/product-service-facility-page.component';
import { MembershipPackagePageComponent } from './components/membership-package-page/membership-package-page.component';
import { BussinessStaffsPageComponent } from './components/bussiness-staffs-page/bussiness-staffs-page.component';
import { BussinessReviewPageComponent } from './components/bussiness-review-page/bussiness-review-page.component';

import { AppMaterialModule } from '../app-material/app-material.module';

import { FileUploadModule } from 'ng2-file-upload';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { config } from '../config';


const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  imports: [
    CommonModule,
    routing,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinaryLib, config),
  ],
  declarations: [
    BussinessSetupComponent,
    BussinessDetailsPageComponent,
    BussinessTypePageComponent,
    ProductServiceFacilityPageComponent,
    MembershipPackagePageComponent,
    BussinessStaffsPageComponent,
    BussinessReviewPageComponent,
  ],
  exports: [
    BussinessDetailsPageComponent,
    BussinessTypePageComponent,
    ProductServiceFacilityPageComponent,
    MembershipPackagePageComponent,
    BussinessStaffsPageComponent,
    BussinessReviewPageComponent,
  ],
  providers: [
  ]
})
export class BussinessSetupModule { }
