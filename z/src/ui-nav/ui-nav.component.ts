import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ui-nav',
  templateUrl: './ui-nav.component.html',
  styleUrls: ['./ui-nav.component.css']
})
export class UiNavComponent implements OnInit {

  _isVisible: boolean;
  constructor() { }

  ngOnInit() {
    this._isVisible = false;
  }

  OnClickToggleVisButton()  {
    console.log('function called');
    this._isVisible = !this._isVisible;
    console.log('function end');
  }

}
