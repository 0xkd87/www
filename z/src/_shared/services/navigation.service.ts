import { Injectable } from '@angular/core';


interface InavLink {
  navText: string;
  navRoute: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
constructor() {}
navLinks: InavLink[] = [];
addNavLink(navText: string, navRoute: string) {
  const newLink: InavLink = {navText, navRoute};
  this.navLinks.push(newLink);
}

clearLinks() {
  this.navLinks = [];
}

}
