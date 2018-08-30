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
  css: ['iconColor', 'cc'];
  // @Input() styleHints: [];
  @Output() execOnTrigger = new EventEmitter();

  /**
   * public members
   */
  isHovered: boolean;
  iconColor: string;
  myToolTip: String;


  constructor() { }

  ngOnInit() {
    this.isHovered = false;
     this.iconColor = this._redraw();

  }

  // important - to change on enable/disable events
  ngOnChanges() {
    this.iconColor = this._redraw();
  }

  onUserTrigger(_: any) {
    this.execOnTrigger.emit();
    // this.actionTriggered.complete();

  }

  private _redraw(): string {

    // Tool tip
    if (this.tooltipText) {
      this.myToolTip = this.tooltipText;
    } else {
      this.myToolTip = this.actionText;
    }

    let clr = 'rgba(200,200,200,1.0)';
    if (this.css[0] && (this.disableControl !== true)) {
      clr = this.css[0];
    } else {
      return clr;
    }
    return clr;
  }

}
