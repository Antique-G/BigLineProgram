import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

    constructor(public fb: FormBuilder,) {
        this.addForm = this.fb.group({
            order_id: ['',],
            pre_order_id: ['',],
            date_pay: ['',],
            pay_nums: ['',],
            nums: ['',],
            date_use: ['',],
            contact_name: ['',],
            contact_phone: ['',],
            contact_email: ['',],
            contact_qq: ['',],
            contact_wechat: ['',],
        });
    }

    ngOnInit(): void {
    }

}
