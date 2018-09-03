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

  // is this the last member in the array? : Parent is aware of this info, this element isn't
  // This will be useful to enable/Disable Promote/demote triggers containing within
  // (e.g: Promote trigger should be disabled when this is the last element)
  @Input() isLastArrElement: boolean;

  @Output() dataTypeChangeTrigger = new EventEmitter();


  // Event triggers
  @Output() evTriggerDelVar_ = new EventEmitter<number>(); // Delete This Var
  @Output() evTriggerPromote_ = new EventEmitter<number>(); // Promote Index (move up; i++)
  @Output() evTriggerDemote_ = new EventEmitter<number>(); // Demote Index (Move Down; i--)

  /**
   * local form binding variables
   */

 /*   public _uVar: IudtVar;
   public _formGroup: FormGroup; */

   public visible: {
    deleteConfirmationDialog: boolean;
  };
  constructor(
  ) {
      // Visibility controllers
      this.visible = {
        deleteConfirmationDialog: false
      };

  }

  ngOnInit() {

  // this.onDataTypeChanged();

  }

  ngOnDestroy() {

  }

  get isFirstArrElement(): boolean {
    return ((this.uVarIn.ident.innerIdx <= 1) ? true : false);
  }

  // Tiggering Callbacks
  onDataTypeChanged() {
    // console.log('emitted in udt-var');
    this.dataTypeChangeTrigger.emit();
    this.dataTypeChangeTrigger.complete();
  }

  onEvDelete() {
    this.evTriggerDelVar_.emit(this.uVarIn.ident.innerIdx);
  }
  onEvPromote() {
    this.evTriggerPromote_.emit(this.uVarIn.ident.innerIdx);


  }
  onEvDemote() {
    this.evTriggerDemote_.emit(this.uVarIn.ident.innerIdx);

  }





}
