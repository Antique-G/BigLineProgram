import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminSaleService } from '../../../../services/admin/admin-sale.service';
@Component({
    selector: 'app-admin-pre-appoint',
    templateUrl: './admin-pre-appoint.component.html',
    styleUrls: ['./admin-pre-appoint.component.css']
})
export class AdminPreAppointComponent implements OnInit {
    searchForm: FormGroup;
    dateArray: any[] = [];
    dateArray1: any[] = [];
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    order_id: any;
    user_id: any;
    ticket_order_id: any;
    status: any;
    transaction_id: any;
    code: any;
    product_name: any;
    name: any;
    phone: any;
    use_date_start: any;
    user_date_end: any;
    date_start: any;
    date_end: any;
    storeList: any[] = [];



    constructor(public fb: FormBuilder, public router: Router, public adminSaleService: AdminSaleService,
        public adminProductManagementService: AdminProductManagementService,) {
        this.searchForm = fb.group({
            status: [''],
            product_name: [''],
            ticket_order_id: [''],
            name: [''],
            phone: [''],
            order_id: [''],
            code: [''],
            transaction_id: [''],
            use_date_start: [''],
            date_starts: [''],
            store_id: [''],
        });
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
        })
        this.getCodeList();
    }

    getCodeList() {
        this.loading = true;
        this.adminSaleService.getCodeList(this.page, this.per_page, this.order_id, this.user_id, this.ticket_order_id, this.status,
            this.transaction_id, this.code, this.product_name, this.name, this.phone, this.use_date_start, this.user_date_end, this.date_start, this.date_end).subscribe(res => {
                console.log("res", res)
                this.loading = false;
                this.dataSource = res?.data;
                this.total = res?.meta?.pagination?.total;
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
        this.getCodeList();

    }


    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        this.getCodeList();

    }


    search() {

    }

    reset() {

    }

    edit(data: any) {
        this.router.navigate(['/admin/main/preSaleRecord/detail'], { queryParams: { detailId: data.id } });
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
