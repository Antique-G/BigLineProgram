import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminUserCommissionListService } from '../../../../services/admin/admin-user-commission-list.service';

@Component({
    selector: 'app-admin-mini-withdrawal-record-list',
    templateUrl: './admin-mini-withdrawal-record-list.component.html',
    styleUrls: ['./admin-mini-withdrawal-record-list.component.css']
})
export class AdminMiniWithdrawalRecordListComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any[] = [];
    loading = false;
    total = 1;
    page = 1;
    per_page = 20;
    dateArray: any[] = [];

    status: any;
    user_id: any;
    pay_type: any;
    payment_no: any;
    bank_user: any;
    date_start: any;
    date_end: any;
    phone: any;
    check: any;
    userList: any[] = [];
    setQuery: any;

    constructor(public fb: FormBuilder, public adminUserCommissionListService: AdminUserCommissionListService,
        public router: Router,) {
        this.searchForm = fb.group({
            applyTime: [''],
            bank_user: [''],
            user_id: [''],
            phone: [''],
            pay_type: [''],
            status: [''],
            payment_no: [''],
        });
    }

    ngOnInit(): void {
        // 用户id
        this.adminUserCommissionListService.userOption('').subscribe(res => {
            this.userList = res;
        })
        // 已审核
        // 将上次查询的筛选条件赋值
        let getSeatch2 = JSON.parse(localStorage.getItem("adminMiniWithdrawalListSearch")!);
        this.user_id = getSeatch2?.user_id ? getSeatch2?.user_id : '';
        this.pay_type = getSeatch2?.pay_type ? getSeatch2?.pay_type : '';
        this.date_start = getSeatch2?.date_start ? getSeatch2?.date_start : null;
        this.date_end = getSeatch2?.date_end ? getSeatch2?.date_end : null;
        this.bank_user = getSeatch2?.bank_user ? getSeatch2?.bank_user : '';
        this.phone = getSeatch2?.phone ? getSeatch2?.phone : '';
        this.page = getSeatch2?.page ? getSeatch2?.page : '';
        this.status = getSeatch2?.status ? getSeatch2?.status : '';
        this.payment_no = getSeatch2?.payment_no ? getSeatch2?.payment_no : '';

        this.searchForm.patchValue({
            applyTime: this.date_start == null ? [] : [this.date_start, this.date_end],
            bank_user: this.bank_user,
            user_id: this.user_id,
            phone: this.phone,
            pay_type: this.pay_type,
            status: this.status,
            payment_no: this.payment_no
        });
        this.getList2();
    }


    onChangeApplyTime(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
    }



    search() {
        this.page = 1;
        this.user_id = this.searchForm.value.user_id;
        this.pay_type = this.searchForm.value.pay_type;
        this.bank_user = this.searchForm.value.bank_user;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.phone = this.searchForm.value.phone;
        this.status = this.searchForm.value.status;
        this.payment_no = this.searchForm.value.payment_no;

        // 筛选条件存进cookie
        this.setQuery = {
            page: this.page, user_id: this.user_id, pay_type: this.pay_type,
            date_start: this.date_start, date_end: this.date_end,
            bank_user: this.bank_user, phone: this.phone, status: this.status,
            payment_no: this.payment_no
        }
        localStorage.setItem('adminMiniWithdrawalListSearch', JSON.stringify(this.setQuery));
        this.getList2();
    }


    getList2() {
        this.adminUserCommissionListService.UserWithdrawList(this.page, this.per_page, this.status, this.user_id,
            this.pay_type, this.payment_no, this.bank_user, this.date_start, this.date_end, this.phone, 1).subscribe(res => {
                console.log("Jieguoshi ", res);
                this.dataSource = res?.data;
                this.total = res?.meta?.pagination?.total;
            })
    }

    changePageIndex(page: number) {
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            page: this.page, user_id: this.user_id, pay_type: this.pay_type,
            date_start: this.date_start, date_end: this.date_end,
            bank_user: this.bank_user, phone: this.phone, status: this.status,
            payment_no: this.payment_no
        }
        localStorage.setItem('adminMiniWithdrawalListSearch', JSON.stringify(this.setQuery));
        this.getList2();

    }

    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getList2();
    }


    reset() {
        this.searchForm.patchValue({
            applyTime: '',
            bank_user: '',
            user_id: '',
            phone: '',
            pay_type: '',
            status: '',
            payment_no: '',
        });
    }


    // 跳转到用户记录
    routeIt(data: any) {
        console.log("data", data);
        this.router.navigate(['/admin/main/userMoneyLog'], { queryParams: { user_id: data } });
    }
}
