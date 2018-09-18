import { _utils } from './../_utils';
/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-31 12:20:11
 * @modify date 2018-08-31 12:20:11
 * @desc [description]
*/
import { __baseMethods, _rev, _ident } from './schemaLib.interface';
import { FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';

// class descriptor: Project numeric ID
class __prjNumId {
  private pre1: string; // pre-fixed project code 4 char (alpha) numeric. e.g. 2400
  private branch: string; // branch code.. e.g. WK/HH/LU...
  private nSeq: string; // Rolling project number sequence - 4 digits


  constructor(src?: __prjNumId) {
    // load default values at construct
    this.pre1 = '2400';
    this.branch = 'WK';
    this.nSeq = '';

    if (src) {
      /**call the shallow copy builder if source is passed as an agument */
      this._shallowCloneFromSrc(src);
    }
  }

// -------- Getters ---------

  /**
  * build and returns numeric identifier srting of the project
  */
  public get identifier(): string {
    return (this.pre1 + this.branch + this.nSeq);
  }

  public get branchCode(): string {
    return this.branch;
  }

  public get sequence(): string {
    return this.nSeq;
  }

  private _shallowCloneFromSrc(src: __prjNumId) {
    Object.assign( this, src);
  }

  public getFormGroup(): FormGroup {

    const fg = new FormGroup(
      {
        pre1: new FormControl(
          this.pre1,
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.pattern(/^[a-zA-Z0-9]+$/)
          ]),
            Validators.composeAsync([]), // to be overridden in the ui form if required
        ),
        branch: new FormControl(
          this.branch,
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
            Validators.pattern(/^[A-Z0-9]+$/)
          ]),
            Validators.composeAsync([]), // to be overridden in the ui form if required
        ),
        nSeq: new FormControl(
          this.nSeq,
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(5),
            Validators.pattern(/^[A-Z0-9]+$/)
          ]),
            Validators.composeAsync([]), // to be overridden in the ui form if required
        ),
      });
      return fg;
  }
}


class _prj {

  /**
   * Members
   */
  private name: string; // name of the project
  private number: __prjNumId; // unique identifier (number) of a project
  private prod: {
    type: string;
    name: string;
  };
  private installation: {
    company: string;
    facility: string; // e.g. Hollywood studios: park name
    address: string; // installation address
  };

  private status: { // project state
    phase: string;
    proz: number; // completion progress in percentages
  };


   // methods -----

  constructor(src?: _prj) {
    this.name =  (new _utils()).getSHA1(new Date().toString());
    this.number = new __prjNumId();
    this.prod = {
                  type: '',
                  name: ''
                };


    if (src) {
      /**call the shallow copy builder if source is passed as an agument */
      this._shallowCloneFromSrc(src);
    }
  }

  private _shallowCloneFromSrc(src: _prj) {
    Object.assign( this, src);
    this.number = new __prjNumId(src.number);
  }

  //   Getters


   get prjnumId(): string {
    return this.number.identifier;
   }

   get prjname(): string {
    return this.name;
   }

   get prod_Type(): string {
     return this.prod.type;
   }

   get prod_Name(): string {
    return this.prod.name;
  }


  public getFormGroup(): FormGroup {

    const prod =  new FormGroup(
      {
        name: new FormControl(
          this.prod_Name,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(80),
            Validators.pattern(/^[a-zA-Z0-9.,;:><[!#$%^&*()@|+ _-]+$/)
          ]),
            Validators.composeAsync([]), // to be overridden in the ui form if required
        ),
        type: new FormControl(
          this.prod_Type,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(80),
            Validators.pattern(/^[a-zA-Z0-9.:!#()=+_-]+$/)
          ]),
            Validators.composeAsync([]), // to be overridden in the ui form if required
        ),
      });

    const fg = new FormGroup(
      {
        name: new FormControl(
          this.name,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(80),
            Validators.pattern(/^[a-zA-Z0-9.,;:><[!#$%^&*()@|+ _-]+$/)
          ]),
            Validators.composeAsync([]), // to be overridden in the ui form if required
        ),
        number: this.number.getFormGroup(),
      });

      fg.addControl('prod', prod);
      return fg;
  }

}

export class IProject {

  rev?: _rev;
  ident?: _ident;
  prj?: _prj;
  constructor(src?: IProject) {
    if (src) {
      /**call the shallow copy builder if source is passed as an agument */
      this._shallowCloneFromSrc(src);
    } else {
      this.rev = new _rev();
      this.prj = new _prj();
      this.ident = new _ident();
    }
  }
  private _shallowCloneFromSrc(src: IProject) {
    this.rev = new _rev(src.rev);
    this.ident = new _ident(src.ident);
    this.prj = new _prj(src.prj);
  }

  public getFormGroup(): FormGroup {
    const fg = new FormGroup({
        ident: this.ident.getFormGroup(),
        rev: this.rev.getFormGroup(),
        prj: this.prj.getFormGroup(),
      });
      return fg;
  }
}
