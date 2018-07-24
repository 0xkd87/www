import { HostListenerService } from './../services/hostListener.service';
import { NavigationService } from './../services/navigation.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ui-nav',
  templateUrl: './ui-nav.component.html',
  styleUrls: [
    './../../css-glob/_glob.css',
    './ui-nav.component.css',
  ],
})
export class UiNavComponent implements OnInit {


  _isVisible: boolean;
  constructor(
    public nav: NavigationService,
    public _hostListner: HostListenerService,
  ) {
    this._isVisible = false;
   }

  ngOnInit() {
  }

  OnClickToggleVisButton()  {
    this._isVisible = !this._isVisible;
  }



}



