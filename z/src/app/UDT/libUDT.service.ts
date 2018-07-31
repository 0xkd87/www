import { MsgService } from './../../_shared/services/msg.service';
import { Subscription, Observable } from 'rxjs';
import { isArray } from 'util';
import { HttpTxRxService } from './../../_shared/services/http-TxRx.service';
import { Injectable, OnDestroy } from '@angular/core';
import { IUdt } from '../../_shared/interface/schemaLib.interface';


const url = {
  addUDT: 'http://emis000695/_c/__api/post/post.udt.add.php',
  getListUDT: 'http://emis000695/_c/__api/get/get.udt.list.php'
};

@Injectable(
  {  providedIn: 'root'}
)
export class LibUDTService implements OnDestroy {
  public error: string;
  private _rxArr: IUdt[];
  _subscriptionGet: Subscription;
  _subscriptionPost: Subscription;
constructor(
  private _httpServ: HttpTxRxService,
  private _msg: MsgService
) {
}
ngOnDestroy() {
  // prevent memory leak when component destroyed
  if (this._subscriptionGet) {
    this._subscriptionGet.unsubscribe();
  }
  if (this._subscriptionPost) {
  this._subscriptionPost.unsubscribe();
  }
  console.log('distroyed');
}
/* initialize the rx aray */
initRxArray() {
   this._rxArr = [];  // no null, no undefined..!
}
rxArr() {
  return this._rxArr;
}


  rx(): any {
    this.initRxArray();  // no null, no undefined..!
    this._subscriptionGet = this._httpServ.getEncData(url.getListUDT)
    .subscribe(
      x => {
        let rxArr = <any[]>x;

        if (isArray(rxArr))  {
          rxArr.forEach(rx => {
            this._rxArr.push(<IUdt>JSON.parse(rx)); }
          );
      }

      },
      error => {
        this.error = error; // error path;
      }
    );
    return this.rxArr();
  }

  addNew(newUDT: IUdt): Observable<any> {

    console.log(newUDT);
    return this._httpServ.postTx(url.addUDT, <IUdt>(newUDT));

  }

  __addNew(newUDT: IUdt) {

    this._subscriptionPost = this._httpServ.postTx(url.addUDT, <IUdt>(newUDT))
    .subscribe(
      udt => {
        console.log(udt);
        let u: IUdt = udt;
        this._msg.add('UDT: ' + u.plcTag.name + ' Added Successfully..!');
       },
      err => {},
      () =>  {}
    );
  }

  isNameUnique(name: string, allowOwn: boolean = false): boolean {
    let i = 0;
    this.rxArr().forEach(
      u => {
        if ((name === u.plcTag.name) && (name !== '') )  {
          i = i + 1;
        }
      }
    );
     console.log(i);
    return (i === 0 ? true : false );
  }




/*   _rx()  {
    this._subscriptionGet = this._httpServ.getEncData(url.getListUDT)
    .subscribe(
      x => {
        let rxArr = <any[]>x;
        if (isArray(rxArr))  {
          rxArr.forEach(rx => {
            this._rxSubj.next(<IUdt>JSON.parse(rx));
          }
          );
      }

      },
      error => {
        this.error = error; // error path;
      },
      () => console.log('compleeeeeeet')
    );

    console.log(this._rx$);
  } */
}
