import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

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


  constructor(public fb: FormBuilder,private msg: NzMessageService,  private modal: NzModalService) {
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
    console.log('data :>> ', data);
    if (data > this.totalPrice) {
      this.msg.error('优惠价格不能大于总价格');
      this.addForm.patchValue({
        money: 0
      });
      this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice)
    }
    else {
      this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice) - Number(this.addForm.value.money);
      this.totalPrice = this.toDecimal(this.totalPrice);
    }

  }


  toDecimal(x: any) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    f = Math.round(x * 100) / 100;
    return f;
  }

  update() {
    let a = { totalPrice: this.totalPrice, discount: Number(this.addForm.value.money) };
    return a
  }
}
