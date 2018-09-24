import { PrjListNodeComponent } from './prj-ListNode/prj-ListNode.component';
/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-17 08:59:40
 * @modify date 2018-09-17 08:59:40
 * @desc [description]
*/
import { PrjCreateEditComponent } from './prj-CreateEdit/prj-CreateEdit.component';
import { PrjHomeComponent } from './prj-Home/prj-Home.component';
import { Title } from '@angular/platform-browser';
import { SharedElementsModule } from './../../_shared/sharedElements/sharedElements.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrjManagerComponent } from './prjManager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrjManagerRoutes } from './prjManager.routing';
import { PrjDashboardComponent } from './prj-Dashboard/prj-Dashboard.component';

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
    PrjCreateEditComponent,
    PrjListNodeComponent,
    PrjDashboardComponent,

  ],
  exports: [
    PrjManagerComponent,
    PrjHomeComponent,
    PrjCreateEditComponent,
    PrjListNodeComponent,
    PrjDashboardComponent,


  ],
  providers: [
    Title,
  ]
})
export class PrjManagerModule { }
