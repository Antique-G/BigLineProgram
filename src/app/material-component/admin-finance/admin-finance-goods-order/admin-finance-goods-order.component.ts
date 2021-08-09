import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminProductManagementService } from 'services/admin/admin-product-management.service';
import { AdminFinanceGoodsOrderChangeTransComponent } from './admin-finance-goods-order-change-trans/admin-finance-goods-order-change-trans.component';
import { AdminFinanceGoodsOrderConfirmComponent } from './admin-finance-goods-order-confirm/admin-finance-goods-order-confirm.component';



@Component({
    selector: 'app-admin-finance-goods-order',
    templateUrl: './admin-finance-goods-order.component.html',
    styleUrls: ['./admin-finance-goods-order.component.css']
})
export class AdminFinanceGoodsOrderComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 10;
    total: any;
    pay_status: any;
    order_id: any;
    goods_name: any;
    date_start: any;
    date_end: any;
    transaction_id: any;
    pay_type: any;
    store_id: any;
    consignee: any;
    phone: any;
    bind_id: any;

    storeList: any[] = [];
    dateArray: any[] = [];
    setQuery: any;
    totalMoney: any;

    constructor(public fb: FormBuilder, public adminProductManagementService: AdminProductManagementService,
        public adminGoodsService: AdminGoodsService, public router: Router, public modal: NzModalService,
        private message: NzMessageService) {
        this.searchForm = fb.group({
            pay_status: [''],
            pay_type: [''],
            order_id: [''],
            transaction_id: [''],
            goods_name: [''],
            orderTime: [''],
            consignee: [''],
            phone: [''],
            store_id: [''],
            bind_id: ['']
        });
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            let getSeatch = JSON.parse(localStorage.getItem("adminFinGoodsOrderListSearch")!);
            this.pay_status = getSeatch?.pay_status ? getSeatch?.pay_status : '';
            this.order_id = getSeatch?.order_id ? getSeatch?.order_id : '';
            this.pay_type = getSeatch?.pay_type ? getSeatch?.pay_type : '';
            this.goods_name = getSeatch?.goods_name ? getSeatch?.goods_name : '';
            this.transaction_id = getSeatch?.transaction_id ? getSeatch?.transaction_id : '';
            this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
            this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
            this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
            this.consignee = getSeatch?.consignee ? getSeatch?.consignee : '';
            this.phone = getSeatch?.phone ? getSeatch?.phone : '';
            this.bind_id = getSeatch?.bind_id ? getSeatch?.bind_id : '';
            this.page = getSeatch?.page ? getSeatch?.page : 1;

            this.searchForm.patchValue({
                pay_status: this.pay_status,
                pay_type: this.pay_type,
                order_id: this.order_id,
                transaction_id: this.transaction_id,
                goods_name: this.goods_name,
                orderTime: this.date_start == null ? [] : [this.date_start, this.date_end],
                consignee: this.consignee,
                phone: this.phone,
                store_id: this.store_id,
                bind_id: this.bind_id,
            })
            this.getList();
        })
    }


    getList() {
        this.adminGoodsService.orderList_finance(this.page, this.per_page, this.pay_status, this.order_id, this.goods_name,
            this.date_start, this.date_end, this.transaction_id, this.pay_type, this.store_id, this.consignee, this.phone, this.bind_id).subscribe(res => {
                console.log("结果是", res);
                this.loading = false;
                this.dataSource = res.data;
                this.total = res.meta.pagination.total;

                this.dataSource.forEach((res: any) => {
                    let s = 0;
                    console.log("res1111", res);
                    res?.sub_order?.data.forEach((element: any, index: any) => {
                        console.log("element", element, element?.order_item?.data?.length);
                        console.log("233333333", index);
                        s += Number(element?.order_item?.data?.length);
                        element['payLog'] = res?.pay_log
                    });
                    res['allLength'] = s;
                })
                console.log("5555555", this.dataSource);
                if (this.page == 1) {
                    this.totalMoney = res?.meta?.statistics;
                }
            })
    }


    search() {
        this.loading = true;
        this.page = 1;
        this.pay_status = this.searchForm.value.pay_status;
        this.order_id = this.searchForm.value.order_id;
        this.pay_type = this.searchForm.value.pay_type;
        this.goods_name = this.searchForm.value.goods_name;
        this.transaction_id = this.searchForm.value.transaction_id;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.store_id = this.searchForm.value.store_id;
        this.consignee = this.searchForm.value.consignee;
        this.phone = this.searchForm.value.phone;
        this.bind_id = this.searchForm.value.bind_id;
        this.getList();
        // 筛选条件存进cookie
        this.setQuery = {
            pay_status: this.pay_status, order_id: this.order_id,
            pay_type: this.pay_type, goods_name: this.goods_name,
            transaction_id: this.transaction_id, date_start: this.date_start, date_end: this.date_end,
            consignee: this.consignee, phone: this.phone, bind_id: this.bind_id,
            store_id: this.store_id, page: this.page,
        }
        localStorage.setItem('adminFinGoodsOrderListSearch', JSON.stringify(this.setQuery));
    }


    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            pay_status: this.pay_status, order_id: this.order_id,
            pay_type: this.pay_type, goods_name: this.goods_name,
            transaction_id: this.transaction_id, date_start: this.date_start, date_end: this.date_end,
            consignee: this.consignee, phone: this.phone, bind_id: this.bind_id,
            store_id: this.store_id, page: this.page,
        }
        localStorage.setItem('adminFinGoodsOrderListSearch', JSON.stringify(this.setQuery));
        this.getList();
    }


    onChangeOrderDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
    }




    reset() {
        this.searchForm.patchValue({
            pay_status: '',
            pay_type: '',
            order_id: '',
            transaction_id: '',
            goods_name: '',
            orderTime: '',
            consignee: '',
            phone: '',
            store_id: '',
            bind_id: '',
        })
    }


    edit(data: any) {
        this.router.navigate(['/admin/main/financeGoods/detail'], { queryParams: { id: data.id } })
    }


    moneyConfirm(item: any) {
        if (item.status != 2) {
            this.message.error('当前订单状态不可确认');
            return
        }
        else {
            const addmodal = this.modal.create({
                nzTitle: '确认收款',
                nzWidth: 900,
                nzMaskClosable: false,
                nzContent: AdminFinanceGoodsOrderConfirmComponent,
                nzComponentParams: {
                    data: item
                },
                nzFooter: null
            })
            addmodal.afterClose.subscribe(res => {
                this.getList();
            })
        }
    }


    //修改流水号
    changeTrans(item: any) {
        const addmodal = this.modal.create({
            nzTitle: '修改流水号信息',
            nzWidth: 1200,
            nzMaskClosable: false,
            nzContent: AdminFinanceGoodsOrderChangeTransComponent,
            nzComponentParams: {
                data: item
            },
            nzFooter: null
        })
        addmodal.afterClose.subscribe(res => {
            this.getList();
        })
    }

}
