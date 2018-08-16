import { FormGroup, } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IudtVar } from '../../../_shared/interface/schemaLib.interface';

@Component({
  selector: 'udt-var',
  templateUrl: './udt-var.component.html',
  styleUrls:
  [ './../../../css-glob/_glob.css',
    './udt-var.component.css',
  ]
})
export class UdtVarComponent implements OnInit, OnDestroy {

  @Input() uVarIn: IudtVar;
  @Input() uVarFormGroup: FormGroup;
  @Input() dataTypes: string[];

  /**
   * local form binding variables
   */
   public _uVar: IudtVar;
   public _formGroup: FormGroup;
  constructor(
  ) {


  }

  ngOnInit() {
     // this._uVar = this.uVarIn;
    // this._formGroup = this.uVarFormGroup;
   //   console.log(this.uVarIn.plcTag.memOffset);
  }

  ngOnDestroy() {

  }

}
