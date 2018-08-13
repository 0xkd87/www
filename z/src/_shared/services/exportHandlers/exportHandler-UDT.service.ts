/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-10 10:47:00
 * @modify date 2018-08-13 10:09:23
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

buildS7Src(u: IUdt, db?: boolean): string {

  const prgBlock = (db && db === true) ? 'DATA_BLOCK' : 'TYPE';
    let s = new TextBuffer();

    /**
     * Auto generated header
     */

      s.addLineAsComment( 'This block has been Auto-Generated');
      s.lf();


    /**
      * Object info
      */
    s.addLine(prgBlock + ' ' + '"' + u.plcTag.name + '"');
    s.addLine('TITLE = '  + u.plcTag.name, 1);
    s.addLine('VERSION : '  + u.rev.major + '.' + u.rev.minor, 1);
//    s.addLine('AUTHOR : ' + u.rev.by, 1);
    s.addLineAsComment(u.plcTag.comment['en']);
    s.lf();



      /**
       * Object Children
       */
      s.addLine('STRUCT', 1);
          u.vars.forEach( v => {
            s.addLine('', 2);
            s.appendText('"' + v.plcTag.name + '"');
            s.appendText(' : ');
            s.appendText(v.plcTag.datatype + '; ');
            s.appendText('//' + v.plcTag.comment['en']);
          });
      s.addLine('END_STRUCT;', 1);
      /**
        * object END
        */

    s.addLine('END_'); s.appendText(prgBlock);

    return s.ToString;
}

exportAsTIASrc(u: IUdt, exportAsDB?: boolean) {

  const _asDB = (exportAsDB && exportAsDB === true) ? true : false;
  const _fileExt = (_asDB === true) ? '.db' : '.udt';

  this._txt.export(this.buildS7Src(u, _asDB), u.plcTag.name, _fileExt);
}




}
