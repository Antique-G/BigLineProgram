import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APMBIIDComponent } from 'app/material-component/admin-product/admin-product-management/admin-product-management-detail/admin-product-management-basic-info/a-p-m-b-i-i-d/a-p-m-b-i-i-d.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminOrderService } from '../../../../../../services/admin/admin-order.service';
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
    memberData: any[] = [];
    order_id: any;

    constructor(public fb: FormBuilder, public adminInsuranceService: AdminInsuranceService,
        public adminOrderService: AdminOrderService, private modal: NzModalService,) {
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
        this.order_id = this.detail?.id;
        let ins = this.detail.price_detail.data;
        let insArr: any[] = [];
        ins.forEach((element: any) => {
            if (element?.item_type == 1 || element?.item_type == 2)
                insArr.push(element)
        });
        this.insuranceArr = insArr;
        console.log("this.insuranceArr", this.insuranceArr);

        let member = this.detail.member?.data;
        let memberArr: any[] = [];
        member.forEach((ele: any) => {
            if (ele?.refund_status == 0) {
                memberArr.push(ele)
            }
        });
        this.memberData = memberArr;
    }


    seeDetail(id: any) {
        this.adminInsuranceService.getAdminInsuranceDetail(id).subscribe(res => {
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


    update() {
        
        this.adminOrderService.effectIns(this.order_id).subscribe(res => {
            console.log("res",res)
        })
        // 
    }

}
