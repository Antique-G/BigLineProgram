import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSaleService } from '../../../../../services/admin/admin-sale.service';

@Component({
    selector: 'app-admin-pre-appoint-detail',
    templateUrl: './admin-pre-appoint-detail.component.html',
    styleUrls: ['./admin-pre-appoint-detail.component.css']
})
export class AdminPreAppointDetailComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;

    detailId: any;
    detailModel: any;
    // 跳转到订单详情
    url: any;
    preurl: any;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
        public adminSaleService: AdminSaleService,) {
        this.addForm = this.fb.group({
            product_id: [''],
            departure: [''],
            destination: [''],
            days: [''],
            store_name: [''],
            order_id: [''],
            use_date: [''],
            created_at: [''],
            contact_name: [''],
            contact_phone: [''],
            contact_wechat: [''],
            contact_qq: [''],
            contact_email: [''],
            customer_remarks: [''],
            code: [''],
            ticket_price: [''],
            subsidy_price: [''],
            use_start_date: [''],
            ticket_order_id: [''],
        })
         }

    ngOnInit(): void {
        this.isSpinning = true;
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.detailId;
            this.adminSaleService.getTicketCodeDetail(this.detailId).subscribe(res => {
                console.log("详情", res)
                this.isSpinning = false;
                this.detailModel = res?.data;
                 // 跳转到订单详情
                this.url = '/admin/main/freeTravelOrder/detail?detailId=';
                this.preurl = '/admin/main/preSaleList/detail?detailId=';
            })
        })
    }

}
