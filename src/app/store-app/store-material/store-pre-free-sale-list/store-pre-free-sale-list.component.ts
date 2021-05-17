import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-store-pre-free-sale-list',
    templateUrl: './store-pre-free-sale-list.component.html',
    styleUrls: ['./store-pre-free-sale-list.component.css']
})
export class StorePreFreeSaleListComponent implements OnInit {
    searchForm: FormGroup;
    dateArray: any[] = [];
    dateArray1: any[] = [];
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;


    constructor(public fb: FormBuilder,public router: Router,) {
        this.searchForm = fb.group({
            status: [''],
            product_name: [''],
            contact_name: [''],
            contact_phone: [''],
            order_number: [''],
            order_code: [''],
            date_starts: [''],
            user_start_date: [''],
        });
    }

    ngOnInit(): void {
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

    edit(data: any) {
        this.router.navigate(['/store/main/storePreFreeSaleList/detail'], { queryParams: { detailId: data.id} });
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
