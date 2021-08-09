import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RefundFinished, RefundlogModel } from '../../../../../interfaces/store/storeRefund/storerefund';
import { AdminRefundService } from '../../../../../services/admin/admin-refund.service';

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
    refundModel3: RefundlogModel;
    isDisabled = true;

    @Input() data: any;
    orderUrl: any;

    constructor(public fb: FormBuilder, public router: Router,
        public adminRefundService: AdminRefundService, private modal: NzModalService,) {
        this.addForm = this.fb.group({
            id: [''],
            refund_amount: ['', [Validators.required]],
            order_id: [''],
            way: [''],
            bank_user: ['', [Validators.required]],
            bank_address: ['', [Validators.required]],
            bank_number: ['', [Validators.required]],
            pay_at: ['', [Validators.required]],
            transaction_id: ['', [Validators.required]],
            refund_amount_to_account: ['', [Validators.required]],
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
        this.refundModel3 = {
            pay_type: '',
            refund_amount: '',
        }
    }

    ngOnInit(): void {

        this.detailModel = this.data;
        console.log("1231232423", this.detailModel)
        this.order_id = this.detailModel?.order_id;
        this.adminRefundService.getPayLog(this.order_id).subscribe(res => {
            console.log('结果是22222222 :>> ', res);
            let newArr: any[] = [];
            res.data.forEach((element: any) => {
                if ([1, 2, 4, 5, 8, 9, 11, 12].indexOf(element?.pay_type) != -1) {
                    newArr.push(element)
                }
            });
            this.dataSource = newArr;
            if (this.detailModel?.refund_amount == 0) {
                this.dataSource.forEach((element) => {
                    element['addNum'] = 0;
                    element['refund_no'] = '';
                    element['pay_at'] = '';
                })
            }
            else {
                this.dataSource.forEach((element) => {
                    element['addNum'] = '';
                    element['refund_no'] = '';
                    element['pay_at'] = '';
                })
            }
            // 没有数据的话，以到余额为基础
            if (this.dataSource.length == 0) {
                this.isWay = 7;
            }
            else {
                this.isWay = 1;
            }
        })
        this.addForm.patchValue({
            refund_amount: this.detailModel?.refund_amount,
            refund_amount_to_account: this.detailModel?.refund_amount,
        })

        // 跟团游
        if (this.detailModel?.product_type == 0) {
            this.orderUrl = '/admin/main/financeGroupTravel/detail?detailId=';
        }
        // 自由行
        else {
            this.orderUrl = '/admin/main/financefreeDTravel/detail?detailId=';

        }
    }



    setValue() {
        this.refundFinished.refund_log = [];
        console.log('23423 ', this.dataSource);
        let newArr: any[] = [];
        this.dataSource.forEach((element: any) => {
            console.log("2323", element)
            if (Number(element.addNum) >= 0) {
                let i = { "pay_type": element.pay_type, "refund_amount": element.addNum, "payment_id": element.id, "refund_no": element.refund_no, "pay_at": element.pay_at ? format(new Date(element.pay_at), 'yyyy-MM-dd HH:mm:ss') : '' };
                newArr.push(i)
            }
        })
        console.log('newArr :>> ', newArr);
        // 原路返回
        if (this.isWay == 1) {
            this.refundFinished.refund_id = this.detailModel?.id;
            this.refundFinished.refund_log = newArr;
            return
        }
        // 银行转账
        if (this.isWay == 2) {
            this.refund1Model2.pay_type = 6;
            this.refund1Model2.pay_at = this.addForm.value.pay_at != '' ? format(new Date(this.addForm.value.pay_at), 'yyyy-MM-dd HH:mm:ss') : '';
            this.refund1Model2.bank_address = this.addForm.value.bank_address;
            this.refund1Model2.bank_user = this.addForm.value.bank_user;
            this.refund1Model2.bank_number = this.addForm.value.bank_number;
            this.refund1Model2.refund_amount = this.addForm.value.refund_amount;
            this.refund1Model2.transaction_id = this.addForm.value.transaction_id;
            this.refundFinished.refund_id = this.detailModel?.id;
            this.refundFinished.refund_log.push(this.refund1Model2);
            return
        }
        // 退至余额
        if (this.isWay == 7) {
            this.refundModel3.pay_type = 7;
            this.refundModel3.refund_amount = this.addForm.value.refund_amount_to_account;
            this.refundFinished.refund_id = this.detailModel?.id;
            this.refundFinished.refund_log.push(this.refundModel3);
            return
        }
        // 多种方式退
        else if (this.isWay == 100) {
            // 原路
            this.refundFinished.refund_id = this.detailModel?.id;
            this.refundFinished.refund_log = newArr;
            // 银行
            this.refund1Model2.pay_type = 6;
            this.refund1Model2.pay_at = this.addForm.value.pay_at != '' ? format(new Date(this.addForm.value.pay_at), 'yyyy-MM-dd HH:mm:ss') : '';
            this.refund1Model2.bank_address = this.addForm.value.bank_address;
            this.refund1Model2.bank_user = this.addForm.value.bank_user;
            this.refund1Model2.bank_number = this.addForm.value.bank_number;
            this.refund1Model2.refund_amount = this.addForm.value.refund_amount;
            this.refund1Model2.transaction_id = this.addForm.value.transaction_id;
            this.refundFinished.refund_log.push(this.refund1Model2);
            // 余额
            this.refundModel3.pay_type = 7;
            this.refundModel3.refund_amount = this.addForm.value.refund_amount_to_account;
            this.refundFinished.refund_log.push(this.refundModel3);
        }
        console.log('提交的 :>> ', this.refundFinished.refund_log, this.refundFinished);

    }


    add() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("this.addForm.valid", this.addForm);
        if (this.addForm.valid) {
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

    }


    changeWay(event: any) {
        if (event == 1) {
            this.isWay = 1;
            this?.addForm?.controls['bank_user'].setValidators(null);
            this?.addForm?.controls['bank_user'].updateValueAndValidity();
            this?.addForm?.controls['bank_address'].setValidators(null);
            this?.addForm?.controls['bank_address'].updateValueAndValidity();
            this?.addForm?.controls['bank_number'].setValidators(null);
            this?.addForm?.controls['bank_number'].updateValueAndValidity();
            this?.addForm?.controls['refund_amount'].setValidators(null);
            this?.addForm?.controls['refund_amount'].updateValueAndValidity();
            this?.addForm?.controls['pay_at'].setValidators(null);
            this?.addForm?.controls['pay_at'].updateValueAndValidity();
            this?.addForm?.controls['transaction_id'].setValidators(null);
            this?.addForm?.controls['transaction_id'].updateValueAndValidity();
            this?.addForm?.controls['refund_amount_to_account'].setValidators(null);
            this?.addForm?.controls['refund_amount_to_account'].updateValueAndValidity();
            return
        }
        if (event == 2) {
            this.isWay = 2;
            this?.addForm?.controls['bank_user'].setValidators([Validators.required]);
            this?.addForm?.controls['bank_user'].updateValueAndValidity();
            this?.addForm?.controls['bank_address'].setValidators([Validators.required]);
            this?.addForm?.controls['bank_address'].updateValueAndValidity();
            this?.addForm?.controls['bank_number'].setValidators([Validators.required]);
            this?.addForm?.controls['bank_number'].updateValueAndValidity();
            this?.addForm?.controls['refund_amount'].setValidators([Validators.required]);
            this?.addForm?.controls['refund_amount'].updateValueAndValidity();
            this?.addForm?.controls['pay_at'].setValidators([Validators.required]);
            this?.addForm?.controls['pay_at'].updateValueAndValidity();
            this?.addForm?.controls['transaction_id'].setValidators([Validators.required]);
            this?.addForm?.controls['transaction_id'].updateValueAndValidity();
            this?.addForm?.controls['refund_amount_to_account'].setValidators(null);
            this?.addForm?.controls['refund_amount_to_account'].updateValueAndValidity();
            return
        }
        if (event == 7) {
            this.isWay = 7;
            this?.addForm?.controls['refund_amount_to_account'].setValidators([Validators.required]);
            this?.addForm?.controls['refund_amount_to_account'].updateValueAndValidity();
            this?.addForm?.controls['bank_user'].setValidators(null);
            this?.addForm?.controls['bank_user'].updateValueAndValidity();
            this?.addForm?.controls['bank_address'].setValidators(null);
            this?.addForm?.controls['bank_address'].updateValueAndValidity();
            this?.addForm?.controls['bank_number'].setValidators(null);
            this?.addForm?.controls['bank_number'].updateValueAndValidity();
            this?.addForm?.controls['refund_amount'].setValidators(null);
            this?.addForm?.controls['refund_amount'].updateValueAndValidity();
            this?.addForm?.controls['pay_at'].setValidators(null);
            this?.addForm?.controls['pay_at'].updateValueAndValidity();
            this?.addForm?.controls['transaction_id'].setValidators(null);
            this?.addForm?.controls['transaction_id'].updateValueAndValidity();
            return
        }
        // 多种方式
        if (event == 100) {
            this.isWay = 100;
            this.addForm.patchValue({
                refund_amount: '',
                refund_amount_to_account: ''
            })
            this?.addForm?.controls['bank_user'].setValidators(null);
            this?.addForm?.controls['bank_user'].updateValueAndValidity();
            this?.addForm?.controls['bank_address'].setValidators(null);
            this?.addForm?.controls['bank_address'].updateValueAndValidity();
            this?.addForm?.controls['bank_number'].setValidators(null);
            this?.addForm?.controls['bank_number'].updateValueAndValidity();
            this?.addForm?.controls['refund_amount'].setValidators(null);
            this?.addForm?.controls['refund_amount'].updateValueAndValidity();
            this?.addForm?.controls['pay_at'].setValidators(null);
            this?.addForm?.controls['pay_at'].updateValueAndValidity();
            this?.addForm?.controls['transaction_id'].setValidators(null);
            this?.addForm?.controls['transaction_id'].updateValueAndValidity();
            this?.addForm?.controls['refund_amount_to_account'].setValidators(null);
            this?.addForm?.controls['refund_amount_to_account'].updateValueAndValidity();
            return
        }

    }


    numTest1(data: any) {
        console.log('data :>> ', data,)
        data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    }
}
