import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../_shared/services/navigation.service';

@Component({
  selector: 'app-prjManager',
  templateUrl: './prjManager.component.html',
  styleUrls: ['./prjManager.component.css']
})
export class PrjManagerComponent implements OnInit {

  constructor(
    private _title: Title, // Page Title Serive
    private _nav: NavigationService
  ) {
    this._title.setTitle('Projects | Home');
    this._nav.clearLinks();
  }

  ngOnInit() {
    // Navigation set
    this._nav.clearLinks();
    this._nav.addNavLink('Lib Manager', '/libMngr/udt');
    this._nav.addNavLink('login', '/usrAuth/signin');

    // console.log(this._nav);
  }

}
