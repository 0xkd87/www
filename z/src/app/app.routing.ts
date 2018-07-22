import { UsrRoutes } from './usr/usr.routing';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PageNotfoundComponent } from '../_shared/page-Notfound/page-Notfound.component';
import { UsrModule } from './usr/usr.module';
import { LibMngrComponent } from './libMngr/libMngr.component';

const _appRoutes: Routes = [
  {
      path: 'usrAuth',
      loadChildren: './usr/usr.module#UsrModule'
  },
  {
    path: 'libMngr',
    loadChildren: './libMngr/libMngr.module#LibMngrModule'
  },
 {
     path : '',
     redirectTo: '/usrAuth',
     pathMatch: 'full'
  },
 {
     path : '**',
     component: PageNotfoundComponent
  }
];

 @NgModule({
  imports: [
    RouterModule.forRoot(_appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
 export class AppRoutes {}
// export const  AppRoutes = RouterModule.forRoot(_appRoutes);
