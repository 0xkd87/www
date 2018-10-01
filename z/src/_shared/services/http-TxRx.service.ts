/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-26 17:08:46
 * @modify date 2018-09-26 17:08:46
 * @desc [description]
*/
import { MsgService } from './msg.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, Subscription } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

interface IhttpReqParameterSet {
 // [param: string]: string | string[];

 /** op-Code of the request - accepted values: [c]reate | [r]ead | [u]pdate | [d]elete */
  op: 'c'
    | 'r'
    | 'u'
    | 'd'
    | 'r1';

  /**The driver to be used for the requested operation
    Accepted Values: libUDT | prj  */
  drv: 'libUDT'
      | 'prj';

  /* Destination on a object - where (which db) it is stored*/
  dst?: 'lib'
      | 'prj';

  /* object index - if requested*/
  idx?: number;
}





@Injectable(
  {
    providedIn: 'root' ,
  }
)
export class HttpTxRxService {

private _httpOpt: {
  headers:  HttpHeaders;
  params:  HttpParams;
  reportProgress: boolean;
};

constructor(
  private _http: HttpClient,
  private _msg: MsgService
) {

  this._httpOpt = {
    headers: new HttpHeaders({
        'Accept' : '*/*',
       'Content-Type':  'text/plain'
      }),
      params:  new HttpParams(),
      reportProgress: true,
  };

}

private _reloadHttpParams(_params?:
  IhttpReqParameterSet
  // {  [param: string]: string | string[]; }
  ) {
    // assign default parameters

  this._httpOpt.params = new HttpParams().set('.ts', new Date().getTime().toString());

  if (_params) {
    // console.log(Object.keys(_params));
    Object.keys(_params).forEach( p => {
      this._httpOpt.params = this._httpOpt.params.append(p, _params[p].toString());
    });
  }
}


  reqGET(url: string) {
    return this._http.get(url, /*   this.httpOptions*/ {responseType: 'json'} )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(err => this.handleError(err) ) // then handle the error
    );
  }

  reqPOST(url: string,
    jsonStr: any,
    qPara?:   IhttpReqParameterSet    // {  [param: string]: string | string[]; }
    ): Observable<any> {

    this._reloadHttpParams(qPara);
    // return this._http.post(url, jsonStr, httpOptions)
    return this._http.post(url, jsonStr, this._httpOpt)
    .pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err) ) // then handle the error
    );
  }


  private handleError (error: HttpErrorResponse | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {

      // const body = error.json() || '';
      // const err = body || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      console.log(error);
      // errMsg = `${error.error.text} - ${error.statusText || ''} ${err}`;
      errMsg = error.error.text;
    } else {

      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    this._msg.add(errMsg);

    return throwError(errMsg);
  }

}
