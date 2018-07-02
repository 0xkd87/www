import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class _utils 
{
    getSHA1(_plainText : string)
    {
        if(_plainText != '')
        return (CryptoJS.SHA1(_plainText));
    }
}
