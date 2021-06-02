import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorePreSaleService } from '../../../../services/store/store-pre-sale/store-pre-sale.service';


@Component({
    selector: 'app-store-pre-free-appoint',
    templateUrl: './store-pre-free-appoint.component.html',
    styleUrls: ['./store-pre-free-appoint.component.css']
})
export class StorePreFreeAppointComponent implements OnInit {
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
    use_date_end: any;
    date_start: any;
    date_end: any;
    setQuery: any;

    constructor(public fb: FormBuilder, public router: Router, public storePreSaleService: StorePreSaleService) {
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
            date_starts: ['']
        });
    }

    ngOnInit(): void {
         // 将上次查询的筛选条件赋值
         let getSeatch = JSON.parse(localStorage.getItem("storePreAppointSearch")!);
         this.status = getSeatch?.status ? getSeatch.status : '';
         this.order_id = getSeatch?.order_id ? getSeatch?.order_id : '';
         this.ticket_order_id = getSeatch?.ticket_order_id ? getSeatch?.ticket_order_id : '';
         this.transaction_id = getSeatch?.transaction_id ? getSeatch?.transaction_id : '';
         this.code = getSeatch?.code ? getSeatch?.code : '';
         this.product_name = getSeatch?.product_name ? getSeatch?.product_name : '';
         this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
         this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
         this.use_date_start = getSeatch?.use_date_start ? getSeatch?.use_date_start : null;
         this.use_date_end = getSeatch?.use_date_end ? getSeatch?.use_date_end : null;
         this.phone = getSeatch?.phone ? getSeatch?.phone : '';
         this.name = getSeatch?.name ? getSeatch?.name : '';
         this.page = getSeatch?.page ? getSeatch?.page : '';
         this.searchForm.patchValue({
            status:this.status,
            product_name: this.product_name ,
            ticket_order_id: this.ticket_order_id,
            name:this.name,
            phone: this.phone,
            order_id: this.order_id,
            code: this.code,
            transaction_id:this.transaction_id,
            use_date_start:  this.use_date_start == null ? [] : [this.use_date_start, this.use_date_end],
            date_starts: this.date_start == null ? [] : [this.date_start, this.date_end],
           
         });
        this.getCodeList();
    }


    getCodeList() {
        this.loading = true;
        this.storePreSaleService.getCodeList(this.page, this.per_page, this.order_id, this.user_id, this.ticket_order_id, this.status,
            this.transaction_id, this.code, this.product_name, this.name, this.phone, this.use_date_start, this.use_date_end, this.date_start, this.date_end).subscribe(res => {
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
        this.setQuery = {
            order_id: this.order_id,  ticket_order_id: this.ticket_order_id, status: this.status, transaction_id: this.transaction_id,
            code: this.code, product_name: this.product_name,
            name: this.name, phone: this.phone, use_date_start: this.use_date_start,
            use_date_end: this.use_date_end, page: this.page,
            date_start: this.date_start, date_end: this.date_end
        }
        localStorage.setItem('storePreAppointSearch', JSON.stringify(this.setQuery));
        this.getCodeList();
    }


    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        this.getCodeList();
    }


 

    setValue() {
        this.order_id = this.searchForm.value.order_id;
        this.ticket_order_id = this.searchForm.value.ticket_order_id;
        this.status = this.searchForm.value.status;
        this.transaction_id = this.searchForm.value.transaction_id;
        this.code = this.searchForm.value.code;
        this.product_name = this.searchForm.value.product_name;
        this.name = this.searchForm.value.name;
        this.phone = this.searchForm.value.phone;
        this.use_date_start = this.dateArray1[0];
        this.use_date_end = this.dateArray1[1];
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        // 筛选条件存进cookie
        this.setQuery = {
            order_id: this.order_id, ticket_order_id: this.ticket_order_id, status: this.status, transaction_id: this.transaction_id,
            code: this.code, product_name: this.product_name,
            name: this.name, phone: this.phone, use_date_start: this.use_date_start,
            use_date_end: this.use_date_end, page: this.page,
            date_start: this.date_start, date_end: this.date_end
        }
        localStorage.setItem('storePreAppointSearch', JSON.stringify(this.setQuery));
    }

    search() {
        this.page = 1;
        this.setValue();
        this.getCodeList();
    }

    reset() {
        this.searchForm.patchValue({
            status:'',
            product_name: '',
            ticket_order_id: '',
            name:'',
            phone:'',
            order_id: '',
            code: '',
            transaction_id:'',
            use_date_start: '',
            date_starts: '',
        });
    }

    edit(data: any) {
        this.router.navigate(['/store/main/storePreFreeAppointList/detail'], { queryParams: { detailId: data.id } });
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

    onChangeDateUse(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }

}
