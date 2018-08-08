import { Subscription, Observable } from 'rxjs';
import { LibUDTService } from '../libUDT.service';
import { IUdt, CONST_OBJTYPE } from '../../../_shared/interface/schemaLib.interface';
import { Component, OnInit, OnDestroy, Input, AfterViewInit, OnChanges } from '@angular/core';
import { MsgService } from '../../../_shared/services/msg.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HostListenerService } from '../../../_shared/services/hostListener.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { toArray } from 'rxjs/operators';



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

  /**
   * input parameter(s) to bind with parent/child
   */
  @Input()  udtListIn: IUdt[];


  /**
   * "Public" members to be reflected in html form
   */

      /**
       * Holds all the existing objects found in the database.
       * used for comparision / and display..!
       */
        public udtArr: IUdt[] = [];
        public formGroup: FormGroup;
        public editingUDT: IUdt;  /**New or editing UDT to be held */
        public editingIdx: number; /**IDX of the editing UDT -1 as default */
        public opEdit: boolean; /**which operation is called? new or edit */
        public formHeaderText: string; /** Dynamic text to be displayed on form header */

  /**
   * Memebers for functional use of this component
   */
  _subscriptionGet: Subscription;
  _subscriptionPost: Subscription;


  constructor(
    private _title: Title, // Page Title Serive
    private _libUDTService: LibUDTService,
    private _msg: MsgService,
    public _hostListner: HostListenerService,
    private route: ActivatedRoute,
    private _goTo: Router, ) {

      this.rxF5(); /** without argument = just load the array; don't GET from HTTP */


      /**
       * Edit/ create new
       */
      this.editingIdx = -1; // initialize to default
      this.opEdit = false; // Default operation: Create new with a blank
      /**
       * check router paramenters; if the desired argument exists?
       */
      this.route.paramMap.forEach(
        p =>  {
          if (p.has('idx'))  {
            /**found it..! This is the edit operation */
            this.opEdit = true;
            this.editingIdx = +p.get('idx');
          }
        }
      );

/**
 * Edit operation is detected with index
 */
/**Load the default values ([else] case in following IF) */
    this._title.setTitle('UDT :: CREATE');
    this.editingUDT = new IUdt(); // allocate new
    this.formHeaderText = 'Undefined..!'; // init to default undefined state
    if (this.opEdit) {
      /* The operation is [EDIT] */
      this.udtArr.forEach(u => {
        if (u.ident.idx === this.editingIdx) {
          this.editingUDT = new IUdt(<IUdt>u); // assign a matching udt (overwrite/shallow copy on the [new] UDT)
          this._title.setTitle('UDT :: EDIT :' + this.editingIdx);
          this.formHeaderText = 'Editing the Selected Object'; // new

        }
      });
    } else {
      /* The operation is new create : this has been taken care in initialization */
      this.formHeaderText = 'Create a New Object'; // new
    }

    /**
     * Build a form out of the editing UDT..!
     */
    this.formGroup = this.buildForm(<IUdt>this.editingUDT);

    }

  ngOnInit() {
    /**
     * scroll to the top when page is drawn
     */
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

  /**
   * Navigate back to list page: e.g. After delete
   */
navigateTo(path: string) {
  this._goTo.navigateByUrl(path);
}
  /**
   * build the form as default (if no agument; or if UST is passed as an argument..)
   */
  buildForm(editingUDT: IUdt): FormGroup {
      let u: IUdt;
      if (editingUDT) {
        // u  = new IUdt(editingUDT);
        u  = (editingUDT);
      } else { /* The default form build (in case of "add new" request) */
        u  = new IUdt(); /**this case should never be reached as the argument is required */
      }
//      console.log(editingUDT);
 //     console.log('u');
 //     console.log(u);

      const Attr = u.getFormGroup(); // Get attributes in a form of a FormGroup

      /**
       * Add custom (task-specific) field validators
       */
      Attr.get('plcTag.name').setValidators([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
          Validators.pattern(/^[a-zA-Z0-9!#$%^&*()_-]+$/)
        ]); // Sync validators

      Attr.get('plcTag.name').setAsyncValidators([
        this.validateUniqueName.bind(Attr.get('plcTag.name'))
      ]); // Async validators

      // Disable some fields (readonly)
      Attr.get('plcTag.datatype').disable();

      // console.log(Attr);
      return (Attr); /**return  a newly generated FormGroup to caller */
}

validateUniqueName  = (control: AbstractControl): Observable<ValidationErrors> => {
  console.log(control);

  /**
   * pass the own name as an argument to exclude it from the existing scan list..!
   */
  const _ownName = this.opEdit ? this.editingUDT.plcTag.name : undefined;
  return (this._libUDTService.isNameUnique(control.value, _ownName));
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
        () => {
          this.rxF5(true);
          this.editingUDT = new IUdt();
          this.formGroup = this.buildForm(this.editingUDT);


          // this.navigateTo('/libMngr/udt/createUDT');
        }
      );

  }

  updateUDT() {
    /**
     * Load actual (validated) values from the form
     */
    const newUDT: IUdt = this.loadFromForm();

    /**
     * make a update request and upon success, get the entire chunk back (refresh)
     */
    this._subscriptionPost = this._libUDTService.update(<IUdt>(newUDT))
    .subscribe(
    udt => {
      // console.log(udt);
      const u: IUdt = udt;
      this._msg.add('UDT: "' + u.plcTag.name + '" updated Successfully..!'); },
      err => {},
      () => {
        /**
         * After the observer is finished (on complete,)
         * + Refresh the updated data
         * + Mark the form group (and all its children) as pristine (non Dirty) to disable the save Trigger
         *   This has been saved and let's not give a user the ability to keep saving and not making senseless http requests
         */
        this.rxF5(true);
        /**
         *  + Mark the form group (and all its children) as pristine (non Dirty) to disable the save Trigger
         *   This has been saved and let's not give a user the ability to keep saving and not making senseless http requests
         */
        this.formGroup.markAsPristine();
      }
    );
}

deleteUDT() {
  /**
   * Load actual (validated) values from the form
   */
  const delUDT: IUdt = this.loadFromForm();

  /**
   * make a update request and upon success, get the entire chunk back (refresh)
   */
  this._subscriptionPost = this._libUDTService.deleteSingle(<IUdt>(delUDT))
  .subscribe(
  udt => {
    // console.log(udt);
    const u: IUdt = udt;
    this._msg.add('UDT: "' + u.plcTag.name + '" is Deleted..!'); },
    err => {},
    () => {
      // this.rxF5(true); // do not update on delete - we would just get out of this page..
      this.navigateTo('/libMngr/udt');
    }
  );
}

addNewVar() {
  if (this.editingUDT) {
    this.editingUDT =  new IUdt(this.loadFromForm());
    this.editingUDT.addNewVar();
    this.formGroup = this.buildForm(this.editingUDT);
    // console.log(this.editingUDT);

    this.formGroup.markAsDirty();

  }
}

  x() {
    // this.formGroup = this.buildForm(this.editingUDT);
    console.log(this.formGroup);

  }

  onFormchange() {
    // console.log('chnged');
    // this.editingUDT =  new IUdt(this.loadFromForm());
    // this.formGroup = this.buildForm(this.editingUDT);
  }
}
