import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { AppComponent } from './app.component';
import { UiNavComponent } from '../ui-nav/ui-nav.component';
import { PageLoginModule } from '../_shared/page/page-Login/page-Login.module';
import { UsrModule } from './usr/usr.module';


@NgModule({
   declarations: [
      AppComponent,
      UiNavComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      UsrModule,
      PageLoginModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
