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
      this.formGroup = this.buildForm();
      console.log(this.formGroup);
    }

  ngOnInit() {
    this.rxF5();
    window.scrollTo(0, 0);
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

  buildForm(): FormGroup {

    const Attr = new FormGroup (
          {
            ident: new FormGroup(
              {
                _uid: new FormControl('xx'),
                hasChildern: new FormControl(true),
                idx: new FormControl(-1),
                lang: new FormControl('en'),
                objType: new FormControl(CONST_OBJTYPE.UDT)
              }),
              plcTag: new FormGroup(
                {
                  name: new FormControl(
                    'LibUDT_...',
                    Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(48)])
                  ),
                  comment: new FormGroup(
                    {
                      en: new FormControl
                      ('//s',
                        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(256)])
                      )
                    }
                  ),

                })
          });


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

  x(requiredControl: string): AbstractControl {
    console.log(this.formGroup.get(requiredControl));
    return(<AbstractControl>this.formGroup.get(requiredControl));
  }
}
