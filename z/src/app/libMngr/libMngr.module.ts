import { _utils } from '../../_shared/_utils';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';

import { LibMngrComponent } from './libMngr.component';
import { MsgService } from '../../_shared/services/msg.service';
import { MsgBoardComponent } from '../../_shared/msgBoard/msgBoard.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LibMngrComponent,
    MsgBoardComponent
  ],
  exports: [
    LibMngrComponent,
    MsgBoardComponent
],
providers: [
  _utils,
  Title,
  MsgService
]
})
export class LibMngrModule { }
