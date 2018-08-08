import { map, pairwise, distinctUntilChanged, share, throttleTime } from 'rxjs/operators';
import { Injectable  } from '@angular/core';
import { fromEvent } from 'rxjs';




@Injectable({
  providedIn: 'root' // singleton instance
})
export class HostListenerService {
  y: number;
constructor() {
  const scroll$ = fromEvent(window, 'scroll')
  .pipe(
        throttleTime(10),
        map(() => window.scrollY),
        distinctUntilChanged(),
        share()
    ).subscribe(
                (y) => {
                  this.y = y;
                });

}
  stickyOnWindowScroll(scrolledY: number): boolean {
      if (this.y > scrolledY) {
        return  true;
      } else if (this.y < (scrolledY - 1)) {
        return false;
      }
  }

/*   @HostListener('window:scroll', ['$event'])
  stickyOnWindowScroll(scrolledY: number): boolean {
      const posY = window.scrollY;
      console.log(posY);
      if (posY > scrolledY) {
        return  true;
      } else if (posY < (scrolledY - 1)) {
        return false;
      }
  } */

}
