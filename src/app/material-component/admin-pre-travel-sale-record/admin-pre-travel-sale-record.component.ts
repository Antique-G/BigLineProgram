import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';

@Component({
    selector: 'app-admin-pre-travel-sale-record',
    templateUrl: './admin-pre-travel-sale-record.component.html',
    styleUrls: ['./admin-pre-travel-sale-record.component.css']
})
export class AdminPreTravelSaleRecordComponent implements OnInit {
    searchForm: FormGroup;
    storeList: any[] = [];
    dateArray: any[] = [];
    dateArray1: any[] = [];
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;

    constructor(public fb: FormBuilder, public adminProductManagementService: AdminProductManagementService,) {
        this.searchForm = fb.group({
            product_name: [''],
            store_id: [''],
            contact_name: [''],
            contact_phone: [''],
            order_number: [''],
            order_code: [''],
            date_starts: [''],
            user_start_date: [''],
        });
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
        })
    }


    
    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        // this.setQuery = {
        //     status: this.status, product_name: this.product_name,
        //     order_number: this.order_number, product_code: this.product_code, contact_name: this.contact_name,
        //     contact_phone: this.contact_phone, store_id: this.store_id,
        //     date_start: this.date_start, date_end: this.date_end, order_start_date: this.order_start_date,
        //     order_end_date: this.order_end_date, page: this.page,
        //     departure_city: this.departure_city, destination_city: this.destination_city
        // }
        // localStorage.setItem('adminOrderGroupSearch', JSON.stringify(this.setQuery));

        this.loading = true;
        // this.groupTravel();
    }


    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        // this.groupTravel();
    }


    search() {
        
    }

    reset() {
        
    }

    edit(data:any) {
        
    }

    onChangeDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log("event", this.dateArray);

    }

    onChangeDateOrder(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }


}
