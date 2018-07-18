import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Irev, IUdt, CONST_OBJTYPE } from '../../_shared/interface/schemaLib.interface';

import { HttpTxRxService} from '../../_shared/services/http-TxRx.service';


const url = {
  addUDT: 'http://emis000695/_c/__api/post/post.udt.add.php',
  getListUDT: 'http://emis000695/_c/__api/get/get.udt.list.php'
};

@Component({
  selector: 'app-libMngr',
  templateUrl: './libMngr.component.html',
  styleUrls: ['./libMngr.component.css'],
  providers: [HttpTxRxService]
})
export class LibMngrComponent implements OnInit {

  public formGrp: FormGroup;


  public datastr: string;
  public error: string;
  public newUDT: IUdt;

  data: IUdt[];


  constructor(
    private _fb: FormBuilder,
    private _title: Title, // Page Title Serive
    private _httpServ: HttpTxRxService
  ) {
      this._title.setTitle('Library Manager');

      this.formGrp = this.buildForm(
/*         this.newUDT.Attr.ident._uid: '',
        this.newUDT.Attr.ident.hasChildern: true,
        this.newUDT.Attr.ident.idx: -1,
        this.newUDT.Attr.ident.lang: 'en',
        this.newUDT.Attr.ident.objType: CONST_OBJTYPE.UDT,

        this.newUDT.Attr.rev.major: 0,
        this.newUDT.Attr.rev.minor: 0,
        this.newUDT.Attr.rev.by: '',
        this.newUDT.Attr.rev.on: '',
        this.newUDT.Attr.rev.comment.en: '',

        this.newUDT.Attr.plcTag.isF: false,
        this.newUDT.Attr.plcTag.name: '',
        this.newUDT.Attr.plcTag.datatype: 'UDT',
        this.newUDT.Attr.plcTag.address: '',
        this.newUDT.Attr.plcTag.comment.en: '' */
      );
    }

  ngOnInit() {
    this.GetAndUpdateData();
  }

  buildForm(): FormGroup {
    console.log('fg');

    let Attr = new FormGroup (
          {
            ident: new FormGroup(
              {
                _uid: new FormControl('xx'),
                hasChildern: new FormControl(true),
                idx: new FormControl(-1),
                lang: new FormControl('en'),
                objType: new FormControl(CONST_OBJTYPE.UDT)
              })
          });


      return (Attr);
     }


  GetAndUpdateData()  {
    this.error = ''; // initialize error at the call beginning
    this.data = [];  // no null, no undefined..!
    this._httpServ.getEncData(url.getListUDT)
    .subscribe(
      data => {
        let rxArr = <any[]>data;

        rxArr.forEach(rx => {
          this.data.push(<IUdt>JSON.parse(rx));
        });

/*         for (let rx of rxArr) {
          console.log(<IUdt>JSON.parse(rx));
          this.data.push(<IUdt>JSON.parse(rx));

        } */

        //  this.data = <IUdt[]> data;
         this.datastr = JSON.stringify(data);
      },
      error => this.error = error // error path;
    );

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
//    this.newUDT.Attr.plcTag.name = 'erwf';
//      console.log('Entered: postReq_CreateUDT');
 //     console.log(<IUdt>(newUDT));

      this._httpServ.postTx(url.addUDT, <IUdt>(newUDT))
      .subscribe(udt => {
                this.GetAndUpdateData();
        },
        error => this.error = <any>error);


  }

}
