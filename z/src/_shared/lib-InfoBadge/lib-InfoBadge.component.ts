/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-10-01 12:04:03
 * @modify date 2018-10-01 12:04:03
 * @desc [description]
*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'lib-InfoBadge',
  templateUrl: './lib-InfoBadge.component.html',
  styleUrls: ['./lib-InfoBadge.component.css']
})
export class LibInfoBadgeComponent implements OnInit {

// input parameter(s) to bind with parent/child
  /* Value to be displayed*/
  @Input()  value: string;

    /* optional: unit of diplaying value */
  @Input()  unit?: string;

  /* optional: Descriptive text of the value which is being displayed */
  @Input()  descr?: string;

  /* optional: Descriptive text of the value which is being displayed */
  @Input()  css?: string[];

    /* optional: Output event */
  @Output() evTrigger = new EventEmitter();

  /*
 Function pack
*/
public Fn: {
  // /* Value to be displayed*/
  value: () => string;

  // /* optional: Descriptive text of the value which is being displayed */
  description: () => string;

  // /* optional: unit of diplaying value */
  unit: () => string;

  sizeFactor: () => SafeStyle;

  valueColor: () => SafeStyle;

};

  constructor(private sanitizer: DomSanitizer) {
    this.Fn = {
      // /* Value to be displayed*/
      value: () => this.value,
      // /* optional: Descriptive text of the value which is being displayed */
      description: () => {
                          if ((this.descr) && (this.descr !== '') ) {
                            return this.descr;
                          }
                          return '';
      },
      // /* optional: unit of diplaying value */
      unit: () => {
        if ((this.unit) && (this.unit !== '') ) {
          return this.unit;
        }
        return '';
      },

      sizeFactor: () => {
        let z = 45;
        z = 45 - (this.Fn.value().toString().length * 3);

          /* font-size: 32px; line-height: 40px; */
        const s = 'font-size:' + z + 'px;' + 'line-height:' + z + 'px;';
        return (this.sanitizer.bypassSecurityTrustStyle(s));
      },

      valueColor: () => {
        let s = 'rgb(183, 231, 26)'; // default color
        if ((this.css) && (this.css[0]) && (this.css[0] !== '')) {
          s = this.css[0];
        }
        return (this.sanitizer.bypassSecurityTrustStyle(s));
      },

    };
  }



  ngOnInit() {
  }

    // Event Trigger Handler
    onActionTrigger(_: any) {
      this.evTrigger.emit();
    }


}
