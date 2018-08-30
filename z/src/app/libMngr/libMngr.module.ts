
import { UdtCreateComponent } from '../UDT/udtCreate/udtCreate.component';
import { UdtComponent } from '../UDT/udt/udt.component';
import { LibMngrRoutes } from './libMngr.routing';
import { _utils } from '../../_shared/_utils';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { Title } from '@angular/platform-browser';

import { LibMngrComponent } from './libMngr.component';
import { MsgBoardComponent } from '../../_shared/msgBoard/msgBoard.component';
import { UdtListComponent } from '../UDT/udt-list/udt-list.component';
import { UdtVarComponent } from '../UDT/udt-var/udt-var.component';
import { SharedElementsModule } from '../../_shared/sharedElements/sharedElements.module';
import { UdtExportDialogComponent } from '../UDT/udt-ExportDialog/udt-ExportDialog.component';
import { UiNavComponent } from '../../_shared/ui-nav/ui-nav.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibMngrRoutes,
    SharedElementsModule,
  ],
  declarations: [
    LibMngrComponent,
    UdtComponent,
    UdtListComponent,
    UdtCreateComponent,
    UdtVarComponent,
    UdtExportDialogComponent,
    MsgBoardComponent,
    // UiNavComponent,
    // LibFormInputTextComponent,
    // LibFormInputComboComponent,
    // LibFormActionTriggerComponent,
  ],
  exports: [
    LibMngrComponent,
    UdtListComponent,
    UdtComponent,
    UdtCreateComponent,
    UdtVarComponent,
    UdtExportDialogComponent,
],
providers: [
  _utils,
  Title,
]
})
export class LibMngrModule { }
