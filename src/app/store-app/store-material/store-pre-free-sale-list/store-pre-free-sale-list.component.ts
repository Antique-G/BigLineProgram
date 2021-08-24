import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorePreSaleService } from '../../../../services/store/store-pre-sale/store-pre-sale.service';


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


    use_status: any;
    product_name: any;
    order_id: any;
    date_start: any;
    date_end: any;
    code: any;
    use_date_start: any;
    use_date_end: any;
    name: any;
    phone: any;
    setQuery: any;

    constructor(public fb: FormBuilder, public router: Router, public storePreSaleService: StorePreSaleService) {
        this.searchForm = fb.group({
            use_status: [''],
            product_name: [''],
            name: [''],
            phone: [''],
            order_id: [''],
            code: [''],
            date_starts: [''],
            user_start_date: [''],
        });
    }

    ngOnInit(): void {
        // 将上次查询的筛选条件赋值
        let getSeatch = JSON.parse(localStorage.getItem("storePreFreeSaleList")!)
        this.use_status = getSeatch?.use_status ? getSeatch?.use_status : '';
        this.product_name = getSeatch?.product_name ? getSeatch?.product_name : '';
        this.name = getSeatch?.name ? getSeatch?.name : '';
        this.phone = getSeatch?.phone ? getSeatch?.phone : '';
        this.order_id = getSeatch?.order_id ? getSeatch?.order_id : '';
        this.code = getSeatch?.code ? getSeatch?.code : '';
        this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
        this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
        this.use_date_start = getSeatch?.use_date_start ? getSeatch?.use_date_start : null;
        this.use_date_end = getSeatch?.use_date_end ? getSeatch?.use_date_end : null;
        this.page = getSeatch?.page ? getSeatch?.page : '';

        this.searchForm.patchValue({
            use_status: this.use_status,
            product_name: this.product_name,
            name: this.name,
            phone: this.phone,
            order_id: this.order_id,
            code: this.code,
            date_starts: this.date_start == null ? [] : [this.date_start, this.date_end],
            user_start_date: this.use_date_start == null ? [] : [this.use_date_start, this.use_date_end],
        })
        this.getOrderList();
    }



    getOrderList() {
        this.loading = true;
        this.storePreSaleService.groupPreFreeSaleList(this.page, this.per_page, this.use_status, this.product_name, this.order_id,
            this.date_start, this.date_end, this.code, this.use_date_start, this.use_date_end, this.name, this.phone).subscribe(res => {
                this.loading = false;
                console.log("结果是", res);
                this.total = res?.meta?.pagination?.total;   //总页数
                this.dataSource = res?.data;
                this.dataSource.forEach((element: any) => {
                    element.ticket_code = element?.ticket_code.toString();
                    console.log("element", element?.ticket_code, typeof (element?.ticket_code));
                });
            })
    }

    setValue() {
        this.use_status = this.searchForm.value.use_status;
        this.product_name = this.searchForm.value.product_name;
        this.order_id = this.searchForm.value.order_id;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.code = this.searchForm.value.code;
        this.use_date_start = this.dateArray1[0];
        this.use_date_end = this.dateArray1[1];
        this.name = this.searchForm.value.name;
        this.phone = this.searchForm.value.phone;
        // 筛选条件存进cookie
        this.setQuery = {
            use_status: this.use_status, product_name: this.product_name, order_id: this.order_id,
            date_start: this.date_start, date_end: this.date_end, code: this.code, page: this.page,
            use_date_start: this.use_date_start, use_date_end: this.use_date_end,
            name: this.name, phone: this.phone
        }
        localStorage.setItem('storePreFreeSaleList', JSON.stringify(this.setQuery));
    }

    search() {
        this.page = 1;
        this.setValue();
        this.getOrderList();
    }


    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            use_status: this.use_status, product_name: this.product_name, order_id: this.order_id,
            date_start: this.date_start, date_end: this.date_end, code: this.code, page: this.page,
            use_date_start: this.use_date_start, use_date_end: this.use_date_end,
            name: this.name, phone: this.phone
        }
        localStorage.setItem('storePreFreeSaleList', JSON.stringify(this.setQuery));
        this.getOrderList();
    }


    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        this.getOrderList();
    }



    reset() {
        this.searchForm.patchValue({
            use_status: '',
            product_name: '',
            name: '',
            phone: '',
            order_id: '',
            code: '',
            date_starts: '',
            user_start_date: '',
        })
    }

    edit(data: any) {
        this.router.navigate(['/store/main/storePreFreeSaleList/detail'], { queryParams: { detailId: data.order_id } });
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
