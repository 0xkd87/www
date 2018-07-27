import { Subscription } from 'rxjs';
import { LibUDTService } from './../libUDT.service';
import { IUdt, CONST_OBJTYPE } from './../../../_shared/interface/schemaLib.interface';
import { Component, OnInit, OnDestroy, Input, AfterViewInit, OnChanges } from '@angular/core';
import { MsgService } from '../../../_shared/services/msg.service';
import { Title } from '../../../../node_modules/@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { HostListenerService } from '../../../_shared/services/hostListener.service';



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

  constructor(
    private _title: Title, // Page Title Serive
    private _libUDTService: LibUDTService,
    private _msg: MsgService,
    public _hostListner: HostListenerService)
    {

      this._title.setTitle('Create a New UDT');
//      this.formGroup = this.buildForm( <IUdt>this.udtListIn[0] );


    }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.udtArr = [];
    this.rxF5();
    this.formGroup = this.buildForm( <IUdt>this.udtArr[0]);
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

    console.log(this.udtArr[6]);


    let udt: IUdt;
      if (editingUDT) {
      // udt = <IUdt>this.udtArr[6];
         udt  = new IUdt;

      } else { /* The default form build (in case of "add new" request) */
       udt  = new IUdt;
      }
      console.log(udt);

        const Attr = udt.getFormGroup();
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
