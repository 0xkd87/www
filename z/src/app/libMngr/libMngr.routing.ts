import { UdtCreateComponent } from './../UDT/udtCreate/udtCreate.component';
import { NgModule } from '@angular/core';

import { LibMngrComponent } from './libMngr.component';
import { Routes, RouterModule } from '@angular/router';
import { UdtComponent } from '../UDT/udt/udt.component';

const routes: Routes = [
  {
    path: 'libMngr',
    component: LibMngrComponent,
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'udt', component: UdtComponent },
          { path: 'udt/createUDT', component: UdtCreateComponent },
          { path: '**',  redirectTo: 'udt', pathMatch: 'full' }
        ]
      }
    ]
  },
/*   {
    path: '',
    redirectTo: 'libMngr/udt',
    pathMatch: 'full'
  } */
];

@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class LibMngrRoutes {}
