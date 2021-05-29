import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRefundService } from '../../../services/admin/admin-refund.service';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';

@Component({
    selector: 'app-admin-order-refund-review',
    templateUrl: './admin-order-refund-review.component.html',
    styleUrls: ['./admin-order-refund-review.component.css']
})
export class AdminOrderRefundReviewComponent implements OnInit {
    dateArray1: any[] = [];
    dateArray2: any[] = [];
    searchForm1: FormGroup;
    searchForm2: FormGroup;
    storeList: any[] = [];


    dataSource: any;
    dataSource1: any;
    page = 1;
    per_page = 10;
    total = 1;
    loading = true;

    dataSource2: any;
    page1 = 1;
    per_page1 = 10;
    total1 = 1;
    loading1 = true;

    order_id: any;
    store_id: any;
    product_name: any;
    date_start: any;
    date_end: any;
    id: any;
    refund_id: any
    setQuery2: any
    setQuery1: any
    selectedTabIndex = 0;    //选中的tab 默认第一个
    refundAmountTotalNotModel: any;
    refundAmountTotalYesModel: any;
    updateArray: any[] = [];
    updated_start: any;
    updated_end: any;

    constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
        public adminProductManagementService: AdminProductManagementService, public adminRefundService: AdminRefundService) {
        this.searchForm1 = fb.group({
            product_name: [''],
            store_id: [''],
            order_id: [''],
            time: [''],
            id: [''],
        });
        this.searchForm2 = fb.group({
            product_name: [''],
            store_id: [''],
            order_id: [''],
            time: [''],
            refund_id: [''],
            updatedTime: [''],
        });
    }

    ngOnInit(): void {
        // tabIndex
        this.activatedRoute.queryParams.subscribe(params => {
            console.log('params.tabIndex :>> ', params.tabIndex);
            if (params.tabIndex === undefined) {
                this.selectedTabIndex = 0;
            }
            else {
                this.selectedTabIndex = 1;
            }
        })

        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
        })
        // 将上次查询的筛选条件赋值
        let getSeatch1 = JSON.parse(localStorage.getItem("adminRefundReview1Search")!);
        this.order_id = getSeatch1?.order_id ? getSeatch1.order_id : '';
        this.store_id = getSeatch1?.store_id ? getSeatch1?.store_id : '';
        this.product_name = getSeatch1?.product_name ? getSeatch1?.product_name : '';
        this.date_start = getSeatch1?.date_start ? getSeatch1?.date_start : null;
        this.date_end = getSeatch1?.date_end ? getSeatch1?.date_end : null;
        this.id = getSeatch1?.id ? getSeatch1?.id : '';
        this.page = 1;
        this.searchForm1.patchValue({
            product_name: this.product_name,
            store_id: this.store_id,
            order_id: this.order_id,
            time: this.date_start == null ? [] : [this.date_start, this.date_end],
            id: this.id,
        });
        this.getList();
        this.getRefundAmountTotalNot();
        let getSeatch2 = JSON.parse(localStorage.getItem("adminRefundReview2Search")!);
        this.order_id = getSeatch2?.order_id ? getSeatch2.order_id : '';
        this.store_id = getSeatch2?.store_id ? getSeatch2?.store_id : '';
        this.product_name = getSeatch2?.product_name ? getSeatch2?.product_name : '';
        this.date_start = getSeatch2?.date_start ? getSeatch2?.date_start : null;
        this.date_end = getSeatch2?.date_end ? getSeatch2?.date_end : null;
        this.updated_start = getSeatch2?.updated_start ? getSeatch2?.updated_start : null;
        this.updated_end = getSeatch2?.updated_end ? getSeatch2?.updated_end : null;
        this.refund_id = getSeatch2?.refund_id ? getSeatch2?.refund_id : '';
        this.page = 1;
        this.searchForm2.patchValue({
            product_name: '',
            store_id: this.store_id,
            order_id: this.order_id,
            time: this.date_start == null ? [] : [this.date_start, this.date_end],
            refund_id: this.refund_id,
            updatedTime: this.updated_start == null ? [] : [this.updated_start, this.updated_end],
        });
        this.getList1();
        this.getRefundAmountTotalYes();
    }

    // 未退款
    getList() {
        this.adminRefundService.getRefundList(this.page, this.per_page, this.order_id, this.store_id, this.product_name, this.date_start, this.date_end, this.id, 2).subscribe(res => {
            console.log('res :>> ', res);
            this.dataSource1 = res.data;
            this.loading = false;
            this.total = res?.meta?.pagination?.total;
        })
    }

    getRefundAmountTotalNot() {
        this.adminRefundService.getRefundAmountTotal(this.page, this.per_page, this.order_id, this.store_id, this.product_name, this.date_start, this.date_end, this.id, 2).subscribe(res => {
            console.log('res :>> 11111111', res);
            this.refundAmountTotalNotModel = res?.data;
        })
    }



    search1() {
        this.order_id = this.searchForm1.value.order_id;
        this.store_id = this.searchForm1.value.store_id;
        this.product_name = this.searchForm1.value.product_name;
        this.date_start = this.dateArray1[0];
        this.date_end = this.dateArray1[1];
        this.id = this.searchForm1.value.id;
        this.page = 1;
        // 筛选条件存进cookie
        this.setQuery1 = {
            order_id: this.order_id, store_id: this.store_id, product_name: this.product_name,
            date_start: this.date_start, date_end: this.date_end,
            id: this.id, page: this.page
        }
        localStorage.setItem('adminRefundReview1Search', JSON.stringify(this.setQuery1));
        this.getList();
        this.getRefundAmountTotalNot();

    }


    // 已退款
    getList1() {
        this.adminRefundService.getRefundList(this.page1, this.per_page1, this.order_id, this.store_id, this.product_name, this.date_start, this.date_end, this.refund_id, 3, '', this.updated_start, this.updated_end).subscribe(res => {
            console.log('res :>> ', res);
            this.dataSource2 = res.data;
            this.loading1 = false;
            this.total1 = res?.meta?.pagination?.total;
        })
    }


    getRefundAmountTotalYes() {
        this.adminRefundService.getRefundAmountTotal(this.page1, this.per_page1, this.order_id, this.store_id, this.product_name, this.date_start, this.date_end, this.refund_id, 3, '', this.updated_start, this.updated_end).subscribe(res => {
            console.log('res :>> 11111111', res);
            this.refundAmountTotalYesModel = res?.data;
        })
    }

    search2() {
        this.order_id = this.searchForm2.value.order_id;
        this.store_id = this.searchForm2.value.store_id;
        this.product_name = this.searchForm2.value.product_name;
        this.date_start = this.dateArray2[0];
        this.date_end = this.dateArray2[1];
        this.updated_start = this.updateArray[0];
        this.updated_end = this.updateArray[1];
        this.refund_id = this.searchForm2.value.refund_id;
        this.page = 1;
        // 筛选条件存进cookie
        this.setQuery2 = {
            order_id: this.order_id, store_id: this.store_id, product_name: this.product_name,
            date_start: this.date_start, date_end: this.date_end,
            refund_id: this.refund_id, page: this.page, updated_start: this.updated_start, updated_end: this.updated_end
        }
        localStorage.setItem('adminRefundReview2Search', JSON.stringify(this.setQuery2));
        console.log("this.setQuery2",this.setQuery2)
        this.getList1();
        this.getRefundAmountTotalYes();
    }


    changePageIndex(page: number) {
        this.page = page;
        this.getList();
        this.getRefundAmountTotalNot();

    }

    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getList();
        this.getRefundAmountTotalNot();
    }

    changePageIndex1(page: number) {
        this.page1 = page;
        // 筛选条件存进cookie
        this.setQuery2 = {
            order_id: this.order_id, store_id: this.store_id, product_name: this.product_name,
            date_start: this.date_start, date_end: this.date_end,
            refund_id: this.refund_id, page: this.page, updated_start: this.updated_start, updated_end: this.updated_end
        }
        localStorage.setItem('adminRefundReview2Search', JSON.stringify(this.setQuery2));
        this.getList1();
        this.getRefundAmountTotalYes();

    }

    changePageSize1(per_page: number) {
        this.per_page1 = per_page;
        this.getList1();
        this.getRefundAmountTotalYes();

    }



    onChangeDate(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
    }

    onChangeDate1(event: any) {
        this.dateArray2 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray2.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray2.push(myFormattedDate1);
    }



    onChangeUpdatedTime(event: any) {
        this.updateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.updateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.updateArray.push(myFormattedDate1);
    }

    handle(data: any) {
        this.router.navigate(['/admin/main/refundReview/edit'], { queryParams: { detailId: data.id } });
    }

    edit(data: any) {
        this.router.navigate(['/admin/main/refundReview/detail'], { queryParams: { detailId: data.id, isFinished: 2 } });
    }


    // 重置
    reset1() {
        this.searchForm1.patchValue({
            order_id: '',
            store_id: '',
            product_name: '',
            time: '',
            id: '',
        })
    }

    reset2() {
        this.searchForm2.patchValue({
            order_id: '',
            store_id: '',
            product_name: '',
            time: '',
            refund_id: '',
            updatedTime: '',
        })
    }
}
