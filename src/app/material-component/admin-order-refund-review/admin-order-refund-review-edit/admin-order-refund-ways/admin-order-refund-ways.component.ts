import { format } from 'date-fns';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AdminRefundService } from '../../../../../services/admin/admin-refund.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RefundFinished, RefundlogModel } from '../../../../../interfaces/store/storeRefund/storerefund';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-order-refund-ways',
  templateUrl: './admin-order-refund-ways.component.html',
  styleUrls: ['./admin-order-refund-ways.component.css']
})
export class AdminOrderRefundWaysComponent implements OnInit {
  addForm!: FormGroup;
  detailModel: any;
  isWay = 1;
  order_id: any;
  dataSource: any[] = [];
  isShow = true;
  refundFinished!: RefundFinished;
  refund1Model2: RefundlogModel;
  isDisabled = true;

  @Input() data: any;


  constructor(public fb: FormBuilder, public router: Router,
    public adminRefundService: AdminRefundService, private modal: NzModalService,) {
    this.addForm = this.fb.group({
      id: [''],
      refund_amount: [''],
      order_id: [''],
      way: [''],
      bank_user: [''],
      bank_address: [''],
      bank_number: [''],
      pay_at: [''],
      transaction_id: [''],
    });
    this.refundFinished = {
      refund_id: '',
      refund_log: []
    }
    this.refund1Model2 = {
      pay_type: '',
      refund_amount: '',
      payment_id: '',
      pay_at: '',
      bank_address: '',
      bank_user: '',
      bank_number: '',
    }
  }

  ngOnInit(): void {
    this.detailModel = this.data;
    this.order_id = this.detailModel?.order_id;
    this.adminRefundService.getPayLog(this.order_id).subscribe(res => {
      console.log('结果是22222222 :>> ', res);
      this.dataSource = res.data;
      if(this.detailModel?.refund_amount==0){
        this.dataSource.forEach((element) => {
          element['addNum'] = 0;
        })
      }
     else{
      this.dataSource.forEach((element) => {
        element['addNum'] = '';
      })
     }
    })
  }



  setValue() {
    this.refundFinished.refund_log = [];
    console.log('23423 ', this.dataSource);
    let newArr: any[] = [];
    this.dataSource.forEach((element: any) => {
      if (Number(element.addNum) >= 0) {
        let i = { "pay_type": element.pay_type, "refund_amount": element.addNum, "payment_id": element.id };
        newArr.push(i)
      }
    })
    console.log('newArr :>> ', newArr);
    if (this.isShow === true) {
      this.refundFinished.refund_id = this.detailModel?.id;
      this.refundFinished.refund_log = newArr;
    }
    else {
      // 银行转账
      this.refund1Model2.pay_type = 6;
      this.refund1Model2.pay_at = format(new Date(this.addForm.value.pay_at), 'yyyy-MM-dd HH:mm:ss');
      this.refund1Model2.bank_address = this.addForm.value.bank_address;
      this.refund1Model2.bank_user = this.addForm.value.bank_user;
      this.refund1Model2.bank_number = this.addForm.value.bank_number;
      this.refund1Model2.refund_amount = this.addForm.value.refund_amount;
      this.refundFinished.refund_id = this.detailModel?.id;
      this.refundFinished.refund_log.push(this.refund1Model2);
    }
    console.log('提交的 :>> ', this.refundFinished.refund_log);

  }


  add() {
    this.setValue();
    this.modal.confirm({
      nzTitle: "<h4>提示</h4>",
      nzContent: "<h6>请确认填写金额是否准确,确认后退款信息将无法再修改！</h6>",
      nzOnOk: () => {
        this.adminRefundService.postRefundFinished(this.refundFinished).subscribe(res => {
          console.log('res ', res);
          this.router.navigate(['/admin/main/refundReview'], { queryParams: { tabIndex: 1 } });
        },
          error => {

            return;

          })
      }

    })
  }



  changeWay(event: any) {
    if (event === 1) {
      this.isShow = true;
    }
    else if (event === 2) {
      this.isShow = false;
    }
  }


  numTest1(data: any) {
    console.log('data :>> ', data,)
    data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  }
}
