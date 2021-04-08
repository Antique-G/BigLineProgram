import { format } from 'date-fns';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ComfirmOrderModel } from '../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

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
  isTypeShow: any;
  isQr: any;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;


  constructor(public adminOrderGroupTravelService: AdminOrderGroupTravelService) {
    this.addForm = new FormGroup({
      isMoney: new FormControl(''),
      fee: new FormControl('', [Validators.required]),
      pay_type: new FormControl('', [Validators.required]),
      pay_time: new FormControl(null, [Validators.required]),
      transaction_id: new FormControl('',[Validators.maxLength(35)]),
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
    this.isPrice = Math.ceil((this.data?.price_total - this.data?.price_receive) * 100) / 100 + ' 元';
    this.fee = Math.ceil((this.data?.price_total - this.data?.price_receive) * 100) / 100;
    // 请求二维码接口
    this.adminOrderGroupTravelService.orderGetPayQr(this.data.id).subscribe(res => {
      console.log('二维码 :>> ', res);
      this.isQr = res.url
    })
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
    this.isTypeShow = data;
    if (data === '3') {
      this.isShow = false;
      this?.addForm?.controls['transaction_id'].setValidators(null);
      this?.addForm?.controls['transaction_id'].updateValueAndValidity();
    }
    else {
      this.isShow = true;
      this?.addForm?.controls['transaction_id'].setValidators([Validators.required,Validators.maxLength(35)]);
      this?.addForm?.controls['transaction_id'].updateValueAndValidity();
    }
  }
}