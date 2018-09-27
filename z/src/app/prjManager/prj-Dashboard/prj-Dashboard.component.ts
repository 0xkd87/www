import { NavigationService } from './../../../_shared/services/navigation.service';
import { IProject } from './../../../_shared/interface/IProject.interface';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HostListenerService } from './../../../_shared/services/hostListener.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MsgService } from '../../../_shared/services/msg.service';
import { PrjCrudService } from '../prj-crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'prj-Dashboard',
  templateUrl: './prj-Dashboard.component.html',
  styleUrls: ['./prj-Dashboard.component.css']
})
export class PrjDashboardComponent implements OnInit, OnDestroy {

  private _subscriptions: {
    get: Subscription;
    post: Subscription;
  };

  public editing: {
    prj: IProject;  /**New or editing object to be held */
    idx: number; /**IDX of the editing object -1 as default */
  };


  constructor(
    private _title: Title, // Page Title Serive
    private _msg: MsgService,
    public _hostListner: HostListenerService,
    private route: ActivatedRoute,
    private _goTo: Router,
    private _crud: PrjCrudService,
    private _nav: NavigationService,

  ) {
    this._nav.clearLinks();

    this._subscriptions = {
      get: new Subscription,
      post: new Subscription
    };

    // Initialize the editing struct
    this.editing = {
      prj: new IProject(),
      idx: -1, // initialize to default
    };

      /**
       * check router paramenters; if the desired argument exists?
       */
      this.route.paramMap.forEach(
        p =>  {
              //  console.log(p);

          if (p.has('idx'))  {
            /**found it..! This is the edit operation */
            this.editing.idx = +p.get('idx');
          }
        }
      );

    this.editing.prj = this._crud.searchFor(this.editing.idx);
  }

  ngOnInit() {
        // Navigation set
        this._nav.clearLinks();
        this._nav.navHeaderText = this.editing.prj.prj.prjnumId;
        this._nav.addNavLink('Project Library', '/libMngr/udt', '', 'rgb(255, 251, 0)');


        this._nav.addNavLink('Addresses', '/libMngr/udt', '', 'rgb(255, 251, 0)');
        this._nav.addNavLink('Team', '/usrAuth/signin');

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
  // if (this._subscriptions.get) {
  //     this._subscriptions.get.unsubscribe();
  // }
  // if (this._subscriptions.post) {
  //   this._subscriptions.post.unsubscribe();
  // }
}

crossNavigate() {
  const navigationExtras: NavigationExtras = {
    // queryParams: {
    //     'firstname': 'x',
    //     'lastname': 'y'
    // },
};
this._goTo.navigate(['/libMngr/prj/udt/createUDT'], navigationExtras);
}

}
