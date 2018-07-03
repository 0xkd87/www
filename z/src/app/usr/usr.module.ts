import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import  { UsrSigninComponent } from './usr-signin/usr-signin.component';
import { UsrSignupComponent } from './usr-signup/usr-signup.component';
import { UsrComponent } from './usr.component';
import { _utils } from '../../_shared/_utils';

const appRoutes = [
    { path : 'usrAth', component: UsrComponent},
    { path : 'usrAth/signin', component: UsrSigninComponent},
    { path : 'usrAth/signup', component: UsrSignupComponent}
 ];

 const usrAuthRoutes: Routes = [
    {
      path: '',
      component: UsrComponent,
      //canActivate: [AuthGuard],
      children: [
        {
          path: '',
          //canActivateChild: [AuthGuard],
          children: [
            { path: 'signin', component: UsrSigninComponent },
            { path: 'signup', component: UsrSignupComponent },
            { path: '', component: UsrSigninComponent }
          ]
        }
      ]
    }
  ];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(usrAuthRoutes)
//        ,
 //       UsrSigninComponent,
//        UsrSignupComponent
    ],
    declarations: [
        UsrComponent,
        UsrSigninComponent,
        UsrSignupComponent
    ],
    exports: [
        UsrComponent,
        UsrSigninComponent,
        UsrSignupComponent,
        RouterModule
    ],
    providers: [
        _utils
    ]
  })
  export class UsrModule { }
