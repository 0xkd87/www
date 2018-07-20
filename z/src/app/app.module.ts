import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UiNavComponent } from '../ui-nav/ui-nav.component';
import { PageNotfoundComponent } from '../_shared/page-Notfound/page-Notfound.component';
import { UsrModule } from './usr/usr.module';
import { LibMngrModule } from './libMngr/libMngr.module';
import { LibMngrComponent } from './libMngr/libMngr.component';

import {AppRoutes} from './app.routing';
import { MsgBoardComponent } from '../_shared/msgBoard/msgBoard.component';

@NgModule({
   declarations: [
      AppComponent,
      UiNavComponent,
      PageNotfoundComponent,
      //MsgBoardComponent
 //     LibMngrComponent
    ],
   imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      LibMngrModule,
      UsrModule,
      AppRoutes
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
