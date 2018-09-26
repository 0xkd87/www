import { NavigationService } from '../../_shared/services/navigation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';


const url = {
  addUDT: 'http://emis000695/_c/__api/post/post.udt.add.php',
  getListUDT: 'http://emis000695/_c/__api/get/get.udt.list.php'
};

@Component({
  selector: 'app-libMngr',
  templateUrl: './libMngr.component.html',
  styleUrls:
  [
    './../../css-glob/_glob.css',
    './libMngr.component.css',

  ],
  providers: []
})
export class LibMngrComponent implements OnInit, OnDestroy {

  constructor(
    private _title: Title, // Page Title Serive
    private _nav: NavigationService) {
      this._title.setTitle('Library Manager');
      this._nav.clearLinks();
    }

  ngOnInit() {
    this._nav.clearLinks();
    this._nav.addNavLink('PROJECTS', '/prjManager');
    this._nav.addNavLink('UDT', 'udt');
    this._nav.addNavLink('login', '/usrAuth/signin');

    // console.log(this._nav);

  }
  ngOnDestroy() {
     this._nav.clearLinks();
  }

}
