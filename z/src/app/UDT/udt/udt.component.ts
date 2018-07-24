import { HostListenerService } from './../../../_shared/services/hostListener.service';
import { HttpTxRxService } from './../../../_shared/services/http-TxRx.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { isArray } from 'util';

import { Subscription } from 'rxjs';
import { IUdt, CONST_OBJTYPE} from '../../../_shared/interface/schemaLib.interface';
import { Router } from '../../../../node_modules/@angular/router';

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
})
export class UdtComponent implements OnInit, OnDestroy {
  public formGrp: FormGroup;


  public datastr: string;
  public error: string;
  public newUDT: IUdt;

  data: IUdt[];
  _subscriptionPost: Subscription;
  _subscriptionGet: Subscription;
  constructor(
    private _title: Title, // Page Title Serive
    private _httpServ: HttpTxRxService,
    public _hostListner: HostListenerService,
    private _router: Router
  ) {
      this._title.setTitle('UDT');
      this.formGrp = this.buildForm(

      );
    }

  ngOnInit() {
    this.GetAndUpdateData();
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

  routeToCreateUDT()  {
    console.log('entered router fxn');
    this._router.navigate(['createUDT', 'data: [{udt: this.data}]']);
//    this._router.navigate(['createUDT', {udtListIn: this.data }]); data: [{isProd: true}]

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


  GetAndUpdateData()  {
    this.error = ''; // initialize error at the call beginning
    this.data = [];  // no null, no undefined..!
    this._subscriptionGet = this._httpServ.getEncData(url.getListUDT)
    .subscribe(
      data => {
        let rxArr = <any[]>data;

        if (isArray(rxArr))  {
          rxArr.forEach(rx => {
            this.data.push(<IUdt>JSON.parse(rx)); }
          );

           this.datastr = JSON.stringify(data);
        }

      },
      error => {
        this.error = error; // error path;
      }
    );

  }


  postReq_CreateUDT() {
    const newUDT: IUdt = {
      plcTag:
      {
        isF: false,
        name: 'huh',
        datatype:  'BOOL',
        address: 'mm',
        comment:
        {
            en: 'kjhkj',
            de: ''
        }
      }
    } as IUdt;


    this._subscriptionPost = this._httpServ.postTx(url.addUDT, <IUdt>(newUDT))
    .subscribe(
      udt => { console.log(udt); },
      err => this.error = err,
      () => this.GetAndUpdateData()
    );

  }


}
