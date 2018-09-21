/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-30 11:53:23
 * @modify date 2018-08-30 03:23:01
 * @desc [description]
*/
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrjHomeComponent } from './prj-Home/prj-Home.component';
import { PrjManagerComponent } from './prjManager.component';
import { PrjCreateEditComponent } from './prj-CreateEdit/prj-CreateEdit.component';

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
