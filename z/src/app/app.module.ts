import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiNavComponent } from '../ui-nav/ui-nav.component';
import { UiUserinfo1Component } from '../ui-userinfo1/ui-userinfo1.component';

@NgModule({
   declarations: [
      AppComponent,
      UiNavComponent,
      UiUserinfo1Component
   ],
   imports: [
      BrowserModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
