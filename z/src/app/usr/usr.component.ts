import { ITmp } from './../../_shared/interface/tmp';

import { HttpTxRxService} from './../../_shared/services/http-TxRx.service';
import { Component, OnInit, NgModule } from '@angular/core';


@Component({
  selector: 'app-usr',
  templateUrl: './usr.component.html',
  styleUrls: ['./usr.component.css'],
  providers: [HttpTxRxService]
})


export class UsrComponent implements OnInit {
public data: ITmp;
public error: string;
//  constructor() { }
/* ngOnInit() {
} */
  constructor(private _httpServ: HttpTxRxService) { }
  ngOnInit() {

  }

  getData() {
    this._httpServ.getData()
    .subscribe(
      data => this.data = data,
      error => this.error = error // error path;
    );
  }

}
