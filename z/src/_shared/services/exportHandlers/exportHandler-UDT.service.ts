/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-10 10:47:00
 * @modify date 2018-08-10 11:33:04
 * @desc UDT Export helper
*/
import { Injectable } from '@angular/core';
import { FileTxtService } from '../fs/file-txt.service';
import { IUdt } from '../../interface/schemaLib.interface';
import { TextBuffer } from '../textBuffer';

@Injectable({
  providedIn: 'root'
})
export class ExportHandlerUDTService {


constructor(private _txt: FileTxtService) { }

stringDumpTia(u: IUdt): string {

    let s = new TextBuffer();

    /**
     * Auto generated header
     */
      s.addLine('/*');
      s.addLine( 'This block has been Auto-Generated');
      s.addLine('*/');


    /**
      * Object info
      */

      /**
       * Object Children
       */

      /**
        * object END
        */

    return s.ToString;
}

expotAsAwlSrc(u: IUdt) {

  this._txt.export(this.stringDumpTia(u), u.plcTag.name, '.awl');

}


}
