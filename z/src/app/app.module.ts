import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { UiNavComponent } from '../ui-nav/ui-nav.component';
import { PageNotfoundComponent } from '../_shared/page-Notfound/page-Notfound.component';
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
       component: PageNotfoundComponent
    }
];

@NgModule({
   declarations: [
      AppComponent,
      UiNavComponent,
      PageNotfoundComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      UsrModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
