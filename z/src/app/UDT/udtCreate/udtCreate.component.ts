import { IUdt } from './../../../_shared/interface/schemaLib.interface';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'udtCreate',
  templateUrl: './udtCreate.component.html',
  styleUrls: ['./udtCreate.component.css']
})
export class UdtCreateComponent implements OnInit, OnDestroy {

  @Input()  udtListIn: IUdt[];


  udtList: IUdt[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.udtList = this.route.snapshot.data['udt'];
    console.log(this.udtList);

  }

  ngOnInit() {

/*     this.route.data
      .subscribe((data: { udts: IUdt[] }) => {
        this.udtList = data.udts;
        console.log(data);

      }); */

   // this.udtList = this.udtListIn;

  }

  ngOnDestroy() {

  }
}
