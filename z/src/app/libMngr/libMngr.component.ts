import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Irev, IUdt, CONST_OBJTYPE } from '../../_shared/interface/schemaLib.interface';

import { HttpTxRxService} from '../../_shared/services/http-TxRx.service';
import { isArray } from 'util';

import { Subscription } from 'rxjs';
import { MsgBoardComponent } from '../../_shared/msgBoard/msgBoard.component';
import { MsgService } from '../../_shared/services/msg.service';
const url = {
  addUDT: 'http://emis000695/_c/__api/post/post.udt.add.php',
  getListUDT: 'http://emis000695/_c/__api/get/get.udt.list.php'
};

@Component({
  selector: 'app-libMngr',
  templateUrl: './libMngr.component.html',
  styleUrls: ['./libMngr.component.css'],
  providers: [
     HttpTxRxService,
  ]
})
export class LibMngrComponent implements OnInit, OnDestroy {

  public formGrp: FormGroup;


  public datastr: string;
  public error: string;
  public newUDT: IUdt;

  data: IUdt[];
  _subscriptionPost: Subscription;
  _subscriptionGet: Subscription;
  constructor(
    private _fb: FormBuilder,
    private _title: Title, // Page Title Serive
//    public _msg: MsgService,
    private _httpServ: HttpTxRxService
  ) {
      this._title.setTitle('Library Manager');

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
      console.log('get-distroyed');
    }
    if (this._subscriptionPost) {
    this._subscriptionPost.unsubscribe();
    console.log('post-distroyed');
    }
    console.log('distroyed');
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
       // this._msg.add(this.error);
        console.log('gg' + this.error);
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

/*       this._httpServ.postTx(url.addUDT, <IUdt>(newUDT))
      .subscribe(udt => {
                this.GetAndUpdateData(),
                error: err => this.error = <any>err,
                complete: () => this.GetAndUpdateData(),
        }); */



  }

}
