import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminFinaceFreedomService } from '../../../../services/admin/admin-finace-freedom.service';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminFinanceFreeReqCashReviewComponent } from './admin-finance-free-req-cash-review/admin-finance-free-req-cash-review.component';


@Component({
    selector: 'app-admin-finance-free-req-cash',
    templateUrl: './admin-finance-free-req-cash.component.html',
    styleUrls: ['./admin-finance-free-req-cash.component.css']
})
export class AdminFinanceFreeReqCashComponent implements OnInit {
    searchForm!: FormGroup;
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    storeList: any[] = [];

    status: any;
    payout_status: any;
    pay_status: any;
    order_number: any;
    product_name: any;
    store_id: any;

    setQuery: any;
    dateArray: any[] = [];
    date_start: any;
    date_end: any;
    moneyModel: any;

    constructor(public fb: FormBuilder, public router: Router, private modal: NzModalService,
        public adminProductManagementService: AdminProductManagementService,
        public adminFinaceFreedomService: AdminFinaceFreedomService) {
        this.searchForm = this.fb.group({
            status: [''],
            payout_status: [''],
            pay_status: [''],
            order_number: [''],
            product_name: [''],
            store_id: [''],
            date_start: [''],
        });
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log('24234', res);
            this.storeList = res;
            // 将上次查询的筛选条件赋值
            const getSeatch = JSON.parse(localStorage.getItem('adminFreeCashReqSearch')!);
            this.status = getSeatch?.status ? getSeatch.status : '';
            this.payout_status = getSeatch?.payout_status ? getSeatch?.payout_status : '';
            this.pay_status = getSeatch?.pay_status ? getSeatch?.pay_status : '';
            this.product_name = getSeatch?.product_name ? getSeatch?.product_name : '';
            this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
            this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
            this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
            this.order_number = getSeatch?.order_number ? getSeatch?.order_number : null;
            this.page = getSeatch?.page ? getSeatch?.page : '';

            this.searchForm.patchValue({
                status: this.status,
                payout_status: this.payout_status,
                pay_status: this.pay_status,
                order_number: this.order_number,
                product_name: this.product_name,
                store_id: this.store_id,
                date_start: this.date_start == null ? [] : [this.date_start, this.date_end],
            });
            this.getList();
            this.getCashList();
        });

    }

    getList() {
        this.loading = true;
        this.adminFinaceFreedomService.freeCashList(this.page, this.per_page, this.status, this.payout_status, this.pay_status, this.order_number, this.product_name, this.store_id, this.date_start,this.date_end).subscribe(res => {
            console.log('结果是', res.data);
            this.loading = false;
            this.dataSource = res?.data;
            this.total = res?.meta?.pagination?.total;
        });
    }


    getCashList() {
        this.adminFinaceFreedomService.freeCashTotal(this.page, this.per_page, this.status, this.payout_status, this.pay_status, this.order_number, this.product_name, this.store_id, this.date_start,this.date_end).subscribe(res => {
            console.log('结果是111111', res);
            this.moneyModel = res?.data;
        });
    }

    changePageIndex(page: number) {
        console.log('当前页', page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, payout_status: this.payout_status, order_number: this.order_number,
            pay_status: this.pay_status, product_name: this.product_name, store_id: this.store_id, page: this.page,
            date_start: this.date_start, date_end: this.date_end,
        };
        localStorage.setItem('adminFreeCashReqSearch', JSON.stringify(this.setQuery));
        this.getList();
        this.getCashList();


    }

    changePageSize(per_page: number) {
        console.log('一页显示多少', per_page);
        this.per_page = per_page;
        this.getList();
        this.getCashList();

    }


    search() {
        this.page = 1;
        this.setValue();
        this.getList();
        this.getCashList();


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

    setValue() {
        this.status = this.searchForm.value.status;
        this.payout_status = this.searchForm.value.payout_status;
        this.order_number = this.searchForm.value.order_number;
        this.pay_status = this.searchForm.value.pay_status;
        this.product_name = this.searchForm.value.product_name;
        this.store_id = this.searchForm.value.store_id;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.setQuery = {
            status: this.status, payout_status: this.payout_status, order_number: this.order_number,
            pay_status: this.pay_status, product_name: this.product_name, store_id: this.store_id, page: this.page,
            date_start: this.date_start, date_end: this.date_end,
        };
        localStorage.setItem('adminFreeCashReqSearch', JSON.stringify(this.setQuery));
    }

    reset() {
        this.searchForm.patchValue({
            status: '',
            payout_status: '',
            pay_status: '',
            order_number: '',
            product_name: '',
            store_id: '',
            date_start: '',
        });
    }


    edit(data: any) {
        this.router.navigate(['/admin/main/freeTravelOrder/detail'], { queryParams: { detailId: data.id, isFreeReq: 1 } });
    }



    // 审核
    review(item: any, data: any) {
        const editmodal = this.modal.create({
            nzTitle: '请款审核',
            nzWidth: 1000,
            nzContent: AdminFinanceFreeReqCashReviewComponent,
            nzComponentParams: {
                data: {
                    detail: item,
                    dataModel: data
                }
            },
            nzFooter: [
                {
                    label: '确定',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.update();
                    }
                }
            ]
        });
        editmodal.afterClose.subscribe(res => {
            this.getList();
            this.getCashList();
        });
    }
}
