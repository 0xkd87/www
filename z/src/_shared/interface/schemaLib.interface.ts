import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';


export enum CONST_OBJTYPE {
   ABSTRACT = 'ABSTRACT',
   UDT = 'UDT',
   UDT_VAR = 'UDT_VAR'
}


/*Internal interfaces - No Export */
class _multiLangText {
  en?: string; // default langualge  = en
  de?: string; // default langualge  = de
  [lang: string]: string; // possible extension = project specific languages might be added
  constructor( ) {
    this.en = 'en comment';
    this.de = 'de - comment';
  }

}


class _rev {
  major: number;
  minor: number;
  on: string;
  by: string;
  comment:  _multiLangText;
  constructor() {
    this.major = 0;
    this.minor = 1;
    this.on = '';
    this.by = '';
    this.comment = new _multiLangText();
    // this.comment['en'] = 'gf';
    // console.log(this.comment['en']);
  }


}

class _ident {
  _uid?: string;  // unique object id - assigned at the time of construct
  idx?:  number; // the index (Auto assigned by DB) which is used to call this element from the App
  innerIdx?: number; // inner index - some elements are the part of parent table (e.g. UDT variables..)
  lang?: string;
  objType?: CONST_OBJTYPE; // Tag,FB,UDT,AlarmList....
  hasChildern?: boolean;

  constructor() {
    this._uid = 'uid';  // unique object id - assigned at the time of construct
    this.idx = -1; // the index (Auto assigned by DB) which is used to call this element from the App
    this.innerIdx =  -1 ; // inner index - some elements are the part of parent table (e.g. UDT variables..)
    this.lang = 'en';
    this.objType = CONST_OBJTYPE.ABSTRACT; // Tag,FB,UDT,AlarmList....
    this.hasChildern = false;
  }

  getFormGroup(): FormGroup {
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
} // </class>

class _plcTag {
  isF: boolean;
  name: string;
  datatype:  string;
  address?: string;
  comment?: _multiLangText;

  constructor() {
    this.isF = false;
    this.name = '';
    this.datatype = '';
    this.address = '';
    this.comment = new _multiLangText();
  }

  getFormGroup(): FormGroup {
    const fg = new FormGroup(
      {
        name: new FormControl
        (
          this.name,
          Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(48)])
        ),
        comment: new FormGroup(
          {
            en: new FormControl
            ( this.comment['en'],
              Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(256)])
            )
          }
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


export interface __IUdt {

    rev?: _rev;
    ident?: _ident;
    plcTag?: _plcTag;

}

export class IUdt {

  rev?: _rev;
  ident?: _ident;
  plcTag?: _plcTag;
  var?: _udtVar[];

  constructor() {
    this.rev = new _rev();
    this.plcTag = new _plcTag();
    this.ident = new _ident();
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

