/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-08 11:29:43
 * @modify date 2018-08-08 11:29:43
 * @desc [
 * provides frequently used Async form input validators. The service is provided in ROOT.
 * This makes sure there will be a single instance of this service class]
*/
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsyncInputValidationService {

constructor() { }

/**
 *
 * Looks for the duplicate instance of the text from the given array of strings
 *
 * @param _nArr : (string) Array of the names in which the name will be searched for duplication
 * @param _name : The string which has to be checked for dupication
 * @param _matchCase : [default = 0] Consider case while comparing? the strings will be converted to lower case before comparision
 * @param _ownName : [optional] if passed as a non-empty string, this string occurance is allowed once in the given array
 */
isTextUnique(_nArr: string [], _name: string, _matchCase = false, _ownName?: string): Observable<any> {
  /**
   * case handler
   */
  let c: (s: string) => string;
  if (_matchCase === true) {
    c = (s: string) => (s);
  } else {
    c = (s: string) => {
      console.log(s);
      return s.toLowerCase();
    };
  }

  const ownName = (_ownName) ? c(_ownName) : '';
  const name = c(_name);
  let i = 0;
  let j = 0;
  _nArr.forEach(
    n => {
      const uName = c(n);
      j = ( ownName !== '' && ownName === uName) ? j + 1 : j;
      if ((name === uName) && (name !== '') && (ownName !== '' ? (ownName !== name) : true) )  {
        i = i + 1;
      }
      j = (ownName !== '' && ownName !== name) ? 0 : j; // reset the count if user changes the name
    }
  );
   // console.log(j);
  return new Observable(obs$ => {
    if ((i === 0) && (j < 2)) {
      /*
      *is unique / or / matched with own = no Duplicate error
      */
     obs$.next(null);
    } else {
      /**
       * Found duplicate..!
       */
      obs$.next({nameExists: true});
    }
    /**
     * Do not forget to sign complete this observer, otherwise validator will never react to it
     * The observer will complete hence the async caller will never signled to do [.then]
     */
    obs$.complete();
  });

}

}
