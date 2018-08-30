import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class _utils {
    getSHA1(_plainText: string): string {
        if (_plainText !== '') {
        return (CryptoJS.SHA1(_plainText).toString());
        }
    }

    get TimeStamp() {
      const d = new Date();
      const t = '_' +
      d.getFullYear() + (d.getMonth() + 1).toString().padStart(2, '0') + d.getDate()  +
      '_' + d.getHours() + d.getMinutes().toString().padStart(2, '0');

      return t;
    }

    get DateStamp() {
      const d = new Date();
      const t = '_' +
      d.getFullYear() + (d.getMonth() + 1).toString().padStart(2, '0') + d.getDate()  +
      '_' + d.getHours() + d.getMinutes().toString().padStart(2, '0');

      return t;
    }

}
