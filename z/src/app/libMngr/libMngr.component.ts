import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Irev, IUdt } from '../../_shared/interface/schemaLib.interface';

import { HttpTxRxService} from '../../_shared/services/http-TxRx.service';

const _url = 'http://emis000695/_c/__api/main.php';


@Component({
  selector: 'app-libMngr',
  templateUrl: './libMngr.component.html',
  styleUrls: ['./libMngr.component.css'],
  providers: [HttpTxRxService]
})
export class LibMngrComponent implements OnInit {
  public datastr: string;
  public d: any; // : string; // ITmp;
  public error: string;
  public data: IUdt;
  public newUDT: IUdt;

  constructor(
    private _title: Title, // Page Title Serive
    private _httpServ: HttpTxRxService
  ) {
      this._title.setTitle('Library Manager');
  }

  ngOnInit() {
  }

  GetAndUpdateData() {
    this.error = ''; // initialize error at the call beginning
    this.data = null;
    this._httpServ.getEncData(_url)
    .subscribe(
      data => {
        this.data = <IUdt>data; // this.mapRx(data);
  //      this.datastr = atob(atob(data)); //JSON.stringify(data);
        this.datastr = JSON.stringify(data);

        console.log(this.data);
      },
      error => this.error = error // error path;
    );

  }

  postReq_CreateUDT() {
    // init
    this.newUDT = null;


  }

}
