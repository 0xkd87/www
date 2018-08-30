import { PrjHomeComponent } from './prj-Home/prj-Home.component';
import { Title } from '@angular/platform-browser';
import { SharedElementsModule } from './../../_shared/sharedElements/sharedElements.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrjManagerComponent } from './prjManager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrjManagerRoutes } from './prjManager.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedElementsModule,
    PrjManagerRoutes,

  ],
  declarations: [
    PrjManagerComponent,
    PrjHomeComponent,

  ],
  exports: [
    PrjManagerComponent,
    PrjHomeComponent,

  ],
  providers: [
    Title,
  ]
})
export class PrjManagerModule { }
