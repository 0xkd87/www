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
      return this.viewingObj.prj.description;
    }
    return 'undefined..!';
  }

  get index() {
    return this.viewingObj.ident.idx;
  }

  get prjNumber() {
    if (this.viewingObj) {
      return this.viewingObj.prj.prjnumId;
    }
    return 'undefined..!';
  }

  get prod_Name() {
    return this.viewingObj.prj.product_Nickname;
  }
  get prod_Type() {
    return this.viewingObj.prj.product_Type;
  }

} // Class END
