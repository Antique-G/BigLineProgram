import { format } from 'date-fns';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { StoreOrderGroupTravelService } from '../../../../../services/store/store-order/store-order-group-travel.service';
import { ComfirmOrderModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';

@Component({
  selector: 'app-store-order-group-money',
  templateUrl: './store-order-group-money.component.html',
  styleUrls: ['./store-order-group-money.component.css']
})
export class StoreOrderGroupMoneyComponent implements OnInit {
  addForm!: FormGroup;
  @Input() data: any;
  isPrice: any;
  comfirmOrderModel: ComfirmOrderModel;


  constructor(public storeOrderGroupTravelService: StoreOrderGroupTravelService) {
    this.addForm = new FormGroup({
      isMoney: new FormControl(''),
      fee: new FormControl('', [Validators.required]),
      pay_type: new FormControl('', [Validators.required]),
      pay_time: new FormControl(null, [Validators.required]),
      transaction_id: new FormControl('', [Validators.required]),
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
    this.isPrice = this.data?.price_total - this.data?.price_receive;
  }

  setValue() {
    this.comfirmOrderModel.order_id = this.data.id;
    this.comfirmOrderModel.fee = this.addForm.value.fee;
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
      this.storeOrderGroupTravelService.comfirmOrder(this.comfirmOrderModel).subscribe(res => {
        console.log('res :>> ', res);
      }
        ,
        err => {
          console.log('res :>> ', );
        })
    }

  }


  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }
}
