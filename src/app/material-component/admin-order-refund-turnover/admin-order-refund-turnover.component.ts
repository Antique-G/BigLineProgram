import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';
import { AdminRefundService } from '../../../services/admin/admin-refund.service';
import { AdminOrderRefundChangStatusComponent } from './admin-order-refund-chang-status/admin-order-refund-chang-status.component';
import { AdminOrderRefundTurnoverDetailComponent } from './admin-order-refund-turnover-detail/admin-order-refund-turnover-detail.component';

@Component({
    selector: 'app-admin-order-refund-turnover',
    templateUrl: './admin-order-refund-turnover.component.html',
    styleUrls: ['./admin-order-refund-turnover.component.css']
})
export class AdminOrderRefundTurnoverComponent implements OnInit {
    searchForm!: FormGroup;
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    order_id: any;
    store_id: any;
    refund_id: any;
    transaction_id: any;
    date_start: any;
    date_end: any;
    status: any;
    dateArray: any[] = [];
    storeList: any[] = [];
    setQuery: any;
    isUrl: any;

    // 跳转到订单详情
    url: any;
    isurl: any;


    constructor(public fb: FormBuilder, public router: Router, public dialog: MatDialog, private modal: NzModalService,
        public activatedRoute: ActivatedRoute,
        public adminRefundService: AdminRefundService, public adminProductManagementService: AdminProductManagementService,) {
        this.searchForm = fb.group({
            order_id: [''],
            store_id: [''],
            refund_id: [''],
            time: [''],
            transaction_id: [''],
            status: [''],
        });
    }



    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            this.loading = false;
        })
        this.activatedRoute.queryParams.subscribe(params => {
            this.transaction_id = params?.transaction_id;
        });
        if (this.transaction_id != undefined) {
            this.transaction_id = this.transaction_id;
            this.searchForm.patchValue({
                transaction_id: this.transaction_id
            })
            this.getRefundlist();
            return
        }
        else {
            this.transaction_id = '';
            this.searchForm.patchValue({
                transaction_id: ''
            })
            // 将上次查询的筛选条件赋值
            let getSeatch1 = JSON.parse(localStorage.getItem("adminRefundTurnSearch")!);
            this.order_id = getSeatch1?.order_id ? getSeatch1.order_id : '';
            this.store_id = getSeatch1?.store_id ? getSeatch1?.store_id : '';
            this.refund_id = getSeatch1?.refund_id ? getSeatch1?.refund_id : '';
            this.date_start = getSeatch1?.date_start ? getSeatch1?.date_start : null;
            this.date_end = getSeatch1?.date_end ? getSeatch1?.date_end : null;
            this.transaction_id = getSeatch1?.transaction_id ? getSeatch1?.transaction_id : null;
            this.status = getSeatch1?.status ? getSeatch1?.status : '';
            this.page = 1;
            this.searchForm.patchValue({
                order_id: this.order_id,
                store_id: this.store_id,
                refund_id: this.refund_id,
                time: this.date_start == null ? [] : [this.date_start, this.date_end],
                transaction_id: this.transaction_id,
                status: this.status,
            });
            this.getRefundlist();
        }

    }

    getRefundlist() {
        this.adminRefundService.getRefundLog(this.page, this.per_page, this.order_id, this.store_id, this.refund_id, this.transaction_id, this.status, this.date_start, this.date_end).subscribe(res => {
            this.dataSource = res.data;
            this.total = res.meta.pagination.total;
            this.loading = false;
            this.url = '/admin/main/groupTravelOrder/detail?detailId=';
            this.isurl = '/admin/main/freeTravelOrder/detail?detailId=';
        })
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            order_id: this.order_id, store_id: this.store_id, refund_id: this.refund_id,
            transaction_id: this.transaction_id, status: this.status,
            date_start: this.date_start, date_end: this.date_end,
            page: this.page
        }
        localStorage.setItem('adminRefundTurnSearch', JSON.stringify(this.setQuery));
        this.getRefundlist();
    }


    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        this.getRefundlist();
    }


    search() {
        this.order_id = this.searchForm.value.order_id;
        this.store_id = this.searchForm.value.store_id;
        this.refund_id = this.searchForm.value.refund_id;
        this.transaction_id = this.searchForm.value.transaction_id;
        this.status = this.searchForm.value.status;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.page = 1;
        // 筛选条件存进cookie
        this.setQuery = {
            order_id: this.order_id, store_id: this.store_id, refund_id: this.refund_id,
            transaction_id: this.transaction_id, status: this.status,
            date_start: this.date_start, date_end: this.date_end,
            page: this.page
        }
        localStorage.setItem('adminRefundTurnSearch', JSON.stringify(this.setQuery));
        this.getRefundlist();
    }



    onChangeDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
    }


    edit(data: any) {
        const dialogRef = this.dialog.open(AdminOrderRefundTurnoverDetailComponent, {
            width: '900px',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {


        });
    }

    send(data: any) {
        console.log('data,data.order :>> ', data, data.id);
        this.modal.confirm({
            nzTitle: '<h4>确认</h4>',
            nzContent: '<h5>是否重新发送退款请求</h5>',
            nzOnOk: () =>
                this.adminRefundService.postReRefund(data.id).subscribe(res => {
                    console.log('res ', res);
                    this.getRefundlist();
                })
        });

    }


    reset() {
        this.searchForm.patchValue({
            order_id: '',
            store_id: '',
            refund_id: '',
            time: '',
            transaction_id: '',
            status: '',
        });
    }


    // 修改状态
    statusEdit(data: any) {
        console.log('data :>> ', data);
        const editmodal = this.modal.create({
            nzTitle: '修改退款状态',
            nzContent: AdminOrderRefundChangStatusComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: [
                {
                    label: '提交',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.update()
                    }
                }
            ]
        })
        editmodal.afterClose.subscribe(res => {
            this.getRefundlist();
        })
    }


    // 跳转到用户记录
    routeIt(data: any) {
        console.log("data", data);
        this.router.navigate(['/admin/main/userMoneyLog'], { queryParams: { user_id: data } });
    }
}