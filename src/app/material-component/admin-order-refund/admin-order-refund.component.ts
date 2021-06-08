import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';
import { AdminRefundService } from '../../../services/admin/admin-refund.service';


@Component({
    selector: 'app-admin-order-refund',
    templateUrl: './admin-order-refund.component.html',
    styleUrls: ['./admin-order-refund.component.css']
})
export class AdminOrderRefundComponent implements OnInit {
    dateArray1: any[] = [];
    dateArray2: any[] = [];
    dateArray3: any[] = [];
    searchForm1: FormGroup;
    searchForm2: FormGroup;
    searchForm3: FormGroup;
    storeList: any[] = [];


    dataSource1: any;
    page = 1;
    per_page = 10;
    total = 1;
    loading = true;

    dataSource2: any;
    page2 = 1;
    per_page2 = 10;
    total2 = 1;
    loading2 = true;

    dataSource3: any;
    page3 = 1;
    per_page3 = 10;
    total3 = 1;
    loading3 = true;

    order_id: any;
    store_id: any;
    product_name: any;
    date_start: any;
    date_end: any;
    id: any;
    status: any;

    selectedTabIndex = 0;    //选中的tab 默认第一个
    setQuery3: any;
    setQuery2: any;
    setQuery1: any;
    refund_id: any;


    constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
        public modal: NzModalService,
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
            id: [''],
        });
        this.searchForm3 = fb.group({
            product_name: [''],
            store_id: [''],
            order_id: [''],
            time: [''],
            refund_id: [''],
            status: [''],
        });
    }

    ngOnInit(): void {
        // tabIndex
        this.activatedRoute.queryParams.subscribe(params => {
            console.log('params.tabIndex :>> ', params.tabIndex);
            if (params.tabIndex == undefined) {
                this.selectedTabIndex = 0;
            }
            else {
                this.selectedTabIndex = params.tabIndex;
            }
            this.onTabChange(this.selectedTabIndex)
        })

        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("34334", res);
            this.storeList = res;
            // 将上次查询的筛选条件赋值
            let getSeatch1 = JSON.parse(localStorage.getItem("adminRefund1Search")!);
            this.order_id = getSeatch1?.order_id ? getSeatch1.order_id : '';
            this.store_id = getSeatch1?.store_id ? getSeatch1?.store_id : '';
            this.product_name = getSeatch1?.product_name ? getSeatch1?.product_name : '';
            this.date_start = getSeatch1?.date_start ? getSeatch1?.date_start : null;
            this.date_end = getSeatch1?.date_end ? getSeatch1?.date_end : null;
            this.id = getSeatch1?.id ? getSeatch1?.id : '';
            this.page = getSeatch1?.page ? getSeatch1?.page : '';
            this.searchForm1.patchValue({
                product_name: this.product_name,
                store_id: this.store_id,
                order_id: this.order_id,
                time: this.date_start == null ? [] : [this.date_start, this.date_end],
                id: this.id,
            });
            this.getList();
        })
    }

    // 未处理
    getList() {
        this.adminRefundService.getRefundList(this.page, this.per_page, this.order_id, this.store_id, this.product_name, this.date_start, this.date_end, this.id, 1, '0').subscribe(res => {
            console.log('res :>> ', res);
            this.dataSource1 = res.data;
            this.loading = false;
            this.total = res?.meta?.pagination?.total;
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
            id: this.id, status: this.status, page: this.page
        }
        localStorage.setItem('adminRefund1Search', JSON.stringify(this.setQuery1));
        this.getList();
    }


    // 未审核
    getList2() {
        this.adminRefundService.getRefundList(this.page, this.per_page, this.order_id, this.store_id, this.product_name, this.date_start, this.date_end, this.id, 1, 1).subscribe(res => {
            console.log('res :>> ', res);
            this.dataSource2 = res.data;
            this.loading2 = false;
            this.total2 = res?.meta?.pagination?.total;
        })
    }


    search2() {
        this.order_id = this.searchForm2.value.order_id;
        this.store_id = this.searchForm2.value.store_id;
        this.product_name = this.searchForm2.value.product_name;
        this.date_start = this.dateArray2[0];
        this.date_end = this.dateArray2[1];
        this.id = this.searchForm2.value.id;
        this.page2 = 1;
        // 筛选条件存进cookie
        this.setQuery2 = {
            order_id: this.order_id, store_id: this.store_id, product_name: this.product_name,
            date_start: this.date_start, date_end: this.date_end,
            id: this.id, status: this.status, page2: this.page2
        }
        localStorage.setItem('adminRefund2Search', JSON.stringify(this.setQuery2));
        this.getList2();
    }



    // 全部
    getList3() {
        this.adminRefundService.getRefundList(this.page3, this.per_page3, this.order_id, this.store_id, this.product_name, this.date_start, this.date_end, this.refund_id, this.status).subscribe(res => {
            console.log('res :>> ', res);
            this.dataSource3 = res.data;
            this.loading3 = false;
            this.total3 = res?.meta?.pagination?.total;
        })
    }

    search3() {
        this.order_id = this.searchForm3.value.order_id;
        this.store_id = this.searchForm3.value.store_id;
        this.product_name = this.searchForm3.value.product_name;
        this.date_start = this.dateArray3[0];
        this.date_end = this.dateArray3[1];
        this.refund_id = this.searchForm3.value.refund_id;
        this.status = this.searchForm3.value.status;
        this.page3 = 1;
        // 筛选条件存进cookie
        this.setQuery3 = {
            order_id: this.order_id, store_id: this.store_id, product_name: this.product_name,
            date_start: this.date_start, date_end: this.date_end,
            refund_id: this.refund_id, status: this.status, page3: this.page3
        }
        localStorage.setItem('adminRefund3Search', JSON.stringify(this.setQuery3));
        this.getList3();
    }


    // 处理退款
    handle(data: any) {
        this.router.navigate(['/admin/main/refund/edit'], { queryParams: { detailId: data.id } });
    }


    //   未审核
    seeDetailAndChange(data: any) {
        this.router.navigate(['/admin/main/refund/change'], { queryParams: { detailId: data.id } });
    }

    // 全部，查看详情
    seeDetail(data: any) {
        console.log('object :>> ', data.status);
        this.router.navigate(['/admin/main/refund/detail'], { queryParams: { detailId: data.id, isTab: 3, isFinished: data.status } });
    }

    changePageIndex(page: number) {
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery1 = {
            order_id: this.order_id, store_id: this.store_id, product_name: this.product_name,
            date_start: this.date_start, date_end: this.date_end,
            id: this.id, status: this.status, page: this.page
        }
        localStorage.setItem('adminRefund1Search', JSON.stringify(this.setQuery1));
        this.getList();
    }

    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getList();
    }


    changePageIndex2(page: number) {
        this.page2 = page;
        // 筛选条件存进cookie
        this.setQuery2 = {
            order_id: this.order_id, store_id: this.store_id, product_name: this.product_name,
            date_start: this.date_start, date_end: this.date_end,
            id: this.id, status: this.status, page2: this.page2
        }
        localStorage.setItem('adminRefund2Search', JSON.stringify(this.setQuery2));
        this.getList2();
    }

    changePageSize2(per_page: number) {
        this.per_page2 = per_page;
        this.getList2();
    }



    changePageIndex3(page: number) {
        this.page3 = page;
        // 筛选条件存进cookie
        this.setQuery3 = {
            order_id: this.order_id, store_id: this.store_id, product_name: this.product_name,
            date_start: this.date_start, date_end: this.date_end,
            refund_id: this.refund_id, status: this.status, page3: this.page3
        }
        localStorage.setItem('adminRefund3Search', JSON.stringify(this.setQuery3));
        this.getList3();
    }

    changePageSize3(per_page: number) {
        this.per_page3 = per_page;
        this.getList3();
    }



    onChangeDate(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
    }


    onChangeDate2(event: any) {
        this.dateArray2 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray2.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray2.push(myFormattedDate1);
    }


    onChangeDate3(event: any) {
        this.dateArray3 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray3.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray3.push(myFormattedDate1);
    }


    //重置
    reset1() {
        this.searchForm1.patchValue({
            product_name: '',
            store_id: '',
            order_id: '',
            time: '',
            id: '',
        });
    }


    reset2() {
        this.searchForm2.patchValue({
            product_name: '',
            store_id: '',
            order_id: '',
            time: '',
            id: '',
        });
    }


    reset3() {
        this.searchForm3.patchValue({
            product_name: '',
            store_id: '',
            order_id: '',
            time: '',
            refund_id: '',
            status: '',
        });
    }


    onTabChange(index: any) {
        console.log("点击的是", index);
        if (index == 0) {
            // 将上次查询的筛选条件赋值
            let getSeatch1 = JSON.parse(localStorage.getItem("adminRefund1Search")!);
            this.order_id = getSeatch1?.order_id ? getSeatch1.order_id : '';
            this.store_id = getSeatch1?.store_id ? getSeatch1?.store_id : '';
            this.product_name = getSeatch1?.product_name ? getSeatch1?.product_name : '';
            this.date_start = getSeatch1?.date_start ? getSeatch1?.date_start : null;
            this.date_end = getSeatch1?.date_end ? getSeatch1?.date_end : null;
            this.id = getSeatch1?.id ? getSeatch1?.id : '';
            this.page = getSeatch1?.page ? getSeatch1?.page : '';
            this.searchForm1.patchValue({
                product_name: this.product_name,
                store_id: this.store_id,
                order_id: this.order_id,
                time: this.date_start == null ? [] : [this.date_start, this.date_end],
                id: this.id,
            });
            this.getList();
            return
        }
        if (index == 1) {
            // 将上次查询的筛选条件赋值
            let getSeatch2 = JSON.parse(localStorage.getItem("adminRefund2Search")!);
            this.order_id = getSeatch2?.order_id ? getSeatch2.order_id : '';
            this.store_id = getSeatch2?.store_id ? getSeatch2?.store_id : '';
            this.product_name = getSeatch2?.product_name ? getSeatch2?.product_name : '';
            this.date_start = getSeatch2?.date_start ? getSeatch2?.date_start : null;
            this.date_end = getSeatch2?.date_end ? getSeatch2?.date_end : null;
            this.id = getSeatch2?.id ? getSeatch2?.id : '';
            this.page2 = getSeatch2?.page2 ? getSeatch2?.page2 : '';
            this.searchForm2.patchValue({
                product_name: this.product_name,
                store_id: this.store_id,
                order_id: this.order_id,
                time: this.date_start == null ? [] : [this.date_start, this.date_end],
                id: this.id,
            });
            this.getList2();
            return
        }
        else if (index == 2) {
            let getSeatch3 = JSON.parse(localStorage.getItem("adminRefund3Search")!);
            this.order_id = getSeatch3?.order_id ? getSeatch3.order_id : '';
            this.store_id = getSeatch3?.store_id ? getSeatch3?.store_id : '';
            this.product_name = getSeatch3?.product_name ? getSeatch3?.product_name : '';
            this.date_start = getSeatch3?.date_start ? getSeatch3?.date_start : null;
            this.date_end = getSeatch3?.date_end ? getSeatch3?.date_end : null;
            this.refund_id = getSeatch3?.refund_id ? getSeatch3?.refund_id : '';
            this.status = getSeatch3?.status ? getSeatch3?.status : '';
            this.page3 = getSeatch3?.page3 ? getSeatch3?.page3 : '';
            this.searchForm3.patchValue({
                product_name: '',
                store_id: this.store_id,
                order_id: this.order_id,
                time: this.date_start == null ? [] : [this.date_start, this.date_end],
                refund_id: this.refund_id,
                status: this.status
            });
            this.getList3();
            return
        }
    }




    cancelRefund(data:any) {
        this.modal.confirm({
            nzTitle: "<h4>提示</h4>",
            nzContent: "<h6>是否确定撤销退款</h6>",
            nzOnOk: () =>
              this.adminRefundService.postRefundCancel(data.id).subscribe((res) => {
                this.getList();
              }),
          });
    }
}
