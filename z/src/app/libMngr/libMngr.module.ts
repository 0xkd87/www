import { LibFormInputComboComponent } from '../../_shared/libForm-InputCombo/libForm-InputCombo.component';
import { LibFormInputTextComponent } from '../../_shared/libForm-InputText/libForm-InputText.component';
import { UdtCreateComponent } from '../UDT/udtCreate/udtCreate.component';
import { UiNavComponent } from '../../_shared/ui-nav/ui-nav.component';
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
import { TooltipComponent } from '../../_shared/tooltip/tooltip.component';
import { UdtVarComponent } from '../UDT/udt-var/udt-var.component';

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
    UdtCreateComponent,
    UdtVarComponent,
    MsgBoardComponent,
    UiNavComponent,
    TooltipComponent,
    LibFormInputTextComponent,
    LibFormInputComboComponent
  ],
  exports: [
    LibMngrComponent,
    UdtListComponent,
    UdtComponent,
    UdtCreateComponent,
    UdtVarComponent,

],
providers: [
  _utils,
  Title,
]
})
export class LibMngrModule { }
