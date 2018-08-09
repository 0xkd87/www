/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-09 01:50:22
 * @modify date 2018-08-09 01:50:22
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
      console.error('Console.save: No data');
      return;
  }

  if (!fileName) {
   fileName = 'console.json';
  }

  let _blob = new Blob([content], {type: 'text/plain'});
  let _ev    =  new Event('MouseEvents');
  let _a    = document.createElement('a');
// FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(_blob, fileName);
    } else {
      _a.download = fileName;
      _a.href = window.URL.createObjectURL(_blob);
      _a.dataset.downloadurl = ['text/plain', _a.download, _a.href].join(':');

      _ev.initEvent('click', true, false);
       _a.dispatchEvent(_ev);
      /*     e.initEvent('click', true, false, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e); */
    console.log(document.body);
    document.body.appendChild(_a);
    console.log(document.body);
    _a.click();
    if (document.body.contains(_a)) {
       console.log(_a);
       document.body.removeChild(_a);
    }

    if (document.body.contains(_a)) {
      console.log('removed');
   }
    return _blob;

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
