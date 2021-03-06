import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUserMoneyLogService } from '../../../../services/admin/admin-user-money-log.service';

@Component({
    selector: 'app-user-money-log-list',
    templateUrl: './user-money-log-list.component.html',
    styleUrls: ['./user-money-log-list.component.css']
})
export class UserMoneyLogListComponent implements OnInit {
    searchForm: FormGroup;
    dataSource = [];
    page = 1;
    per_page = 20;
    total = 1;
    type: any;
    user_id: any;
    loading = true;
    search_type: any;
    // 用户id
    userList_id: any;

    // 跳转到订单详情
    isOrderUrl: any;
    isFreeUrl: any;
    isPreFreeUrl: any;
    isGoodsUrl: any;

    // 跳到流水
    isRefundUrl: any;
    
    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute,  public router: Router, 
        public adminUserMoneyLogService: AdminUserMoneyLogService) {
        this.searchForm = fb.group({
            type: [""],
            user_id: [""],
            search_type: [""],
        })
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.userList_id = params?.user_id;
        });
        console.log("this.user_id", this.userList_id);
        if (this.userList_id != undefined) {
            this.user_id = this.userList_id;
            this.search_type='user_id';
            this.searchForm.patchValue({
                user_id: this.userList_id,
                search_type:'user_id'
            })
            this.getDataList();
        }
        else {
            this.user_id = '';
            this.search_type='';
            this.searchForm.patchValue({
                user_id: '',
                search_type:'user_id'
            })
            this.getDataList();
        }
     
        this.isOrderUrl = '/admin/main/groupTravelOrder/detail?detailId=';
        this.isFreeUrl = '/admin/main/freeTravelOrder/detail?detailId=';
        this.isPreFreeUrl = '/admin/main/preSaleList/detail?detailId=';
        this.isGoodsUrl = '/admin/main/goodsOrderList/detail?id=';
    }


    //金额变动记录
    getDataList(): void {
        this.loading = true;
        this.adminUserMoneyLogService.UserWithdrawList(this.page, this.per_page, this.type, this.user_id,this.search_type).subscribe((res: any) => {
            console.log('res', res)
            this.loading = false
            this.total = res.total;
            this.dataSource = res.data;
        })
    }

    
    changePageIndex(page: number) {
        console.log("aaa", page);
        this.page = page;
        this.getDataList();
    }


    changePageSize(per_page: number) {
        console.log("bbb", per_page);
        this.per_page = per_page;
        this.getDataList();
    }

    
    search() {
        console.log("value", this.searchForm.value);
        this.search_type = this.searchForm.value.search_type;
        this.user_id = this.searchForm.value.user_id;
        this.type = this.searchForm.value.type;
        this.page=1
        this.getDataList();
    }

    // 重置
    reset() {
        this.searchForm.patchValue({
            type: '',
            user_id: '',
            search_type: '',
        })
    }




    routeToRefund(data: any) {
        this.router.navigate(['/admin/main/refundTurnOver'], { queryParams: { transaction_id: data } });
    }
}
