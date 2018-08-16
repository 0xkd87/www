/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-08 11:28:04
 * @modify date 2018-08-08 12:08:41
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

/**
 * @description:
 * Returns the Array of string which contains
 * all the "plcTag.name" strings in the rx list
 */
get namesArr() {
    let nArr: string[] = []; // assign and init
    const uArr = this.rxArr(); // fetch all the Objects
    if (isArray(uArr))  {
        uArr.forEach(u => {
          nArr.push(<string>u.plcTag.name);
        });
      return nArr;
    }
}

  rx(): any {
    this.initRxArray();  // no null, no undefined..!
    this._subscriptionGet = this._httpServ.getEncData(url.getListUDT)
    .subscribe(
      x => {
        let rxArr = <any[]>x;

        if (isArray(rxArr))  {
          rxArr.forEach(rx => {
            // this._rxArr.push(<IUdt>JSON.parse(rx));
            this._rxArr.push(new IUdt(<IUdt>JSON.parse(rx)));

          });
      }

      },
      error => {
        this.error = error; // error path;
      }
    );
    return this.rxArr();
  }

  addNew(newUDT: IUdt): Observable<any> {
    return this._httpServ.postTx(url.addUDT, <IUdt>(newUDT));
  }

  update(uUDT: IUdt): Observable<any> {
    return this._httpServ.postTx(url.updateUDT, <IUdt>(uUDT));
  }

  /**
   *
   * @param dUDT : The selected Object which  has to be deleted.
   * this object details will be sent to server to request delete operation
   */
  deleteSingle(dUDT: IUdt) {
/**
 * sending the complete UDT may make sense instead of just it's idx..!
 * change it later to optimize or unneccessary
 */
  return this._httpServ.postTx(url.deleteUDT, <IUdt>(dUDT));
  }

}
