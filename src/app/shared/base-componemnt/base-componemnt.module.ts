import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseComponemntRoutes } from './base-componemnt-routing';
import { BaseComponemntComponent } from './base-componemnt.component';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(BaseComponemntRoutes),
  ],
  declarations: [
    BaseComponemntComponent
  ],
  exports:[
    BaseComponemntComponent
  ]
})
export class BaseComponemntModule { }
