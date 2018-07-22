import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root', // for singleton instance of this in complete app lifetime
})
export class MsgService {

constructor() { }

messages: string[] = [];

add(message: string) {
  this.messages.push(message);
}

clear() {
  this.messages = [];
}

}
