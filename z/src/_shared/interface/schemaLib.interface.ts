import { Observable } from 'rxjs';
/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-08 12:16:22
 * @modify date 2018-08-15 08:26:53
 * @desc [Schema and basic definitions of objects]
*/
import { _utils } from '../_utils';
import { FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';


export enum CONST_OBJTYPE {
   ABSTRACT = 'ABSTRACT',
   UDT = 'UDT',
   UDT_VAR = 'UDT_VAR'
}

/**
 * Development platforms
 */
export enum DEV_PLATFORMS {
  ALL = 'Generic CPU',
  S7_300 = 'Siemens S7 300',
  S7_1200 = 'Siemens S7 1200',
  S7_1500 = 'Siemens S7 1500',
  AB = 'Allen Bradley RS-Logix',
  CODESYS = 'CoDeSys x.x',
}


/**
 * Abstract class : baseObj implements all basic functions of a class
 */
export abstract class __baseMethods {

  protected _shallowCloneFromSrc(src: any) {
    Object.assign( this, src);
  }
  public abstract getFormGroup(_validotors?: ValidatorFn[]): FormGroup;
}



/**
 * abstract definition of an object: (data) Type
 */
class _defDataType {
  private _sz: number; // Size of the datatype in bits
  private _n: string;
  /*
  *development platforms in which this datatype is supported
  */
  private _supportedPl: DEV_PLATFORMS[];


/**
 *
 * @param typeName literal text string with which this datatype is identified
 * @param typeSize Size of the datatype in bits
 * @param supportedPlatforms array of the enumerated list of defined platforms in which this datatype is supported
 * if supported platforms are omitted during construct, this data type will be considered to be supported by all platforms (default)
 */
  constructor(typeName: string, typeSize: number, supportedPlatforms?: DEV_PLATFORMS[]) {

    if (typeName !== '') {
      this._n = typeName;
    }

    /**
     * default size = 1 bit if not constructed
     */
    this._sz = typeSize > 0 ? typeSize : 1;

    /**
     * supported platforms - omitted? then assing default = ALL
     */
    this._supportedPl = (supportedPlatforms) ? supportedPlatforms : [DEV_PLATFORMS.ALL];

  }

  /**
   * returns the Size of the datatype in bits
   */
  get bitWeight(): number {
    return this._sz;
  }

/**
 * Returns literal text string with which this datatype is identified
 */
  get nameString(): string {
    return this._n;
  }

  /**
   * returns the array of the enum object in which this datatype is supported
   */
  get supportedPlatforms(): DEV_PLATFORMS[] {
    return this._supportedPl;
  }
}

export class plc {
  private _myPlatform: DEV_PLATFORMS;
  private _dtArr: _defDataType[];
  constructor (platform: DEV_PLATFORMS) {
    this._myPlatform = platform;
    this._populateDataTypeArr();
  }

  private _populateDataTypeArr() {
    this._dtArr = []; // initialize

    /**
     * populate DataTypes Array
     * Example:
     * Array.push(new _defDataType('INT', 1, [DEV_PLATFORMS.S7_300, DEV_PLATFORMS.S7_1200, DEV_PLATFORMS.S7_1500]));
     */
    this._dtArr.push(new _defDataType('BOOL', 1));
    this._dtArr.push(new _defDataType('BYTE', 8));
    this._dtArr.push(new _defDataType('WORD', 16));
    this._dtArr.push(new _defDataType('INT', 16, [DEV_PLATFORMS.S7_300, DEV_PLATFORMS.S7_1200, DEV_PLATFORMS.S7_1500]));

    this._dtArr.push(new _defDataType('DINT', 32, [DEV_PLATFORMS.S7_300, DEV_PLATFORMS.S7_1200, DEV_PLATFORMS.S7_1500]));
    this._dtArr.push(new _defDataType('DWORD', 32, [DEV_PLATFORMS.S7_300, DEV_PLATFORMS.S7_1200, DEV_PLATFORMS.S7_1500]));
    this._dtArr.push(new _defDataType('REAL', 32, [DEV_PLATFORMS.S7_300, DEV_PLATFORMS.S7_1200, DEV_PLATFORMS.S7_1500]));

    this._dtArr.push(new _defDataType('ABONLY', 16, [DEV_PLATFORMS.AB]));
  }

  get myPlatform(): DEV_PLATFORMS {
    return this._myPlatform;
  }

  get dataTypeNameStrings (): string[] {
    let _nArr: string[] = [];

    this._dtArr.forEach(d => {
      if (d.supportedPlatforms.includes(this.myPlatform) || d.supportedPlatforms.includes(DEV_PLATFORMS.ALL)) {
        _nArr.push(d.nameString);
      }
    });
    return _nArr;
  }

  /**
   * Asserts and returns the size of the datatype in bits.
   * If the data type is not found (or not supported by the specified plc platform), 0 (non assertive)
   * value will be returned.
   *
   * @param dataType Verbose string of the data type whose bit-weight has to be determined
   */
  isNativeDataType(dataType: string): number {
    if (typeof dataType === 'string') { // type must be string

      for (let d of this._dtArr) {
        if (
          (d.nameString === dataType) &&
          (d.supportedPlatforms.includes(this.myPlatform) || d.supportedPlatforms.includes(DEV_PLATFORMS.ALL)) ) {
          return d.bitWeight; // get out (assert) on first successful find
        }
      }
    }
    return 0; // return 0 as default, non assertive answer
  }


} // </class>


/*Internal interfaces - No Export */
export class _multiLangText {
  [lang: string]: any; // possible extension = project specific languages might be added
  en?: string; // default language  = en
  de?: string; // default language  = de
  constructor(src?: _multiLangText) {
    this.en = 'en';
    this.de = '';
    if (src) { /**shallow copy if source is provided */
      this._shallowCloneFromSrc(src);
    }
  }

  getFormGroup(_validotors?: ValidatorFn[]) {
      const arr: any = {};
      Object.keys(this).forEach(
        k => {
          arr[k] = new FormControl
          ( this[k],
            Validators.compose(_validotors)
          );
      });
      return (new FormGroup(arr));
  }

  private _shallowCloneFromSrc(src: _multiLangText) {
    Object.assign( this, src);
  }

}


export class _rev {
  major: number;
  minor: number;
  on: string;
  by: string;
  comment:  _multiLangText;
  constructor(src?: _rev) {
    this.major = 0;
    this.minor = 1;
    this.on = '';
    this.by = '';
    this.comment = new _multiLangText();
    // this.comment['en'] = 'gf';
    // console.log(this.comment['en']);

    if (src) { /**shallow copy if source is provided */
      this._shallowCloneFromSrc(src);
    }
  }

  private _shallowCloneFromSrc(src: _rev) {
    Object.assign( this, src);
  }

  public getFormGroup(): FormGroup {
    const rev = new FormGroup(
      {
        major: new FormControl(this.major),
        minor: new FormControl(this.minor),
        on: new FormControl(this.on),
        by: new FormControl(this.by)
      });
      return rev;
  }

}

export class _ident {
  _uid?: string;  // unique object id - assigned at the time of construct
  idx?:  number; // the index (Auto assigned by DB) which is used to call this element from the App
  innerIdx?: number; // inner index - some elements are the part of parent table (e.g. UDT variables..)
  lang?: string;
  objType?: CONST_OBJTYPE; // Tag,FB,UDT,AlarmList....
  hasChildern?: boolean;

  constructor(src?: _ident) {
    this._uid = 'uid';  // unique object id - assigned at the time of construct
    this.idx = -1; // the index (Auto assigned by DB) which is used to call this element from the App
    this.innerIdx =  -1 ; // inner index - some elements are the part of parent table (e.g. UDT variables..)
    this.lang = 'en';
    this.objType = CONST_OBJTYPE.ABSTRACT; // Tag,FB,UDT,AlarmList....
    this.hasChildern = false;
    if (src) { /**shallow copy if source is provided */
      this._shallowCloneFromSrc(src);
    }
  }

  public getFormGroup(): FormGroup {
    const ident = new FormGroup(
      {
        _uid: new FormControl(this._uid),
        hasChildern: new FormControl(this.hasChildern),
        idx: new FormControl(this.idx),
        innerIdx: new FormControl(this.innerIdx),
        lang: new FormControl(this.lang),
        objType: new FormControl(this.objType)
      });
      return ident;
  }

  private _shallowCloneFromSrc(src: _ident) {
    Object.assign( this, src);
  }

} // </class>

class _absAddrHelper {

  // memory offset in bits (position in structure)
  private _offset: number;
  public get offset(): number {
    return this._offset;
  }
  public set offset(value: number) {
    this._offset = value;
  }

  // calculated size of this object allocated in memory of the PLC (number of bits)
  private _length: number;
  public get length(): number {
    return this._length;
  }
  public set length(value: number) {
    this._length = value;
  }

  getAsString(parentMemBase: number = 0): string {

    let B = 0; // byte
    let x = 0; // bit
    if (parentMemBase >= 0) { // positives only

      x = (this.offset % 8);
      B = parentMemBase + (this.offset / 8);

    }
    return (B + '.' + x); // answer as B.x format
  }
}// </class>

class _dataTypeHelper {
  private _isNative: boolean;
  public get isNative(): boolean {
    return this._isNative;
  }
  public set isNative(value: boolean) {
    this._isNative = value;
  }

  private _lookupIdx: number;


  private _nestedUDT: IUdt;
  public get udt(): IUdt {
    return this._nestedUDT;
  }
  public set udt(u: IUdt) {
    this._nestedUDT = new IUdt(u);
    this.isNative = false;
  }

  constructor(src?: IUdt) {
    if (src) {
      this.udt = src;
    }
  }
}

class _plcTag {
  isF: boolean;
  name: string;
  datatype:  string;
  address?: string;
  comment?: _multiLangText;

  /**
   * these are the helper values which stores the data after re-indexing.
   * Re0Indexing must be performend prior to accessing the getter methods accessing this values.
   */
  public memAddr?: _absAddrHelper; // not included inb the server interface
  public dataTypeHelper?: _dataTypeHelper;


  constructor(src?: _plcTag) {
    this.isF = false;
    this.name = '';
    this.datatype = '';
    this.address = '';
    this.comment = new _multiLangText();

    this.dataTypeHelper = new _dataTypeHelper();

    /// this.memOffset = -1;
    if (src) { /**shallow copy if source is provided */
      this._shallowCloneFromSrc(src);
      this.comment = new _multiLangText(src.comment);
    }

    // helper construct
    this.memAddr = new _absAddrHelper();


  }

  private _shallowCloneFromSrc(src: _plcTag) {
    Object.assign( this, src);
  }

  getFormGroup(): FormGroup {

    const fg = new FormGroup(
      {
        name: new FormControl
        (
          this.name,
          Validators.compose(
            [ Validators.required,
              Validators.minLength(2),
              Validators.maxLength(48),
              Validators.pattern(/^[a-zA-Z0-9!#$%^&*()_-]+$/)]),
              Validators.composeAsync([]), // to be overridden in the ui form if required
        ),
        comment: this.comment.getFormGroup(
          [ Validators.maxLength(128),
            Validators.pattern(/^[a-zA-Z0-9.,;:><[!#$%^&*()@|+ _-]+$/)]
        ),
        isF : new FormControl(this.isF),
        datatype : new FormControl(
          this.datatype,
          Validators.compose([ Validators.required,
            Validators.minLength(1),
          ])
        ),
        address : new FormControl(this.address),
      });
      return fg;
  }




/**
 *
 * Looks for the duplicate instance of the text from the given array of strings
 *
 * @param _nArr : (string) Array of the names in which the name will be searched for duplication
 * @param _name : The string which has to be checked for dupication
 * @param _matchCase : [default = 0] Consider case while comparing? the strings will be converted to lower case before comparision
 * @param _ownName : [optional] if passed as a non-empty string, this string occurance is allowed once in the given array
 */
isTextUnique(_nArr: string [], _name: string, _matchCase = false, _ownName?: string): Observable<any> {

  /**
   * case handler
   */
  let c: (s: string) => string;
  if (_matchCase === true) {
    c = (s) => (s);
  } else {
    c = (s) =>  (s.toLowerCase());
  }

  const ownName = (_ownName) ? c(_ownName) : '';
  const name = c(_name);
  let i = 0;
  let j = 0;
  _nArr.forEach(
    n => {
      const uName = c(n);
      j = ( ownName !== '' && ownName === uName) ? j + 1 : j;
      if ((name === uName) && (name !== '') && (ownName !== '' ? (ownName !== name) : true) )  {
        i = i + 1;
      }
      j = (ownName !== '' && ownName !== name) ? 0 : j; // reset the count if user changes the name
    }
  );
   // console.log(j);
  return new Observable(obs$ => {
    if ((i === 0) && (j < 2)) {
      /*
      *is unique / or / matched with own = no Duplicate error
      */
     obs$.next(null);
    } else {
      /**
       * Found duplicate..!
       */
      obs$.next({nameExists: true});
    }
    /**
     * Do not forget to sign complete this observer, otherwise validator will never react to it
     * The observer will complete hence the async caller will never signled to do [.then]
     */
    obs$.complete();
  });

}

} // </class>


export class IudtVar {

  rev?: _rev;
  ident?: _ident;
  plcTag?: _plcTag;

  constructor(src?: IudtVar) {
    if (src) {
      /**call the shallow copy builder if source is passed as an agument */
      this._shallowCloneFromSrc(src);
    } else {
      this.rev = new _rev();

      this.ident = new _ident();

      this.plcTag = new _plcTag();
      /*
      * Load default values
      */

     const u = new _utils();
     this.plcTag.name =  u.getSHA1(new Date().toString());
     this.plcTag.isF = false;
     this.plcTag.comment.en = '';
     this.plcTag.datatype   = 'BOOL';

     this.ident.hasChildern = false;
    }

    /**
     * assign class specific attributes
     */
    this.ident.objType = CONST_OBJTYPE.UDT_VAR; // default as UDT
  }

  private _shallowCloneFromSrc(src: IudtVar) {
    this.rev = new _rev(src.rev);
    this.plcTag = new _plcTag(src.plcTag);
    this.ident = new _ident(src.ident);
  }

  public getFormGroup(): FormGroup {
    const fg = new FormGroup(
      {
        ident: this.ident.getFormGroup(),
        plcTag: this.plcTag.getFormGroup(),
      }
    );
   return fg;
  }

  get symbolicName() {
    return this.plcTag.name;
  }

}
/*============  Export interfaces   ===================*/

export class IUdt {

  rev?: _rev;
  ident?: _ident;
  plcTag?: _plcTag;
  vars?: IudtVar[];

  constructor(src?: IUdt) {

    if (src) {
      /**call the shallow copy builder if source is passed as an agument */
      this._shallowCloneFromSrc(src);
    } else {
      this.rev = new _rev();
      this.plcTag = new _plcTag();
      this.ident = new _ident();
      this.vars = new Array<IudtVar>(); /* *Allocating just an array */
    }

    /**
     * assign class specific attributes
     */
    this.plcTag.datatype = 'UDT'; // default as UDT
  }

  private _shallowCloneFromSrc(src: IUdt) {
    this.rev = new _rev(src.rev);
    this.plcTag = new _plcTag(src.plcTag);
    this.ident = new _ident(src.ident);

    /*
    * Allocate an array and then shallow copy each member from src
    */
    this.vars = new Array<IudtVar>();
    if (src.vars) { // check if src contained var definition?
      src.vars.forEach( v => {
        this.vars.push(new IudtVar(v)); /** push each element with shallow copy */
      });
  }

  }

  get symbolicName() {
    return this.plcTag.name;
  }

  /**
   * Sets revision data
   * @param newTimestamp - generate the new timestamp? (default = true)
   * @param incrMajor increament Major revision count? (default = false) major++ is controlled by user on a major release
   * @param incrMinor increament Minor revision count? (default = true) minor++ on each updates by default
   */
  public revUpdate(
    newTimestamp: boolean = true,
    incrMajor: boolean = false,
    incrMinor: boolean = true,
  ) {
    if (newTimestamp) {
      this.rev.on = (new Date().toLocaleDateString()) + ' | ' + (new Date().toLocaleTimeString());
    }
    if (incrMinor) {
      this.rev.minor = this.rev.minor + 1;
    }
    if (incrMajor) {
      this.rev.major = this.rev.major + 1;
      this.rev.minor = 0; // minor = 0 on each major revision
    }

    if ((!incrMinor) && (!incrMinor)) {
      this.rev.major = 0; // major = 0
      this.rev.minor = 0; // minor = 0
    }
  }

  // set symbolicName(n: string) {
  //   if (n && n !== '') {
  //     this.plcTag.name = n;
  //   }
  // }

  /**
   * returns the basic structure of the form building group
   */
  public getFormGroup(): FormGroup {
    // create and populate "vars"
    const vars = new FormArray([]);
    if (this.vars) {
      this.vars.forEach( v => {
        vars.push(v.getFormGroup());
      });
    }

    // create a form group - which has to be returned
    const fg = new FormGroup(
      {

        ident: this.ident.getFormGroup(),
        rev: this.rev.getFormGroup(),
        plcTag: this.plcTag.getFormGroup(),
      },
    );

    // add the children (populated above) as form array
    fg.addControl('vars', vars);
   return fg;
  }

  /**
   * on user's trigger, automatically create (with default parameters)
   *  and push it to the array.
   * User would modify the VAR detaild once it has been added to the array
   */
  public addNewVar() {
    if (this.vars) { // check if the array has been allocated?
      /**
       * create a new variable with default constructor
       */
      this.vars.push(new IudtVar());

      /**
       * Assignt its inner index as next increamental array index
       * Also take care of any orphans (unsaved)
       */
      this._reOrderInnerIdx();
    }

  }

  public deleteVar(idx: number) {
    if (this.vars) { // check if the array has been allocated?
      const _i = idx - 1;
      if ( (_i >= 0) && (_i <= (this.vars.length - 1)) ) {
        this.vars.splice(_i, 1);
      /**
       * Assignt its inner index as next increamental array index
       * Also take care of any orphans (unsaved)
       */
      this._reOrderInnerIdx();
      }
    }
  }

  swapVar(idx: number, dst: number = idx + 1) {
    if (this.vars) { // check if the array has been allocated?
      const len = this.numVars - 1;
      const _i = idx - 1;
      let _d = dst - 1;
      if (
        (_i >= 0) && (_i <= (len)) &&
        (_d >= 0) && (_d <= (len)) ) {
          const _x = this.vars.splice(_i, 1);
          _x.forEach((el, c, arr) => {
            this.vars.splice(_d + c, 0, el); // index = destination, remove = 0, insert which was deleted in previous step
          });
      }

            /**
       * Assignt its inner index as next increamental array index
       * Also take care of any orphans (unsaved)
       */
      this._reOrderInnerIdx();
    }
  }

  get numVars(): number {
    if (this.vars) {
      return (this.vars.length);
    }
    return 0;
  }

  /**
   * re-orders the inner index of Vars after add/remove or any structural change is made
   */
  private _reOrderInnerIdx () {

    if (this.vars) { // check if the array has been allocated?
      this.vars.forEach( (v, i) => {
        v.ident.innerIdx = i + 1; // Let's start from 1 instead of 0

        // if (v.ident.innerIdx < 0) { // non positive = default (-1);
        //   // v.ident.innerIdx = this.vars.indexOf(v) + 1; // Let's start from 1 instead of 0
        //   v.ident.innerIdx = i + 1; // Let's start from 1 instead of 0
        // }
      });
    }
  }

  bitWeight(): number {

    let p = new plc(DEV_PLATFORMS.S7_300);
    let bW = 0;
    this.vars.forEach((v, i) => {
      let sz = p.isNativeDataType(v.plcTag.datatype);
      if (sz > 0) {
        bW = bW + sz;
      } else {
        // recursive call ?
      }
    });
    return bW;
  }

  reIndexMem(memBase: number, siblingsArr: IUdt[], memAlign: number = 16): number {

    /**
     * Create anonymous function for memory alignment
     */
     let _alignMem = (_n: number, _al: number) => {
      const bPos = (_n % _al); // bit position - actual, in this iteration
      return (bPos === 0) ? _n : (_n + (_al - (bPos)));
     };
    // console.log('Re-Indexing Memory for: ' + this.symbolicName);
    // sanity check for memory alignment before using it - check if it is BYTE aligned and non-zero
    const ma = ((memAlign > 0) && ((memAlign % 8) === 0)) ? memAlign : 16;
    if (memBase >= 0) { // if seed memory offset is non-negative number
      // establish the memory base - received from the previously define block
      this.plcTag.memAddr.offset = memBase;
    }
    const p = new plc(DEV_PLATFORMS.S7_300);
    let bW = 0;
    this.vars.forEach((v, i, arr) => {
      const dType = v.plcTag.datatype;
      const typeSize = p.isNativeDataType(dType);
      if (typeSize > 0) { // a non-zero answer = native datatype of this CPU with known type size
        this.vars[i].plcTag.dataTypeHelper.isNative = true;

        // Further alignment check
        if (typeSize < ma) {
          // Don't align in this case... the data type can be accomodate in this limit
        } else {
          // memory will be un-aligned with this size.. aligne it before proceeding
          bW = _alignMem(bW, ma);
        }
        this.vars[i].plcTag.memAddr.offset = bW; // store as object's own property as well

        this.vars[i].plcTag.memAddr.length = typeSize;

        // Aligned at this point - add size to bitWeight
        bW += typeSize;
      } else {
        /* non-native data type. (= UDT or complex datatype).
          Align to the memory boundary first and pass it as a mem base for the iterative call */
          bW = _alignMem(bW, ma);
          // recursively iterate through the complex data-type
          for (let u of siblingsArr) {
            if (dType === u.symbolicName) {

              this.vars[i].plcTag.memAddr.offset = bW; // save offset before adding up the offset

              const len = u.reIndexMem(bW, siblingsArr, ma);

              this.vars[i].plcTag.dataTypeHelper.udt = u; // set the  UDT after it has been re-indexed

              this.vars[i].plcTag.memAddr.length = len;
              bW += len;
              break;
            }
          }
      }
    });

    // Align again before sending it out..!
    bW = _alignMem(bW, ma);
    // answer the total size of the datatype, aligned to the memory
     // console.log('Re-Indexing Memory [Done]: sizeOf(' + this.symbolicName + ') = ' + bW + ' bits');

    this.plcTag.memAddr.length = bW;
    return bW;
  }


}

