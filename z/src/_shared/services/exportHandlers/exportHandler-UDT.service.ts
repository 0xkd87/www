/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-10 10:47:00
 * @modify date 2018-08-20 11:10:27
 * @desc UDT Export helper
*/
import { Injectable } from '@angular/core';
import { FileTxtService } from '../fs/file-txt.service';
import { IUdt } from '../../interface/schemaLib.interface';
import { TextBuffer } from '../textBuffer';

class blockAttributesS7 {
  [attr: string]: any;

  constructor() {

  }
  add(attrib: string, value: any) {
    // add as a key value pair
    this[attrib] = value;
  }

  get ToTextBuffer(): TextBuffer {
    let s = new TextBuffer();

    // export as formatted key-value pairs strings
    Object.keys(this).forEach(
      k => {
        s.addLine('{ ');
        s.appendText(k);
        s.appendText(' := ');
        s.appendText('\'');
        s.appendText(this[k]);
        s.appendText('\'');
        s.appendText(' }');
    });
    return s; // return the text buffer
  }
}


@Injectable({
  providedIn: 'root'
})
export class ExportHandlerUDTService {


constructor(private _txt: FileTxtService) { }

private _buildAutoGenCommentHeadSiemens(): TextBuffer {
  let s = new TextBuffer();
  s.addLine         ('(******************************************************************************'); // Begin comment
  s.addLineAsComment( '    [+] Automatically Generated Source Code; Do Not Modify                  ');
  s.addLineAsComment( '     |----[TimeStamp: ');
  s.appendText((new Date().toLocaleDateString()) + ' | ' + (new Date().toLocaleTimeString()) + ']');
  s.addLineAsComment( '     |----[Code Generator Signature: '); s.appendText('ToDo: Client+Server Rev. Data' + ']');
  s.addLine         ('******************************************************************************)'); // End comment
  s.lf();
  return s; // return the text buffer
}

private _buildBlockHeaderSiemens (u: IUdt, prgBlock: string = 'TYPE', blockAttrib?: blockAttributesS7): TextBuffer  {
  // { S7_Optimized_Access := 'TRUE' }
  let s = new TextBuffer();
    // Header
     s.addLine(prgBlock + ' ' + '"' + u.plcTag.name + '"'); // No tabindent
        s.addLine('TITLE = '  + u.plcTag.name, 1);

        // specify S7 block attributes if provided by caller
        if (blockAttrib) {
          s.addLine(blockAttrib.ToTextBuffer);
        }

        s.addLine('VERSION : '  + u.rev.major + '.' + u.rev.minor, 1);
    //    s.addLine('AUTHOR : ' + u.rev.by, 1);
        s.addLineAsComment(u.plcTag.comment['en']);
        s.lf();

     return s; // return the text buffer
}

buildS7Src(u: IUdt, db?: boolean): string {

  let prgBlock;
  let blkAttib = new blockAttributesS7();
  if ((db && db === true)) {
    prgBlock = 'DATA_BLOCK';
    blkAttib.add('S7_Optimized_Access', 'FALSE');
  } else {
    prgBlock = 'TYPE';
  }
    let s = new TextBuffer();

     // Auto generate header
      s.addLine(this._buildAutoGenCommentHeadSiemens());

     // BLOCK header
      s.addLine(this._buildBlockHeaderSiemens(u, prgBlock, blkAttib));



      // children (VAR)
      s.addLine(this._getChildrenAsStructS7(u, 1, false));


    // mark object END
    s.addLine('END_'); s.appendText(prgBlock);

    return s.ToString;
}

buildGalileoDbSrc(u: IUdt, errorDB: boolean = false): string {

  const prgBlock = 'DATA_BLOCK';
  let blkAttib = new blockAttributesS7();
  blkAttib.add('S7_Optimized_Access', 'FALSE');

  if (errorDB) { // to be exported as an error DB?
    let len = u.plcTag.memAddr.length - 1;
    u.vars = [];
    u.addNewVar();

    if (u.vars[0]) {
      u.vars[0].plcTag.name = u.symbolicName;
      u.vars[0].plcTag.comment['en'] = 'Array of Error bit for Galileo: Array Size: ' + (len + 1);

      u.vars[0].plcTag.datatype = 'ARRAY [0..' + (len) + '] OF BOOL';
      u.vars[0].plcTag.dataTypeHelper.isNative = true;
    }

  }
    let s = new TextBuffer();

      // Auto generate header
      s.addLine(this._buildAutoGenCommentHeadSiemens());
// console.log(s);
    // Object info, Header
     s.addLine(this._buildBlockHeaderSiemens(u, prgBlock, blkAttib));
// console.log(s);
      // children
      s.addLine(this._getChildrenAsStructS7(u,  1, (errorDB === false))); // inline STRUCT = TRUE..!
// console.log(s);

    // mark object END
    s.addLine('END_'); s.appendText(prgBlock);

    return s.ToString;
}



/**Gets all the specified UDT or programming block as STRUCT (Siemems world)
 *
 * @param u A UDT (or DB or a programmingBlock object which has to be converted to struct)
 * @param tabIndent for ease of readability - the exported content of this block will be tab indented by this number
 * @param inlineStruct is this strucutre to be provide further definition of nesting structure?
 * @param inlineComment optional comment to be passed to recursive call to be included in the STRUCT comment
 */
private _getChildrenAsStructS7(
  u: IUdt, tabIndent: number = 1,
  inlineStruct: boolean = false, inlineComment?: string): TextBuffer  {

    const _inlineComment = ((inlineComment !== undefined)) ? inlineComment : '...';
    let s = new TextBuffer();
      s.addLine('STRUCT', tabIndent);
      s.appendText(' //' + _inlineComment);
          u.vars.forEach( v => {
            let s1 = new TextBuffer();
            s1.addLine('', tabIndent + 1);
            s1.appendText('"' + v.plcTag.name + '"');
            s1.appendText(' : ');
              if ((v.plcTag.dataTypeHelper.isNative) || (inlineStruct === false)) {
                s1.appendText(v.plcTag.datatype + '; ');
                s1.appendText('//' + v.plcTag.comment['en']);
              } else {
                console.log(v.plcTag.dataTypeHelper.udt);

                s1.addLine(this._getChildrenAsStructS7(v.plcTag.dataTypeHelper.udt,
                                                        tabIndent + 1,
                                                        inlineStruct,
                                                        v.plcTag.comment['en']));
              }
             s.addLine(s1);
          });
      s.addLine('END_STRUCT;', tabIndent);

      return s; // textbuffer (class object)
}


/**API public  Calls */
AsDBSrcGalileo10(u: IUdt) {
  this._txt.export(this.buildGalileoDbSrc(u), u.plcTag.name, '.udt');
}

AsErrorDBGalileo10(u: IUdt) {
  this._txt.export(this.buildGalileoDbSrc(u, true), u.plcTag.name, '.udt');
}

AsTIASrc(u: IUdt, exportAsDB?: boolean) {

  const _asDB = (exportAsDB && exportAsDB === true) ? true : false;
  const _fileExt = (_asDB === true) ? '.db' : '.udt';

  this._txt.export(this.buildS7Src(u, _asDB), u.plcTag.name, _fileExt);
}

AsJsonObj(u: IUdt, iEnc: number = 3) {
  const _fileExt = '.json_UDT';
  let s = JSON.stringify(u);
  for (let i = 0; i < iEnc; i++) {
    s = btoa(s);
  }
  this._txt.export(s, u.plcTag.name, _fileExt);
}


}
