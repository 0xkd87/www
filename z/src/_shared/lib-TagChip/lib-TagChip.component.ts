/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-13 04:32:10
 * @modify date 2018-09-13 04:32:10
 * @desc [description]
*/
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'TagChip',
  templateUrl: './lib-TagChip.component.html',
  styleUrls: ['./lib-TagChip.component.css']
})
export class LibTagChipComponent implements OnInit {
  @Input() tagText: string;
  @Output() evRemoveMe = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onRemoveTrigger(_: any) {
    this.evRemoveMe.emit();
    // this.actionTriggered.complete();

  }
}
