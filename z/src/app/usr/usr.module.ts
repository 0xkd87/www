import { HttpTxRxService } from './../../_shared/services/http-TxRx.service';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsrSigninComponent } from './usr-signin/usr-signin.component';
import { UsrSignupComponent } from './usr-signup/usr-signup.component';
import { UsrComponent } from './usr.component';
import { _utils } from '../../_shared/_utils';
import { UsrRoutes } from './usr.routing';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsrRoutes
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
        _utils,
        HttpTxRxService
    ]
  })
  export class UsrModule { }
