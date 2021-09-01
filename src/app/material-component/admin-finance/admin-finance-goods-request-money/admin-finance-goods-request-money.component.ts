import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminOrderGroupTravelService } from 'services/admin/admin-order-group-travel.service';
import { AdminProductManagementService } from 'services/admin/admin-product-management.service';
import { AdminFinanceGoodsRequestReviewComponent } from './admin-finance-goods-request-review/admin-finance-goods-request-review.component';


@Component({
    selector: 'app-admin-finance-goods-request-money',
    templateUrl: './admin-finance-goods-request-money.component.html',
    styleUrls: ['./admin-finance-goods-request-money.component.css']
})
export class AdminFinanceGoodsRequestMoneyComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 10;
    total: any;
    order_status: any;
    store_id: any;
    payout_status: any;
    cash_pay_status: any;
    order_id: any;
    storeList: any[] = [];
    dateArray: any[] = [];
    setQuery: any;
    totalMoney: any;
    moneyModel: any;


    constructor(public fb: FormBuilder, public adminProductManagementService: AdminProductManagementService,
        public adminGoodsService: AdminGoodsService, public router: Router, public modal: NzModalService,
        public adminOrderGroupTravelService: AdminOrderGroupTravelService,) {
        this.searchForm = this.fb.group({
            order_status: [''],
            order_id: [''],
            store_id: [''],
            payout_status: [''],
            cash_pay_status: [''],
        });

    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            let getSeatch = JSON.parse(localStorage.getItem("adminGoodsOrderCashRequestSearch")!);
            this.order_status = getSeatch?.order_status ? getSeatch?.order_status : '';
            this.order_id = getSeatch?.order_id ? getSeatch?.order_id : '';
            this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
            this.payout_status = getSeatch?.payout_status ? getSeatch?.payout_status : '';
            this.cash_pay_status = getSeatch?.cash_pay_status ? getSeatch?.cash_pay_status : '';
            this.searchForm.patchValue({
                order_status: this.order_status,
                order_id: this.order_id,
                store_id: this.store_id,
                payout_status: this.payout_status,
                cash_pay_status: this.cash_pay_status
            })
            this.getOrderList();
            // 拿到统计的值
            let adminFinanceGoodsOrderReqTotalModel = JSON.parse(localStorage.getItem("adminFinanceGoodsOrderReqTotalModel")!);
            this.moneyModel = adminFinanceGoodsOrderReqTotalModel;
        })
    }

    getOrderList() {
        this.adminGoodsService.cashRequireList(this.page, this.per_page, this.order_status, this.order_id,
            this.store_id, this.payout_status, this.cash_pay_status).subscribe(res => {
                console.log("结果是", res);
                this.loading = false;
                this.dataSource = res.data;
                this.total = res.meta.pagination.total;
                this.dataSource.forEach((res: any) => {
                    let s = 0;
                    console.log("遍历的this.dataSource", res);
                    res?.goods_cash?.data.forEach((element: any, index: any) => {
                        console.log("对子订单的遍历", element, element?.goods_detail?.data?.length);
                        console.log("233333333", index);
                        s += Number(element?.goods_detail?.data?.length);
                    });
                    res['allLength'] = s;
                })
                console.log("5555555", this.dataSource);
                if (this.page == 1) {
                    this.moneyModel = res?.meta?.statistics;
                    localStorage.setItem('adminFinanceGoodsOrderReqTotalModel', JSON.stringify(this.moneyModel));
                }
            })
    }

    search() {
        this.loading = true;
        this.page = 1;
        this.order_status = this.searchForm.value.order_status;
        this.order_id = this.searchForm.value.order_id;
        this.store_id = this.searchForm.value.store_id;
        this.payout_status = this.searchForm.value.payout_status;
        this.cash_pay_status = this.searchForm.value.cash_pay_status;
        this.getOrderList();
        // 筛选条件存进cookie
        this.setQuery = {
            order_status: this.order_status, order_id: this.order_id,
            store_id: this.store_id, page: this.page, payout_status: this.payout_status,
            cash_pay_status: this.cash_pay_status
        }
        localStorage.setItem('adminGoodsOrderCashRequestSearch', JSON.stringify(this.setQuery));
    }



    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getOrderList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            order_status: this.order_status, order_id: this.order_id,
            store_id: this.store_id, page: this.page, payout_status: this.payout_status,
            cash_pay_status: this.cash_pay_status
        }
        localStorage.setItem('adminGoodsOrderCashRequestSearch', JSON.stringify(this.setQuery));
        this.getOrderList();

    }



    reset() {
        this.searchForm.patchValue({
            order_status: '',
            order_id: '',
            store_id: '',
            payout_status: '',
            cash_pay_status: '',
        })
    }


    edit(data: any) {
        this.router.navigate(['/admin/main/goodsOrderList/detail'], { queryParams: { id: data.id, isGoodReq: 1 } })

    }

    // 审核
    review(item: any, data: any) {
        const editmodal = this.modal.create({
            nzTitle: '请款审核',
            nzWidth: 1000,
            nzContent: AdminFinanceGoodsRequestReviewComponent,
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
            this.getOrderList();
        });
    }
}

