/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-10 09:37:38
 * @modify date 2018-09-10 09:37:38
 * @desc [description]
*/


import { Subscription, Observable } from 'rxjs';
import { isArray } from 'util';
import { HttpTxRxService } from '../../_shared/services/http-TxRx.service';
import { Injectable, OnDestroy } from '@angular/core';
import { UrlBuilderService } from '../../_shared/services/urlBuilder.service';
import { IProject } from './../../_shared/interface/IProject.interface';

@Injectable({
  providedIn: 'root'
})
export class PrjCrudService implements OnDestroy {
  public error: string;

  _subscriptionGet: Subscription;
  _subscriptionPost: Subscription;



constructor(
  private _http: HttpTxRxService,
  private _urlBuilder: UrlBuilderService,
) {
  this.li_Init();


  // define url calling function
  this._url = (op: string) => {
    return this._urlBuilder.url__PRJ(op);
  };
}
private _url;

private li: {  // Lists - arrays
  prj: IProject[]; // Project Objects
  prjName: string[]; // populated project names
  prjNum: string[]; // populated project numbers
};




/* initialize the rx aray */
li_Init() {
  this.li = {prj: [], prjName: [], prjNum: []}; // no null, no undefined..!
}
get li_prj() {
 return this.li.prj;
}

get li_prjName() {
  return this.li.prjName;
}

get li_prjNum() {
  return this.li.prjNum;
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

_r() {
  this.li_Init();  // no null, no undefined..!
  this._subscriptionGet = this._http.rxGET(this._url('r'))
  .subscribe(
      rxData => { // catch
        const rxArr = <any[]>rxData;

        if (isArray(rxArr))  {
          rxArr.forEach((rx) => {
            const p = new IProject(<IProject>JSON.parse(rx));
            this.li.prj.push(p);
            this.li.prjName.push(p.prj.prjname);
            this.li.prjNum.push(p.prj.prjnumId);

          });
      }

      },
      error => { // throw
        this.error = error; // error path;
      },
      () => { // finally
        // something ToDo
      }
  );
}

_c(p: IProject): Observable<any> {
  return this._http.txPOST(this._url('c'), <IProject>(p));
}

} // class end
