import { IProject } from './../../../_shared/interface/IProject.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'prj-ListNode',
  templateUrl: './prj-ListNode.component.html',
  styleUrls: ['./prj-ListNode.component.css']
})
export class PrjListNodeComponent implements OnInit {

  @Input()  viewingObj: IProject;


  constructor() {

   }

  ngOnInit() {
  }

  /**
   * Template binding calls
   */
  get prjName() {
    if (this.viewingObj) {
      return this.viewingObj.prj.prjname;
    }
    return 'undefined..!';
  }

  get index() {
    return this.viewingObj.ident.idx;
  }

  get prjNumber() {
    if (this.viewingObj) {
      return this.viewingObj.prj.prjnumber;
    }
    return 'undefined..!';
  }

  get prod_Name() {
    return this.viewingObj.prj.prod_Name;
  }
  get prod_Type() {
    return this.viewingObj.prj.prod_Type;
  }

} // Class END
