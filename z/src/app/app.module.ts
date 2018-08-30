import { SharedElementsModule } from './../_shared/sharedElements/sharedElements.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageNotfoundComponent } from '../_shared/page-Notfound/page-Notfound.component';
import { UsrModule } from './usr/usr.module';
import { LibMngrModule } from './libMngr/libMngr.module';

import {AppRoutes} from './app.routing';
import { PrjManagerModule } from './prjManager/prjManager.module';
import { UiNavComponent } from '../_shared/ui-nav/ui-nav.component';

@NgModule({
   declarations: [
      AppComponent,
      PageNotfoundComponent,
      // UiNavComponent,

   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
       // SharedElementsModule,
      PrjManagerModule,
      LibMngrModule,
      UsrModule,
      AppRoutes,

   ],
   exports: [
      // SharedElementsModule,
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
