import { ITmp } from './../interface/tmp';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const _url = 'http://localhost/_c/b/1.php';
const httpOptions = {
  headers: new HttpHeaders({
   // 'Content-Type':  'application/json'
  }),
  params: new HttpParams().set('name', 'x')
};
@Injectable()
export class HttpTxRxService {

constructor(private _http: HttpClient) {

}
handleError() {
  console.log('error');
}
getData() {
  console.log('Entered GetData...');
   // return this._http.get(this._url, _opt);

   return this._http.get<ITmp>(_url, httpOptions)
   .pipe(
    retry(3), // retry a failed request up to 3 times
    catchError(err => {throw err} ) // then handle the error
  );
}

}
