/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-10 03:26:27
 * @modify date 2018-08-13 10:37:37
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
   * Returns the tabbed string containing '\t' specified by paramenter
   *
   * @param tabIndent - number of tabs to be inserted - default 0
   */
  private _indentTab (tabIndent?: number) {
    const tab =  '\t';
    let indent = '';
    if (tabIndent && tabIndent > 0) {
      for (let i = 0; i < tabIndent; i++) {
        indent += tab;
      }
    }
    return indent;
  }

/**
 * Append text to the text buffer with a new line (Append)
 *
 * @param line line to be fed (NewLine)
 * @param tabIndent tab indent for this line (default = 0)
 */
  public addLine(line: string, tabIndent?: number) {
    this._sbuf.push(this._indentTab(tabIndent) + line);
  }


  /**
   * Append Text to the text buffer - WITHOUT the line feed
   * @param text - text string to be appended
   */
  public appendText(text: string) {

    if (this._sbuf.length > 0) {

      this._sbuf[this._sbuf.length - 1] = this._sbuf[this._sbuf.length - 1].concat(text);
    }
  }


  /**
   *
   * @param line Adds a provided text as a comment - preceded by "// "
   * @param tabIndent tab indent for this line (default = 0)
   */
  public addLineAsComment(line: string, tabIndent?: number) {
    const c = '// ';
    this._sbuf.push(this._indentTab(tabIndent) + c + line);
  }
/**
 *
 * @param n Feeds the Blank line CR+LF specified by this number
 * Adds a single (default) line if this argument is not supplied
 */
  public lf(n?: number) {
    let _n = 1;
    if (n && n > 0) {
      _n = n;
    }
    for (let i = 0; i < _n; i++) {
      this.addLine(crlf);
    }
  }

  /**
   *  @param txt - Test to be prepend at the beginning of the text buffer
   */
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
      /**Append a crlf only if the line itself is not a CR+LF (specified by user) */
      if (l !== crlf) {
      s += crlf;
      }
    });
    return s;
  }

  get lineCount() {
    return this.buffer.length;
  }

}
