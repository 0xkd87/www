import { Injectable } from '@angular/core';


interface msg{
  idx: number;

}

@Injectable()
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
