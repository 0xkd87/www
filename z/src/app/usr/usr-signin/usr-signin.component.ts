import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _utils } from '../../../_shared/_utils';

@Component({
  selector: 'usr-signin',
  templateUrl: './usr-signin.component.html',
  styleUrls: [
    './usr-signin.component.css',
    '../usr.component.css']
})
export class UsrSigninComponent implements OnInit {


  public _formGrp: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _utils: _utils
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this._formGrp = this._fb.group(
      {
        _usrId : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
        _pwd : ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])]
      }
  );
  }



  get usrId(): any { return this._formGrp.get('_usrId').value; }
  get pwd(): string { return this._utils.getSHA1( this._formGrp.get('_pwd').value); }

}
