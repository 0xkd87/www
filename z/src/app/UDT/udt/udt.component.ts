import { LibUDTService } from './../libUDT.service';
import { HostListenerService } from './../../../_shared/services/hostListener.service';
import { HttpTxRxService } from './../../../_shared/services/http-TxRx.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { isArray } from 'util';

import { Subscription } from 'rxjs';
import { IUdt, CONST_OBJTYPE} from '../../../_shared/interface/schemaLib.interface';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

const url = {
  addUDT: 'http://emis000695/_c/__api/post/post.udt.add.php',
  getListUDT: 'http://emis000695/_c/__api/get/get.udt.list.php'
};

@Component({
  selector: 'app-udt',
  templateUrl: './udt.component.html',
  styleUrls:
  [
    './../../../css-glob/_glob.css',
    './udt.component.css',
],
providers: [
//  LibUDTService
]
})
export class UdtComponent implements OnInit, OnDestroy {

  showAddDialog: boolean;
  public formGrp: FormGroup;
  public newUDT: IUdt;

  _rxArr: IUdt[] = [];
  _subscriptionPost: Subscription;
  _subscriptionGet: Subscription;

  constructor(
    private _title: Title, // Page Title Serive
    private _httpServ: HttpTxRxService,
    public _hostListner: HostListenerService,
    private _libUDTService: LibUDTService,
  ) {
      this._title.setTitle('UDT');
      this.formGrp = this.buildForm();

      this._rxArr = [];
/* register to the subscription */

/*       this._subscriptionGet = this._libUDTService._rx$.subscribe(
        rxUDT => {
          this._rxArr.push(rxUDT); }
      ); */
    }

  ngOnInit() {
    this._rxArr = [];
    this.showAddDialog = false;
    this.rxF5(); // update / fetch and refresh all data on init..!

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    if (this._subscriptionGet) {
      this._subscriptionGet.unsubscribe();
    }
    if (this._subscriptionPost) {
    this._subscriptionPost.unsubscribe();
    }
  }

  buildForm(): FormGroup {

    let Attr = new FormGroup (
          {
            ident: new FormGroup(
              {
                _uid: new FormControl('xx'),
                hasChildern: new FormControl(true),
                idx: new FormControl(-1),
                lang: new FormControl('en'),
                objType: new FormControl(CONST_OBJTYPE.UDT)
              })
          });


      return (Attr);
     }

/**Gets all data with subscription - use this to refresh (i.e. f5) as well */
  rxF5()  {
    this._rxArr = []; // initialize when called.. otherwise the async data will be keep appended..!
    this._rxArr = this._libUDTService.rx(); /* The data will be automaticcally populated in the array as it is subscribed */
  }






}
