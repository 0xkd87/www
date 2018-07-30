import { map, switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { LibUDTService } from './../libUDT.service';
import { IUdt, CONST_OBJTYPE } from './../../../_shared/interface/schemaLib.interface';
import { Component, OnInit, OnDestroy, Input, AfterViewInit, OnChanges } from '@angular/core';
import { MsgService } from '../../../_shared/services/msg.service';
import { Title } from '../../../../node_modules/@angular/platform-browser';
import { FormGroup, Validators } from '@angular/forms';
import { HostListenerService } from '../../../_shared/services/hostListener.service';
import { ActivatedRoute, ParamMap } from '../../../../node_modules/@angular/router';



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
  _subscriptionPost: Subscription;

  udtArr: IUdt[] = [];

  public formGroup: FormGroup;
  public editingUDT: IUdt;
  public editingIdx: number;
  opEdit: boolean; /**which operation is called? new or edit */

  constructor(
    private _title: Title, // Page Title Serive
    private _libUDTService: LibUDTService,
    private _msg: MsgService,
    public _hostListner: HostListenerService,
    private route: ActivatedRoute ) {
      this.editingUDT = new IUdt();
      this.opEdit = false;
      this.udtArr = [];
      this.rxF5();
    this.route.paramMap.forEach(
      p =>  {
        if (p.has('idx'))  {
          this.opEdit = true;
          this.editingIdx = +p.get('idx');
        }
      }
    );
    if (this.opEdit) {
      /* The operation is [EDIT] */
      this._title.setTitle('UDT :: EDIT :' + this.editingIdx);
      this.udtArr.forEach(u => {
        if (u.ident.idx === this.editingIdx) {
          this.editingUDT = new IUdt(<IUdt>u);
        }
      });
      this.formGroup = this.buildForm( <IUdt>this.udtArr[0] );

    } else {
      /* The operation is new create */
      this._title.setTitle('UDT :: CREATE');
    }
      this.formGroup = this.buildForm(<IUdt>this.editingUDT);
    }

  ngOnInit() {
    window.scrollTo(0, 0);

   // this.formGroup = this.buildForm( <IUdt>this.editingUDT );
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
    if (this._subscriptionPost) {
    this._subscriptionPost.unsubscribe();
    }
  }
  ngAfterViewInit() {
  }

  /**
   * build the form as default (if no agument; or if UST is passed as an argument..)
   */
  buildForm(editingUDT?: IUdt): FormGroup {



    let u: IUdt;
      if (editingUDT) {
        u  = new IUdt(editingUDT);

      } else { /* The default form build (in case of "add new" request) */
        u  = new IUdt();
      }

        const Attr = u.getFormGroup();
        return (Attr);
}
  /**Gets all data with subscription - use this to refresh (i.e. f5) as well */
  rxF5(makeNewReq?: Boolean)  {
    this.udtArr = []; // initialize when called.. otherwise the async data will be keep appended..!
    if (makeNewReq) {
      this.udtArr = this._libUDTService.rx(); /* The data will be automaticcally populated in the array as it is subscribed */
    }   else {
      this.udtArr = this._libUDTService.rxArr();
    }
  }

loadFromForm(): IUdt {
  const formUDT: IUdt = this.formGroup.value;
  return formUDT;
}

loadToForm(editingUDT: IUdt) {
// this.formGroup. = editingUDT;

}
    postReq_CreateUDT() {
      const newUDT: IUdt = this.loadFromForm();
      this._subscriptionPost = this._libUDTService.addNew(<IUdt>(newUDT))
      .subscribe(
      udt => {
        // console.log(udt);
        const u: IUdt = udt;
        this._msg.add('UDT: ' + u.plcTag.name + ' Added Successfully..!'); },
        err => {},
        () => this.rxF5(true)
      );

  }

  x() {
    console.log(new IUdt());

  }
}
