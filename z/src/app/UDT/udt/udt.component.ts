import { LibUDTService } from '../libUDT.service';
import { HostListenerService } from '../../../_shared/services/hostListener.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IUdt, CONST_OBJTYPE} from '../../../_shared/interface/schemaLib.interface';
import { UdtCreateComponent } from '../udtCreate/udtCreate.component';


@Component({
  selector: 'app-udt',
  templateUrl: './udt.component.html',
  styleUrls:
  [
    './../../../css-glob/_glob.css',
    './udt.component.css',
],
providers: [
//  LibUDTService
]
})
export class UdtComponent implements OnInit, OnDestroy {

  showAddDialog: boolean;
  public newUDT: IUdt;

  _rxArr: IUdt[] = [];

  _subscriptionPost: Subscription;
  _subscriptionGet: Subscription;

  constructor(
    private _title: Title, // Page Title Serive
    public _hostListner: HostListenerService,
    private _libUDTService: LibUDTService,
  ) {
      this._title.setTitle('UDT');
      this._rxArr = [];
/* register to the subscription */

/*       this._subscriptionGet = this._libUDTService._rx$.subscribe(
        rxUDT => {
          this._rxArr.push(rxUDT); }
      ); */
    }

  ngOnInit() {
    this._rxArr = [];
    this.showAddDialog = false;
    this.rxF5(); // update / fetch and refresh all data on init..!
    /**
     * scroll to the top when page is drawn
     */
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    console.log('destr');
    this._rxArr = []; /**delete the array */
  }


/**Gets all data with subscription - use this to refresh (i.e. f5) as well */
  rxF5()  {
    this._rxArr = new Array<IUdt>(); // initialize when called.. otherwise the async data will be keep appended..!
    this._rxArr = <IUdt[]>this._libUDTService.rx(); /* The data will be automaticcally populated in the array as it is subscribed */
  }

  isValidForm(i: number): boolean {
    if (i >= 0) {

      if (this._rxArr && this._rxArr.length > 0) {
      }

    }
    /**Default return to False */
    return false;
  }





}
