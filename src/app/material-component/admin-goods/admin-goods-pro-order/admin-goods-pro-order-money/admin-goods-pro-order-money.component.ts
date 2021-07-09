import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { ComfirmOrderModel, WeChatModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminUserinfoService } from '../../../../../services/admin/admin-userinfo.service';



@Component({
  selector: 'app-admin-goods-pro-order-money',
  templateUrl: './admin-goods-pro-order-money.component.html',
  styleUrls: ['./admin-goods-pro-order-money.component.css']
})
export class AdminGoodsProOrderMoneyComponent implements OnInit {
    addForm!: FormGroup;
    @Input() data: any;
    isPrice: any;
    comfirmOrderModel: ComfirmOrderModel;
    isShow = true;
    fee: any;
    isTypeShow: any;
    isWeChat: any;
    isQr: any;
    elementType = NgxQrcodeElementTypes.URL;
    correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    precision = 2;
    cutValue = 0;
    weChatModel: WeChatModel;

    // 余额支付
    user_id: any;
    isMoney = 0;

    constructor( public adminGoodsService: AdminGoodsService,
        private msg: NzMessageService, public modal: NzModalService,
        public adminUserinfoService: AdminUserinfoService) {
        this.addForm = new FormGroup({
            isMoney: new FormControl(''),
            fee: new FormControl('', [Validators.required]),
            pay_type: new FormControl('', [Validators.required]),
            pay_time: new FormControl(null, [Validators.required]),
            transaction_id: new FormControl('', [Validators.maxLength(35)]),
            money: new FormControl('', [Validators.required]),
        })
        this.comfirmOrderModel = {
            order_id: '',
            fee: '',
            pay_type: '',
            pay_time: '',
            transaction_id: '',
            money: '',
        };
        this.weChatModel = {
            order_id: '',
            fee: '',
        }
    }

    ngOnInit(): void {
        console.log('this.data :>> ', this.data);
        this.isPrice = Number(this.data?.amount_unpaid)
        this.isPrice = this.toDecimal(this.isPrice);
        this.adminUserinfoService.userinfoDetail(this.data?.user_id).subscribe(res => {
            this.isMoney = res?.money;
        })
    }


    toDecimal(x: any) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }


    setValue() {
        this.comfirmOrderModel.order_id = this.data.id;
        this.comfirmOrderModel.fee = this.addForm.value.fee;
        this.comfirmOrderModel.pay_type = this.addForm.value.pay_type;
        this.comfirmOrderModel.pay_time = this.addForm.value.pay_time != '' ? format(new Date(this.addForm.value.pay_time), 'yyyy-MM-dd HH:mm:ss') : '';
        this.comfirmOrderModel.transaction_id = this.addForm.value.transaction_id;
        this.comfirmOrderModel.money = this.addForm.value.money;
    }

    add() {
        this.setValue();
        console.log("提交的内容是", this.comfirmOrderModel)
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("this.addForm.valid", this.addForm);
        if (this.addForm.valid) {
            if (Number(this.addForm.value.fee) > Number(this.isPrice)) {
                this.modal.confirm({
                    nzTitle: '<h4>提示</h4>',
                    nzContent: '<h6>收款金额大于应收金额，请核对是否准确</h6>',
                    nzOnOk: () =>
                        this.adminGoodsService.comfirmGoodOrder(this.comfirmOrderModel).subscribe(res => {
                            console.log('res :>> ', res);
                        }
                            ,
                            err => {
                                console.log('res :>> ',);
                            })
                })
            }
            else {
                this.adminGoodsService.comfirmGoodOrder(this.comfirmOrderModel).subscribe(res => {
                    console.log('res :>> ', res);
                }
                    ,
                    err => {
                        console.log('res :>> ',);
                    })
            }

        }

    }


    onChange(result: Date): void {
        console.log('Selected Time: ', result);
    }

    changeType(data: any) {
        this.isTypeShow = data;
        // 现金支付和余额时候，流水号非必填
        if (data == 3) {
            this.isShow = false;
            this?.addForm?.controls['transaction_id'].setValidators(null);
            this?.addForm?.controls['transaction_id'].updateValueAndValidity();
            return
        }
        // 余额，时间非必填
        else if (data == 7) {
            this?.addForm?.controls['transaction_id'].setValidators(null);
            this?.addForm?.controls['transaction_id'].updateValueAndValidity();
            this?.addForm?.controls['pay_time'].setValidators(null);
            this?.addForm?.controls['pay_time'].updateValueAndValidity();
            return
        }
        else {
            this.isShow = true;
            this?.addForm?.controls['transaction_id'].setValidators([Validators.required, Validators.maxLength(35)]);
            this?.addForm?.controls['transaction_id'].updateValueAndValidity();
            this?.addForm?.controls['pay_time'].setValidators([Validators.required, Validators.maxLength(35)]);
            this?.addForm?.controls['pay_time'].updateValueAndValidity();
            return
        }

    }


    // 微信请求二维码接口
    weChatQr() {
        this.weChatModel.order_id = this.data.id;
        this.weChatModel.fee = this.addForm.value.fee;
        if (Number(this.addForm.value.fee) > Number(this.isPrice)) {
            this.modal.confirm({
                nzTitle: '<h4>提示</h4>',
                nzContent: '<h6>收款金额大于应收金额，请核对是否准确</h6>',
                nzOnOk: () =>
                    this.adminGoodsService.goodOrderGetPayWechatQr(this.weChatModel).subscribe(res => {
                        console.log('二维码 :>> ', res);
                        this.isWeChat = res.url
                    },
                        err => {
                            console.log('res :>> ',);
                        })
            })
        }
        else {
            this.adminGoodsService.goodOrderGetPayWechatQr(this.weChatModel).subscribe(res => {
                console.log('二维码 :>> ', res);
                this.isWeChat = res.url
            },
                err => {
                    console.log('res :>> ',);
                })
        }
    }


    aliPayQr() {
        this.weChatModel.order_id = this.data.id;
        this.weChatModel.fee = this.addForm.value.fee;
        if (Number(this.addForm.value.fee) > Number(this.isPrice)) {
            this.modal.confirm({
                nzTitle: '<h4>提示</h4>',
                nzContent: '<h6>收款金额大于应收金额，请核对是否准确</h6>',
                nzOnOk: () =>
                    this.adminGoodsService.postGoodOrderGetAlipayQr(this.weChatModel).subscribe(res => {
                        console.log('二维码 :>> ', res);
                        this.isQr = res.url
                    },
                        err => {
                            console.log('res :>> ',);
                        })
            })
        }
        else {
            this.adminGoodsService.postGoodOrderGetAlipayQr(this.weChatModel).subscribe(res => {
                console.log('二维码 :>> ', res);
                this.isQr = res.url
            },
                err => {
                    console.log('res :>> ',);
                })
        }
    }



}
