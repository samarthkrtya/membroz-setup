import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';

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
      
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
