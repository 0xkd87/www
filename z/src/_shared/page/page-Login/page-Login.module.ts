import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { CommonModule } from '@angular/common';
import { PageLoginComponent } from './page-Login.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule // <-- #2 add to @NgModule imports


  ],
  declarations: [PageLoginComponent],
  exports: [
    PageLoginComponent
  ]
})
export class PageLoginModule { }
