import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorePreSaleService } from '../../../../../services/store/store-pre-sale/store-pre-sale.service';

@Component({
    selector: 'app-store-pre-free-sale-list-detail',
    templateUrl: './store-pre-free-sale-list-detail.component.html',
    styleUrls: ['./store-pre-free-sale-list-detail.component.css']
})
export class StorePreFreeSaleListDetailComponent implements OnInit {
    isSpinning = false;
    detailModel: any;
    addForm!: FormGroup;
    codeList: any[] = [];
    dataPayLog: any[] = [];
    detailId: any;



    // 跳转到订单详情
    url: any;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
        public storePreSaleService: StorePreSaleService) {
        this.addForm = this.fb.group({
            presell_id: ['',],
            order_id: ['',],
            date_pay: ['',],
            pay_nums: ['',],
            date_use: ['',],
            contact_name: ['',],
            contact_phone: ['',],
            ticket_price: ['',],
            subsidy_price: ['',],
            product_id: ['',],
        });
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.detailId;
            this.isSpinning = true;
            this.storePreSaleService.getStoreOrderTicketDetail(this.detailId).subscribe(res => {
                this.isSpinning = false;
                console.log("11", res);
                this.detailModel = res.data;
                this.dataPayLog = this.detailModel?.pay_log?.data;
                this.codeList = this.detailModel?.ticket_code?.data;
                // 跳转到订单详情
                this.url = '/store/main/storeOrderFreeTravel/detail?detailId=';
            })
        })

    }

}
