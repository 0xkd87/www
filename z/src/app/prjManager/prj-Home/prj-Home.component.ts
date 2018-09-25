
/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-10 03:12:25
 * @modify date 2018-09-25 12:47:57
 * @desc [description]
*/
import { PrjCrudService } from './../prj-crud.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from './../../../_shared/services/navigation.service';
import { Router } from '@angular/router';
import { MsgService } from './../../../_shared/services/msg.service';
import { Subscription } from 'rxjs';
import { IProject } from './../../../_shared/interface/IProject.interface';

@Component({
  selector: 'prj-Home',
  templateUrl: './prj-Home.component.html',
  styleUrls: ['./prj-Home.component.css']
})
export class PrjHomeComponent implements OnInit, OnDestroy {

  /**
   * Memebers for functional use of this component
   */
  private _subscriptions: {
    get: Subscription;
    post: Subscription;
  };
  constructor(
    private _crud: PrjCrudService,
    private _msg: MsgService,
    private _goTo: Router,
    private _nav: NavigationService,


  ) {
    this._subscriptions = {
      get: new Subscription,
      post: new Subscription
    };
   }

  ngOnInit() {

        // Navigation set
        this._nav.clearLinks();
        this._nav.addNavLink('Library UDT', '/libMngr/udt', '', 'rgb(255, 251, 0)');
        this._nav.addNavLink('Log-In', '/usrAuth/signin');


    this.r();


  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
  if (this._subscriptions.get) {
      this._subscriptions.get.unsubscribe();
  }
  if (this._subscriptions.post) {
    this._subscriptions.post.unsubscribe();
  }
}

navigateTo(path: string) {
  this._goTo.navigateByUrl(path);
}

  /**
  * Getters for lists
  */

  get prjArr(): IProject[] {
    return this._crud.li_prj;
  }

  // not a good idea...
  prjArr_Filtered(): IProject[] {
    let li_prj: IProject[] = [];
    this._crud.li_prj.forEach((p, i, arr) => {
      if (p.ident.idx > 20) {
        li_prj.push(p);
      }
    });
    return li_prj;
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
    this._subscriptions.post = this._crud._c(_newObj)
    .subscribe(
      (_obj: IProject) => {

        const p = new IProject(_obj);
        console.log(p);
        this._msg.add('Project: ' + p.prj.description + ' Added Successfully..!');
      },
      (_err) => {

      },
      () => {
        this.r();
      }
    );
  }



  evTriggerHandler(_ev: any) {
    // console.log(_ev);
    const i: number = _ev['i'];
    switch (_ev['f']) {
      case 1:
        this.navigateTo('/prjManager/prjPropEdit/' + i);
        break;

        case 10:
        this.navigateTo('/prjManager/prjDashboard/' + i);
        break;

      default:
        break;
    }
  }
  x() {

  }
} // class END

// routerLink = "/libMngr/udt/editUDT/+{{udtNode.ident.idx}}"
// routerLinkActive="active"
