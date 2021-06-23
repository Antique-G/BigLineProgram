import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorePreSaleService } from '../../../../../services/store/store-pre-sale/store-pre-sale.service';

@Component({
    selector: 'app-store-pre-free-appoint-detail',
    templateUrl: './store-pre-free-appoint-detail.component.html',
    styleUrls: ['./store-pre-free-appoint-detail.component.css']
})
export class StorePreFreeAppointDetailComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;

    detailId: any;
    detailModel: any;


    // 跳转到订单详情
    url: any;
    preurl: any;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
        public storePreSaleService: StorePreSaleService,) {
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
        })
    }

    ngOnInit(): void {
        this.isSpinning = true;
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.detailId;
            this.storePreSaleService.getTicketCodeDetail(this.detailId).subscribe(res => {
                console.log("详情", res)
                this.isSpinning = false;
                this.detailModel = res?.data;
                // 跳转到订单详情
                this.url = '/store/main/storeOrderFreeTravel/detail?detailId=';
                this.preurl = '/store/main/storePreFreeSaleList/detail?detailId=';
            })
        })
    }

}

