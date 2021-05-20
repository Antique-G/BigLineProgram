import { format } from 'date-fns';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRefundService } from '../../../../../services/admin/admin-refund.service';
import { CreateReundModel, ReundCheckModel } from '../../../../../interfaces/store/storeRefund/storerefund';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-a-o-f-t-refund-byquote',
    templateUrl: './a-o-f-t-refund-byquote.component.html',
    styleUrls: ['./a-o-f-t-refund-byquote.component.css']
})
export class AOFTRefundByquoteComponent implements OnInit {
    @Input() data: any;

    addForm!: FormGroup;
    resultForm!: FormGroup;
    detailModel: any;
    isType: any;
    price_other: any;
    price_total: any;
    price_receive: any;
    advance: any;
    isStandard: any;
    percentage: any;
    percent: any;
    reundCheckModel: ReundCheckModel;
    refund_amount: any;
    // 价格变动
    priceDetail: any[] = [];
    // 还需支付金额
    playMoney: any = 0
    nowOrderMoney: any = 0
    oldPriceArr: any[] = []
    dueInMoney: any = 0//代收款金额
    newMoneyArr: any[] = []//改价后的金额

    lastPeople = 0;
    pendingPay = 0;


    // 套餐
    packAge: any;
    isPackRefundBasic: any;
    isPackbasicRefund: any;
    isPack_refund_amount: any;
    selectPack: any;
    // oldPackage
    oldPackage: any;
    newPackage: any;
    nowOrderMoneyPack: any;

    // 退款信息
    content: any;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
        private modal: NzModalService, public adminRefundService: AdminRefundService, public message: NzMessageService,) {
        this.resultForm = this.fb.group({
            reason: ['', [Validators.required]],
            to_account: [0, [Validators.required]],
        })
        this.addForm = this.fb.group({
            order_id: [''],
            id: [''],
            type: [''],
            refund_reason: [''],
            remark: [''],
            created_at: [''],
            product_name: [''],
            product_type: [''],
            product_order_id: [''],
            product_start_date: [''],
            product_num_total: [''],
            product_contact_name: [''],
            product_contact_phone: [''],
            pro_num_adult: [''],
            pro_num_kid: [''],
            pro_num_baby: [''],
            price_diff: [''],
            price_other: [''],
            price_total: [''],
            otherList: this.fb.array([]),
            customer_remarks: [''],
            standard: [''],
            selectHumans: [''],
            basicRefund: [''],
            amount_add: [0],
            amount_cut: [0],
            remarks: [''],
            packAge: [''],
            ispackNum: [1, [Validators.required]],
            isPackbasicRefund: [''],
            selectPack: [''],
            store_name: [''],
            refundRooms: [0],
        })
        this.reundCheckModel = {
            id: '',
            refund_amount: '',
            amount_add: '',
            amount_cut: '',
            members: [],
            remark: '',
            type: '',
            number: '',
            num_room: '',
            change: [],
            reason: '',
            to_account: ''
        }
    }

    ngOnInit(): void {
        this.detailModel = this.data.data;
        console.log('性情是 ', this.detailModel);
        console.log('退款2323结果是 :>> ', this.detailModel);
        this.isType = this.data.type;

        this.price_total = this.detailModel.price_total;
        this.nowOrderMoney = this.detailModel.price_total;
        this.price_receive = this.detailModel.price_receive;
        // 待收款
        this.pendingPay = (Number(this.price_total)*100 - Number(this.detailModel?.amount_received)*100)/100;


        this.playMoney = (Number(this.detailModel.price_total) * 100 - Number(this.detailModel.amount_received) * 100) / 100
        console.log('object :>> ', this.detailModel.price_detail.data,);

        // 优惠附加收费
        this.priceDetail = JSON.parse(JSON.stringify(this.detailModel.price_detail.data))
        let priceArr = JSON.parse(JSON.stringify(this.detailModel.price_detail.data));
        priceArr.forEach((element: any, index: any) => {
            this.oldPriceArr[index] = false
            if (element.type === 0) {
                element.namePrice = '+￥' + element.price + '*' + element.num;
            }
            else {
                element.namePrice = '-￥' + element.price + '*' + element.num;
            }
        });
        // 全额退值直接设为0
        if (this.isType == 0) {
            for (let i = 0; i < priceArr.length; i++) {
                this.otherArray.push(this.fb.group({
                    name: new FormControl(priceArr[i]?.title),
                    namePrice: new FormControl(priceArr[i]?.namePrice),
                    price: new FormControl(priceArr[i].item_type == 3 ? priceArr[i].price : 0),
                    num: new FormControl(priceArr[i]?.num),
                    item_type: new FormControl(priceArr[i]?.item_type),
                    type: new FormControl(priceArr[i]?.type),
                    id: new FormControl(priceArr[i]?.id),
                }))
            }
            let changeModel: any[] = [];
            let otherModel = this.addForm.value.otherList;
            otherModel.forEach((element: any) => {
                console.log("element,", element)
                if (element?.item_type == 0) {
                    let i = { id: element?.id, price: element?.price }
                    changeModel.push(i)
                }
            });
            this.reundCheckModel.change = changeModel;
        }
        else {
            for (let i = 0; i < priceArr.length; i++) {
                this.otherArray.push(this.fb.group({
                    name: new FormControl(priceArr[i]?.title),
                    namePrice: new FormControl(priceArr[i]?.namePrice),
                    price: new FormControl(priceArr[i]?.price),
                    num: new FormControl(priceArr[i]?.num),
                    item_type: new FormControl(priceArr[i]?.item_type),
                    type: new FormControl(priceArr[i]?.type),
                    id: new FormControl(priceArr[i]?.id),
                }))
            }
            let changeModel: any[] = [];
            let otherModel = this.addForm.value.otherList;
            otherModel.forEach((element: any) => {
                console.log("element,", element)
                if (element?.item_type == 0) {
                    let i = { id: element?.id, price: element?.price }
                    changeModel.push(i)
                }
            });
            this.reundCheckModel.change = changeModel;
        }

        console.log('otherArray.controls :>> ', this.otherArray.controls);

        // 提前天数
        let date1 = new Date(format(new Date(this.detailModel?.start_date), 'yyyy,MM,dd'));
        let date2 = new Date(format(new Date(), 'yyyy,MM,dd'));
        this.advance = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);

        if (this.advance > 7) {
            this.isStandard = 0;
            this.percentage = 1;
            this.percent = 100;
        }
        else if (6 <= this.advance && this.advance <= 7) {
            this.isStandard = 1;
            this.percentage = 0.8;
            this.percent = 80;
        }
        else if (4 <= this.advance && this.advance <= 5) {
            this.isStandard = 2;
            this.percentage = 0.7;
            this.percent = 70;
        }
        else if (1 <= this.advance && this.advance <= 3) {
            this.isStandard = 3;
            this.percentage = 0.5;
            this.percent = 50;
        }
        else {
            this.isStandard = 4;
            this.percentage = 0;
            this.percent = 0;
        }

        // 按套餐
        this.packAge = '￥' + this.detailModel?.price_inclusive + '*' + this.detailModel?.num_total;
        this.oldPackage = this.detailModel?.num_total;
        this.newPackage = this.detailModel?.num_total;
        this.nowOrderMoneyPack = this.detailModel?.price_total;
        if (this.isType == 0) {
            this.addForm.patchValue({
                ispackNum: this.detailModel?.num_total
            })
            this.onEnterPack(this.detailModel?.num_total);
        }
        else {
            this.onEnterPack(this.addForm.value.ispackNum);
        }

    }


    // 附加
    get otherArray() {
        return this.addForm.get("otherList") as FormArray;
    }


    numStay(data: any) {
        data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    }

    numStay1(data: any) {
        data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    }


    toDecimal(x: any) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }


    setPackValue() {
        this.reundCheckModel.id = this.detailModel?.id;
        this.reundCheckModel.members = '';
        this.reundCheckModel.refund_amount = this.isPack_refund_amount;
        this.reundCheckModel.amount_add = this.addForm.value.amount_add;
        this.reundCheckModel.amount_cut = this.addForm.value.amount_cut;
        this.reundCheckModel.remark = this.addForm.value.remarks;
        this.reundCheckModel.number = this.addForm.value.ispackNum;
        this.reundCheckModel.num_room = 0;
        this.reundCheckModel.reason = this.resultForm.value.reason;
        this.reundCheckModel.to_account = this.resultForm.value.to_account;
    }


    // 套餐
    onEnterPack(data: any) {
        console.log('data :>> ', data);
        // 选择退款的套餐份数
        this.selectPack = this.addForm.value.ispackNum + '份';
        if (Number(this.addForm.value.ispackNum) > Number(this.detailModel?.num_total)) {
            this.message.error('退款套餐数不能大于付款的套餐份数，请重新输入');
            // 剩余套餐数
            this.newPackage = 0;
        }
        else {
            this.newPackage = Number(this.oldPackage) - Number(this.addForm.value.ispackNum);
        }
        // 订单当前价格 // 当前套套餐
        let packs = Number(this.detailModel?.price_inclusive) * Number(this.newPackage);
        let priceDetail = this.priceDetailChange();
        // 当前订单价钱
        this.nowOrderMoneyPack = Number(packs) + Number(priceDetail);
        // 基础退款金额
        this.isPackRefundBasic = ((Number(this.price_total) * 100 - Number(this.nowOrderMoneyPack) * 100) * Number(this.percentage)) / 100;
        // this.isPackRefundBasic = this.toDecimal(this.isPackRefundBasic);
        this.isPackRefundBasic = ((Number(this.isPackRefundBasic) * 100) / 100).toFixed(2);


        this.isPackbasicRefund = '（' + this.price_total + '-' + this.nowOrderMoneyPack + '）*比例' + this.percent + '%=￥' + this.isPackRefundBasic;
        this.isPackRefundBasic = this.toDecimal(this.isPackRefundBasic);
        // 可退款总金额=基础退款金额+额外退款金额-其他扣除费用-待收款金额
        this.isPack_refund_amount = Number(this.isPackRefundBasic) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut) - Number(this.pendingPay);
        this.isPack_refund_amount = this.toDecimal(this.isPack_refund_amount);
        if (this.isPack_refund_amount < 0) {
            this.message.create('error', `总金额不能小于0`)
        }
    }


    numTestPack(data: any) {
        this.isPack_refund_amount = Number(this.isPackRefundBasic) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut) - Number(this.pendingPay);
        this.isPack_refund_amount = this.toDecimal(this.isPack_refund_amount);
        if (this.isPack_refund_amount < 0) {
            this.message.create('error', `总金额不能小于0`)
        }
    }

    numTestPack2(data: any) {
        this.isPack_refund_amount = Number(this.isPackRefundBasic) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut) - Number(this.pendingPay);
        this.isPack_refund_amount = this.toDecimal(this.isPack_refund_amount);
        if (this.isPack_refund_amount < 0) {
            this.message.create('error', `总金额不能小于0`)
        }
    }



    addPack() {
        this.setPackValue();
        if (this.reundCheckModel.to_account == 1) {
            this.content = '<h5>如果您确认提交退款处理信息无误，提交后退款金额将退至您的小程序账户余额里，请注意查收。'
        }
        else {
            this.content = '<h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。'
        }
        // 部分退款
        if (this.isType == 1) {
            if (Number(this.addForm.value.ispackNum) < Number(this.detailModel?.num_total)) {
                this.reundCheckModel.type = this.isType;
                console.log('提交的 :>> ', this.reundCheckModel);
                this.modal.confirm({
                    nzTitle: '<h4>确认提交退款</h4>',
                    nzContent: this.content,
                    nzOnOk: () =>
                        this.adminRefundService.createRefund(this.reundCheckModel).subscribe(res => {
                            console.log('res :>> ', res);
                            if (res === null) {

                            }
                        })
                });
            }
            else {
                this.reundCheckModel.type = 0;
                console.log('提交的 :>> ', this.reundCheckModel);
                this.modal.confirm({
                    nzTitle: '<h4>确认提交退款</h4>',
                    nzContent: '<h5>因所有套餐份数已选择退款，所以此单改成全额退款</h5>'+this.content,
                    nzOnOk: () =>
                        this.adminRefundService.createRefund(this.reundCheckModel).subscribe(res => {
                            console.log('res :>> ', res);
                            if (res === null) {

                            }
                        })
                });
            }
        }
        else {
            this.reundCheckModel.type = 0;
            console.log('提交的 :>> ', this.reundCheckModel);
            this.modal.confirm({
                nzTitle: '<h4>确认提交退款</h4>',
                nzContent: this.content,
                nzOnOk: () =>
                    this.adminRefundService.createRefund(this.reundCheckModel).subscribe(res => {
                        console.log('res :>> ', res);
                        if (res === null) {

                        }
                    })
            });
        }


    }


    // 计算优惠跟附加
    priceChange(price: any, i: any) {
        let changeModel: any[] = [];
        let otherModel = this.addForm.value.otherList;
        otherModel.forEach((element: any) => {
            console.log("element,", element)
            if (element?.item_type == 0) {
                let i = { id: element?.id, price: element?.price }
                changeModel.push(i)
            }
        });
        this.reundCheckModel.change = changeModel;
        this.oldPriceArr[i] = true;
        this.priceDetailChange();
        this.onEnterPack(1)
    }

    priceDetailChange() {
        let other = this.addForm.value.otherList;
        console.log("111111", other)
        let otherPrice = 0;
        other.forEach((element: any) => {
            if (element?.type == 0) {
                // 保险归为0：，1:,2
                if (element?.item_type == 1 || element?.item_type == 2) {
                    otherPrice = otherPrice + Number(element?.price) * Number(this.lastPeople);
                }
                else {
                    otherPrice = otherPrice + Number(element?.price) * Number(element?.num);
                }

            }
            else {
                otherPrice = otherPrice - Number(element?.price) * Number(element?.num);
            }
        });
        console.log("otherPriceasdasd", otherPrice)
        return otherPrice
    }

}




