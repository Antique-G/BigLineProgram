import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataOrderDetail } from '../../../../../interfaces/store/storeOrder/store-order-model';
import { StoreCostService } from '../../../../../services/store/store-cost/store-cost.service';
import { StoreOrderService } from '../../../../../services/store/store-order/store-order.service';
import { StoreOrderRequestMoneyComponent } from './store-order-request-money/store-order-request-money.component';



@Component({
    selector: 'app-store-order-group-detail',
    templateUrl: './store-order-group-detail.component.html',
    styleUrls: ['./store-order-group-detail.component.css']
})
export class StoreOrderGroupDetailComponent implements OnInit {
    public isSpinning = true;
    addForm!: FormGroup;
    detailId: any;
    detailModel!: DataOrderDetail;
    isReturnDate: any;
    isActiveDate: any;
    isMemberMax: any;
    subGroupModel!: DataOrderDetail;
    cashList: any[] = [];
    typeList: any[] = [];
    supplyList: any[] = [];
    // 修改供应商
    bank_account: any;
    bank_name: any;
    bank_open: any;
    requestMoneyModel: any;
    precision = 2;
    cutValue = 0;
    cutNums = 0;

    
    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
                public modal: NzModalService, public storeOrderService: StoreOrderService,
                public storeCostService: StoreCostService) {
        this.addForm = this.fb.group({
            group_id: ['', [Validators.required]],
            member_min: ['', [Validators.required]],
            active_date: ['', [Validators.required]],
            returnDate: ['', [Validators.required]],
            member_max: ['', [Validators.required]],
        });
        this.requestMoneyModel = {
            group_id: '',
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
            console.log('params', params);
            this.detailId = params?.detailId;
            // 详情
            this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                console.log('结果是', res);
                this.detailModel = res.data;
                // 最大成团人数
                if (this.detailModel?.member_max === 0) {
                    this.isMemberMax = '-';
                }
                else {
                    this.isMemberMax = this.detailModel?.member_max;
                }
                // 成团日期
                this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
                // 往返日期
                this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
                this.subGroupModel = this.detailModel;
                this.isSpinning = false;
                this.cashList = this.detailModel?.cash_requirement?.data;
                this.cashList.forEach((element: any) => {
                    element.edit = false;
                });

            });
        });
    }


    // 团队请款
    groupRequest(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '团队请款',
            nzWidth: 1000,
            nzContent: StoreOrderRequestMoneyComponent,
            nzComponentParams: {
                data
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
                console.log('params', params);
                this.detailId = params?.detailId;
                // 详情
                this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                    console.log('结果是', res);
                    this.detailModel = res.data;
                    // 最大成团人数
                    if (this.detailModel?.member_max === 0) {
                        this.isMemberMax = '-';
                    }
                    else {
                        this.isMemberMax = this.detailModel?.member_max;
                    }
                    // 成团日期
                    this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
                    // 往返日期
                    this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
                    this.subGroupModel = this.detailModel;
                    this.isSpinning = false;
                    this.cashList = this.detailModel?.cash_requirement?.data;
                    this.cashList.forEach((element: any) => {
                        element.edit = false;
                    });
                });
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
        console.log("111",this.cashList)
        this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
            this.cashList = this.detailModel?.cash_requirement?.data;
            console.log("4444",this.detailModel?.cash_requirement?.data,this.cashList)
        })
    }




    saveEdit(data: any): void {
        this.requestMoneyModel.id = data.id;
        this.requestMoneyModel.group_id = this.detailModel?.group_id;
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
                console.log('params', params);
                this.detailId = params?.detailId;
                // 详情
                this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                    console.log('结果是', res);
                    this.detailModel = res.data;
                    // 最大成团人数
                    if (this.detailModel?.member_max === 0) {
                        this.isMemberMax = '-';
                    }
                    else {
                        this.isMemberMax = this.detailModel?.member_max;
                    }
                    // 成团日期
                    this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
                    // 往返日期
                    this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
                    this.subGroupModel = this.detailModel;
                    this.isSpinning = false;
                    this.cashList = this.detailModel?.cash_requirement?.data;
                    this.cashList.forEach((element: any) => {
                        element.edit = false;
                    });
                });
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
                        console.log('params', params);
                        this.detailId = params?.detailId;
                        // 详情
                        this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                            console.log('结果是', res);
                            this.detailModel = res.data;
                            // 最大成团人数
                            if (this.detailModel?.member_max === 0) {
                                this.isMemberMax = '-';
                            }
                            else {
                                this.isMemberMax = this.detailModel?.member_max;
                            }
                            // 成团日期
                            this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
                            // 往返日期
                            this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
                            this.subGroupModel = this.detailModel;
                            this.isSpinning = false;
                            this.cashList = this.detailModel?.cash_requirement?.data;
                            this.cashList.forEach((element: any) => {
                                element.edit = false;
                            });
                        });
                    });
                })
        });
    }


    
    changeSuppy(data: any,i:any) {
        console.log('111', data, i);
        let ii = this.supplyList.filter((item: any) => item?.id == data)
        console.log("22222", ii);
        this.cashList[i].supplier.data = ii;
    }
}

