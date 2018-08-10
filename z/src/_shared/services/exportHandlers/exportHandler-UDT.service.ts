/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-10 10:47:00
 * @modify date 2018-08-10 03:13:13
 * @desc UDT Export helper
*/
import { Injectable } from '@angular/core';
import { FileTxtService } from '../fs/file-txt.service';
import { IUdt } from '../../interface/schemaLib.interface';

@Injectable({
  providedIn: 'root'
})
export class ExportHandlerUDTService {


private _crlf: string;
constructor(private _txt: FileTxtService) { }

stringDumpTia(u: IUdt): string {

let s = '';

/**
 * Auto generated header
 */
  s += '/*';

  s += 'This block has been Auto-Generated';

  s += '*/';


 /**
  * Object info
  */

 s += '*/';

  /**
   * Object Children
   */

   /**
    * object END
    */

return s;
}


}
