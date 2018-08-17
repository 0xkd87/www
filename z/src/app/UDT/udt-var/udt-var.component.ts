import { FormGroup, } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
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

  @Output() dataTypeChangeTrigger = new EventEmitter();

  /**
   * local form binding variables
   */

 /*   public _uVar: IudtVar;
   public _formGroup: FormGroup; */
  constructor(
  ) {


  }

  ngOnInit() {

  // this.onDataTypeChanged();

  }

  ngOnDestroy() {

  }

  onDataTypeChanged() {
    // console.log('emitted in udt-var');
    this.dataTypeChangeTrigger.emit();
    this.dataTypeChangeTrigger.complete();
  }





}
