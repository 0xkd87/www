import { _utils } from './../../_shared/_utils';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';

import { LibMngrComponent } from './libMngr.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LibMngrComponent
  ],
  exports: [
    LibMngrComponent
],
providers: [
  _utils,
  Title
]
})
export class LibMngrModule { }
