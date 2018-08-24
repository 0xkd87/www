/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-09 01:50:22
 * @modify date 2018-08-13 09:13:54
 * @desc [File System operations provider for a text file]
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileTxtService {

constructor() { }

public export (content: string, fileName: string, fileExtension: string) {

  if (!content) {
      console.error('TxtExport Error: Empty Content..! No Export will be performed.');
      return;
  }

  if (!fileName) {
   return;
  }

    const d = new Date();
    const _timestamp = '_' +
    d.getFullYear() + (d.getMonth() + 1).toString().padStart(2, '0') + d.getDate()  +
    '_' + d.getHours() + d.getMinutes();
    const _fName = fileName + _timestamp + fileExtension;

    /**
     * Creates the BLOB object : Check browser compatibility...
     */
    // let _blob = new Blob([content], {type: 'text/plain'});

    /**
     * Creates a new File Object... Supported on more browser platforms
     */
    let _blob = new File([content], _fName, {type: 'text/src'});

    let _ev    =  new Event('MouseEvents');
    let _a    = document.createElement('a');
  // FOR IE:

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(_blob, _fName);
      } else {
          _a.download = _fName;
          _a.href = window.URL.createObjectURL(_blob);
          _a.dataset.downloadurl = ['text/plain', _a.download, _a.href].join(':');

          _ev.initEvent('click', true, false);
          _a.dispatchEvent(_ev);
          document.body.appendChild(_a);
          _a.click();
        if (document.body.contains(_a)) {
          /**Remove the element "a" from the document body if it exists */
          document.body.removeChild(_a);
        }
      }
}


/* expFile() {
const fileText = 'I am the first part of the info being emailed.\r\nI am the second part.\r\nI am the third part.';
const fileName = 'newfile001.txt';

this.saveTextAsFile(fileText, fileName);

let r = new FileReader();

r.addEventListener('loadend', function() {
   // reader.result contains the contents of blob as a typed array
   console.log(r.result);
});
return r.result;


} */




}
