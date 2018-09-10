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


class _prj {

  /**
   * Members
   */
  private name: string; // name of the project
  private number: string; // unique identifier (number) of a project


   // methods -----

  constructor(src?: _prj) {
    this.name =  (new _utils()).getSHA1(new Date().toString());
    this.number = '';

    if (src) {
      /**call the shallow copy builder if source is passed as an agument */
      this._shallowCloneFromSrc(src);
    }
  }

  /**
   * Getters
   */

   get prjnumber(): string {
    return this.number;
   }

   get prjname(): string {
    return this.name;
   }

  private _shallowCloneFromSrc(src: _prj) {
    Object.assign( this, src);
  }

  public getFormGroup(): FormGroup {
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
        number: new FormControl(
          this.number,
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(15),
            Validators.pattern(/^[a-zA-Z0-9.,;:><[!#$%^&*()@|+ _-]+$/)
          ]),
            Validators.composeAsync([]), // to be overridden in the ui form if required
        ),
      });
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
