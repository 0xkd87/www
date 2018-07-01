import { Component, Input, OnChanges, OnInit, NgModule }       from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page-Login',
  templateUrl: './page-Login.component.html',
  styleUrls: ['./page-Login.component.css']
})
export class PageLoginComponent implements OnInit {

  
  fgLogin: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.fgLogin = this.fb.group({
      _usrId : 'x',
      _pwd : ''
    });
  }

   
  
  get usrId(): any { return this.fgLogin.get('_usrId').value; }

}
