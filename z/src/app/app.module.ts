import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiNavComponent } from '../ui-nav/ui-nav.component';
import { UiPagecontentComponent } from '../ui-pagecontent/ui-pagecontent.component';

@NgModule({
   declarations: [
      AppComponent,
      UiNavComponent,
      UiPagecontentComponent
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
