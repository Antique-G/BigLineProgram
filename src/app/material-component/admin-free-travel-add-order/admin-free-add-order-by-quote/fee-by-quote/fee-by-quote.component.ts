import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-fee-by-quote',
  templateUrl: './fee-by-quote.component.html',
  styleUrls: ['./fee-by-quote.component.css']
})
export class FeeByQuoteComponent implements OnInit {
  addForm!: FormGroup;
  @Input() data: any;
  packs: any;
  packPrice: any;
  totalPrice: any;

  basicPrice: any;
  precision = 2;
  cutValue = 0;

  constructor(public fb: FormBuilder, private msg: NzMessageService, private modal: NzModalService) {
    this.addForm = this.fb.group({
      money: [0,],
      other_price: [0,],

    })
  }

  ngOnInit(): void {
    console.log('object :>> ', this.data);
    this.packs = this.data?.packNum;
    this.packPrice = Number(this.data?.feeAll?.inclusive_price) * Number(this.packs);
    this.basicPrice = Number(this.packPrice);
    this.totalPrice = Number(this.basicPrice);
  }



  onEnter(data: any) {
    this.totalPrice = Number(this.basicPrice);
    if (Number(data) > Number(this.totalPrice)) {
      this.msg.error('优惠价格不能大于总价格');
      this.addForm.patchValue({
        money: 0
      });
      this.totalPrice = Number(this.basicPrice);
    }
    else {
      this.totalPrice = Number(this.basicPrice) - Number(this.addForm.value.money) + Number(this.addForm.value.other_price);
      this.totalPrice = this.toDecimal(this.totalPrice);
    }

  }


  onEnter1(data: any) {
    this.totalPrice = Number(this.basicPrice) - Number(this.addForm.value.money) + Number(this.addForm.value.other_price);
    this.totalPrice = this.toDecimal(this.totalPrice);

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
    let a = { totalPrice: this.totalPrice, discount: Number(this.addForm.value.money), other_price: Number(this.addForm.value.other_price) };
    return a
  }
}
