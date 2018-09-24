import { IProject } from './../../../_shared/interface/IProject.interface';
import { ActivatedRoute, Router } from '@angular/router';
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
  ) {

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
               console.log(p);

          if (p.has('idx'))  {
            /**found it..! This is the edit operation */
            this.editing.idx = +p.get('idx');
          }
        }
      );

    this.editing.prj = this._crud.searchFor(this.editing.idx);
  }

  ngOnInit() {
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
}
