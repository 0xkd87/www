import { LibContextMenuComponent } from './../lib-ContextMenu/lib-ContextMenu.component';
import { LibMngrModule } from './../../app/libMngr/libMngr.module';
import { LibFormSwitchComponent } from './../libForm-Switch/libForm-Switch.component';
import { AlertDialogComponent } from './../alertDialog/alertDialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LibFormActionTriggerComponent } from './../libForm-ActionTrigger/libForm-ActionTrigger.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibFormInputComboComponent } from '../libForm-InputCombo/libForm-InputCombo.component';
import { LibFormInputTextComponent } from '../libForm-InputText/libForm-InputText.component';
import { UiNavComponent } from '../ui-nav/ui-nav.component';
import { Routes, RouterModule } from '@angular/router';
import { MsgBoardComponent } from '../msgBoard/msgBoard.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // for ui-navigation..!

  ],
  declarations: [
    LibFormActionTriggerComponent,
    LibFormInputComboComponent,
    LibFormInputTextComponent,
    LibFormSwitchComponent,
    LibContextMenuComponent,
    AlertDialogComponent,
    UiNavComponent,
    MsgBoardComponent,

  ],
  exports: [
    LibFormActionTriggerComponent,
    LibFormInputComboComponent,
    LibFormInputTextComponent,
    LibFormSwitchComponent,
    LibContextMenuComponent,

    AlertDialogComponent,
    UiNavComponent,

    MsgBoardComponent,

  ],

})
export class SharedElementsModule { }
