import { IProject } from './../../../_shared/interface/IProject.interface';
import { PrjCrudService } from './../prj-crud.service';
import { OnDestroy } from '@angular/core';

/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-17 09:08:33
 * @modify date 2018-09-17 09:08:33
 * @desc [description]
*/
import { FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AsyncInputValidationService } from './../../../_shared/services/asyncInputValidation.service';
import { HostListenerService } from './../../../_shared/services/hostListener.service';
import { MsgService } from './../../../_shared/services/msg.service';
import { Title } from '@angular/platform-browser';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'prj-CreateEdit',
  templateUrl: './prj-CreateEdit.component.html',
  styleUrls: ['./prj-CreateEdit.component.css']
})
export class PrjCreateEditComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public formHeaderText: string; /** Dynamic text to be displayed on form header */

  public visible: {
    exportDialog: boolean;
    deleteConfirmationDialog: boolean;
  };
  public editing: {
    opEdit: boolean; /**which operation is called? new or edit */
    prj: IProject;  /**New or editing object to be held */
    idx: number; /**IDX of the editing object -1 as default */
    _prjNum: {
      identifier: string;
      isUnique: boolean;
    };
    _prjDescr: string;
  };

  private _subscriptions: {
    get: Subscription;
    post: Subscription;
  };
  constructor(
    private _title: Title, // Page Title Serive
    private _msg: MsgService,
    public _hostListner: HostListenerService,
    private route: ActivatedRoute,
    private _goTo: Router,
    private _asyncValidation: AsyncInputValidationService,
    private _crud: PrjCrudService,
  ) {

    this._subscriptions = {
      get: new Subscription,
      post: new Subscription
    };

    // Initialize the editing struct
    this.editing = {
      opEdit: false,
      prj: new IProject(),
      idx: -1, // initialize to default
      _prjNum: {
        identifier: '',
        isUnique: false
      },
      _prjDescr: '',
    };

    // Initialize Visibility controllers
    this.visible = {
      exportDialog: false,
      deleteConfirmationDialog: false
    };



      /**
       * check router paramenters; if the desired argument exists?
       */
      this.route.paramMap.forEach(
        p =>  {
          if (p.has('idx'))  {
            /**found it..! This is the edit operation */
            this.editing.opEdit = true;
            this.editing.idx = +p.get('idx');
          }
        }
      );

      /**Load the default values ([else] case in following IF) */
      this._title.setTitle('PROJECT :: NEW');
      this.formHeaderText = 'Undefined..!'; // init to default undefined state
      if (this.editing.opEdit) {
              /* The operation is [EDIT] */
              this.prjArr.forEach( pr => {
                if (pr.ident.idx === this.editing.idx) {
                  this.editing.prj = new IProject(<IProject>pr); // assign a matching udt (overwrite/shallow copy on the [new] UDT)
                  this._title.setTitle('PROJECT :: EDIT :' + this.editing.idx);
                  this.formHeaderText = 'Editing the Selected Object'; // new
                }
              });
      } else {
      /* The operation is new create : this has been taken care in initialization */
      this.formHeaderText = 'Create a New Object'; // new
      }

      this.formGroup = this.buildForm(<IProject>this.editing.prj);
      // console.log(this.formGroup.get('prj.prod.type'));

  } // c'tor
  loadFromForm(): IProject {
    return(<IProject>this.formGroup.value);
 }
  /**
   * build the form as default (if no agument; or if UDT is passed as an argument..)
   */
  buildForm(_fromObj: IProject): FormGroup {
    let u: IProject;
    if (_fromObj) {
     u  = (_fromObj);
    } else { /* The default form build (in case of "add new" request) */
      u  = new IProject(); /**this case should never be reached as the argument is required */
    }

    const Attr = u.getFormGroup(); // Get attributes in a form of a FormGroup

    /**
     * Add custom (task-specific) field validators
     */
    // Attr.get('prj.number').setValidators([
    //     Validators.required,
    //     Validators.minLength(10),
    //     Validators.maxLength(15),
    //     Validators.pattern(/^[a-zA-Z0-9.,;:><[!#$%^&*()@|+ _-]+$/)
    //   ]); // Sync validators

    // Attr.get('prj.number').setAsyncValidators([
    //   this.validateUniqueName.bind(Attr.get('prj.number'))
    // ]); // Async validators

    // Disable some fields (readonly)
    // Attr.get('**').disable();

    // console.log(Attr);
    return (Attr); /**return  a newly generated FormGroup to caller */
  }

  /**
   * Navigate back to list page: e.g. After delete
   */
  navigateTo(path: string) {
    this._goTo.navigateByUrl(path);
  }

  ngOnInit() {
    this.onFormInputChanged(undefined);
  }

  ngOnDestroy() {
      // prevent memory leak when component destroyed
    if (this._subscriptions.get) {
        this._subscriptions.get.unsubscribe();
    }
    if (this._subscriptions.post) {
      this._subscriptions.post.unsubscribe();
    }
 }

   /**
  * Getters for lists
  */

 get prjArr(): IProject[] {
  return this._crud.li_prj;
}
 get prjNumArr() {
  return this._crud.li_prjNum;
}

get prjNameArr() {
  return this._crud.li_prjName;
}



 r() {
  this._crud._r();
}

c() {
  const _newObj =  new IProject(this.loadFromForm());
  _newObj.rev.update(true, false, false);
  this._subscriptions.post = this._crud._c(_newObj)
  .subscribe(
    (_obj: IProject) => {

      const p = new IProject(_obj);
      console.log(p);
      this._msg.add('Project: ' + p.prj.description + ' Added Successfully..!');
    },
    (_err) => {

    },
    () => {
      // this.r();
      this.navigateTo('/prjManager/prjHome');
    }
  );
}

onFormInputChanged(_: any) {
  let x = new IProject(this.loadFromForm());
  this.editing._prjNum.identifier = x.prj.prjnumId;
  this.editing._prjNum.isUnique = this.validateUniquePrjNumId(this.editing._prjNum.identifier);

  // this.editing._prjDescr = x.prj.product_Type + x.prj.product_Nickname;

  this.editing._prjDescr = x.prj.description;


  x = null;
}

validateUniquePrjNumId  = (c: string): boolean => {
  /**
   * pass the own name as an argument to exclude it from the existing scan list..!
   */
  const _ownName = this.editing.opEdit ? this.editing.prj.prj.prjnumId : undefined;
  return this._asyncValidation.isTextUnique(this.prjNumArr, c, false, _ownName);
}

} // class END
