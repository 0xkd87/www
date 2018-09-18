import { IudtVar } from './../../../_shared/interface/schemaLib.interface';
/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-08-08 11:55:49
 * @modify date 2018-08-13 03:21:08
 * @desc [Create / Update operations in libUDT module]
*/

import { Subscription, Observable } from 'rxjs';
import { LibUDTService } from '../libUDT.service';
import { IUdt, plc, DEV_PLATFORMS } from '../../../_shared/interface/schemaLib.interface';
import { Component, OnInit, OnDestroy, Input, AfterViewInit, OnChanges } from '@angular/core';
import { MsgService } from '../../../_shared/services/msg.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HostListenerService } from '../../../_shared/services/hostListener.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AsyncInputValidationService } from '../../../_shared/services/asyncInputValidation.service';
import { ExportHandlerUDTService } from './../../../_shared/services/exportHandlers/exportHandler-UDT.service';



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
        public dataTypes: string[];
        public udtArr: IUdt[] = [];
        public formGroup: FormGroup;

        public opEdit: boolean; /**which operation is called? new or edit */
        public formHeaderText: string; /** Dynamic text to be displayed on form header */

        public editingObj: {
          u: IUdt;  /**New or editing UDT to be held */
          idx: number; /**IDX of the editing UDT -1 as default */
        };

        public visible: {
          exportDialog: boolean;
          deleteConfirmationDialog: boolean;
        };

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
    private _goTo: Router,
    private _asyncValidation: AsyncInputValidationService,
    private _exp: ExportHandlerUDTService,
   ) {
    this.udtArr = []; // initialize when called.. otherwise the async data will be keep appended..!


      this.rxF5(); /** without argument = just load the array; don't GET from HTTP */

      this.editingObj = {
        u: new IUdt(),
        idx: -1 };

      // Visibility controllers
      this.visible = {
        exportDialog: false,
        deleteConfirmationDialog: false
      };

      /**
       * Edit/ create new
       */
      this.editingObj.idx = -1; // initialize to default
      this.opEdit = false; // Default operation: Create new with a blank

        /**
       * check router paramenters; if the desired argument exists?
       */
      this.route.paramMap.forEach(
        p =>  {
          if (p.has('idx'))  {
            /**found it..! This is the edit operation */
            this.opEdit = true;
            this.editingObj.idx = +p.get('idx');
          }
        }
      );

/**
 * Edit operation is detected with index
 */
/**Load the default values ([else] case in following IF) */
    this._title.setTitle('UDT :: CREATE');
    this.editingObj.u = new IUdt(); // allocate new
    this.formHeaderText = 'Undefined..!'; // init to default undefined state
    if (this.opEdit) {
      /* The operation is [EDIT] */
      this.udtArr.forEach(u => {
        if (u.ident.idx === this.editingObj.idx) {
          this.editingObj.u = new IUdt(<IUdt>u); // assign a matching udt (overwrite/shallow copy on the [new] UDT)
          this._title.setTitle('UDT :: EDIT :' + this.editingObj.idx);
          this.formHeaderText = 'Editing the Selected Object'; // new
        }
      });
    } else {
      /* The operation is new create : this has been taken care in initialization */
      this.formHeaderText = 'Create a New Object'; // new
    }

    /**Populate the data-type name array before bulding the form */
    this.dataTypes = this.updateDataTypeList(this.editingObj.u);

    /**
     * Build a form out of the editing UDT..!
     */
    this.formGroup = this.buildForm(<IUdt>this.editingObj.u);

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


validateUniqueName  = (c: AbstractControl): Observable<ValidationErrors> => {
  //  console.log(c);
  //  console.log(this._libUDTService.namesArr);
  //  console.log('-----');

  /**
   * pass the own name as an argument to exclude it from the existing scan list..!
   */
  const _ownName = this.opEdit ? this.editingObj.u.plcTag.name : undefined;
  return (this._asyncValidation.isTextUnique$(this._libUDTService.namesArr, c.value, false, _ownName));

}

validateUniqueVarName = (_c: AbstractControl, i: number): Observable<ValidationErrors> => {
  /**
   * pass the own name as an argument to exclude it from the existing scan list..!
   */

  let n = this.editingObj.u.vars[i].plcTag.name;
  let _nArr: string[] = [];
  this.loadFromForm().vars.forEach( el => {
    _nArr.push(el.plcTag.name);
  });

     return (this.editingObj.u.vars[i].plcTag.isTextUnique(_nArr, _c.value, false, n));

}

  /**Gets all data with subscription - use this to refresh (i.e. f5) as well */
   rxF5(makeNewReq?: Boolean)  {

    this.udtArr = []; // initialize when called.. otherwise the async data will be keep appended..!
    if (makeNewReq) {
      this.udtArr = this._libUDTService.rx(); /* The data will be automatically populated in the array as it is subscribed */
    }   else {
      this.udtArr = this._libUDTService.rxArr();
    }

     // this.dataTypes = this.updateDataTypeList();

  }

  /**Update the Datatype option list which user can select from
   * This first includes all platform (CPU) specific native datatypes and then adds user created.
   *
   * Direct/Indirect recursion..to be considered.
   *
   * @param excludeUDT The UDT name will not be added to the list to avoid Direct/Indirect recursion
   */
  updateDataTypeList(excludeUDT?: IUdt): string [] {


    let arr: string[] = [];

    let p = new plc(DEV_PLATFORMS.S7_300).dataTypeNameStrings.forEach( n => {
      arr.push(n);
    });

    this.udtArr.forEach( u => {
      let un = u.plcTag.name;
      if ((excludeUDT) && ((excludeUDT.plcTag.name === un)) ) {
        /**Do not include - NOP */
      } else {
        arr.push(un);
      }
    });

    return arr;
  }

  preventRecusion(excludeUDT: IUdt, uArr: IUdt[]): boolean {

    let rec = false;


      if ( (excludeUDT) && (uArr.includes(excludeUDT))) {
        return true;
      }

       return false;
  }

  /**
   * called by html template on change event emitted by childern
   */
  onChildrenVarChanged(_: any) {
      console.log('changed..::');
      console.log(_);

    // this.editingUDT.reIndexMem(0, this.udtArr);
  }

loadFromForm(): IUdt {
  const formUDT: IUdt = this.formGroup.value;
  return formUDT;
}

loadToForm(editingUDT: IUdt) {
// this.formGroup. = editingUDT;

}

createUDT(clone: boolean = false) {
  /**
   * is this a clone request?
   * In case of clone request, make some adjustments
   */
  if (clone) {
    this.formGroup.get('plcTag.name').setValue(this.formGroup.get('plcTag.name').value + '_clone');
  }
  if (this.editingObj.u) {
    this.editingObj.u =  new IUdt(this.loadFromForm());
    /**
     * update revision data
     */
    this.editingObj.u.rev.update(true, false, false);
  }
  // let newUDT = new IUdt(<IUdt>this.loadFromForm());

  this._subscriptionPost = this._libUDTService.addNew(<IUdt>(this.editingObj.u))
  .subscribe(
  udt => {
    // console.log(udt);
    const u: IUdt = udt;
    this._msg.add('UDT: ' + u.plcTag.name + ' Added Successfully..!'); },
    err => {},
    () => {

      // Go back to overview after it has been cloned
      if (clone) {
        // Don't even refresh or rebuild the form - just get out..
        // Refreshing all objects from server is an async operation and buffer will be overwritten in page transition
        this.navigateTo('/libMngr/udt');
      } else {

        // Not a clone operation..! Refresh, rebuild and stay on the page
        this.rxF5(true);
        this.editingObj.u = new IUdt();
        this.formGroup = this.buildForm(this.editingObj.u);
      }
    }
  );

}

  updateUDT() {
    /**
     * Load actual (validated) values from the form
     */

    if (this.editingObj.u) {
      this.editingObj.u =  new IUdt(this.loadFromForm());
    }

    /**
     * update revision data
     */
    this.editingObj.u.rev.update();
    // this.editingObj.u.rev.on = (new Date().toLocaleDateString()) + ' | ' + (new Date().toLocaleTimeString());
    // this.editingObj.u.rev.minor = this.editingObj.u.rev.minor + 1;
    /**
     * make a update request and upon success, get the entire chunk back (refresh)
     */
    this._subscriptionPost = this._libUDTService.update(<IUdt>(this.editingObj.u))
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
        // this.dataTypes = this.updateDataTypeList();

        this.formGroup = this.buildForm(this.editingObj.u);


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
  if (this.editingObj.u) {
    this.editingObj.u =  new IUdt(this.loadFromForm());
    this.editingObj.u.addNewVar();
    this.formGroup = this.buildForm(this.editingObj.u);

    this.formGroup.markAsDirty();

  }
}

deleteVar (varIdx: number) {
  if (this.editingObj.u) {
    this.editingObj.u =  new IUdt(this.loadFromForm());
    this.editingObj.u.deleteVar(varIdx);
    this.formGroup = this.buildForm(this.editingObj.u);

    this.formGroup.markAsDirty();

  }
}

swapVar(varIdx: number, up: boolean= false) {
  if (this.editingObj.u) {
    this.editingObj.u =  new IUdt(this.loadFromForm());
    if (up) {
      this.editingObj.u.swapVar(varIdx, (varIdx - 1));
    } else {
      this.editingObj.u.swapVar(varIdx);
    }
    this.formGroup = this.buildForm(this.editingObj.u);

    this.formGroup.markAsDirty();

  }

}



/**
 * Size of the editing UDT
 */
get bitWeight() {
/*   const x = () => {
    return (new IUdt(this.loadFromForm()).reIndexMem(0, this.udtArr));
  };
  return (x()); */

   return (new IUdt(this.loadFromForm()).reIndexMem(0, this.udtArr));

  // return (this.editingUDT.reIndexMem(0, this.udtArr));

}

get refreshBlockSize() {
  const u = new IUdt(this.loadFromForm());
  u.reIndexMem(0, this.udtArr);
  return u;
}

  x(_varIdx: number) {

  }

  exportHandler(_evTriggerIdx: number) {
     console.log(_evTriggerIdx);
     const x = new IUdt(this.loadFromForm());
     const _memAl = ((_evTriggerIdx === 121) || (_evTriggerIdx === 122)) ? 32 : 16;
     x.reIndexMem(0, this.udtArr, _memAl);

     switch (_evTriggerIdx) {

       // S7 + Galileo Error Interface Array
        case 111:
          this._exp.AsErrorDBGalileo10(x); // Memory Alignment is take care already
          break;
      // s7 + Galileo HMI interface : Export as DB source
        case 112:
          this._exp.AsDBSrcGalileo10(x);
          break;

      // Export as DB source: TIA Portal
        case 211:
          this._exp.AsTIASrc(x, true);
          break;

      // Export as DB source: TIA Portal
        case 212:
          this._exp.AsTIASrc(x, false);
          break;

        // Export as JSON
        case 411:
        this._exp.AsJsonObj(x);
        break;

       default:
         break;
     }
  }
  /**
   * build the form as default (if no agument; or if UDT is passed as an argument..)
   */
  buildForm(editingUDT: IUdt): FormGroup {
    let u: IUdt;
    if (editingUDT) {
      // u  = new IUdt(editingUDT);
      u  = (editingUDT);
    } else { /* The default form build (in case of "add new" request) */
      u  = new IUdt(); /**this case should never be reached as the argument is required */
    }

    const Attr = u.getFormGroup(); // Get attributes in a form of a FormGroup

    /**
     * Add custom (task-specific) field validators
     */
    Attr.get('plcTag.name').setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
        Validators.pattern(/^[a-zA-Z0-9!#$%^&*()_-]+$/)
      ]); // Sync validators

    Attr.get('plcTag.name').setAsyncValidators([
      this.validateUniqueName.bind(Attr.get('plcTag.name'))
    ]); // Async validators

    // this.formGroup.controls['vars'].controls[i]
    u.vars.forEach( (v, i) => {
      ((<FormGroup>Attr.controls['vars']).controls[i].get('plcTag.name')).setAsyncValidators([
          this.validateUniqueVarName.bind(u.vars, ...[((<FormGroup>Attr.controls['vars']).controls[i].get('plcTag.name')), i])
      ]); // Async validators
    });
    // Disable some fields (readonly)
    Attr.get('plcTag.datatype').disable();

    // console.log(Attr);
    return (Attr); /**return  a newly generated FormGroup to caller */
  }
} // class end
