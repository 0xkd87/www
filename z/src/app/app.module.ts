import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import {RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { UiNavComponent } from '../ui-nav/ui-nav.component';
import { PageLoginModule } from '../_shared/page/page-Login/page-Login.module';
import { UsrModule } from './usr/usr.module';

const appRoutes = [
    {
        path: 'usrAuth', 
        loadChildren: '../app/usr/usr.module#UsrModule'
    },
   { 
       path : '', 
       redirectTo: '/usrAth', 
       pathMatch: 'full'
    },
   { 
       path : '**', 
       component: UiNavComponent
    }
];

@NgModule({
   declarations: [
      AppComponent,
      UiNavComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      UsrModule,
      PageLoginModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
