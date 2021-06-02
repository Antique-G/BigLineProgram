import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSaleService } from '../../../../../services/admin/admin-sale.service';

@Component({
    selector: 'app-admin-pre-sale-detail',
    templateUrl: './admin-pre-sale-detail.component.html',
    styleUrls: ['./admin-pre-sale-detail.component.css']
})
export class AdminPreSaleDetailComponent implements OnInit {
    isSpinning = false;
    detailModel: any;
    addForm!: FormGroup;
    codeList: any[] = [];
    dataPayLog: any[] = [];
    detailId: any;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
        public adminSaleService: AdminSaleService,) {
        this.addForm = this.fb.group({
            presell_id: ['',],
            order_id: ['',],
            date_pay: ['',],
            pay_nums: ['',],
            date_use: ['',],
            contact_name: ['',],
            contact_phone: ['',],
            store_id: ['',],
            ticket_price: ['',],
            subsidy_price: ['',],
        });
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.detailId;
            this.isSpinning = true;
            this.adminSaleService.getStoreOrderTicketDetail(this.detailId).subscribe(res => {
                this.isSpinning = false;
                console.log("11", res);
                this.detailModel = res.data;
                this.dataPayLog = this.detailModel?.pay_log?.data;
                this.codeList = this.detailModel?.ticket_code?.data;
            })
        })

    }

}
