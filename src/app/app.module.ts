import { Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material/app-material.module';
import { AppInjector } from './app-injector.service';
import { AppComponent } from './app.component';

import { Configuration } from './app.constants';

import { routing } from './app.routing';
@NgModule({
    imports:      [
      CommonModule,
      BrowserAnimationsModule,
      FormsModule,
      routing,
      HttpClientModule,
      AppMaterialModule,
      
      ReactiveFormsModule
    ],
    declarations: [
      AppComponent,
    ],
    exports:[
    ],
    providers : [
      Configuration
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { 
  constructor(injector:Injector){
    // Store module's injector in the AppInjector class
    // //console.log('Expected #1: storing app injector');
    AppInjector.setInjector(injector);
    }
}
