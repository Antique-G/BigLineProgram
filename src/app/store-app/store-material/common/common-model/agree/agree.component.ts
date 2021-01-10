import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-agree',
  templateUrl: './agree.component.html',
  styleUrls: ['./agree.component.css']
})
export class AgreeComponent implements OnInit {

  constructor(private modalRef: NzModalRef,) { }

  ngOnInit(): void {
  }
  agreeHandle(){
    this.modalRef.destroy()
  }
 
}
