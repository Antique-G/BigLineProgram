import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataOrderDetail, OrderSmsModel } from '../../../../../../interfaces/store/storeOrder/store-order-model';
import { StoreOrderService } from '../../../../../../services/store/store-order/store-order.service';



@Component({
    selector: 'app-store-order-group-detail-subgroup',
    templateUrl: './store-order-group-detail-subgroup.component.html',
    styleUrls: ['./store-order-group-detail-subgroup.component.css']
})



export class StoreOrderGroupDetailSubgroupComponent implements OnInit {
    @Input() subGroupModel: any;   // 父组件拿到的值
    cursubGroupModelValue: any[] = [];
    isSubgroup!: boolean;
    index = 0;

    // 表格
    setOfCheckedId = new Set<number>();

    detailId: any;
    detailModel!: DataOrderDetail;

    orderArray: any[] = [];
    orderSmsModel: OrderSmsModel;

    isClosed: any;
    tabTitle: any;
    proCode: any;
    url: any;

    constructor(public message: NzMessageService, public modal: NzModalService, public activatedRoute: ActivatedRoute,
                public storeOrderService: StoreOrderService, public dialog: MatDialog) {
        this.orderSmsModel = {
            order_ids: []
        };
    }

    ngOnInit(): void {
        this.url = '/store/main/storeOrdergroupTravel/detail?detailId=';
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.subGroupModel?.currentValue != undefined) {
            this.isClosed = changes.subGroupModel.currentValue?.group_status;
            this.proCode = changes.subGroupModel.currentValue?.product?.data?.code;
            this.tabTitle = changes.subGroupModel.currentValue?.product_name;

            // 子团的值
            this.cursubGroupModelValue = changes.subGroupModel.currentValue?.sub_group?.data;
            console.log('1111111', this.cursubGroupModelValue);
            // 赋值
            if (this.cursubGroupModelValue?.length === 0) {
                this.cursubGroupModelValue = [];
                this.isSubgroup = false;
            }
            else if (this.cursubGroupModelValue?.length != 0) {
                this.isSubgroup = true;
                this.cursubGroupModelValue?.forEach((value: any, index: any) => {
                    value.tabs  = '子团' + (index + 1);
                    value?.order?.data.forEach((value: any, index: any) => {
                        value.expand = false; // 展开属性
                        value.member?.data.forEach((element: any) => {
                            if (element?.birthday == null) {
                                const year = element?.id_num?.slice(6, 10);
                                const month = element?.id_num?.slice(10, 12);
                                const date = element?.id_num?.slice(12, 14);
                                element.birthday = year + '-' + month + '-' + date;
                            }
                        });
                    });
                    console.log('33435434', this.cursubGroupModelValue);
                });
            }
        }
    }


    closeTab({ index }: { index: number }): void {
        console.log('object :>> ', index);
        console.log('1111', this.cursubGroupModelValue, this.cursubGroupModelValue[index], this.cursubGroupModelValue[index].order?.data.length === 0);
        if (this.cursubGroupModelValue[index].order?.data.length === 0) {
            // this.deleteSubGroup.sub_group_id = this.cursubGroupModelValue[index].sub_group_id;
            this.modal.confirm({
                nzTitle: '<h4>提示</h4>',
                nzContent: '<h6>是否删除</h6>',
                nzOnOk: () =>
                    this.storeOrderService.deleteSubGroup(this.cursubGroupModelValue[index].sub_group_id).subscribe(res => {
                        console.log('res', res);
                        this.cursubGroupModelValue.splice(index, 1);
                        this.activatedRoute.queryParams.subscribe(params => {
                            console.log('params', params);
                            this.detailId = params?.detailId;
                            // 详情
                            this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                                console.log('结果是', res.data);
                                this.detailModel = res.data;
                                this.cursubGroupModelValue = this.detailModel.sub_group.data;
                                this.cursubGroupModelValue?.forEach((value: any, index: any) => {
                                    value.tabs = '子团' + (index + 1);
                                    value?.order?.data.forEach((value: any, index: any) => {
                                        value.expand = false; // 展开属性
                                        value.member?.data.forEach((element: any) => {
                                            if (element.birthday == null) {
                                                const year = element?.id_num?.slice(6, 10);
                                                const month = element?.id_num?.slice(10, 12);
                                                const date = element?.id_num?.slice(12, 14);
                                                element.birthday = year + '-' + month + '-' + date;
                                            }
                                        });
                                    });
                                    console.log('33435434', this.cursubGroupModelValue);
                                });
                            });
                        });
                    })
            });
        }
        else {
            this.message.create('error', `该子团有订单，不能删除`);

        }

    }


    // 表格
    onItemChecked(id: number, checked: boolean): void {
        this.updateCheckedSet(id, checked);
    }

    updateCheckedSet(id: number, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
    }






}
