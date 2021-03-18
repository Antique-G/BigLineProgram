import { format } from 'date-fns';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ComfirmOrderModel } from '../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';

@Component({
  selector: 'app-admin-order-group-money',
  templateUrl: './admin-order-group-money.component.html',
  styleUrls: ['./admin-order-group-money.component.css']
})
export class AdminOrderGroupMoneyComponent implements OnInit {
  addForm!: FormGroup;
  @Input() data: any;
  isPrice: any;
  comfirmOrderModel: ComfirmOrderModel;
  isShow = true;
  fee: any;


  constructor(public adminOrderGroupTravelService: AdminOrderGroupTravelService) {
    this.addForm = new FormGroup({
      isMoney: new FormControl(''),
      fee: new FormControl('', [Validators.required]),
      pay_type: new FormControl('', [Validators.required]),
      pay_time: new FormControl(null, [Validators.required]),
      transaction_id: new FormControl(''),
    })
    this.comfirmOrderModel = {
      order_id: '',
      fee: '',
      pay_type: '',
      pay_time: '',
      transaction_id: '',
    }
  }

  ngOnInit(): void {
    console.log('this.data :>> ', this.data);
    this.isPrice = (this.data?.price_total - this.data?.price_receive).toFixed(2) + ' 元';
    this.fee = (this.data?.price_total - this.data?.price_receive).toFixed(2);

  }

  setValue() {
    this.comfirmOrderModel.order_id = this.data.id;
    this.comfirmOrderModel.fee = this.fee;
    this.comfirmOrderModel.pay_type = this.addForm.value.pay_type;
    this.comfirmOrderModel.pay_time = format(new Date(this.addForm.value.pay_time), 'yyyy-MM-dd HH:mm:ss');
    this.comfirmOrderModel.transaction_id = this.addForm.value.transaction_id;
  }

  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("this.addForm.valid", this.addForm.valid);
    console.log("this.addForm.valid", this.addForm);
    if (this.addForm.valid) {
      this.adminOrderGroupTravelService.comfirmOrder(this.comfirmOrderModel).subscribe(res => {
        console.log('res :>> ', res);
      }
        ,
        err => {
          console.log('res :>> ',);
        })
    }

  }


  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  changeType(data: any) {
    console.log('1312312 ', data, data === 2,);
    if (data === '3') {
      this.isShow = false;
    }
    else {
      this.isShow = true;
    }
  }
}