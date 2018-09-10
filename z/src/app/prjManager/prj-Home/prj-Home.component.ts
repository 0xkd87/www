import { MsgService } from './../../../_shared/services/msg.service';
import { Subscription } from 'rxjs';
import { IProject } from './../../../_shared/interface/IProject.interface';
/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-10 03:12:25
 * @modify date 2018-09-10 03:12:25
 * @desc [description]
*/
import { PrjCrudService } from './../prj-crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prj-Home',
  templateUrl: './prj-Home.component.html',
  styleUrls: ['./prj-Home.component.css']
})
export class PrjHomeComponent implements OnInit {

  /**
   * Memebers for functional use of this component
   */
  _subscriptionGet: Subscription;
  _subscriptionPost: Subscription;
  constructor(
    private _crud: PrjCrudService,
    private _msg: MsgService,

  ) { }

  ngOnInit() {
    this.r();
  }


  /**
  * Getters for lists
  */

  get prjArr(): IProject[] {
    return this._crud.li_prj;
  }
  get prjNumArr() {
    return this._crud.li_prjNum;
  }

  get prjNameArr() {
    return this._crud.li_prjName;
  }
  r() {
    this._crud._r();
  }

  c() {
    const _newObj =  new IProject();
    _newObj.rev.update(true, false, false);
    this._subscriptionPost = this._crud._c(_newObj)
    .subscribe(
      (_obj: IProject) => {

        const p = new IProject(_obj);
        console.log(p);
        this._msg.add('Project: ' + p.prj.prjname + ' Added Successfully..!');
      },
      (_err) => {

      },
      () => {
        this.r();
      }
    );
  }
  x() {

  }
}
