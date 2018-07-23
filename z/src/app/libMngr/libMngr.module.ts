import { UiNavComponent } from './../../_shared/ui-nav/ui-nav.component';
import { UdtComponent } from './../UDT/udt/udt.component';
import { LibMngrRoutes } from './libMngr.routing';
import { _utils } from '../../_shared/_utils';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { Title } from '@angular/platform-browser';

import { LibMngrComponent } from './libMngr.component';
import { MsgBoardComponent } from '../../_shared/msgBoard/msgBoard.component';
import { UdtListComponent } from '../UDT/udt-list/udt-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibMngrRoutes
  ],
  declarations: [
    LibMngrComponent,
    UdtComponent,
    UdtListComponent,
    MsgBoardComponent,
    UiNavComponent
  ],
  exports: [
    LibMngrComponent,
    UdtListComponent,
    UdtComponent

],
providers: [
  _utils,
  Title,
]
})
export class LibMngrModule { }
