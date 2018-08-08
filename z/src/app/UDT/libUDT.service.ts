/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-08 11:28:04
 * @modify date 2018-08-08 11:28:04
 * @desc [description]
*/

import { MsgService } from '../../_shared/services/msg.service';
import { Subscription, Observable } from 'rxjs';
import { isArray } from 'util';
import { HttpTxRxService } from '../../_shared/services/http-TxRx.service';
import { Injectable, OnDestroy } from '@angular/core';
import { IUdt } from '../../_shared/interface/schemaLib.interface';


const url = {
  addUDT: 'http://emis000695/_c/__api/post/post.udt.add.php',
  getListUDT: 'http://emis000695/_c/__api/get/get.udt.list.php',
  updateUDT: 'http://emis000695/_c/__api/u/u.udt.php',
  deleteUDT: 'http://emis000695/_c/__api/d/d.udt.php',
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


get namesArr() {
  let nArr: string[] = []; // assign and init

  return nArr;
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
 //   console.log(newUDT);
    return this._httpServ.postTx(url.addUDT, <IUdt>(newUDT));
  }

  update(uUDT: IUdt): Observable<any> {
 //   console.log(uUDT);
    return this._httpServ.postTx(url.updateUDT, <IUdt>(uUDT));
  }

  deleteSingle(dUDT: IUdt) {
/**
 * sending the complete UDT may make sense instead of just it's idx..!
 * change it later to optimize or unneccessary
 */
//  console.log(dUDT);
  return this._httpServ.postTx(url.deleteUDT, <IUdt>(dUDT));
  }
/*   __addNew(newUDT: IUdt) {

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
  } */

  isNameUnique(_name: string, _ownName?: string): Observable<any> {
    const ownName = (_ownName) ? _ownName.toLowerCase() : '';
    const name = _name.toLowerCase();
    let i = 0;
    let j = 0;
    this.rxArr().forEach(
      u => {
        const uName = u.plcTag.name.toLowerCase();
        j = ( ownName !== '' && ownName === uName) ? j + 1 : j;
        if ((name === uName) && (name !== '') && (ownName !== '' ? (ownName !== name) : true) )  {
          i = i + 1;
        }
        j = (ownName !== '' && ownName !== name) ? 0 : j; // reset the count if user changes the name
      }
    );
     console.log(j);
    return new Observable(observer => {
      if ((i === 0) && (j < 2)) {
        /*
        *is unique / or / matched with own = no Duplicate error
        */
        observer.next(null);
      } else {
        /**
         * Found duplicate..!
         */
        observer.next({nameExists: true});
      }
      /**
       * Do not forget to sign complete this observer, otherwise validator will never react to it
       * The observer will complete hence the async caller will never signled to do [.then]
       */
      observer.complete();
    });

  }


}
