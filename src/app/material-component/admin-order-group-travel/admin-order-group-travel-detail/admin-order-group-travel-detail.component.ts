import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailsModel } from '../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { EditInfoModel, EditMemberModel } from '../../../../interfaces/store/storeOrder/store-order-model';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { AdminOrderService } from '../../../../services/admin/admin-order.service';
import { AOGSetSalesComponent } from './a-o-g-set-sales/a-o-g-set-sales.component';
import { AOGTDChangePriceComponent } from './a-o-g-t-d-change-price/a-o-g-t-d-change-price.component';
import { AOGTDPartRefundComponent } from './a-o-g-t-d-part-refund/a-o-g-t-d-part-refund.component';
import { AOGTDetailChangeDataComponent } from './a-o-g-t-detail-change-data/a-o-g-t-detail-change-data.component';
import { AdminMemberComponent } from './admin-member/admin-member.component';
import { AdminOrderCancelComponent } from './admin-order-cancel/admin-order-cancel.component';
import { AdminOrderGroupAddMembersComponent } from './admin-order-group-add-members/admin-order-group-add-members.component';
import { AdminOrderPrintConfirmationComponent } from './admin-order-print-confirmation/admin-order-print-confirmation.component';
import { AdminOrderSurrenderComponent } from './admin-order-surrender/admin-order-surrender.component';
import { AdminSelectRefundComponent } from './admin-select-refund/admin-select-refund.component';





@Component({
    selector: 'app-admin-order-group-travel-detail',
    templateUrl: './admin-order-group-travel-detail.component.html',
    styleUrls: ['./admin-order-group-travel-detail.component.css']
})
export class AdminOrderGroupTravelDetailComponent implements OnInit {
    public isSpinning = true;
    addForm!: FormGroup;
    detailId: any;
    detailModel!: DetailsModel;
    dataMember: any;
    audltPrice: any;
    childPrice: any;
    babyPrice: any;

    priceTotal: any;
    dataPayLog: any[] = [];
    refundLog: any[] = [];
    insuranceList: any[] = [];

    // ????????????
    isChange = false;
    editMemberModel: EditMemberModel;
    editInfoModel: EditInfoModel;
    idChangeBir = false;
    idChangeBirDate: any;



    // ????????????
    insuranceMoney: any = 0;

    order_insurance_id: any;

    url: any;

    // ????????????
    syncOrderModel: any;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router, private msg: NzMessageService,
        public adminOrderGroupTravelService: AdminOrderGroupTravelService, private modal: NzModalService, public dialog: MatDialog,
        public adminOrderService: AdminOrderService) {
        this.addForm = this.fb.group({
            order_id: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
            departure_city_name: [''],
            destination_city_name: [''],
            contact_name: ['', [Validators.required]],
            contact_phone: ['', [Validators.required]],
            contact_wechat: [''],
            contact_qq: [''],
            contact_email: [''],
            emergency_contact_person: [''],
            emergency_contact_number: [''],
            customer_remarks: [''],
            internal_remarks: [''],
            days: [''],
            store_name: [''],
            end_date: [''],
            group_code: [''],
            bind_account_name: [''],
            user_id: [''],
            product_id: [''],
            product_code: [''],
            user_phone: [''],
        });
        this.editMemberModel = {
            id: '',
            name: '',
            eng_name: '',
            gender: '',
            phone: '',
            id_type: '',
            id_num: '',
            birthday: '',
            assembling_place: '',
            assembling_time: '',
        };
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
        this.syncOrderModel = {
            order_id: ''
        }
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.detailId;
            // ??????
            this.isSpinning = true;
            this.getgroupTravelDetail();
            this.url = '/admin/main/orderList/detail?detailId=';
        });
    }


    getgroupTravelDetail() {
        this.adminOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
            console.log("?????????", res);
            this.isSpinning = false;

            this.detailModel = res.data;
            // ????????????
            let pagLogArr: any[] = [];
            res.data?.pay_log?.data.forEach((element: any) => {
                if (element.status == 2 || element.status == 3) {
                    pagLogArr.push(element)
                }
            });
            this.dataPayLog = pagLogArr;

            // ????????????
            let reFundLogArr: any[] = [];
            res.data?.refund?.data.forEach((element: any) => {
                if (element.status == 2 || element.status == 3) {
                    reFundLogArr.push(element)
                }
            });
            this.refundLog = reFundLogArr;

            this.dataMember = res.data?.member?.data;
            console.log("?????????????????????", this.dataMember);
            this.dataMember.forEach((element: any) => {
                // ???????????????????????????
                if (element?.id_num == '') {
                    if (element.birthday == null || element.birthday == '') {
                        element.birthday = null;
                    }
                }
                else {
                    // ???????????????????????????????????????
                    if (element?.id_type == 1) {
                        if (element.birthday == null) {
                            let year = element.id_num.slice(6, 10);
                            let month = element.id_num.slice(10, 12);
                            let date = element.id_num.slice(12, 14);
                            element.birthday = year + '-' + month + '-' + date;
                        }
                    }
                    // ???????????????
                    else {
                        if (element.birthday == null || element.birthday == '') {
                            element.birthday = null;
                        }
                    }
                }



                element['edit'] = false;
                if (element?.assembling_time != null) {
                    let i = '2021-01-01' + ' ' + element?.assembling_time;
                    let newDate = new Date(i);
                    console.log('object :>> ', newDate, i);
                    element.assembling_time = format(new Date(newDate), 'yyyy-MM-dd HH:mm');
                }
            });

            // ????????????
            this.insuranceList = this.detailModel?.insurance?.data;
            console.log('insuranceList', this.insuranceList);
            // ????????????
            this.fee();
        })
    }

    fee() {
        // ????????????
        this.audltPrice = Number(this.detailModel?.price_adult) * Number(this.detailModel?.num_adult);
        this.childPrice = Number(this.detailModel?.price_kid) * Number(this.detailModel?.num_kid);
        this.babyPrice = Number(this.detailModel?.price_baby) * Number(this.detailModel?.baby_num);
        this.priceTotal = Number(this.detailModel?.price_total) - Number(this.detailModel?.amount_received);
        this.priceTotal = this.toDecimal(this.priceTotal);
    }


    // ??????????????????
    toDecimal(x: any) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }

    // ??????????????????
    changeDate() {
        const editmodal = this.modal.create({
            nzTitle: '??????????????????',
            nzWidth: 800,
            nzContent: AOGTDetailChangeDataComponent,
            nzComponentParams: {
                data: {
                    data: this.detailModel,
                    type: 2
                }
            },
            nzFooter: [
                {
                    label: '??????',
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
                // ??????
                this.getgroupTravelDetail();

            });
        })
    }




    // ????????????
    orderPartRefund() {
        const dialogRef = this.dialog.open(AdminSelectRefundComponent, {
            width: '550px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log("??????", result)
            if (result != undefined) {
                let type = result;
                const editmodal = this.modal.create({
                    nzTitle: '????????????',
                    nzWidth: 1000,
                    nzMaskClosable: false,
                    nzContent: AOGTDPartRefundComponent,
                    nzComponentParams: {
                        data: {
                            data: this.detailModel,
                            type: type
                        }
                    },
                    nzFooter: null
                })
                editmodal.afterClose.subscribe(res => {
                    this.getgroupTravelDetail();
                })
            }

        });







    }





    // ????????????
    changePrice() {
        const editmodal = this.modal.create({
            nzTitle: '????????????',
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
                // ??????
                this.getgroupTravelDetail();

            });
        })
    }


    // ?????????????????????
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

    changeDetail() {
        this.isChange = true;
    }


    commitDetail() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.modal.confirm({
                nzTitle: "<h4>??????</h4>",
                nzContent: "<h6>???????????????????????????</h6>",
                nzOnOk: () =>
                    this.adminOrderService.editInfo(this.editInfoModel).subscribe(res => {
                        console.log('res :>> ', res);
                        this.getgroupTravelDetail();
                        this.isChange = false;
                    })
            });
        }

    }

    cancelDetail() {
        this.isChange = false;
    }

    // ?????????????????????
    startEdit(data: any): void {
        console.log('????????????id :>> ', data, data.is_kid, data.is_kid == 2);
        // ????????????
        if (data.is_kid == 2) {
            if (data.birthday = '--') {
                data.birthday = null;
            }
            if (data.assembling_time == '') {
                data.assembling_time = format(new Date(), 'yyyy-MM-dd HH:mm');
            }
        }
        this.dataMember.filter(function (item: any, index: any) {
            if (item.id === data.id) {
                item.edit = true;
            }
        });

    }


    cancelEdit(id: string): void {
        console.log('id :>> ', id);
        this.dataMember.filter(function (item: any, index: any) {
            if (item.id === id) {
                item.edit = false;
            }
        });
    }




    // ????????????
    restore() {
        this.modal.confirm({
            nzTitle: "<h4>??????</h4>",
            nzContent: "<h6>?????????????????????</h6>",
            nzOnOk: () =>
                this.adminOrderService.recoverInfo(this.detailModel?.id).subscribe(res => {
                    console.log('res :>> ', res);
                    this.getgroupTravelDetail();

                })
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
        this.editMemberModel.assembling_place = data.assembling_place;
        if (data.assembling_time != null) {
            this.editMemberModel.assembling_time = format(new Date(data.assembling_time), 'HH:mm');
        }
        console.log('v33333333 ', this.editMemberModel);

        // ???????????????
        if (this.detailModel?.product?.data?.request_id_num == 1) {
            if (this.editMemberModel.birthday == null) {
                this.msg.error('???????????????????????????');
            }
            else {
                this.adminOrderService.editMember(this.editMemberModel).subscribe((res: any) => {
                    console.log('????????? :>> ', res);
                    this.dataMember.filter(function (item: any, index: any) {
                        if (item.id === data.id) {
                            item.edit = false;
                        }
                    });
                    this.getgroupTravelDetail();
                })
            }
        }
        else {
            if (this.editMemberModel.birthday == null) {
                this.editMemberModel.birthday = '';
            }
            this.adminOrderService.editMember(this.editMemberModel).subscribe((res: any) => {
                console.log('????????? :>> ', res);
                this.dataMember.filter(function (item: any, index: any) {
                    if (item.id === data.id) {
                        item.edit = false;
                    }
                });
                this.getgroupTravelDetail();
            })
        }


    }

    // ??????????????????
    onChangeBir(event: any) {
        console.log('event :>> ', event);
        if (event != null) {
            this.idChangeBir = true;
            this.idChangeBirDate = format(new Date(event), 'yyyy-MM-dd');
        }
    }


    // ??????
    surrenderHandle(data: any) {
        this.modal.confirm({
            nzTitle: '???????',
            nzContent: '?????????????????????',
            nzOnOk: () => {
                const editmodal = this.modal.create({
                    nzTitle: '????????????',
                    nzContent: AdminOrderSurrenderComponent,
                    nzWidth: 1000,
                    nzComponentParams: {
                        data: {
                            data: data,
                            priceTotal: this.priceTotal
                        }
                    },
                    nzFooter: [
                        {
                            label: '??????????????????',
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
                        // ??????
                        this.getgroupTravelDetail();

                    });
                })
            }
        });
    }





    member(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '???????????????',
            nzContent: AdminMemberComponent,
            nzWidth: 1000,
            nzComponentParams: {
                data: {
                    data: data,
                    detail: this.detailModel
                }
            },
            nzFooter: null
        })
        editmodal.afterClose.subscribe(res => {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;
                // ??????
                this.getgroupTravelDetail();

            });
        })
    }

    // ????????????
    seeDetail(obj: any) {
        this.order_insurance_id = obj.id;
        const msgId = this.msg.loading('????????????????????????', { nzDuration: 0 }).messageId;
        this.adminOrderGroupTravelService.downloadFile(this.order_insurance_id).subscribe(res => {
            console.log("res", res)
            const link = document.createElement('a');
            const blob = new Blob([res], { type: 'application/pdf' });
            link.setAttribute('href', window.URL.createObjectURL(blob));
            link.setAttribute('download', obj.insurance_name + '-' + new Date().getTime() + '.pdf');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.msg.remove(msgId);
            this.msg.success('????????????????????????')
            // window.open('/bbbb/static/pdf/web/viewer.html?file=' +encodeURIComponent(res));
        })
    }


    // ????????????
    cancelOrder() {
        const editmodal = this.modal.create({
            nzTitle: '????????????',
            nzContent: AdminOrderCancelComponent,
            nzWidth: 700,
            nzComponentParams: {
                data: this.detailModel?.id
            },
            nzFooter: [
                {
                    label: '??????',
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
                // ??????
                this.getgroupTravelDetail();

            });
        })
    }


    // ??????????????????????????????????????????????????????????????????
    syncOrder() {
        this.syncOrderModel.order_id = this.detailModel?.id;
        this.modal.confirm({
            nzTitle: "<h4>??????</h4>",
            nzContent: "<h6>???????????????????????????????????????</h6>",
            nzOnOk: () =>
                this.adminOrderGroupTravelService.syncOrder(this.syncOrderModel).subscribe((res: any) => {
                    if (res?.data?.result == true) {
                        this.modal['success']({
                            nzMask: false,
                            nzTitle: `????????????`,
                        })
                    }
                    else {
                        this.modal['error']({
                            nzMask: true,
                            nzTitle: "<h3>????????????</h3>",
                            nzContent: `<h5>${res?.data?.message}</h5>`,
                            nzStyle: { position: 'fixed', top: `70px`, left: `40%`, zIndex: 1000 }
                        })
                    }
                }),
        });


    }


    // ???????????????
    addMembers() {
        const editmodal = this.modal.create({
            nzTitle: '???????????????',
            nzContent: AdminOrderGroupAddMembersComponent,
            nzWidth: 1100,
            nzMaskClosable: false,
            nzComponentParams: {
                data: this.detailModel
            },
            nzFooter: null
        })
        editmodal.afterClose.subscribe(res => {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;
                // ??????
                this.getgroupTravelDetail();

            });
        })

    }

    // ????????????
    distributionSales() {
        const editmodal = this.modal.create({
            nzTitle: '????????????/?????????????????????',
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
                    label: '??????',
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
                // ??????
                this.getgroupTravelDetail();

            });
        })
    }



    printConfirmation() {
        this.adminOrderGroupTravelService.printConfirm(this.detailModel.id).subscribe(res => {
            console.log("323", res)
            const dialogRef = this.dialog.open(AdminOrderPrintConfirmationComponent, {
                width: '1000px',
                height: '800px',
                data: [res.data, 1],
                disableClose: true
            })
            dialogRef.afterClosed().subscribe(result => {
            })

        })
    }


    // ?????????????????????
    routeIt(data: any) {
        console.log("data", data);
        this.router.navigate(['/admin/main/userMoneyLog'], { queryParams: { user_id: data } });
    }


    // ?????????????????????
    routeItUser(data: any) {
        console.log("data", data);
        this.router.navigate(['/admin/main/user'], { queryParams: { user_phone: data } });
    }




    // ????????????????????? 
    supplementaryInfo() {
        localStorage.setItem("groupOrderDetailForAddMem", JSON.stringify(this.detailModel));
        this.router.navigate(['/admin/main/groupTravelOrder/detail/supplementaryInfo']);
    }
}

