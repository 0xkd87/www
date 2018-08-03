import { Component, OnInit, Input, OnChanges, Renderer, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'libForm-InputText',
  templateUrl: './libForm-InputText.component.html',
  styleUrls:
  [  './libForm-InputText.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: LibFormInputTextComponent,
    multi: true
  }]
})
export class LibFormInputTextComponent implements ControlValueAccessor, OnInit, OnChanges  {

    /**
   * input parameter(s) to bind with parent/child
   */
  @Input()  labelText: string;
  @Input()  formControl: FormControl;
/**
 * class specific variables
 */
public _fc: FormControl; // control name
public _lbl: string; // control name

onChange = (_: any) => {
  console.log('ssss');
}
onTouched = () => {};
  constructor(private _renderer: Renderer2, private _elementRef: ElementRef
  ) {
    /**
     * initialize the default values
     */
    // this._lbl = '';
  }

  ngOnInit() {
    this.initControls();
  }

  ngOnChanges() {

    /**This event would only fire when any of the [DATA boud] property is changed
     * i.e. @input/[DOM] / local variable to html...
     */
  }

  initControls() {
      if (this.formControl) {
        this._fc = this.formControl;
      }
      this._lbl = this.labelText;
  }
  writeValue(val: any): void {
    // this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', val);
    this._renderer.setValue(this._elementRef.nativeElement, val);

  }
  registerOnChange(fn: any): void {
    // throw new Error("Method not implemented.");
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }


  onFocusInput() {
/*     console.log(this._elementRef.nativeElement);
    this._renderer.setStyle(this._elementRef.nativeElement, 'color', 'yellow'); */
  }



}
