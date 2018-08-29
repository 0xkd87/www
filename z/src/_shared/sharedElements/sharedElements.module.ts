import { LibFormSwitchComponent } from './../libForm-Switch/libForm-Switch.component';
import { AlertDialogComponent } from './../alertDialog/alertDialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LibFormActionTriggerComponent } from './../libForm-ActionTrigger/libForm-ActionTrigger.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibFormInputComboComponent } from '../libForm-InputCombo/libForm-InputCombo.component';
import { LibFormInputTextComponent } from '../libForm-InputText/libForm-InputText.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LibFormActionTriggerComponent,
    LibFormInputComboComponent,
    LibFormInputTextComponent,
    LibFormSwitchComponent,
    AlertDialogComponent,

  ],
  exports: [
    LibFormActionTriggerComponent,
    LibFormInputComboComponent,
    LibFormInputTextComponent,
    LibFormSwitchComponent,
    AlertDialogComponent,
  ],

})
export class SharedElementsModule { }
