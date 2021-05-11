import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from '../../../../environments/environment';
import { AdminFinaceGroupService } from '../../../../services/admin/admin-finace-group.service';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminFinanceChangeTransComponent } from './admin-finance-change-trans/admin-finance-change-trans.component';

@Component({
    selector: 'app-admin-finance-group-travel',
    templateUrl: './admin-finance-group-travel.component.html',
    styleUrls: ['./admin-finance-group-travel.component.css']
})
export class AdminFinanceGroupTravelComponent implements OnInit {

    searchForm: FormGroup;
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    status: any;
    product_id: any;
    product_name: any;
    order_number: any;
    contact_name: any;
    contact_phone: any;
    payment_status: any;
    store_id: any;
    date_start: any;
    date_end: any;
    order_start_date: any;
    order_end_date: any;
    dateArray: any[] = [];
    dateArray1: any[] = [];
    product_code: any;
    storeList: any[] = [];
    totalModel: any;
    setQuery: any
    isExport: any;
    api = environment.baseUrl;

    constructor(public fb: FormBuilder, public router: Router,
        public modal: NzModalService, public adminOrderGroupTravelService: AdminOrderGroupTravelService,
        public adminProductManagementService: AdminProductManagementService, public adminFinaceGroupService: AdminFinaceGroupService,
        private message: NzMessageService) {
        this.searchForm = fb.group({
            status: [''],
            product_id: [''],
            product_name: [''],
            order_number: [''],
            date_starts: [''],
            product_code: [''],
            store_id: [''],
            order_start_dates: [''],
            contact_name: [''],
            contact_phone: [''],
            payment_status: [''],
        });
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            // 将上次查询的筛选条件赋值
            let getSeatch = JSON.parse(localStorage.getItem("adminOrderGroupSearch")!);
            this.status = getSeatch?.status ? getSeatch.status : '';
            this.product_id = getSeatch?.product_id ? getSeatch?.product_id : '';
            this.product_name = getSeatch?.product_name ? getSeatch?.product_name : '';
            this.order_number = getSeatch?.order_number ? getSeatch?.order_number : '';
            this.product_code = getSeatch?.product_code ? getSeatch?.product_code : '';
            this.contact_name = getSeatch?.contact_name ? getSeatch?.contact_name : '';
            this.contact_phone = getSeatch?.contact_phone ? getSeatch?.contact_phone : '';
            this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
            this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
            this.order_start_date = getSeatch?.order_start_date ? getSeatch?.order_start_date : null;
            this.order_end_date = getSeatch?.order_end_date ? getSeatch?.order_end_date : null;
            this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
            this.payment_status = getSeatch?.payment_status ? getSeatch?.payment_status : '';


            this.searchForm.patchValue({
                status: this.status,
                product_id: this.product_id,
                product_name: this.product_name,
                order_number: this.order_number,
                date_starts: this.date_start == null ? [] : [this.date_start, this.date_end],
                product_code: this.product_code,
                order_start_dates: this.order_start_date == null ? [] : [this.order_start_date, this.order_end_date],
                contact_name: this.contact_name,
                contact_phone: this.contact_phone,
                store_id: this.store_id,
                payment_status: this.payment_status,
            })

            this.groupTravel();
            this.getTotal();
        })
    }

    groupTravel() {
        this.adminFinaceGroupService.groupTravelList(this.page, this.per_page, this.status, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.store_id, this.order_start_date, this.order_end_date, this.contact_name, this.contact_phone, this.payment_status).subscribe(res => {
            console.log("结果是", res);
            this.dataSource = res?.data;
            this.total = res.meta?.pagination?.total;
            this.loading = false;
        })
    }

    getTotal() {
        this.adminFinaceGroupService.getOrderTotal(this.status, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.store_id, this.order_start_date, this.order_end_date, this.contact_name, this.contact_phone, this.payment_status).subscribe(res => {
            console.log('统计', res?.data);
            this.totalModel = res?.data;
            console.log('totalModel?.refund_money!=', this.totalModel?.refund_money != '0');
        })
    }


    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, product_id: this.product_id, product_name: this.product_name,
            order_number: this.order_number, product_code: this.product_code, contact_name: this.contact_name,
            contact_phone: this.contact_phone, store_id: this.store_id,
            date_start: this.date_start, date_end: this.date_end, order_start_date: this.order_start_date,
            order_end_date: this.order_end_date, page: this.page, payment_status: this.payment_status
        }
        localStorage.setItem('adminOrderGroupSearch', JSON.stringify(this.setQuery));

        this.loading = true;
        this.groupTravel();
    }


    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        this.groupTravel();
    }


    setValue() {
        this.status = this.searchForm.value.status;
        this.product_id = this.searchForm.value.product_id;
        this.product_name = this.searchForm.value.product_name;
        this.order_number = this.searchForm.value.order_number;
        this.contact_name = this.searchForm.value.contact_name;
        this.contact_phone = this.searchForm.value.contact_phone;
        this.product_code = this.searchForm.value.product_code;
        this.store_id = this.searchForm.value.store_id;
        this.payment_status = this.searchForm.value.payment_status;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.order_start_date = this.dateArray1[0];
        this.order_end_date = this.dateArray1[1];
        this.page = 1;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, product_id: this.product_id, product_name: this.product_name,
            order_number: this.order_number, product_code: this.product_code, contact_name: this.contact_name,
            contact_phone: this.contact_phone, store_id: this.store_id,
            date_start: this.date_start, date_end: this.date_end, order_start_date: this.order_start_date,
            order_end_date: this.order_end_date, page: this.page, payment_status: this.payment_status
        }
        localStorage.setItem('adminOrderGroupSearch', JSON.stringify(this.setQuery));
    }


    search() {
        this.setValue();
        this.loading = true;
        this.groupTravel();
        this.getTotal();
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

    onChangeDateOrder(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }


    edit(data: any) {
        this.router.navigate(['/admin/main/financeGroupTravel/detail'], { queryParams: { detailId: data.id } });
    }


    addOrder() {
        this.router.navigate(['/admin/main/groupTravelOrder/adminOrdergroupTravelAddOrder']);
    }



    moneyConfirm(data: any) {
        if (data.status != 2) {
            this.message.error('当前订单状态不可确认');
            return
        }
        this.modal.confirm({
            nzTitle: '财务确认收款',
            nzContent: '请确认是否该操作,确认后不可撤销',
            nzOnOk: () => this.adminFinaceGroupService.confrmPayLog(data.id).subscribe(res => this.groupTravel())
        });

        console.log(data);
    }



    // 重置
    reset() {
        this.searchForm.patchValue({
            status: '',
            product_id: '',
            product_name: '',
            order_number: '',
            date_starts: '',
            product_code: '',
            store_id: '',
            order_start_dates: '',
            contact_name: '',
            contact_phone: '',
            payment_status: ''
        });
    }


    getNmber(str: any) {
        return Number(str)
    }



    //修改流水号
    changeTrans(item: any) {
        const addmodal = this.modal.create({
            nzTitle: '修改流水号信息',
            nzWidth: 1100,
            nzMaskClosable: false,
            nzContent: AdminFinanceChangeTransComponent,
            nzComponentParams: {
                data: item
            },
            nzFooter: null
        })
        addmodal.afterClose.subscribe(res => {
            this.groupTravel();
        })
    }



    // 导出
    export() {
        this.setValue();
        this.status = this.status == null ? '' : this.status;
        this.date_start = this.date_start == null ? '' : this.date_start;
        this.date_end = this.date_end == null ? '' : this.date_end;
        this.order_start_date = this.order_start_date == null ? '' : this.order_start_date;
        this.order_end_date = this.order_end_date == null ? '' : this.order_end_date;
        this.payment_status= this.payment_status == null ? '' : this.payment_status;
        this.isExport = this.api + '/admin/order/export?page=' + this.page + '&per_page=' + this.per_page + '&status=' + this.status +
            '&product_id=' + this.product_id + '&product_name=' + this.product_name + '&order_number=' + this.order_number +
            '&date_start=' + this.date_start + '&date_end=' + this.date_end + '&product_code=' + this.product_code +
            '&store_id=' + this.store_id + '&order_start_date=' + this.order_start_date + '&order_end_date=' + this.order_end_date +
            '&contact_name=' + this.contact_name + '&contact_phone=' + this.contact_phone + '&payment_status=' + this.payment_status;

            console.log('object :>> ', this.isExport);
    }
}
