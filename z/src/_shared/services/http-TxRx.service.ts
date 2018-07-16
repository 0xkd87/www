import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';





// const _url = 'http://192.168.2.112/_c/__api/main.php';

@Injectable()
export class HttpTxRxService {

  private httpOptions = ( {

    headers: new HttpHeaders(
     {
       Accept: 'application/json;'
   }),
   params: new HttpParams().set('t',  new Date().getTime().toString() ),
   reportProgress: true
 //  responseType: 'json'
 });

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

  postTx(url: string, jsonStr: string) {
    console.log('Entered GetEncData...');

    return this._http.post(url, jsonStr, this.httpOptions)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(err => {throw err; } ) // then handle the error
    );
  }
}
