import { Component, OnInit, NgModule } from '@angular/core';
import  { UsrSigninComponent } from './usr-signin/usr-signin.component';
import { UsrSignupComponent } from './usr-signup/usr-signup.component';

@Component({
  selector: 'app-usr',
  templateUrl: './usr.component.html',
  styleUrls: ['./usr.component.css']
})


export class UsrComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
