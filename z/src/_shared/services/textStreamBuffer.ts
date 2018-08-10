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

export class TextStreamBuffer {
  private _sbuf: string[];

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
 * LineFeed
 *
 * @param line line to be fed (NewLine)
 * @param at (optional) line to be fed at line position
 */

  public lf(line: string, at?: number) {

    if (at && at > 0) {

    } else {
      this._sbuf.push(line);
    }
  }

  get stringVal(): string  {
    let s = '';
    this._sbuf.forEach( l => {
      s += l;
      s += crlf;
    });
    return s;
  }

}
