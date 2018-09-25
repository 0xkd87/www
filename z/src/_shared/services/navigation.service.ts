import { Injectable } from '@angular/core';


interface InavLink {
  navText: string;
  navRoute: string;
  navIcon: string;
  navColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
constructor() {}
navLinks: InavLink[] = [];
addNavLink(
  navText: string,
  navRoute: string,
  navIcon: string = '' ,
  navColor: string =  'rgb(44, 135, 255)') {
  const newLink: InavLink = {
    navText: navText,
    navRoute: navRoute,
    navIcon: navIcon,
    navColor: navColor
  };
  this.navLinks.push(newLink);
}

// get iconChar() {
//   return
// }

clearLinks() {
  this.navLinks = [];
}

}
