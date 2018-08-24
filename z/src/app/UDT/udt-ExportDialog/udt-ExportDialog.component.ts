import { FormControl, FormGroup } from '@angular/forms';
/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-23 04:27:53
 * @modify date 2018-08-24 01:43:42
 * @desc [description]
*/
// import { ExportHandlerUDTService } from './../../../_shared/services/exportHandlers/exportHandler-UDT.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'udt-ExportDialog',
  templateUrl: './udt-ExportDialog.component.html',
  styleUrls: ['./udt-ExportDialog.component.css']
})

export class UdtExportDialogComponent implements OnInit {
  @Input() objectName: string;
  @Output() evCancelled = new EventEmitter();
  @Output() evExportTrigger = new EventEmitter<number>();

  public formGroup: FormGroup;
  constructor(
    // private _exp: ExportHandlerUDTService,
  ) {
    this.formGroup = new FormGroup({
      devPlatform: new FormControl(),
    });

   }
  ngOnInit() {
  }

  onClickCancel() {
    this.evCancelled.emit();
  }

  /**
   * on clicking one of the export triggers
   */
  onClickExportTrigger(idx: number) {
    if (idx > 0) {
      this.evExportTrigger.emit(idx);
    }
  }

  onDevPlatformChange() {

  }

}
