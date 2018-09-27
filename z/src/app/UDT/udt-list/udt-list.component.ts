import { IUdt } from '../../../_shared/interface/schemaLib.interface';
import { Component, OnInit, OnDestroy, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-udt-list',
  templateUrl: './udt-list.component.html',
  styleUrls:
  [
    './../../../css-glob/_glob.css',
    './udt-list.component.css'
  ],
  providers: []

})
export class UdtListComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  udtIn: IUdt;

    /**
 * @Outputs
 */
@Output() evTrigger = new EventEmitter();

  udtNode: IUdt;
  isControlVisible: boolean;

  constructor() {
  }

  ngOnInit() {
    // this.isControlVisible = false;
    this.udtNode = this.udtIn;
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
    // this.refreshBlockSize();
  }

  get refreshBlockSize() {
    return this.udtIn.plcTag.memAddr.length;
  }

    // Event Trigger Handler
    onActionTrigger(_actionCode: number) {
      this.evTrigger.emit({ // pass on parameters with emit
        i: this.udtIn.ident.idx, // object index
        fx: _actionCode, // Triggered action code
        src: 'lib'
      });
    }

}
