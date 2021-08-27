import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AOGSetSalesComponent } from 'app/material-component/admin-order-group-travel/admin-order-group-travel-detail/a-o-g-set-sales/a-o-g-set-sales.component';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailsModel } from '../../../../interfaces/store/storeOrder/store-order-free-travel-model';
import { EditInfoModel, EditMemberModel } from '../../../../interfaces/store/storeOrder/store-order-model';
import { AdminOrderFreeTravelService } from '../../../../services/admin/admin-order-free-travel.service';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { AdminOrderService } from '../../../../services/admin/admin-order.service';
import { AOGTDChangePriceComponent } from '../../admin-order-group-travel/admin-order-group-travel-detail/a-o-g-t-d-change-price/a-o-g-t-d-change-price.component';
import { AOGTDetailChangeDataComponent } from '../../admin-order-group-travel/admin-order-group-travel-detail/a-o-g-t-detail-change-data/a-o-g-t-detail-change-data.component';
import { AdminOrderCancelComponent } from '../../admin-order-group-travel/admin-order-group-travel-detail/admin-order-cancel/admin-order-cancel.component';


@Component({
    selector: 'app-admin-order-pre-free-travel-detail',
    templateUrl: './admin-order-pre-free-travel-detail.component.html',
    styleUrls: ['./admin-order-pre-free-travel-detail.component.css']
})
export class AdminOrderPreFreeTravelDetailComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;
    detailId: any;
    detailModel!: DetailsModel;
    dataMember: any;
    priceTotal: any;
    dataPayLog: any[] = [];
    // 修改信息
    isChange = false;
    editInfoModel: EditInfoModel;
    editMemberModel: EditMemberModel;
    idChangeBirDate: any;
    idChangeBir = false;
    // 同步订单
    syncOrderModel: any;


    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router, public dialog: MatDialog,
        public adminOrderFreeTravelService: AdminOrderFreeTravelService, private modal: NzModalService, private msg: NzMessageService,
        public adminOrderService: AdminOrderService, public adminOrderGroupTravelService: AdminOrderGroupTravelService,) {
        this.addForm = this.fb.group({
            order_id: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
            contact_name: ['', [Validators.required]],
            contact_phone: ['', [Validators.required]],
            contact_wechat: ['',],
            contact_qq: ['',],
            contact_email: ['',],
            emergency_contact_person: ['',],
            emergency_contact_number: ['',],
            customer_remarks: ['',],
            internal_remarks: ['',],
            quote_type: [''],
            num_total: [''],
            use_num: [''],
            code: [''],
            is_presell: [''],
            store_name: [''],
            bind_account_name: [''],
            product_id: [''],
            user_phone: [''],
        });
        this.editInfoModel = {
            id: '',
            contact_name: '',
            contact_phone: '',
            contact_wechat: '',
            contact_qq: '',
            contact_email: '',
            emergency_contact_person: '',
            emergency_contact_number: '',
            customer_remarks: '',
            internal_remarks: '',
        };
        this.editMemberModel = {
            id: '',
            name: '',
            eng_name: '',
            gender: '',
            phone: '',
            id_type: '',
            id_num: '',
            birthday: '',
        };
        this.syncOrderModel = {
            order_id: ''
        }
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.detailId;
            this.isSpinning = true;
            // 详情
            this.getDetail();

        });
    }


    getDetail() {
        this.adminOrderFreeTravelService.getfreeTravelDetail(this.detailId).subscribe(res => {
            console.log("自由行详情结果是", res);
            this.isSpinning = false;
            this.detailModel = res.data;
            // 支付流水
            let pagLogArr: any[] = [];
            res.data?.pay_log?.data.forEach((element: any) => {
                if (element.status == 2 || element.status == 3) {
                    pagLogArr.push(element)
                }
            });
            this.dataPayLog = pagLogArr;

            this.dataMember = res.data?.member?.data;
            this.dataMember.forEach((element: any) => {
                // 看证件号码是否为空
                if (element?.id_num == '') {
                    if (element.birthday == null || element.birthday == '') {
                        element.birthday = null;
                    }
                }
                else {
                    // 证件号码不为空，又是身份证
                    if (element?.id_type == 1) {
                        if (element.birthday == null) {
                            let year = element.id_num.slice(6, 10);
                            let month = element.id_num.slice(10, 12);
                            let date = element.id_num.slice(12, 14);
                            element.birthday = year + '-' + month + '-' + date;
                        }
                    }
                    // 为其他证件
                    else {
                        if (element.birthday == null || element.birthday == '') {
                            element.birthday = null;
                        }
                    }
                }
                element['edit'] = false;
            });
            this.fee();
        })
    }


    fee() {
        // 费用明细
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



    // 订单改价
    changePrice() {
        const editmodal = this.modal.create({
            nzTitle: '订单改价',
            nzContent: AOGTDChangePriceComponent,
            nzComponentParams: {
                data: this.detailModel
            },
            nzFooter: null
        })
        editmodal.afterClose.subscribe(res => {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;
                // 详情
                this.getDetail();
                this.fee();

            });
        })
    }


    changeDetail() {
        this.isChange = true;
    }



    // 修改联系人信息
    setValue() {
        this.editInfoModel.id = this.detailId;
        this.editInfoModel.contact_name = this.addForm.value.contact_name;
        this.editInfoModel.contact_phone = this.addForm.value.contact_phone;
        this.editInfoModel.contact_wechat = this.addForm.value.contact_wechat;
        this.editInfoModel.contact_qq = this.addForm.value.contact_qq;
        this.editInfoModel.contact_email = this.addForm.value.contact_email;
        this.editInfoModel.emergency_contact_person = this.addForm.value.emergency_contact_person;
        this.editInfoModel.emergency_contact_number = this.addForm.value.emergency_contact_number;
        this.editInfoModel.customer_remarks = this.addForm.value.customer_remarks;
        this.editInfoModel.internal_remarks = this.addForm.value.internal_remarks;

    }


    commitDetail() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.modal.confirm({
                nzTitle: "<h4>提示</h4>",
                nzContent: "<h6>确认修改联系人信息</h6>",
                nzOnOk: () =>
                    this.adminOrderService.editInfo(this.editInfoModel).subscribe(res => {
                        console.log('res :>> ', res);
                        this.getDetail();
                        this.isChange = false;
                    })
            });
        }

    }

    cancelDetail() {
        this.isChange = false;
    }



    cancelEdit(id: string): void {
        console.log('id :>> ', id);
        this.dataMember.filter(function (item: any, index: any) {
            if (item.id === id) {
                item.edit = false;
            }
        });
    }


    // 修改出行人信息
    startEdit(data: any): void {
        console.log('点击的饿id :>> ', data, data.is_kid, data.is_kid == 2);
        // 处理婴儿
        if (data.is_kid == 2) {
            if (data.birthday = '--') {
                data.birthday = null;
            }
        }
        this.dataMember.filter(function (item: any, index: any) {
            if (item.id === data.id) {
                item.edit = true;
            }
        });

    }


    saveEdit(data: any): void {
        this.editMemberModel.id = data.id;
        this.editMemberModel.name = data.name;
        this.editMemberModel.eng_name = data.eng_name;
        this.editMemberModel.gender = data.gender;
        this.editMemberModel.phone = data.phone;
        this.editMemberModel.id_type = data.id_type;
        this.editMemberModel.id_num = data.id_num;
        if (this.idChangeBir === false) {
            this.editMemberModel.birthday = data.birthday;
        }
        else {
            this.editMemberModel.birthday = this.idChangeBirDate;
        }
        console.log('v33333333 ', this.editMemberModel);
        if (this.detailModel?.independent_product?.data?.quote_type == '2') {
            if (this.editMemberModel.birthday == null) {
                this.msg.error('出生年月日不能为空');
            }
            else {
                this.adminOrderService.editMember(this.editMemberModel).subscribe((res: any) => {
                    console.log('结果是 :>> ', res);
                    this.dataMember.filter(function (item: any, index: any) {
                        if (item.id === data.id) {
                            item.edit = false;
                        }
                    });
                    this.getDetail();
                })
            }
        }
        else {
            this.editMemberModel.birthday = '';
            this.adminOrderService.editMember(this.editMemberModel).subscribe((res: any) => {
                console.log('结果是 :>> ', res);
                this.dataMember.filter(function (item: any, index: any) {
                    if (item.id === data.id) {
                        item.edit = false;
                    }
                });
                this.getDetail();
            })
        }

    }



    onChangeBir(event: any) {
        console.log('event :>> ', event);
        if (event != null) {
            this.idChangeBir = true;
            this.idChangeBirDate = format(new Date(event), 'yyyy-MM-dd');
        }
    }



    // 恢复订单
    restore() {
        this.modal.confirm({
            nzTitle: "<h4>提示</h4>",
            nzContent: "<h6>确认恢复订单？</h6>",
            nzOnOk: () =>
                this.adminOrderService.recoverInfo(this.detailModel?.id).subscribe(res => {
                    console.log('res :>> ', res);
                    this.getDetail();

                })
        });
    }


    // 取消订单
    cancelOrder() {
        const editmodal = this.modal.create({
            nzTitle: '取消订单',
            nzContent: AdminOrderCancelComponent,
            nzWidth: 700,
            nzComponentParams: {
                data: this.detailModel?.id
            },
            nzFooter: [
                {
                    label: '提交',
                    type: 'primary',
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
                this.getDetail();

            });
        })
    }


    // 同步在启航系统下单的大航产品的订单到大航系统
    syncOrder() {
        this.syncOrderModel.order_id = this.detailModel?.id;
        this.modal.confirm({
            nzTitle: "<h4>提示</h4>",
            nzContent: "<h6>确定同步此订单到大航系统？</h6>",
            nzOnOk: () =>
                this.adminOrderGroupTravelService.syncOrder(this.syncOrderModel).subscribe((res: any) => {
                    if (res?.data?.result == true) {
                        this.modal['success']({
                            nzMask: false,
                            nzTitle: `同步成功`,
                        })
                    }
                    else {
                        this.modal['error']({
                            nzMask: true,
                            nzTitle: "<h3>错误提示</h3>",
                            nzContent: `<h5>${res?.data?.message}</h5>`,
                            nzStyle: { position: 'fixed', top: `70px`, left: `40%`, zIndex: 1000 }
                        })
                    }
                }),
        });


    }



    // 分配销售
    distributionSales() {
        const editmodal = this.modal.create({
            nzTitle: '分配下单/推荐人（大航）',
            nzWidth: 600,
            nzContent: AOGSetSalesComponent,
            nzComponentParams: {
                data: {
                    order_id: this.detailModel.id,
                    bind_id: this.detailModel.bind_id,
                    bind_account_name: this.detailModel.bind_account_name,
                }
            },
            nzFooter: [
                {
                    label: '提交',
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
                this.getDetail();

            });
        })
    }


    // 订单修改日期
    changeDate() {
        const editmodal = this.modal.create({
            nzTitle: '订单修改日期',
            nzWidth: 800,
            nzContent: AOGTDetailChangeDataComponent,
            nzComponentParams: {
                data: {
                    data: this.detailModel,
                    type: 1
                }
            },
            nzFooter: [
                {
                    label: '提交',
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
                this.getDetail();

            });
        })
    }



    // 跳转到用户记录
    routeIt(data: any) {
        console.log("data", data);
        this.router.navigate(['/admin/main/userMoneyLog'], { queryParams: { user_id: data } });
    }


    // 跳转到用户列表
    routeItUser(data: any) {
        console.log("data", data);
        this.router.navigate(['/admin/main/user'], { queryParams: { user_phone: data } });
    }
}



