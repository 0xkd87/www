import { MsgService } from './../services/msg.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'msgBoard',
  templateUrl: './msgBoard.component.html',
  styleUrls: [
    './../../css-glob/_glob.css',
    './msgBoard.component.css',

],
  providers: []
})
export class MsgBoardComponent
// implements OnInit
{

  constructor(public messageService: MsgService) { }

 //  ngOnInit() {  }

}
