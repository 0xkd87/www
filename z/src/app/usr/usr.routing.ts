import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsrSigninComponent } from './usr-signin/usr-signin.component';
import { UsrSignupComponent } from './usr-signup/usr-signup.component';
import { UsrComponent } from './usr.component';



const _usrAuthRoutes: Routes = [
  {
    path: 'usrAuth',
    component: UsrComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'signin', component: UsrSigninComponent },
          { path: 'signup', component: UsrSignupComponent },
          { path: '**',  redirectTo: 'signin', pathMatch: 'full' }
        ]
      }
    ]
  } ,
  {
    path: '',
    redirectTo: 'usrAuth/signin',
    pathMatch: 'full'
  }
];
  @NgModule({
  imports: [
   RouterModule.forChild(_usrAuthRoutes)
  ],
  exports: [
    RouterModule
  ]
})
// export const UsrRoutes = RouterModule.forChild(_usrAuthRoutes);
 export class UsrRoutes {}
