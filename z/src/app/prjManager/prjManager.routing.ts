/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-30 11:53:23
 * @modify date 2018-09-24 14:36:19
 * @desc [description]
*/
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrjHomeComponent } from './prj-Home/prj-Home.component';
import { PrjManagerComponent } from './prjManager.component';
import { PrjCreateEditComponent } from './prj-CreateEdit/prj-CreateEdit.component';
import { PrjDashboardComponent } from './prj-Dashboard/prj-Dashboard.component';

const routes: Routes = [
  {
  path: 'prjManager',
  component: PrjManagerComponent,
  children: [
    {
      path: '',
      // canActivateChild: [AuthGuard],
      children: [
        { path: 'prjHome', component: PrjHomeComponent },
        { path: 'prjCreate', component: PrjCreateEditComponent },
        { path: 'prjPropEdit/:idx', component: PrjCreateEditComponent },
        { path: 'prjDashboard/:idx', component: PrjDashboardComponent },
        { path: '**',  redirectTo: 'prjHome', pathMatch: 'full' }
      ]
    }
  ]
},
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
     RouterModule
  ]
})
export class PrjManagerRoutes {}
