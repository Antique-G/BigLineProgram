import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-free-price-detail',
  templateUrl: './free-price-detail.component.html',
  styleUrls: ['./free-price-detail.component.css']
})
export class FreePriceDetailComponent implements OnInit {
  addForm!: FormGroup;
  @Input() data: any;
  audlts: any;
  audltAllPrice: any;
  childs: any;
  childAllPrice: any;
  rooms: any;
  difAllPrice: any;
  totalPrice: any;

  basicPrice: any;


  constructor(public fb: FormBuilder, private modal: NzModalService) {
    this.addForm = this.fb.group({
      money: ['',],
    })
  }

  ngOnInit(): void {
    console.log('object :>> ', this.data);
    this.audlts = this.data?.audlts;
    this.audltAllPrice = Number(this.data?.feeAll?.adult_price) * Number(this.audlts);
    this.childs = this.data?.childs;
    this.childAllPrice = Number(this.data?.feeAll?.child_price) * Number(this.childs);
    this.basicPrice = Number(this.audltAllPrice) + Number(this.childAllPrice);
    this.rooms = this.data?.rooms;
    this.difAllPrice = Number(this.data?.feeAll?.difference_price) * Number(this.rooms);
    this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice);
  }

  onEnter(data: any) {
    this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice) - Number(this.addForm.value.money);
  }

  update() {
    let a = { totalPrice: this.totalPrice, discount: Number(this.addForm.value.money) };
    return a
  }
}
