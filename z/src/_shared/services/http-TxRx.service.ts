import { MsgService } from './msg.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, Subscription } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';


const httpOptions = ( {

  headers: new HttpHeaders(
    {
      'Accept' : '*/*',
     'Content-Type':  'text/plain'
    }
),
 // params: new HttpParams().set('t',  new Date().getTime().toString() ),
 reportProgress: true
});



@Injectable(
  {
    providedIn: 'root' ,
  }
)
export class HttpTxRxService {



constructor(
  private _http: HttpClient,
  private _msg: MsgService
) {

}


  getEncData(url: string) {
    return this._http.get(url, /*   this.httpOptions*/ {responseType: 'json'} )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(err => this.handleError(err) ) // then handle the error
    );
  }

  postTx(url: string, jsonStr: any): Observable<any> {

    return this._http.post(url, jsonStr, httpOptions)
    .pipe(
      catchError(err => this.handleError(err) ) // then handle the error
    );
  }


  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    this._msg.add('[' + (new Date()).toJSON() + '] : ' + errMsg);

    return throwError(errMsg);
  }

}
