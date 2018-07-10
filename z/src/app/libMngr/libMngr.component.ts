import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ITmp } from './../../_shared/interface/tmp';

import { HttpTxRxService} from './../../_shared/services/http-TxRx.service';
@Component({
  selector: 'app-libMngr',
  templateUrl: './libMngr.component.html',
  styleUrls: ['./libMngr.component.css'],
  providers: [HttpTxRxService]
})
export class LibMngrComponent implements OnInit {
  public data: ITmp;
  public error: string;
  constructor(
    private _title: Title, // Page Title Serive
    private _httpServ: HttpTxRxService
  ) {
      this._title.setTitle('Library Manager');
  }

  ngOnInit() {
  }

  GetAndUpdateData() {
    this._httpServ.getData()
    .subscribe(
      data => this.data = data,
      error => this.error = error // error path;
    );
  }

}
