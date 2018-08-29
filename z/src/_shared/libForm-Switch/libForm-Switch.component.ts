
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input, ElementRef, Renderer2, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'libForm-Switch',
  templateUrl: './libForm-Switch.component.html',
  styleUrls: ['./libForm-Switch.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: LibFormSwitchComponent,
    multi: true
  }]
})
export class LibFormSwitchComponent implements OnInit, ControlValueAccessor {

  @Input() labelText = '!';

  @Input() disableControl: boolean;
  @Input()  formControl: FormControl;
/**
 * @Outputs
 */
  @Output() valueChangeTrigger = new EventEmitter();


  public value;
  // c'tor
  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) { }

  ngOnInit() {
  }


  onChange = (_: any) => {
    console.log(_);
    this.valueChangeTrigger.emit();
    // this.valueChangeTrigger.complete();
 }

 onTouched = () => {};

 _ToggleState() {
   this.formControl.setValue(!this.formControl.value);
   this.formControl.updateValueAndValidity();
   this.formControl.markAsDirty();
  // this.value = !this.value;
 }

  // Implementation
  writeValue(val: any): void {
    this._renderer.setValue(this._elementRef.nativeElement, val);
  }
  registerOnChange(fn: any): void {
    // this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  get val() {
    return this.formControl.value;
  }
  get switchState() {
    return ((this.val) ? '1' : '0');
  }

}
