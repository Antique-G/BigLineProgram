import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminFinaceGroupService } from '../../../../services/admin/admin-finace-group.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminFinanceGroupReqReviewComponent } from './admin-finance-group-req-review/admin-finance-group-req-review.component';


@Component({
    selector: 'app-admin-finance-group-req-money',
    templateUrl: './admin-finance-group-req-money.component.html',
    styleUrls: ['./admin-finance-group-req-money.component.css']
})
export class AdminFinanceGroupReqMoneyComponent implements OnInit {
    searchForm!: FormGroup;
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    storeList: any[] = [];
    group_status: any;
    payout_status: any;
    group_id: any;
    order_number: any;
    product_name: any;
    store_id: any;
    setQuery: any;

    constructor(public fb: FormBuilder, public router: Router, private modal: NzModalService,
                public adminProductManagementService: AdminProductManagementService,
                public adminFinaceGroupService: AdminFinaceGroupService) {
        this.searchForm = this.fb.group({
            group_status: [''],
            payout_status: [''],
            group_id: [''],
            order_number: [''],
            product_name: [''],
            store_id: [''],
        });
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log('24234', res);
            this.storeList = res;
            // 将上次查询的筛选条件赋值
            const getSeatch = JSON.parse(localStorage.getItem('adminGroupCashReqSearch')!);
            this.group_status = getSeatch?.group_status ? getSeatch.group_status : '';
            this.payout_status = getSeatch?.payout_status ? getSeatch?.payout_status : '';
            this.group_id = getSeatch?.group_id ? getSeatch?.group_id : '';
            this.order_number = getSeatch?.order_number ? getSeatch?.order_number : '';
            this.product_name = getSeatch?.product_name ? getSeatch?.product_name : '';
            this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
            this.page = getSeatch?.page ? getSeatch?.page : '';

            this.searchForm.patchValue({
                group_status: this.group_status,
                payout_status: this.payout_status,
                group_id: this.group_id,
                order_number: this.order_number,
                product_name: this.product_name,
                store_id: this.store_id
            });
            this.getList();
        });

    }

    getList() {
        this.loading = true;
        this.adminFinaceGroupService.groupCashList(this.page, this.per_page, this.group_status, this.payout_status, this.group_id, this.order_number, this.product_name, this.store_id).subscribe(res => {
            console.log('结果是', res.data);
            this.loading = false;
            this.dataSource = res?.data;
            this.total = res?.meta?.pagination?.total;
        });
    }


    changePageIndex(page: number) {
        console.log('当前页', page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            group_status: this.group_status, payout_status: this.payout_status, group_id: this.group_id,
            order_number: this.order_number, product_name: this.product_name, store_id: this.store_id, page: this.page
        };
        localStorage.setItem('adminGroupCashReqSearch', JSON.stringify(this.setQuery));
        this.getList();

    }

    changePageSize(per_page: number) {
        console.log('一页显示多少', per_page);
        this.per_page = per_page;
        this.getList();
    }


    search() {
        this.setValue();
        this.getList();

    }

    setValue() {
        this.group_status = this.searchForm.value.group_status;
        this.payout_status = this.searchForm.value.payout_status;
        this.group_id = this.searchForm.value.group_id;
        this.order_number = this.searchForm.value.order_number;
        this.product_name = this.searchForm.value.product_name;
        this.store_id = this.searchForm.value.store_id;
        this.setQuery = {
            group_status: this.group_status, payout_status: this.payout_status, group_id: this.group_id,
            order_number: this.order_number, product_name: this.product_name, store_id: this.store_id, page: this.page
        };
        localStorage.setItem('adminGroupCashReqSearch', JSON.stringify(this.setQuery));
    }

    reset() {
        this.searchForm.patchValue({
            group_status: '',
            payout_status: '',
            group_id: '',
            order_number: '',
            product_name: '',
            store_id: ''
        });
    }


    edit(data: any) {
        this.router.navigate(['/admin/main/orderList/detail'], { queryParams: { detailId: data.group_id, isGroupReq: 1 } });
    }



    // 审核
    review(item: any, data: any) {
        const editmodal = this.modal.create({
            nzTitle: '请款审核',
            nzWidth: 1000,
            nzContent: AdminFinanceGroupReqReviewComponent,
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
        });
    }
}
