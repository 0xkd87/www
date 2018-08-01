import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';


export enum CONST_OBJTYPE {
   ABSTRACT = 'ABSTRACT',
   UDT = 'UDT',
   UDT_VAR = 'UDT_VAR'
}


/*Internal interfaces - No Export */
class _multiLangText {
  [lang: string]: any; // possible extension = project specific languages might be added
  en?: string; // default language  = en
  de?: string; // default language  = de
  constructor(src?: _multiLangText) {
    this.en = 'en comment';
    this.de = 'de - comment';
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
            [Validators.required,
              Validators.minLength(5),
              Validators.maxLength(48),
              Validators.pattern(/^[a-zA-Z0-9!#$%^&*()_-]+$/)]),
              Validators.composeAsync([]),
        ),
        comment: this.comment.getFormGroup(
          [ Validators.minLength(5),
            Validators.maxLength(128),
            Validators.pattern(/^[a-zA-Z0-9!#$%^&*()@|+ _-]+$/)]
        ),

      });
      return fg;
  }

/*   for (var c in this.custs) {
    cust = this.custs[c];
  } */
} // </class>


class _udtVar {

  rev?: _rev;
  ident?: _ident;
  plcTag?: _plcTag;

}
/*============  Export interfaces   ===================*/

export class IUdt {

  rev?: _rev;
  ident?: _ident;
  plcTag?: _plcTag;
  var?: _udtVar[];

  constructor(src?: IUdt) {

    if (src) {
      /**call the shallow copy builder if source is passed as an agument */
      this._shallowCloneFromSrc(src);
    } else {
      this.rev = new _rev();
      this.plcTag = new _plcTag();
      this.ident = new _ident();
      this.var = new Array<_udtVar>();
    }

    /**
     * assign class specific attributes ??
     */

  }

  private _shallowCloneFromSrc(src: IUdt) {
    this.rev = new _rev(src.rev);
    this.plcTag = new _plcTag(src.plcTag);
    this.ident = new _ident(src.ident);
    this.var = new Array<_udtVar>();

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

