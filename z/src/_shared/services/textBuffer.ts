import { isType } from "../../../node_modules/@angular/core/src/type";

/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-10 03:26:27
 * @modify date 2018-08-10 03:32:52
 * @desc [Text buffer service]
*/

/**
 * CR+LF for text based files...
 */
const crlf =  '\r\n';

export class TextBuffer {
  private _sbuf: string[];

  private get buffer() {
    return this._sbuf;
  }

  constructor() {
    this.flush();
  }

  /**
   * wipe the string buffer
   */
  public flush() {
    this._sbuf = [];
  }

/**
 * LineFeed (Append)
 *
 * @param line line to be fed (NewLine)
 */

  public addLine(line: string) {
    this._sbuf.push(line);
  }

  public prepend(txt: string | TextBuffer) {

    if (typeof txt === 'string')  {
      this._sbuf.unshift(txt);
      return true;
    } else {
        let i = 0;
        txt.buffer.forEach( s => {
          this._sbuf.splice(i, 0, s);
          i++;
        });
        return true;
    }
    return false;
  }

  get ToString(): string  {
    let s = '';
    this._sbuf.forEach( l => {
      s += l;
      s += crlf;
    });
    return s;
  }

  get lineCount() {
    return this.buffer.length;
  }

}
