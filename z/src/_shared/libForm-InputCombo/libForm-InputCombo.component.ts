/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-08 03:33:14
 * @modify date 2018-08-08 03:33:14
 * @desc [description]
*/
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'libForm-InputCombo',
  templateUrl: './libForm-InputCombo.component.html',
  styleUrls: ['./libForm-InputCombo.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: LibFormInputComboComponent,
    multi: true
  }]
})
export class LibFormInputComboComponent implements OnInit, ControlValueAccessor {

  /**
   * input parameter(s) to bind with parent/child
   */
  @Input()
  public _dropdownItems: string[]; // array of strings as a select element options

  public get dropdownItems(): string[] {
    return this._dropdownItems;
  }
  public set dropdownItems(value: string[]) {
    this._dropdownItems = value;
  }
  @Input()  formControl: FormControl;

  @Input()
  public _labelText: string;
  public get labelText(): string {
    return this._labelText;
  }
  public set labelText(value: string) {
    this._labelText = value;
  }


  private _isFocused: boolean;
  public get isFocused(): boolean {
    return this._isFocused;
  }
  public set isFocused(value: boolean) {
    this._isFocused = value;
  }

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {

  }

  ngOnInit() {
    this.initControls();
  }

  initControls() {
    if (this.formControl) {
      // this._fc = this.formControl;
    }
    this.isFocused = false;

    let i = 0;
    this._dropdownItems.forEach( s => {
      if (this.formControl.value === s) {
        i++;
      }
    });

    if (i !== 1) {
      this.formControl.setValue('');
      this.formControl.updateValueAndValidity();

      this.formControl.setErrors({
        invalidSelection : true
      });

      console.log(this.formControl);
    }
}

onChange = (_: any) => {
  // console.log(_);
}
onTouched = () => {};



/**Overrides of the interface implementation */
writeValue(val: any): void {
  this._renderer.setValue(this._elementRef.nativeElement, val);
}
registerOnChange(fn: any): void {
  this.onChange = fn;
}
registerOnTouched(fn: any): void {
  // throw new Error("Method not implemented.");
}
setDisabledState?(isDisabled: boolean): void {
  // throw new Error("Method not implemented.");
}

}
