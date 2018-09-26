/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-08 11:28:04
 * @modify date 2018-09-26 11:18:31
 * @desc [description]
*/

import { Subscription, Observable } from 'rxjs';
import { isArray } from 'util';
import { HttpTxRxService } from '../../_shared/services/http-TxRx.service';
import { Injectable, OnDestroy } from '@angular/core';
import { IUdt } from '../../_shared/interface/schemaLib.interface';
import { UrlBuilderService } from '../../_shared/services/urlBuilder.service';

@Injectable(
  {  providedIn: 'root'}
)
export class LibUDTService implements OnDestroy {

  private _url;
  private _li: {  // Lists - arrays
    obj: IUdt[]; // Objects - received
    objName: string[]; // populated object names
  };

/*
 Function pack
*/
public getArr: {
  // Gets the received array of the objects
  obj: () => IUdt[];

  // Returns the Array of string which contains * all the "plcTag.name" strings in the rx list
  objNames: () => string[];
};


  public error: string;
  // private _rxArr: IUdt[];
  private _subscriptionGet: Subscription;
  private _subscriptionPost: Subscription;
constructor(
  private _httpServ: HttpTxRxService,
  private _urlBuilder: UrlBuilderService,
) {

  this._li_Init();
  this._fn_Init();


    // define url calling function
    this._url = (op: string) => {
      return this._urlBuilder.url__UDT(op);
    };
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




/* initialize lists */
private _li_Init() {
  this._li = {obj: [], objName: []}; // no null, no undefined..!
}

private _fn_Init() {
  this.getArr = {
      obj:  ()  => this._li.obj,
      objNames: ()  => this._li.objName,
  };
}


  ___rx(): any {
    this._li_Init();  // no null, no undefined..!
    this._subscriptionGet = this._httpServ.rxGET(this._url('r'))
    .subscribe(
      x => { // catch
        const rxArr = <any[]>x;

        if (isArray(rxArr))  {
          rxArr.forEach(rx => {
            // this._rxArr.push(new IUdt(<IUdt>JSON.parse(rx)));
            const u = new IUdt(<IUdt>JSON.parse(rx));
            this._li.obj.push(u); // add the object to the rx array
            this._li.objName.push(<string>u.plcTag.name); // add the name string
          });
      }

      },
      error => { // throw
        this.error = error; // error path;
      },
      () => { // finally
          // reindex memory here
          if ((this._li.obj) && (this._li.obj.length > 0)) {
            this._li.obj.forEach((el, i, arr) => {
              el.reIndexMem(0, arr); // re-index with mem align index of 16 as default (=no parameter)
            });
          }
      }
    );

    return this._li.obj;
  }

  rx(): any {
    this._li_Init();  // no null, no undefined..!
    this._subscriptionGet = this._httpServ.txPOST(
      this._url('r'),
      null,
      {
        op: 'r',
        dst: 'lib'
      }).subscribe(
      x => { // catch
        const rxArr = <any[]>x;

        if (isArray(rxArr))  {
          rxArr.forEach(rx => {
            // this._rxArr.push(new IUdt(<IUdt>JSON.parse(rx)));
            const u = new IUdt(<IUdt>JSON.parse(rx));
            this._li.obj.push(u); // add the object to the rx array
            this._li.objName.push(<string>u.plcTag.name); // add the name string
          });
      }

      },
      error => { // throw
        this.error = error; // error path;
      },
      () => { // finally
          // reindex memory here
          if ((this._li.obj) && (this._li.obj.length > 0)) {
            this._li.obj.forEach((el, i, arr) => {
              el.reIndexMem(0, arr); // re-index with mem align index of 16 as default (=no parameter)
            });
          }
      }
    );

    return this._li.obj;
  }

  addNew(newUDT: IUdt): Observable<any> {
    return this._httpServ.txPOST(
    this._url('c'),
    <IUdt>(newUDT),
    {
      op: 'cc',
      dst: 'lib'
    });
  }

  update(uUDT: IUdt): Observable<any> {
    return this._httpServ.txPOST(
      this._url('u'),
      <IUdt>(uUDT),
      {
        op: 'u',
        dst: 'lib'
      });
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
  return this._httpServ.txPOST(this._url('d'),
  <IUdt>(dUDT),
  {
    op: 'd',
    dst: 'lib'
  });
  }

}
