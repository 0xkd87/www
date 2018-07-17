import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


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



constructor(private _http: HttpClient) {

}
handleError() {
  console.log('error');
}

  getEncData(url: string) {
    console.log('Entered GetEncData...');

    return this._http.get(url,
    //   this.httpOptions
      {responseType: 'json'}
    )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(err => {throw err; } ) // then handle the error
    );
  }

  postTx(url: string, jsonStr: any): any {
    console.log('jsonStr');

    console.log(jsonStr);

    return this._http.post(url, jsonStr, httpOptions)
    .pipe(
      catchError(err => {throw err; } ) // then handle the error
    );
  }

  private extractData(res: Response) {
    let body = res.json();
          return body || {};
      }

      private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
          }
}
