import { NavigationService } from './../services/navigation.service';
import { Component, OnInit , HostListener} from '@angular/core';
@Component({
  selector: 'ui-nav',
  templateUrl: './ui-nav.component.html',
  styleUrls: ['./ui-nav.component.css']
})
export class UiNavComponent implements OnInit {


  _isVisible: boolean;
  constructor(public nav: NavigationService) {
    this._isVisible = false;
   }

  ngOnInit() {
   // this._isVisible = false;
  }

  OnClickToggleVisButton()  {
    this._isVisible = !this._isVisible;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(scrolledY: number): boolean {
    const posY = window.scrollY ;
    console.log(posY);
    if (posY > scrolledY) {
      return  true;
    } else if (posY < (scrolledY - 1)) {
      return false;
    }
  }

}



