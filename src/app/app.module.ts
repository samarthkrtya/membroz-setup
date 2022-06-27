import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';
import { SetupComponent } from './setup/setup.component';
import { BussinessDetailsPageComponent } from './setup/components/bussiness-details-page/bussiness-details-page.component';
import { BussinessTypePageComponent } from './setup/components/bussiness-type-page/bussiness-type-page.component';
import { MembershipPackagePageComponent } from './setup/components/membership-package-page/membership-package-page.component';
import { ProductServiceFacilityPageComponent } from './setup/components/product-service-facility-page/product-service-facility-page.component';
import { ReviewPageComponent } from './setup/components/review-page/review-page.component';
import { StaffsPageComponent } from './setup/components/staffs-page/staffs-page.component';

import { routing } from './app.routing';

import { FileUploadModule } from 'ng2-file-upload';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';

import { config } from './config';


const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
    imports:      [
      CommonModule,
      BrowserAnimationsModule,
      FormsModule,
      routing,
      HttpClientModule,
      AppMaterialModule,
      FileUploadModule,
      CloudinaryModule.forRoot(cloudinaryLib, config),
      ReactiveFormsModule
    ],
    declarations: [
      AppComponent,
      SetupComponent,
      BussinessDetailsPageComponent,
      BussinessTypePageComponent,
      MembershipPackagePageComponent,
      ProductServiceFacilityPageComponent,
      ReviewPageComponent,
      StaffsPageComponent,
    ],
    exports:[
      BussinessDetailsPageComponent,
      BussinessTypePageComponent,
      MembershipPackagePageComponent,
      ProductServiceFacilityPageComponent,
      ReviewPageComponent,
      StaffsPageComponent,
    ],
    providers : [
      
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
