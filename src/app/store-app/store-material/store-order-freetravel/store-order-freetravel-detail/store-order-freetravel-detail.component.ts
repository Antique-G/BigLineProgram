import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailsModel } from '../../../../../interfaces/store/storeOrder/store-order-free-travel-model';
import { StoreCostService } from '../../../../../services/store/store-cost/store-cost.service';
import { StoreOrderFreeTravelService } from '../../../../../services/store/store-order/store-order-free-travel.service';
import { StoreOrderRequestMoneyComponent } from '../../store-order-group/store-order-group-detail/store-order-request-money/store-order-request-money.component';
import { StoreOrderFreeChangeDateComponent } from './store-order-free-change-date/store-order-free-change-date.component';
import { StoreOrderFreeChangePriceComponent } from './store-order-free-change-price/store-order-free-change-price.component';


@Component({
    selector: 'app-store-order-freetravel-detail',
    templateUrl: './store-order-freetravel-detail.component.html',
    styleUrls: ['./store-order-freetravel-detail.component.css']
})
export class StoreOrderFreetravelDetailComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;
    detailId: any;
    detailModel!: DetailsModel;
    dataMember: any;
    audltPrice: any;
    childPrice: any;
    priceTotal: any;
    dataPayLog: any[] = [];
    refundLog: any[] = [];
    cashList: any[] = [];
    typeList: any[] = [];
    supplyList: any[] = [];
    requestMoneyModel: any;




    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
        public storeOrderFreeTravelService: StoreOrderFreeTravelService, private modal: NzModalService,
        public storeCostService: StoreCostService) {
        this.addForm = this.fb.group({
            order_id: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
            assembling_place: ['', [Validators.required]],
            assembling_time: ['', [Validators.required]],
            contact_name: ['', [Validators.required]],
            contact_phone: ['', [Validators.required]],
            contact_wechat: ['', [Validators.required]],
            contact_qq: ['', [Validators.required]],
            contact_email: ['', [Validators.required]],
            emergency_contact_person: ['', [Validators.required]],
            emergency_contact_number: ['', [Validators.required]],
            customer_remarks: ['', [Validators.required]],
            internal_remarks: ['', [Validators.required]],
            quote_type: ['', [Validators.required]],
            days: [''],
            departure_city_name: [''],
            destination_city_name: [''],
            is_presell: [''],
            code: [''],
        });
        this.requestMoneyModel = {
            cost_type: '',
            price: '',
            num: '',
            content: '',
            suppiler_id: '',
            id: ''
        };
    }

    ngOnInit(): void {
        this.storeCostService.getTypeList(1, 100, 1).subscribe(res => {
            this.typeList = res?.data?.data;
            this.storeCostService.getCashList(1, 100, 1).subscribe(res => {
                console.log('res', res);
                this.supplyList = res?.data?.data;
            });
        });
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.detailId;
            // 详情
            this.getDetail();
        });
    }


    getDetail() {
        this.storeOrderFreeTravelService.getfreeTravelDetail(this.detailId).subscribe(res => {
            console.log("自由行详情结果是", res);
            this.detailModel = res.data;
            // 支付流水
            let pagLogArr: any[] = [];
            res.data?.pay_log?.data.forEach((element: any) => {
                if (element.status == 2 || element.status == 3) {
                    pagLogArr.push(element)
                }
            });
            this.dataPayLog = pagLogArr;
            // 退款流水
            let reFundLogArr: any[] = [];
            res.data?.refund?.data.forEach((element: any) => {
                if (element.status == 2 || element.status == 3) {
                    reFundLogArr.push(element)
                }
            });
            this.refundLog = reFundLogArr;

            this.dataMember = res.data?.member?.data;
            this.dataMember.forEach((element: any) => {
                if (element.birthday === null) {
                    let year = element.id_num.slice(6, 10);
                    let month = element.id_num.slice(10, 12);
                    let date = element.id_num.slice(12, 14);
                    element.birthday = year + '-' + month + '-' + date;
                }
                element['edit'] = false;
                if (element?.assembling_time != null) {
                    let i = '2021-01-01' + ' ' + element?.assembling_time;
                    let newDate = new Date(i);
                    console.log('object :>> ', newDate, i);
                    element.assembling_time = format(new Date(newDate), 'yyyy-MM-dd HH:mm');
                }
            });
            this.cashList = this.detailModel?.cash_requirement?.data;
            this.cashList.forEach((element: any) => {
                element.edit = false;
            });
            this.fee();
        })
    }




    fee() {
        // 费用明细
        this.audltPrice = Number(this.detailModel?.price_adult) * Number(this.detailModel?.num_adult);
        this.childPrice = Number(this.detailModel?.price_kid) * Number(this.detailModel?.num_kid);
        // this.babyPrice = Number(this.detailModel?.price_baby) * Number(this.detailModel?.baby_num);
        this.priceTotal = Number(this.detailModel?.price_total) - Number(this.detailModel?.amount_received);
        this.priceTotal = this.toDecimal(this.priceTotal);
    }


    // 保留两位小数
    toDecimal(x: any) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }


    // 订单修改日期
    changePrice() {
        const editmodal = this.modal.create({
            nzTitle: '订单改价',
            nzContent: StoreOrderFreeChangePriceComponent,
            nzComponentParams: {
                data: this.detailModel
            },
            nzFooter: [
                {
                    label: '提交',
                    onClick: componentInstance => {
                        componentInstance?.update()
                    }
                }
            ]
        })
        editmodal.afterClose.subscribe(res => {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;

                // 详情
                this.getDetail();

            });
        })

    }


    // 订单修改日期
    changeDate() {
        const editmodal = this.modal.create({
            nzTitle: '订单修改日期',
            nzWidth: 800,
            nzContent: StoreOrderFreeChangeDateComponent,
            nzComponentParams: {
                data: this.detailModel
            },
            nzFooter: [
                {
                    label: '提交',
                    onClick: componentInstance => {
                        componentInstance?.update()
                    }
                }
            ]
        })
        editmodal.afterClose.subscribe(res => {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;
                // 详情
                this.getDetail();

            });
        })
    }



   
    // 请款
    requestMoney(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '请款',
            nzWidth: 1000,
            nzContent: StoreOrderRequestMoneyComponent,
            nzComponentParams: {
                data: {
                    order_id: data,
                    free:1
                }
            },
            nzFooter: [
                {
                    label: '提交',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.add();

                    }
                }
            ]
        });
        addmodal.afterClose.subscribe(res => {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;
                // 详情
                this.getDetail();

            });
        });
    }



    // 修改请款
    startEdit(data: any): void {
        this.cashList.filter(function(item: any, index: any) {
            if (item.id === data.id) {
                item.edit = true;
            }
        });
    }


    cancelEdit(id: string): void {
        console.log('id :>> ', id);
        this.cashList.filter(function(item: any, index: any) {
            if (item.id === id) {
                item.edit = false;
            }
        });
    }




    saveEdit(data: any): void {
        this.requestMoneyModel.id = data.id;
        this.requestMoneyModel.cost_type = data.cost_type;
        this.requestMoneyModel.price = data.price;
        this.requestMoneyModel.num = data.num;
        this.requestMoneyModel.content = data.content;
        this.requestMoneyModel.suppiler_id = data.suppiler_id;
        this.storeCostService.updateCash(this.requestMoneyModel).subscribe((res: any) => {
            console.log('结果是 :>> ', res);
            this.cashList.filter(function(item: any, index: any) {
                if (item.id === data.id) {
                    item.edit = false;
                }
            });
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;
                // 详情
                this.getDetail();

            });
        });
    }



        // 删除
        deleteIt(data: any) {
            this.modal.confirm({
                nzTitle: '<h4>提示</h4>',
                nzContent: '<h6>是否删除该条请款</h6>',
                nzOnOk: () =>
                    this.storeCostService.deleteCash(data).subscribe(res => {
                        this.activatedRoute.queryParams.subscribe(params => {
                            console.log("params", params)
                            this.detailId = params?.detailId;
                            // 详情
                            this.getDetail();
            
                        });
                    })
            });
    }
    

        
    changeSuppy(data: any,i:any) {
        console.log('111', data, i);
        let ii = this.supplyList.filter((item: any) => item?.id == data)
        console.log("22222", ii,this.cashList);
        this.cashList[i].supplier.data = ii;
    }
}


