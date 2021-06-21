import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminUserCommissionListService } from '../../../../services/admin/admin-user-commission-list.service';
import { AdminMiniWithdrawalOperateComponent } from './admin-mini-withdrawal-operate/admin-mini-withdrawal-operate.component';

@Component({
    selector: 'app-admin-mini-withdrawal-review',
    templateUrl: './admin-mini-withdrawal-review.component.html',
    styleUrls: ['./admin-mini-withdrawal-review.component.css']
})
export class AdminMiniWithdrawalReviewComponent implements OnInit {
    searchForm1: FormGroup;
    dataSource1: any[] = [];
    loading1 = false;
    total1 = 1;
    page1 = 1;
    per_page1 = 20;
    dateArray1: any[] = [];
    setQuery1: any;
    selectedTabIndex = 0;    //选中的tab 默认第一个

    searchForm2: FormGroup;
    dataSource2: any[] = [];
    loading2 = false;
    total2 = 1;
    page2 = 1;
    per_page2 = 20;
    dateArray2: any[] = [];
    setQuery2: any;


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
    totalMoney: any;

    constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
        private modal: NzModalService, public adminUserCommissionListService: AdminUserCommissionListService
    ) {
        this.searchForm1 = fb.group({
            applyTime: [''],
            bank_user: [''],
            user_id: [''],
            phone: [''],
            pay_type: ['6']
        });
        this.searchForm2 = fb.group({
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
        // tabIndex
        this.activatedRoute.queryParams.subscribe(params => {
            console.log('params.tabIndex :>> ', params.tabIndex);
            if (params.tabIndex == undefined) {
                this.selectedTabIndex = 0;
            }
            else {
                this.selectedTabIndex = params.tabIndex;
            }

        })
        // 用户id
        this.adminUserCommissionListService.userOption('').subscribe(res => {
            this.userList = res;
        })

        // 将上次查询的筛选条件赋值
        // 未审核
        let getSeatch1 = JSON.parse(localStorage.getItem("adminMiniWithdrawal1Search")!);
        this.user_id = getSeatch1?.user_id ? getSeatch1?.user_id : '';
        this.pay_type = getSeatch1?.pay_type ? getSeatch1?.pay_type : '';
        this.date_start = getSeatch1?.date_start ? getSeatch1?.date_start : null;
        this.date_end = getSeatch1?.date_end ? getSeatch1?.date_end : null;
        this.bank_user = getSeatch1?.bank_user ? getSeatch1?.bank_user : '';
        this.phone = getSeatch1?.phone ? getSeatch1?.phone : '';
        this.page1 = getSeatch1?.page1 ? getSeatch1?.page1 : '';
        this.searchForm1.patchValue({
            applyTime: this.date_start == null ? [] : [this.date_start, this.date_end],
            bank_user: this.bank_user,
            user_id: this.user_id,
            phone: this.phone,
            pay_type: this.pay_type
        });
        this.getList1();
        this.getTotal1();

        // 已审核
        // 将上次查询的筛选条件赋值
        let getSeatch2 = JSON.parse(localStorage.getItem("adminMiniWithdrawal2Search")!);
        this.user_id = getSeatch2?.user_id ? getSeatch2?.user_id : '';
        this.pay_type = getSeatch2?.pay_type ? getSeatch2?.pay_type : '';
        this.date_start = getSeatch2?.date_start ? getSeatch2?.date_start : null;
        this.date_end = getSeatch2?.date_end ? getSeatch2?.date_end : null;
        this.bank_user = getSeatch2?.bank_user ? getSeatch2?.bank_user : '';
        this.phone = getSeatch2?.phone ? getSeatch2?.phone : '';
        this.page2 = getSeatch2?.page2 ? getSeatch2?.page2 : '';
        this.status = getSeatch2?.status ? getSeatch2?.status : '';
        this.payment_no = getSeatch2?.payment_no ? getSeatch2?.payment_no : '';

        this.searchForm2.patchValue({
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





    search1() {
        this.page1 = 1;
        this.user_id = this.searchForm1.value.user_id;
        this.pay_type = this.searchForm1.value.pay_type;
        this.bank_user = this.searchForm1.value.bank_user;
        this.date_start = this.dateArray1[0];
        this.date_end = this.dateArray1[1];
        this.phone = this.searchForm1.value.phone;
        // 筛选条件存进cookie
        this.setQuery1 = {
            page1: this.page1, user_id: this.user_id, pay_type: this.pay_type,
            date_start: this.date_start, date_end: this.date_end,
            bank_user: this.bank_user, phone: this.phone
        }
        localStorage.setItem('adminMiniWithdrawal1Search', JSON.stringify(this.setQuery1));
        this.getList1();
        this.getTotal1();
    }

    getList1() {
        this.adminUserCommissionListService.UserWithdrawList(this.page1, this.per_page1, 1, this.user_id,
            this.pay_type, '', this.bank_user, this.date_start, this.date_end, this.phone, '').subscribe(res => {
                console.log("Jieguoshi ", res);
                this.dataSource1 = res?.data;
                this.total1 = res?.meta?.pagination?.total;
            })
    }

    getTotal1() {
        this.adminUserCommissionListService.totalWithdrawal(1, this.user_id,
            this.pay_type, '', this.bank_user, this.date_start, this.date_end, this.phone, '').subscribe(res => {
                console.log("Jieguoshi ", res);
                this.totalMoney = res?.statistic;
            })
    }

    changePageIndex1(page: number) {
        this.page1 = page;
        // 筛选条件存进cookie
        this.setQuery1 = {
            page1: this.page1, user_id: this.user_id, pay_type: this.pay_type,
            date_start: this.date_start, date_end: this.date_end,
            bank_user: this.bank_user, phone: this.phone
        }
        this.getList1();
    }

    changePageSize1(per_page: number) {
        this.per_page1 = per_page;
        this.getList1();
    }


    onChangeApplyTime1(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
    }

    reset1() {
        this.searchForm1.patchValue({
            applyTime: '',
            bank_user: '',
            user_id: '',
            phone: '',
            pay_type: '',
        });
    }


    search2() {
        this.page2 = 1;
        this.user_id = this.searchForm2.value.user_id;
        this.pay_type = this.searchForm2.value.pay_type;
        this.bank_user = this.searchForm2.value.bank_user;
        this.date_start = this.dateArray2[0];
        this.date_end = this.dateArray2[1];
        this.phone = this.searchForm2.value.phone;
        this.status = this.searchForm2.value.status;
        this.payment_no = this.searchForm2.value.payment_no;

        // 筛选条件存进cookie
        this.setQuery2 = {
            page2: this.page2, user_id: this.user_id, pay_type: this.pay_type,
            date_start: this.date_start, date_end: this.date_end,
            bank_user: this.bank_user, phone: this.phone, status: this.status,
            payment_no: this.payment_no
        }
        localStorage.setItem('adminMiniWithdrawal2Search', JSON.stringify(this.setQuery2));
        this.getList2();
    }


    review(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '审核余额提现',
            nzWidth: 1000,
            nzContent: AdminMiniWithdrawalOperateComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: null
        })
        editmodal.afterClose.subscribe(res => {
            this.getList1();
            this.getTotal1();
            this.getList2();
        })
    }

    changePageIndex2(page: number) {
        this.page2 = page;
        // 筛选条件存进cookie
        // 筛选条件存进cookie
        this.setQuery2 = {
            page2: this.page2, user_id: this.user_id, pay_type: this.pay_type,
            date_start: this.date_start, date_end: this.date_end,
            bank_user: this.bank_user, phone: this.phone, status: this.status,
            payment_no: this.payment_no
        }
        localStorage.setItem('adminMiniWithdrawal2Search', JSON.stringify(this.setQuery2));
        this.getList2();
    }

    changePageSize2(per_page: number) {
        this.per_page2 = per_page;
        this.getList2();
    }


    getList2() {
        this.adminUserCommissionListService.UserWithdrawList(this.page2, this.per_page2, this.status, this.user_id,
            this.pay_type, this.payment_no, this.bank_user, this.date_start, this.date_end, this.phone, 1).subscribe(res => {
                console.log("Jieguoshi ", res);
                this.dataSource2 = res?.data;
                this.total2 = res?.meta?.pagination?.total;
                
            })
    }

    onChangeApplyTime2(event: any) {
        this.dateArray2 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray2.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray2.push(myFormattedDate1);
    }



    reset2() {
        this.searchForm2.patchValue({
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



    // 转化成标准时间
    convertToDate(nows: any) {
        let minsChange = nows * 1000;
        let allMIns = new Date(minsChange);
        let year = allMIns.getFullYear();
        let month = allMIns.getMonth()+1 < 10 ? '0'+(allMIns.getMonth()+1) : allMIns.getMonth()+1;
        let date = allMIns.getDate();
        let hour = allMIns.getHours();
        let minute = allMIns.getMinutes();
        let second = allMIns.getSeconds();
        return year + "-" + month + "-" + date + "-  " + hour + ":" + minute + ":" + second;
    }
}
