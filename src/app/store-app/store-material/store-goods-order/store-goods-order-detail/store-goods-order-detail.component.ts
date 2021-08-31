import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreCostService } from 'services/store/store-cost/store-cost.service';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';
import { StoreGoodsOrderAddFreightComponent } from './store-goods-order-add-freight/store-goods-order-add-freight.component';
import { StoreGoodsOrderDetailModifyComponent } from './store-goods-order-detail-modify/store-goods-order-detail-modify.component';
import { StoreGoodsOrderMergeShipComponent } from './store-goods-order-merge-ship/store-goods-order-merge-ship.component';
import { StoreGoodsOrderRequestMoneyComponent } from './store-goods-order-request-money/store-goods-order-request-money.component';



@Component({
    selector: 'app-store-goods-order-detail',
    templateUrl: './store-goods-order-detail.component.html',
    styleUrls: ['./store-goods-order-detail.component.css']
})
export class StoreGoodsOrderDetailComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;
    detailModel: any;
    detailId: any;
    checked = false;
    setOfCheckedId = new Set<number>();
    setArr = new Set<any>();
    splitGoodsOrderModel: any;
    cashList: any[] = [];
    requestMoneyModel: any;
    typeList: any[] = [];
    supplyList: any[] = [];
    goodInfoArr: any;


    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public storeGoodsService: StoreGoodsService,
        private message: NzMessageService, private modal: NzModalService, public storeCostService: StoreCostService) {
        this.addForm = this.fb.group({
            order_id: [''],
            main_order_id: [''],
            orderDate: [''],
            bind_name: [''],
            consignee: [''],
            phone: [''],
            address: [''],
            region_code: [''],
            user_phone: [''],
            remark: [''],
        });
        this.splitGoodsOrderModel = {
            item_ids: '',
            sub_order_id: ''
        };
        this.requestMoneyModel = {
            cost_type:'',
            content: '',
            suppiler_id: '',
            goods_info: '',
            id: '',
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
            this.detailId = params?.id;
            // 详情
            this.isSpinning = true;
            this.getOrderDetail();
        });
    }

    getOrderDetail() {
        this.storeGoodsService.orderDetail(this.detailId).subscribe(res => {
            this.isSpinning = false;
            this.detailModel = res.data;
            this.cashList = this.detailModel?.goods_cash?.data;
            console.log("订单详情", res)
        })
    }



    // 发货
    mergeShip() {
        const editmodal = this.modal.create({
            nzTitle: '商品发货',
            nzWidth: 700,
            nzContent: StoreGoodsOrderMergeShipComponent,
            nzComponentParams: {
                data: this.detailModel
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
        editmodal.afterClose.subscribe(res => {
            this.getOrderDetail();
        });
    }

    updateCheckedSet(data: any, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(data.id);
            this.setArr.add(data);
            console.log("datadatadatadata", this.setOfCheckedId);
            console.log("datadatadatadata1", this.setArr);
        } else {
            this.setOfCheckedId.delete(data.id);
            this.setArr.delete(data);
        }
    }

    // 单选
    onItemChecked(data: any, checked: boolean): void {
        this.updateCheckedSet(data, checked);
    }



    // 修改商品信息
    changeGoods(data: any) {
        const editmodal = this.modal.create({
            nzTitle: "修改商品信息",
            nzContent: StoreGoodsOrderDetailModifyComponent,
            nzWidth: 1000,
            nzComponentParams: {
                data: data,
            },
            nzFooter: null
        });
        editmodal.afterClose.subscribe((res) => {
            this.getOrderDetail();
        });
    }

    // 添加运费
    addFreight(data: any) {
        const editmodal = this.modal.create({
            nzTitle: "添加运费",
            nzContent: StoreGoodsOrderAddFreightComponent,
            nzWidth: 1000,
            nzComponentParams: {
                data: data,
            },
            nzFooter: null
        });
        editmodal.afterClose.subscribe((res) => {
            this.getOrderDetail();
        });
    }



    // 拆分订单
    splitOrder() {
        let mergeList = [...this.setArr];
        let ids = [...this.setOfCheckedId];
        if (mergeList.length != 1) {
            this.message.error('请选择1个商品进行拆分');
        }
        else {
            console.log("23423", mergeList);
            this.splitGoodsOrderModel.item_ids = ids;
            this.splitGoodsOrderModel.sub_order_id = this.detailModel.id;

            this.modal.confirm({
                nzTitle: "<h4>提示</h4>",
                nzContent: `<h6>是否将 ${mergeList[0].goods_name} 从此订单中拆分，生成一个新的子订单？</h6>`,
                nzOnOk: () =>
                    this.storeGoodsService.splitGoodsOrderSub(this.splitGoodsOrderModel).subscribe((res) => {
                        this.getOrderDetail();
                    }),
            });
        }
    }


    // 修改快递信息
    changeShip() {
        const editmodal = this.modal.create({
            nzTitle: '修改快递信息',
            nzWidth: 700,
            nzContent: StoreGoodsOrderMergeShipComponent,
            nzComponentParams: {
                data: this.detailModel
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
        editmodal.afterClose.subscribe(res => {
            this.getOrderDetail();
        });
    }



    // 请款
    orderRequest(detailModel: any) {
        console.log("1212", detailModel);
        const addmodal = this.modal.create({
            nzTitle: '商品订单请款',
            nzWidth: 1000,
            nzContent: StoreGoodsOrderRequestMoneyComponent,
            nzComponentParams: {
                data: detailModel
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
            this.getOrderDetail();
        });
    }



    // 修改请款
    startEdit(data: any): void {
        this.cashList.filter(function (item: any, index: any) {
            if (item.id === data.id) {
                item.edit = true;
            }
        });
    }


    cancelEdit(id: string): void {
        console.log('id :>> ', id);
        this.cashList.filter(function (item: any, index: any) {
            if (item.id === id) {
                item.edit = false;
            }
        });
    }




    saveEdit(data: any): void {
        console.log("111",data)
        this.requestMoneyModel.id = data.id;
        this.requestMoneyModel.cost_type = data.cost_type;
        this.requestMoneyModel.content = data.content;
        this.requestMoneyModel.suppiler_id = data.suppiler_id;
        this.requestMoneyModel.goods_info = data.goods_detail?.data;
        console.log("3423423",this.requestMoneyModel)
        this.storeGoodsService.updateOrderRequestCash(this.requestMoneyModel).subscribe((res: any) => {
            console.log('结果是 :>> ', res);
            this.cashList.filter(function (item: any, index: any) {
                if (item.id === data.id) {
                    item.edit = false;
                }
            });
            this.activatedRoute.queryParams.subscribe(params => {
                // 详情
                this.getOrderDetail();

            });
        });
    }



    // 删除
    deleteIt(data: any) {
        this.modal.confirm({
            nzTitle: '<h4>提示</h4>',
            nzContent: '<h6>是否删除该条请款</h6>',
            nzOnOk: () =>
                this.storeGoodsService.deleteOrderRequestCash(data).subscribe(res => {
                    this.activatedRoute.queryParams.subscribe(params => {
                        // 详情
                        this.getOrderDetail();

                    });
                })
        });
    }



    changeSuppy(data: any, i: any) {
        console.log('111', data, i);
        let ii = this.supplyList.filter((item: any) => item?.id == data)
        console.log("22222", ii, this.cashList);
        this.cashList[i].supplier.data = ii;
    }
}
