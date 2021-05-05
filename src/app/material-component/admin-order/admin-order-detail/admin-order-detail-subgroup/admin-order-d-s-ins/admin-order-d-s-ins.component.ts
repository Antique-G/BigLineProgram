import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APMBIIDComponent } from 'app/material-component/admin-product/admin-product-management/admin-product-management-detail/admin-product-management-basic-info/a-p-m-b-i-i-d/a-p-m-b-i-i-d.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminInsuranceService } from '../../../../../../services/admin/admin-insurance.service';

@Component({
    selector: 'app-admin-order-d-s-ins',
    templateUrl: './admin-order-d-s-ins.component.html',
    styleUrls: ['./admin-order-d-s-ins.component.css']
})
export class AdminOrderDSInsComponent implements OnInit {
    addForm!: FormGroup;
    @Input() data: any;
    tabDetail: any;
    detail: any;
    endDate: any;

    insuranceArr: any[] = [];
    baseInsuranceId: any;      //基础保险id
    baseInsuranceName: any; 

    constructor(public fb: FormBuilder, public adminInsuranceService: AdminInsuranceService,private modal: NzModalService,) {
        this.addForm = this.fb.group({
            order_id: [''],
            date1: [''],
            date2: [''],
            contract: [''],
            contractPhone: [''],
            product_name: [''],
            sub_group: [''],
            insurance_base: [''],
        })
    }

    ngOnInit(): void {
        console.log("data", this.data)
        this.tabDetail = this.data.tab;
        this.detail = this.data.data;
        this.endDate = this.data.endDate;
        setTimeout(() => {
        this.adminInsuranceService.insuranceDayList(this.detail.few_days).subscribe(res => {
            console.log('保险 :>> ', res);
            this.insuranceArr = res?.data;
        })
    }, 500)
    }


    update() {

    }


    // 单选保险
    changeInsuranceBase(data: any) {
        console.log('data :>> ', data);
        let aArr = this.insuranceArr.filter(item => item?.id === data);
        this.baseInsuranceId = aArr[0]?.id;
        this.baseInsuranceName = aArr[0]?.name;
    }

    baseInsDetail() {
        this.adminInsuranceService.getAdminInsuranceDetail(this.baseInsuranceId).subscribe(res => {
            console.log('结果是 :>> ', res?.data);
            const editmodal = this.modal.create({
                nzTitle: '保险信息',
                nzWidth: 800,
                nzContent: APMBIIDComponent,
                nzComponentParams: {
                    data: res.data
                },
                nzFooter: [
                    {
                        label: '知道了',
                        type: 'primary',
                        onClick: componentInstance => {
                            componentInstance?.update()
                        }
                    }
                ]
            })
            editmodal.afterClose.subscribe(res => {

            })
        })
    }

}
