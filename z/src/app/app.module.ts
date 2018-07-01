import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { AppComponent } from './app.component';
import { UiNavComponent } from '../ui-nav/ui-nav.component';
import { UiUserinfo1Component } from '../ui-userinfo1/ui-userinfo1.component';
//import { PageLoginComponent } from '../_shared/page/page-Login/page-Login.component';
import { PageLoginModule } from '../_shared/page/page-Login/page-Login.module';

@NgModule({
   declarations: [
      AppComponent,
      UiNavComponent,
      UiUserinfo1Component
     // PageLoginComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule, // <-- #2 add to @NgModule imports
      PageLoginModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
