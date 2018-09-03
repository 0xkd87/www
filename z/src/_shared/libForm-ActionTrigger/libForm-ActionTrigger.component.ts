/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-22 10:55:06
 * @modify date 2018-08-22 10:55:06
 * @desc [description]
*/
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'libForm-ActionTrigger',
  templateUrl: './libForm-ActionTrigger.component.html',
  styleUrls: ['./libForm-ActionTrigger.component.css']
})
export class LibFormActionTriggerComponent implements OnInit, OnChanges {

  @Input() tooltipText: string;
  @Input() actionIcon: string;
  @Input() actionText: string;
  @Input() disableControl: boolean;
  @Input()
  css: {iconColor: '', x: '', componentSize: ''};
  // @Input() styleHints: [];
  @Output() execOnTrigger = new EventEmitter();

  /**
   * public members
   */
  isHovered: boolean;
  iconColor: string;
  myToolTip: String;

  // Template binding stylesheet
  _disp: {
    iconColor: string,
    componentSize: number
  };



  constructor() {

    // Load default values
    this._disp = {
      iconColor: 'rgba(200,200,200,1.0)',
      componentSize: 0 // L/l :  large by default
    };
  }

  ngOnInit() {
    this.isHovered = false;
     this._disp = this._redraw();

  }

  // important - to change on enable/disable events
  ngOnChanges() {
    this._disp = this._redraw();
  }

  onUserTrigger(_: any) {
    this.execOnTrigger.emit();
    // this.actionTriggered.complete();

  }

  private _redraw() {

    // Tool tip
    if (this.tooltipText) {
      this.myToolTip = this.tooltipText;
    } else {
      this.myToolTip = this.actionText;
    }

    // Component sizing
    let cs = 0;
    const sizeString = this.css[2];
    switch (sizeString) {
      case 'l':
      case 'L':
        cs = 0;
        break;

        case 'M':
        case 'm':
          cs = 1;
          break;

        case 's':
        case 'S':
          cs = 2;
          break;

      default:
      cs = 0;
        break;
    }

    // icon colouring
    let clr = 'rgba(200,200,200,1.0)';
    if (this.css[0] && (this.disableControl !== true)) {
      clr = this.css[0];
    } else {
    }
    return ({iconColor: clr, componentSize: cs});
  }

}
