import { format } from 'date-fns';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataOrderDetail, EditMemberModel, OrderSmsModel } from '../../../../../interfaces/store/storeOrder/store-order-model';
import { AdminOrderService } from '../../../../../services/admin/admin-order.service';
import { AODSubgroupMoveorderComponent } from './a-o-d-subgroup-moveorder/a-o-d-subgroup-moveorder.component';
import { AODSubgroupSendsmsComponent } from './a-o-d-subgroup-sendsms/a-o-d-subgroup-sendsms.component';
import { AODSubgroupSetguideComponent } from './a-o-d-subgroup-setguide/a-o-d-subgroup-setguide.component';
import { environment } from '../../../../../environments/environment';
import { AdminOrderDSInsComponent } from './admin-order-d-s-ins/admin-order-d-s-ins.component';
import { AdminOrderGroupTravelService } from '../../../../../services/admin/admin-order-group-travel.service';


@Component({
    selector: 'app-admin-order-detail-subgroup',
    templateUrl: './admin-order-detail-subgroup.component.html',
    styleUrls: ['./admin-order-detail-subgroup.component.css']
})
export class AdminOrderDetailSubgroupComponent implements OnInit {
    @Input() subGroupModel: any;   //父组件拿到的值
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
    editMemberModel: EditMemberModel;
    editMemberModel1: EditMemberModel;

    amountReceived: any;
    priceTotal: any;
    payTime: any;
    transactionId: any;
    payLog: any[] = []

    // 跳转到订单详情
    url: any;

    // 导出子团名单
    sub_group_id: any;
    isExport: any;
    api = environment.baseUrl;

    endDate: any;


    // 保单
    order_insurance_id: any;

    constructor(public message: NzMessageService, public modal: NzModalService, public activatedRoute: ActivatedRoute,
        public dialog: MatDialog, public adminOrderService: AdminOrderService, public router: Router, private msg: NzMessageService,
        public adminOrderGroupTravelService: AdminOrderGroupTravelService, ) {

        this.orderSmsModel = {
            order_ids: []
        };
        this.editMemberModel = {
            id: '',
            assembling_place: '',
        }
        this.editMemberModel1 = {
            id: '',
            assembling_time: ''
        }
    }

    ngOnInit(): void {
        this.url = '/admin/main/groupTravelOrder/detail?detailId=';
    }

    edit(data: any) {
        this.router.navigate(['/admin/main/groupTravelOrder/detail'], { queryParams: { detailId: data.id } });
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes['subGroupModel']?.currentValue != undefined) {
            this.isClosed = changes['subGroupModel'].currentValue?.group_status;
            this.proCode = changes['subGroupModel'].currentValue?.product?.data?.code;
            this.tabTitle = changes['subGroupModel'].currentValue?.product_name;
            this.endDate = changes['subGroupModel'].currentValue?.end_date;
            // 子团的值
            this.cursubGroupModelValue = changes['subGroupModel'].currentValue?.sub_group?.data;
            console.log("1111111", this.cursubGroupModelValue);
            // 赋值
            if (this.cursubGroupModelValue?.length === 0) {
                this.cursubGroupModelValue = [];
                this.isSubgroup = false;
            }
            else if (this.cursubGroupModelValue?.length != 0) {
                this.isSubgroup = true;
                this.cursubGroupModelValue.forEach((value: any, index: any) => {
                    value['tabs'] = '子团' + (index + 1);
                    value?.order?.data.forEach((value: any, index: any) => {
                        value['expand'] = false; //展开属性
                        console.log('222222222 :>> ', value);
                        value.member?.data.forEach((element: any) => {
                            if (element.birthday === null) {
                                let year = element.id_num.slice(6, 10);
                                let month = element.id_num.slice(10, 12);
                                let date = element.id_num.slice(12, 14);
                                element.birthday = year + '-' + month + '-' + date;
                            }
                        });
                    });
                    console.log("33435434", this.cursubGroupModelValue);
                })
            }
        }
    }





    closeTab({ index }: { index: number }): void {
        console.log('object :>> ', index);
        console.log("1111", this.cursubGroupModelValue, this.cursubGroupModelValue[index], this.cursubGroupModelValue[index].order?.data.length === 0);
        if (this.cursubGroupModelValue[index].order?.data.length === 0) {
            this.modal.confirm({
                nzTitle: '<h4>提示</h4>',
                nzContent: '<h6>是否删除</h6>',
                nzOnOk: () =>
                    this.adminOrderService.deleteSubGroup(this.cursubGroupModelValue[index].sub_group_id).subscribe(res => {
                        console.log("res", res);
                        this.cursubGroupModelValue.splice(index, 1);
                        this.activatedRoute.queryParams.subscribe(params => {
                            console.log("params", params)
                            this.detailId = params?.detailId;
                            // 详情
                            this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                                console.log("结果是111", res.data);
                                this.detailModel = res.data;
                                this.cursubGroupModelValue = this.detailModel.sub_group.data;
                                this.cursubGroupModelValue.forEach((value: any, index: any) => {
                                    value['tabs'] = '子团' + (index + 1);
                                    value?.order?.data.forEach((value: any, index: any) => {
                                        value['expand'] = false; //展开属性
                                        value.member?.data.forEach((element: any) => {
                                            if (element.birthday === null) {
                                                let year = element.id_num.slice(6, 10);
                                                let month = element.id_num.slice(10, 12);
                                                let date = element.id_num.slice(12, 14);
                                                element.birthday = year + '-' + month + '-' + date;
                                            }
                                        });
                                    });
                                    console.log("33435434", this.cursubGroupModelValue);
                                })
                            })
                        })
                    })
            })
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
            console.log('11111111111', this.setOfCheckedId);
        } else {
            this.setOfCheckedId.delete(id);
            console.log('2222222222', this.setOfCheckedId);
        }
    }


    // 派遣导游
    setGuide(data: any) {
        console.log('object :>> ', data);
        const editmodal = this.modal.create({
            nzTitle: '派遣导游',
            nzContent: AODSubgroupSetguideComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: [
                {
                    label: '提交',
                    onClick: componentInstance => {
                        componentInstance?.add()
                    }
                }
            ]
        })
        editmodal.afterClose.subscribe(res => {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;
                // 详情
                this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                    console.log("结果是", res.data);
                    this.detailModel = res.data;
                    this.cursubGroupModelValue = this.detailModel.sub_group.data;
                    this.cursubGroupModelValue.forEach((value: any, index: any) => {
                        value['tabs'] = '子团' + (index + 1);
                        value?.order?.data.forEach((value: any, index: any) => {
                            value['expand'] = false; //展开属性
                            value.member?.data.forEach((element: any) => {
                                if (element.birthday === null) {
                                    let year = element.id_num.slice(6, 10);
                                    let month = element.id_num.slice(10, 12);
                                    let date = element.id_num.slice(12, 14);
                                    element.birthday = year + '-' + month + '-' + date;
                                }
                            });
                        });
                        console.log("33435434", this.cursubGroupModelValue);
                    })
                })
            })
        })
    }

    // 移动订单
    moveOrder(data: any) {
        console.log('选择的tabs是 ', data);
        let newArray = [...this.setOfCheckedId];
        console.log('拿到的订单内容 ', newArray);
        if (newArray.length === 0) {
            this.message.create('error', `请选择订单`);
        }
        else {
            const editmodal = this.modal.create({
                nzTitle: '移动订单',
                nzContent: AODSubgroupMoveorderComponent,
                nzComponentParams: {
                    data: [this.cursubGroupModelValue, data, newArray]
                },
                nzFooter: [
                    {
                        label: '提交',
                        onClick: componentInstance => {
                            componentInstance?.add()
                        }
                    }
                ]
            })
            editmodal.afterClose.subscribe(res => {
                this.activatedRoute.queryParams.subscribe(params => {
                    console.log("params", params)
                    this.detailId = params?.detailId;
                    // 详情
                    this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                        this.setOfCheckedId.clear();
                        console.log("结果是", res.data);
                        this.detailModel = res.data;
                        this.cursubGroupModelValue = this.detailModel.sub_group.data;
                        this.cursubGroupModelValue.forEach((value: any, index: any) => {
                            value['tabs'] = '子团' + (index + 1);
                            value?.order?.data.forEach((value: any, index: any) => {
                                value['expand'] = false; //展开属性
                                value.member?.data.forEach((element: any) => {
                                    if (element.birthday === null) {
                                        let year = element.id_num.slice(6, 10);
                                        let month = element.id_num.slice(10, 12);
                                        let date = element.id_num.slice(12, 14);
                                        element.birthday = year + '-' + month + '-' + date;
                                    }
                                });
                            });
                            console.log("33435434", this.cursubGroupModelValue);
                        })
                    })
                })
            })

        }

    }


    // 发送出团短信通知
    sendSms() {
        let newArray = [...this.setOfCheckedId];
        console.log('2423423', newArray);
        if (newArray.length === 0) {
            this.message.create('error', `请选择订单`);
        }
        else if (newArray.length != 0) {
            newArray.map((ele: any) => {

                let flag = ele.member.data.every((item: any) => item.assembling_place && item.assembling_time)
                console.log('flag', flag);
                if (flag) {
                    const dialogRef = this.dialog.open(AODSubgroupSendsmsComponent, {
                        width: '800px',
                        data: newArray
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        this.activatedRoute.queryParams.subscribe(params => {
                            console.log("params", params)
                            this.detailId = params?.detailId;
                            // 详情
                            this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                                this.setOfCheckedId.clear();
                                console.log("结果是", res.data);
                                this.detailModel = res.data;
                                this.cursubGroupModelValue = this.detailModel.sub_group.data;
                                this.cursubGroupModelValue.forEach((value: any, index: any) => {
                                    value['tabs'] = '子团' + (index + 1);
                                    value?.order?.data.forEach((value: any, index: any) => {
                                        value['expand'] = false; //展开属性
                                        value.member?.data.forEach((element: any) => {
                                            if (element.birthday === null) {
                                                let year = element.id_num.slice(6, 10);
                                                let month = element.id_num.slice(10, 12);
                                                let date = element.id_num.slice(12, 14);
                                                element.birthday = year + '-' + month + '-' + date;
                                            }
                                        });
                                    });
                                    console.log("33435434", this.cursubGroupModelValue);
                                })
                            })
                        })

                    });
                } else {
                    this.message.create('error', `订单号:${ele.id},所含出行人的集合时间和集合地点不能为空`);
                }

            })

        }

    }


    // 发送订单
    sendOrderSms() {
        let newArray = [...this.setOfCheckedId];
        console.log('拿到的订单内容 ', newArray);
        if (newArray.length === 0) {
            this.message.create('error', `请选择订单`);
        }
        else {
            this.modal.confirm({
                nzTitle: '<h4>确认</h4>',
                nzContent: '<h5>是否发送订单短信通知？</h5>',
                nzOnOk: () =>
                    newArray.forEach((value: any) => {
                        console.log('value是什么 ', value);
                        this.orderArray.push(value.id);
                        this.orderSmsModel.order_ids = this.orderArray;
                        this.adminOrderService.orderSms(this.orderSmsModel).subscribe(res => {
                            this.setOfCheckedId.clear();
                            console.log('res ', res);
                            if (res.status_code === 200) {
                                this.message.create('success', `成功发送 ${res.success}条信息，${res.failed}条失败信息`);
                            }
                            else {
                                this.message.create('error', ` ${res.message}`);
                            }
                        })
                    })
            });



        }
    }



    // 不成团关团短信通知
    sendClosedGroup() {
        let newArray = [...this.setOfCheckedId];
        console.log('拿到的订单内容 ', newArray);
        if (newArray.length === 0) {
            this.message.create('error', `请选择订单`);
        }
        else {
            newArray.forEach((value: any) => {
                console.log('value是什么 ', value);
                this.orderArray.push(value.id);
                this.orderSmsModel.order_ids = this.orderArray;
                this.adminOrderService.cancel(this.orderSmsModel).subscribe(res => {
                    this.setOfCheckedId.clear();
                    console.log('res ', res);
                    if (res.status_code === 200) {
                        this.message.create('success', `成功发送 ${res.success}条信息，${res.failed}条失败信息`);
                    }
                    else {
                        this.message.create('error', ` ${res.message}`);
                    }
                })

            })
        }
    }


    changeConfirm(dataChild: any) {
        console.log('object :>> ', dataChild);
        this.editMemberModel.id = dataChild?.id;
        this.editMemberModel.assembling_place = dataChild?.assembling_place;
        if (this.editMemberModel.assembling_place === '') {
            this.message.create('warning', `空值不保存`);
        }
        else {
            this.modal.confirm({
                nzTitle: "<h4>提示</h4>",
                nzContent: "<h6>是否修改集合地点</h6>",
                nzOnOk: () =>
                    this.adminOrderService.editMember(this.editMemberModel).subscribe((res: any) => {
                        this.activatedRoute.queryParams.subscribe(params => {
                            console.log("params", params)
                            this.detailId = params?.detailId;
                            // 详情
                            this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                                this.setOfCheckedId.clear();
                                console.log("结果是", res.data);
                                this.detailModel = res.data;
                                this.cursubGroupModelValue = this.detailModel.sub_group.data;
                                this.cursubGroupModelValue.forEach((value: any, index: any) => {
                                    value['tabs'] = '子团' + (index + 1);
                                    value?.order?.data.forEach((value: any, index: any) => {
                                        value['expand'] = false; //展开属性
                                        value.member?.data.forEach((element: any) => {
                                            if (element.birthday === null) {
                                                let year = element.id_num.slice(6, 10);
                                                let month = element.id_num.slice(10, 12);
                                                let date = element.id_num.slice(12, 14);
                                                element.birthday = year + '-' + month + '-' + date;
                                            }
                                        });
                                    });
                                    console.log("33435434", this.cursubGroupModelValue);
                                })
                            })
                        })
                    }),
            });
        }

    }


    changeConfirm1(dataChild: any) {
        console.log('object :>> ', dataChild);
        this.editMemberModel1.id = dataChild?.id;
        this.editMemberModel1.assembling_time = dataChild?.assembling_time;
        if (this.editMemberModel.assembling_time === '') {
            this.message.create('warning', `空值不保存`);
        }
        else {
            this.modal.confirm({
                nzTitle: "<h4>提示</h4>",
                nzContent: "<h6>是否修改集合时间</h6>",
                nzOnOk: () =>
                    this.adminOrderService.editMember(this.editMemberModel1).subscribe((res: any) => {
                        this.activatedRoute.queryParams.subscribe(params => {
                            console.log("params", params)
                            this.detailId = params?.detailId;
                            // 详情
                            this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                                this.setOfCheckedId.clear();
                                console.log("结果是", res.data);
                                this.detailModel = res.data;
                                this.cursubGroupModelValue = this.detailModel.sub_group.data;
                                this.cursubGroupModelValue.forEach((value: any, index: any) => {
                                    value['tabs'] = '子团' + (index + 1);
                                    value?.order?.data.forEach((value: any, index: any) => {
                                        value['expand'] = false; //展开属性
                                        value.member?.data.forEach((element: any) => {
                                            if (element.birthday === null) {
                                                let year = element.id_num.slice(6, 10);
                                                let month = element.id_num.slice(10, 12);
                                                let date = element.id_num.slice(12, 14);
                                                element.birthday = year + '-' + month + '-' + date;
                                            }
                                        });
                                    });
                                    console.log("33435434", this.cursubGroupModelValue);
                                })
                            })
                        })
                    }),
            });
        }

    }


    // 不成团退款
    closedGroupRefund() {
        this.modal.confirm({
            nzTitle: "<h3>确认退款</h3>",
            nzContent: '<h5>如果您确认退款后,将生成退款申请记录,请前往"订单退款处"审核,提交财务退款。</h5>',
            // nzOnOk: () =>
        })
    }


    // 导出子团名单
    export(data: any) {
        console.log('data :>> ', data);
        this.sub_group_id = data;
        this.isExport = this.api + '/admin/group_export/' + this.sub_group_id;
    }

    // 基础保险
    base(tab: any, data: any) {
        const editmodal = this.modal.create({
            nzTitle: '购买保险',
            nzWidth: 1000,
            nzContent: AdminOrderDSInsComponent,
            nzComponentParams: {
                data: {
                    tab: tab,
                    data: data,
                    endDate: this.endDate

                }
            },
            nzFooter: [
                {
                    label: '确定购买',
                    type: 'primary',
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
                this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                    this.setOfCheckedId.clear();
                    console.log("结果是", res.data);
                    this.detailModel = res.data;
                    this.cursubGroupModelValue = this.detailModel.sub_group.data;
                    this.cursubGroupModelValue.forEach((value: any, index: any) => {
                        value['tabs'] = '子团' + (index + 1);
                        value?.order?.data.forEach((value: any, index: any) => {
                            value['expand'] = false; //展开属性
                            value.member?.data.forEach((element: any) => {
                                if (element.birthday === null) {
                                    let year = element.id_num.slice(6, 10);
                                    let month = element.id_num.slice(10, 12);
                                    let date = element.id_num.slice(12, 14);
                                    element.birthday = year + '-' + month + '-' + date;
                                }
                            });
                        });
                        console.log("33435434", this.cursubGroupModelValue);
                    })
                })
            })
        })
    }


    // 下载保单
    seeDetail(data: any) {
        this.order_insurance_id = data.id;
        const msgId = this.msg.loading('正在下载电子保单', { nzDuration: 0 }).messageId;
            this.adminOrderGroupTravelService.downloadFile(this.order_insurance_id).subscribe(res => {
                console.log("res", res)
                const link = document.createElement('a');
                const blob = new Blob([res], {type: 'application/pdf'});
                link.setAttribute('href', window.URL.createObjectURL(blob));
                link.setAttribute('download', data.insurance_name+'-'+new Date().getTime() + '.pdf');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                this.msg.remove(msgId);
                this.msg.success('下载电子保单成功')
                // window.open('/bbbb/static/pdf/web/viewer.html?file=' +encodeURIComponent(res));
            })
    }

}
