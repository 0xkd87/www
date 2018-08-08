/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-08 12:16:22
 * @modify date 2018-08-08 03:32:51
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
    this._dtArr.push(new _defDataType('DINT', 32));

    this._dtArr.push(new _defDataType('INT', 16, [DEV_PLATFORMS.S7_300, DEV_PLATFORMS.S7_1200, DEV_PLATFORMS.S7_1500]));
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
}


/*Internal interfaces - No Export */
class _multiLangText {
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


class _rev {
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

}

class _ident {
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

class _plcTag {
  isF: boolean;
  name: string;
  datatype:  string;
  address?: string;
  comment?: _multiLangText;

  constructor(src?: _plcTag) {
    this.isF = false;
    this.name = '';
    this.datatype = '';
    this.address = '';
    this.comment = new _multiLangText();

    if (src) { /**shallow copy if source is provided */
      this._shallowCloneFromSrc(src);
      this.comment = new _multiLangText(src.comment);
    }
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
              Validators.minLength(5),
              Validators.maxLength(48),
              Validators.pattern(/^[a-zA-Z0-9!#$%^&*()_-]+$/)]),
              Validators.composeAsync([]),
        ),
        comment: this.comment.getFormGroup(
          [ Validators.maxLength(128),
            Validators.pattern(/^[a-zA-Z0-9!#$%^&*()@|+ _-]+$/)]
        ),
        isF : new FormControl(this.isF),
        datatype : new FormControl(
          this.datatype,
          Validators.compose([ Validators.required, ])
        ),
        address : new FormControl(this.address),
      });
      return fg;
  }

/*   for (var c in this.custs) {
    cust = this.custs[c];
  } */
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
    if (src.vars) { // check if src containd var definition?
      src.vars.forEach( v => {
        this.vars.push(new IudtVar(v)); /** push each element with shallow copy */
      });
  }

  }

  /**
   * returns the basic structure of the form building group
   */
  public getFormGroup(): FormGroup {
    const vars = new FormArray([]);
    if (this.vars) {
      this.vars.forEach( v => {
        vars.push(v.getFormGroup());
      });
    }
    const fg = new FormGroup(
      {
        ident: this.ident.getFormGroup(),
        plcTag: this.plcTag.getFormGroup(),
      },
      // {updateOn: 'blur'} // ?
    );
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
      this.vars.forEach( v => {
        if (v.ident.innerIdx < 0) { // non positive = default (-1);
          v.ident.innerIdx = this.vars.indexOf(v) + 1; // Let's start from 1 instead of 0
        }
      });
    }

  }

}

