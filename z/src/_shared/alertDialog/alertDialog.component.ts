/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-28 01:00:05
 * @modify date 2018-08-28 01:00:05
 * @desc [description]
*/
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'alertDialog',
  templateUrl: './alertDialog.component.html',
  styleUrls: ['./alertDialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  @Input() alertTitle: string;
  @Input() alertDesc: string;
  @Output() evCancelled = new EventEmitter();
  @Output() evConfirmed = new EventEmitter();

  public me: {
    formGroup: FormGroup,
  };
  // @Output() evExportTrigger = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  onClickCancel() {
    this.evCancelled.emit();
  }

  onClickConfirmTrigger() {
    this.evCancelled.emit();
    this.evConfirmed.emit();
  }

}
