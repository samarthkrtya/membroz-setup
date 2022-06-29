import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberSetupRoutingModule } from './member-setup-routing.module';
import { MemberSetupComponent } from './member-setup.component'; 
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackagesComponent } from './components/packages/packages.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ParqFormComponent } from './components/parq-form/parq-form.component';
import { SafeHtmlPipe } from './safehtml.pipe';
import { CreditCardDetailsComponent } from './components/credit-card-details/credit-card-details.component';
 

@NgModule({
  declarations: [
    MemberSetupComponent,
    MemberProfileComponent,
    PackagesComponent,
    PersonalDetailsComponent,
    ParqFormComponent,
    CreditCardDetailsComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MemberSetupRoutingModule, 
  ]
})
export class MemberSetupModule { }
