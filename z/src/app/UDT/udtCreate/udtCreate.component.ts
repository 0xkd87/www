import { Subscription } from 'rxjs';
import { LibUDTService } from './../libUDT.service';
import { IUdt } from './../../../_shared/interface/schemaLib.interface';
import { Component, OnInit, OnDestroy, Input, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'udtCreate',
  templateUrl: './udtCreate.component.html',
  styleUrls:
  [
    './../../../css-glob/_glob.css',
    './udtCreate.component.css'
],
  providers: [
//    LibUDTService
  ]
})
export class UdtCreateComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input()  udtListIn: IUdt[];
  _subscriptionGet: Subscription;
  udtArr: IUdt[] = [];

  constructor(private _libUDTService: LibUDTService) {
  }

  ngOnInit() {
    this.rxF5();

  }


  ngOnChanges() {

    /**This event would only fire when any of the [DATA boud] property is changed
     * i.e. @input/[DOM] / local variable to html...
     */
    this.rxF5();
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    if (this._subscriptionGet) {
      this._subscriptionGet.unsubscribe();
    }
  }
  ngAfterViewInit() {
  }


  /**Gets all data with subscription - use this to refresh (i.e. f5) as well */
  rxF5(makeReq?: Boolean)  {
    this.udtArr = []; // initialize when called.. otherwise the async data will be keep appended..!
    if (makeReq) {
      this.udtArr = this._libUDTService.rx(); /* The data will be automaticcally populated in the array as it is subscribed */
    }   else {
      this.udtArr = this._libUDTService.rxArr();
    }
  }


    postReq_CreateUDT() {
      const newUDT: IUdt = {
        plcTag:
        {
          isF: false,
          name: 'huh',
          datatype:  'BOOL',
          address: 'mm',
          comment:
          {
              en: 'kjhkj',
              de: ''
          }
        }
      } as IUdt;


  /*     this._subscriptionPost = this._httpServ.postTx(url.addUDT, <IUdt>(newUDT))
      .subscribe(
        udt => { console.log(udt); },
        err => {},
        () => this.rxF5()
      ); */

      this._libUDTService.addNew(<IUdt>(newUDT))
      .subscribe(
      udt => {  },
        err => {},
        () => this.rxF5(true)
      );

  }
}
