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
    AlertDialogComponent,
    UiNavComponent,

  ],
  exports: [
    LibFormActionTriggerComponent,
    LibFormInputComboComponent,
    LibFormInputTextComponent,
    LibFormSwitchComponent,
    AlertDialogComponent,
    UiNavComponent,
  ],

})
export class SharedElementsModule { }
