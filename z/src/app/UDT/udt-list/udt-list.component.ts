import { IUdt } from './../../../_shared/interface/schemaLib.interface';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';


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
export class UdtListComponent implements OnInit, OnDestroy {

  @Input()
  udtIn: IUdt;

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

}
