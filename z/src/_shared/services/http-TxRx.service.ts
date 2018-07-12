import { ITmp } from './../interface/tmp';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



const _url = 'http://emis000695/_c/__api/main.php';

// const _url = 'http://192.168.2.112/_c/__api/main.php';

@Injectable()
export class HttpTxRxService {

  private httpOptions = ( {

    headers: new HttpHeaders(
     {
       Accept: 'text/plain;base64'
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

  getEncData() {
    console.log('Entered GetEncData...');

    return this._http.get(_url,
      // this.httpOptions,
      {responseType: 'text'})
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(err => {throw err; } ) // then handle the error
    );
  }
}
