import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { CommonModule } from '@angular/common';

import  { UsrSigninComponent } from './usr-signin/usr-signin.component';
import { UsrSignupComponent } from './usr-signup/usr-signup.component';
import { UsrComponent } from './usr.component';
import { _utils } from '../../_shared/_utils';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
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
        UsrSignupComponent
    ],
    providers: [
        _utils
    ]
  })
  export class UsrModule { }
