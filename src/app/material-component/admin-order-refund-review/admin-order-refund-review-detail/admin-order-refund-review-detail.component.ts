import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRefundService } from '../../../../services/admin/admin-refund.service';

@Component({
    selector: 'app-admin-order-refund-review-detail',
    templateUrl: './admin-order-refund-review-detail.component.html',
    styleUrls: ['./admin-order-refund-review-detail.component.css']
})
export class AdminOrderRefundReviewDetailComponent implements OnInit {
    detailId: any;
    selectedTabIndex = 0;    //选中的tab 默认第一个
    addForm!: FormGroup;
    detailModel: any;
    isType: any;
    dataSource: any;
    pro_num_adult: any;
    pro_num_kid: any;
    price_diff: any;
    price_other: any;
    price_total: any;
    price_receive: any;
    selectMemberData: any[] = [];
    setOfCheckedId = new Set<number>();
    setArr = new Set<any>();
    advance: any;
    selectHumans: any;
    basicRefund: any;
    isStandard: any;
    percentage: any;
    percent: any;
    refund_amount: any;
    bascie_money: any;
    isFinished: any;
    RefundLogData: any[] = [];
    isWayFor = true;
    isKidR: any;
    pro_num_baby: any;
    isBabyR: any;
    packAge: any;
    // 还需支付金额
    playMoney: any = 0


    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
        private modal: NzModalService, public adminRefundService: AdminRefundService, public dialog: MatDialog) {
        this.addForm = this.fb.group({
            order_id: [''],
            id: [''],
            type: [''],
            refund_reason: [''],
            refund_to_account: [''],
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
            store_name: [''],
            bank_user: [''],
            bank_address: [''],
            bank_number: [''],
            pay_at: [''],
            transaction_id: [''],
            packAge: [''],
            selectPack: [''],
        })

    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.detailId = params.detailId;
            this.isFinished = params.isFinished;
            this.adminRefundService.getRefundDetail(this.detailId).subscribe(res => {
                this.detailModel = res.data;
                console.log('结果是 :>> ', this.detailModel);
                this.isType = this.detailModel.type == 0 ? "全部退款" : this.detailModel.type == 1 ? "部分退款" : this.detailModel.type == 2 ? '多付返还' : '退保';

                this.pro_num_adult = '￥' + this.detailModel.order?.data?.price_adult + '*' + this.detailModel.order?.data?.num_adult;
                this.pro_num_kid = '￥' + this.detailModel.order?.data?.price_kid + '*' + this.detailModel.order?.data?.num_kid;
                this.pro_num_baby = '￥' + this.detailModel.order?.data?.price_baby + '*' + this.detailModel.order?.data?.baby_num;
                this.isKidR = Number(this.detailModel.order?.data?.price_kid) * Number(this.detailModel.order?.data?.num_kid);
                this.isBabyR = Number(this.detailModel.order?.data?.price_baby) * Number(this.detailModel.order?.data?.baby_num);


                this.price_diff = '￥' + this.detailModel.order?.data?.price_diff + '*' + this.detailModel.order?.data?.num_diff;;
                this.price_total = '￥' + this.detailModel.order?.data?.price_total;
                this.price_receive = '￥' + this.detailModel.order?.data?.price_receive;

                this.playMoney = (Number(this.detailModel.order?.data?.price_total) * 100 - Number(this.detailModel.order?.data?.amount_received) * 100) / 100


                console.log('object :>> ', this.detailModel.price_detail.data,);
                // this.detailModel.price_detail.
                let priceArr = this.detailModel.price_detail.data;
                priceArr.forEach((element: any) => {
                    if (element.type === 0) {
                        element.price = '+￥' + element.price + '*' + element.num;
                    }
                    else {
                        element.price = '-￥' + element.price + '*' + element.num;
                    }
                });
                for (let i = 0; i < priceArr.length; i++) {
                    this.otherArray.push(this.fb.group({
                        name: new FormControl(priceArr[i]?.title),
                        namePrice: new FormControl(priceArr[i]?.price),
                    }))
                }
                console.log('otherArray.controls :>> ', this.otherArray.controls);

                this.selectMemberData = this.detailModel?.member?.data;

                //  申请时间
                let date1 = new Date(format(new Date(this.detailModel?.order?.data?.start_date), 'yyyy,MM,dd'));
                let date2 = new Date(format(new Date(this.detailModel?.created_at), 'yyyy,MM,dd'));
                this.advance = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
                console.log('date1 ', date1, date2, this.advance);
                // 退款标准
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

                // 退款人
                let humans = this.detailModel?.member_detail;
                if (humans[0] != 0) {
                    this.selectHumans = '成人' + humans[0] + '个';
                    if (humans[1] != 0) {
                        this.selectHumans = '成人' + humans[0] + '个|' + '儿童' + humans[1] + '个';
                        if (humans[2] != 0) {
                            this.selectHumans = '成人' + humans[0] + '个|' + '儿童' + humans[1] + '个|' + '婴儿' + humans[2] + '个';
                        }
                    }
                    else if (humans[2] != 0) {
                        this.selectHumans = '成人' + humans[0] + '个|' + '婴儿' + humans[2] + '个';
                    }
                }
                else if (humans[1] != 0) {
                    this.selectHumans = '儿童' + humans[1] + '个';
                    if (humans[2] != 0) {
                        this.selectHumans = '儿童' + humans[1] + '个|' + '婴儿' + humans[2] + '个';
                    }
                }
                else if (humans[2] != 0) {
                    this.selectHumans = '婴儿' + humans[2] + '个';
                }
                this.RefundLogData = this.detailModel?.refund_log?.data;
                this.RefundLogData.forEach((ele: any) => {
                    if (ele.pay_type === 6) {
                        this.isWayFor === false;
                    }
                    else {
                        this.isWayFor === true;
                    }
                })
                // 按套餐
                this.packAge = '￥' + this.detailModel?.order?.data?.price_inclusive + '*' + this.detailModel?.order?.data?.num_total;
            })
        });
    }




    // 附加
    get otherArray() {
        return this.addForm.get("otherList") as FormArray;
    }



    onTabChange(event: any) {
        this.selectedTabIndex = event;
    }

    next1() {
        this.selectedTabIndex = 1;
    }

    next2() {
        this.selectedTabIndex = 2;
    }



    return() {
        this.router.navigate(['/admin/main/refundReview'], { queryParams: { tabIndex: 1 } });
    }


    // 跳转到用户记录
    routeIt(data: any) {
        console.log("data", data);
        this.router.navigate(['/admin/main/userMoneyLog'], { queryParams: { user_id: data } });
    }
}
