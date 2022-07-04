import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedRoutingModule } from './shared-routing.module';

import { AppMaterialModule } from '../app-material/app-material.module';
import { MyCurrencyPipe } from './components/currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    
  ],
  declarations: [
    MyCurrencyPipe,
  ],
  exports : [
    AppMaterialModule,
    ReactiveFormsModule,
    MyCurrencyPipe,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders <SharedModule>{
    return {
      ngModule: SharedModule,
    };
  }
}
