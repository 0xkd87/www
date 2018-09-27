
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotfoundComponent } from '../_shared/page-Notfound/page-Notfound.component';

const _appRoutes: Routes = [
  // User login-authetication
  {
      path: 'usrAuth',
      loadChildren: './usr/usr.module#UsrModule'
  },

  // Lazy load Projects & its children
  {
    path: 'prjManager',
    loadChildren: './prjManager/prjManager.module#PrjManagerModule'
  },

  // Lazy load Library & its children
  {
    path: 'libMngr',
    loadChildren: './libMngr/libMngr.module#LibMngrModule'
  },

  // Redirect orphan paths to login
 {
     path : '',
     redirectTo: '/usrAuth',
     pathMatch: 'full'
  },

  // 404: if nothing matches above, show not found page..! - must be last
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
