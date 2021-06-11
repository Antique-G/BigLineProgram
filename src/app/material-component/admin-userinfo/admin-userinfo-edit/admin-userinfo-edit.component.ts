import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUserMoneyLogService } from '../../.../../../../services/admin/admin-user-money-log.service';
import { AdminUserinfoService } from '../../.../../../../services/admin/admin-userinfo.service';

@Component({
    selector: 'app-admin-userinfo-edit',
    templateUrl: './admin-userinfo-edit.component.html',
    styleUrls: ['./admin-userinfo-edit.component.css']
})
export class AdminUserinfoEditComponent implements OnInit {
    isSpinning = false;
    addForm!: FormGroup;
    detailModel: any;
    userId: any;
    orderList: any[] = [];
    page = 1;
    per_page = 10;
    total = 1;
    isUrl: any;
    loading = false;

    userMoneyList: any[] = [];
    page1 = 1;
    per_page1 = 10;
    total1 = 1;
    loading1 = false;

    // 跳转到订单详情
    isOrderUrl: any;
    // 跳到流水
    isRefundUrl: any;


    constructor(public fb: FormBuilder, private adminUserinfoService: AdminUserinfoService,
        public adminUserMoneyLogService: AdminUserMoneyLogService, public router: Router,
        public activatedRoute: ActivatedRoute,) {
        this.addForm = this.fb.group({
            user_id: ['',],
            name: ['',],
            real_name: ['',],
            phone: ['',],
            city_name: ['',],
            gender: ['',],
        })
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.userId = params?.user_id;
            this.isSpinning = true;
            this.adminUserinfoService.userinfoDetail(this.userId).subscribe(res => {
                console.log("111", res);
                this.detailModel = res;
                this.getOrder();
                this.getMoneyList();
            })
        })
    }


    getOrder() {
        this.adminUserinfoService.userOrder(this.page, this.per_page, this.userId).subscribe(res => {
            console.log("2222", res)
            this.isSpinning = false;
            this.loading = false;
            this.orderList = res.data;
            this.total = res.meta.pagination.total;
        })
    }


    changePageIndex(page: number) {
        console.log("aaa", page);
        this.page = page;
        this.loading = true;
        this.getOrder();
    }
    changePageSize(per_page: number) {
        console.log("bbb", per_page);
        this.per_page = per_page;
        this.loading = true;
        this.getOrder();
    }

    getMoneyList() {
        this.adminUserMoneyLogService.UserWithdrawList(this.page1, this.per_page1, '', this.userId).subscribe((res: any) => {
            console.log('res', res)
            this.isSpinning = false;
            this.loading1 = false;
            this.total1 = res.total;
            this.userMoneyList = res.data;
        })
    }


    changePageIndex1(page: number) {
        console.log("aaa", page);
        this.page1 = page;
        this.loading1 = true;
        this.getMoneyList();
    }
    changePageSize1(per_page: number) {
        console.log("bbb", per_page);
        this.per_page1 = per_page;
        this.loading1 = true;
        this.getMoneyList();
    }


    toDetail(data: any) {
        // 跟团游
        if (data?.product_type == 0) {
            this.isUrl = '/admin/main/groupTravelOrder/detail?detailId=' + data?.id;
            window.open(this.isUrl);
        }
        // 自由行
        else if (data?.product_type == 1) {
            this.isUrl = '/admin/main/freeTravelOrder/detail?detailId=' + data?.id;
            window.open(this.isUrl);
        }
    }



    routeToDetail(data: any) {
        console.log("dara", data);
        if (data?.product_type == 0) {
            this.isOrderUrl = '/admin/main/groupTravelOrder/detail?detailId=' + data?.id;
        }
        else if (data?.product_type == 1) {
            this.isOrderUrl = '/admin/main/freeTravelOrder/detail?detailId=' + data?.id;
        }
    }

    routeToRefund(data: any) {
        this.router.navigate(['/admin/main/refundTurnOver'], { queryParams: { transaction_id: data } });
    }
}
