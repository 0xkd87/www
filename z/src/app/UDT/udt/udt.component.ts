import { HttpTxRxService } from './../../../_shared/services/http-TxRx.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { isArray } from 'util';

import { Subscription } from 'rxjs';
import { IUdt, CONST_OBJTYPE} from '../../../_shared/interface/schemaLib.interface';

const url = {
  addUDT: 'http://emis000695/_c/__api/post/post.udt.add.php',
  getListUDT: 'http://emis000695/_c/__api/get/get.udt.list.php'
};

@Component({
  selector: 'app-udt',
  templateUrl: './udt.component.html',
  styleUrls: ['./udt.component.css']
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
    private _httpServ: HttpTxRxService
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): boolean {
    const posY = window.scrollY ;
    console.log(posY);
    if (posY > 150) {
      return  true;
    } else if (posY < 149) {
      return false;
    }
  }

}
