/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-21 12:57:20
 * @modify date 2018-09-21 12:57:20
 * @desc [description]
*/
import { IProject } from './../../../_shared/interface/IProject.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'prj-ListNode',
  templateUrl: './prj-ListNode.component.html',
  styleUrls: ['./prj-ListNode.component.css']
})
export class PrjListNodeComponent implements OnInit {

  @Input()  viewingObj: IProject;

  /**
 * @Outputs
 */
  @Output() evTrigger = new EventEmitter();

  constructor() {

   }

  ngOnInit() {
  }

  /**
   * Template binding calls
   */
  get prjDescription() {
    if (this.viewingObj) {
      return this.viewingObj.prj.description;
    }
    return 'undefined..!';
  }

  get index(): number {
    return this.viewingObj.ident.idx;
  }

  get prjNumber_nonSeq() {
    if (this.viewingObj) {
      return this.viewingObj.prj.prjnumId.substr(0, 6);
    }
  }
  get prjNumber_seq() {
    if (this.viewingObj) {
      return this.viewingObj.prj.prjnumId.substr(6, 4);
    }
  }

  get prod_Name() {
    return this.viewingObj.prj.product_Nickname;
  }
  get prod_Type() {
    return this.viewingObj.prj.product_Type;
  }


  // Event Trigger Handler
  onActionTrigger(_actionCode: number) {
    this.evTrigger.emit({i: this.index, f: _actionCode});
  }
} // Class END
