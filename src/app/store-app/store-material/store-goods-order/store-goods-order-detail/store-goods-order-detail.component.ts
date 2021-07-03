import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';
import { StoreGoodsOrderMergeShipComponent } from './store-goods-order-merge-ship/store-goods-order-merge-ship.component';
import { StoreGoodsOrderShipComponent } from './store-goods-order-ship/store-goods-order-ship.component';



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


    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public storeGoodsService: StoreGoodsService,
        private message: NzMessageService, private modal: NzModalService,) {
        this.addForm = this.fb.group({
            order_id: [''],
            orderDate: [''],
            bind_name: [''],
            consignee: [''],
            phone: [''],
            address: [''],
        })
    }

    ngOnInit(): void {
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
            console.log("订单详情", res)
        })
    }


    // 单个发货
    ship(data:any) {
        const editmodal = this.modal.create({
            nzTitle: '商品发货',
            nzWidth: 700,
            nzContent: StoreGoodsOrderShipComponent,
            nzComponentParams: {
                data: data
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

    // 合并发货
    mergeShip() {
        let mergeList = [...this.setArr];
        if (mergeList.length < 2) {
            this.message.error('请至少选择两个商品进行合并发货');
        }
        else {
            const editmodal = this.modal.create({
                nzTitle: '合并发货',
                nzWidth: 700,
                nzContent: StoreGoodsOrderMergeShipComponent,
                nzComponentParams: {
                    data: mergeList
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
    }



    // 全选
    onAllChecked(checked: boolean): void {
        console.log("")
        this.detailModel?.sub_order?.data[0]?.order_item?.data.forEach((data: any) => this.updateCheckedSet(data, checked));
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

}
