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

 //     'Content-Type':  'application/json'
    }
),
 // params: new HttpParams().set('t',  new Date().getTime().toString() ),
 reportProgress: true
});


// const _url = 'http://192.168.2.112/_c/__api/main.php';

@Injectable()
export class HttpTxRxService {



constructor(
  private _http: HttpClient,
  private _msg: MsgService
) {

}
handleError() {
  console.log('error');
}

  getEncData(url: string) {
    return this._http.get(url, /*   this.httpOptions*/ {responseType: 'json'} )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(err => this.handleErrorObservable(err) ) // then handle the error
    );
  }

  postTx(url: string, jsonStr: any): Observable<any> {

    return this._http.post(url, jsonStr, httpOptions);
  }

/*   postTx(url: string, jsonStr: any): Observable<any> {

    return this._http.post(url, jsonStr, httpOptions)
    .pipe(
      catchError(err => {throw err; } ) // then handle the error
    );
  } */
      public handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        // return Observable.throw(error.message || error);
        this._msg.add(error.message || error);
        return (error.message || error);
          }
}
