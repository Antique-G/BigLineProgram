import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminProductManagementService } from 'services/admin/admin-product-management.service';
import { AdminGoodsProOrderMoneyComponent } from './admin-goods-pro-order-money/admin-goods-pro-order-money.component';


@Component({
    selector: 'app-admin-goods-pro-order',
    templateUrl: './admin-goods-pro-order.component.html',
    styleUrls: ['./admin-goods-pro-order.component.css']
})
export class AdminGoodsProOrderComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 10;
    total: any;

    goods_name: any;
    cate_id: any;
    is_postage: any;
    order_status: any;
    express_status: any;
    date_start: any;
    date_end: any;
    send_time_start: any;
    send_time_end: any;
    store_id: any;
    order_id: any;
    consignee: any;
    phone: any;
    bind_id: any;



    cateFistList: any;
    cateSecondList: any;
    cateThirdList: any;
    isCateId: any;
    pid: any;


    storeList: any[] = [];
    dateArray: any[] = [];
    dateArray1: any[] = [];


    setQuery: any;

    constructor(public fb: FormBuilder, public adminProductManagementService: AdminProductManagementService,
        public adminGoodsService: AdminGoodsService, public router: Router, public modal: NzModalService,) {
        this.searchForm = this.fb.group({
            order_status: [''],
            order_id: [''],
            goods_name: [''],
            firstType: [''],
            secondType: [''],
            thirdType: [''],
            is_postage: [''],
            orderTime: [''],
            deliveryTime: [''],
            express_status: [''],
            consignee: [''],
            phone: [''],
            store_id: [''],
            bind_id: [''],
        });

    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            this.adminGoodsService.getCateListTree().subscribe(res => {
                console.log("11111", res);
                this.cateFistList = res;

                let getSeatch = JSON.parse(localStorage.getItem("adminGoodsOrderListSearch")!);
                this.order_status = getSeatch?.order_status ? getSeatch?.order_status : '';
                this.order_id = getSeatch?.order_id ? getSeatch?.order_id : '';
                this.express_status = getSeatch?.express_status ? getSeatch?.express_status : '';
                this.goods_name = getSeatch?.goods_name ? getSeatch?.goods_name : '';
                this.pid = getSeatch?.pid ? getSeatch?.pid : '';
                this.cate_id = getSeatch?.cate_id ? getSeatch?.cate_id : '';
                this.is_postage = getSeatch?.is_postage ? getSeatch?.is_postage : '';
                this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
                this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
                this.send_time_start = getSeatch?.send_time_start ? getSeatch?.send_time_start : null;
                this.send_time_end = getSeatch?.send_time_end ? getSeatch?.send_time_end : null;
                this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
                this.consignee = getSeatch?.consignee ? getSeatch?.consignee : '';
                this.phone = getSeatch?.phone ? getSeatch?.phone : '';
                this.bind_id = getSeatch?.bind_id ? getSeatch?.bind_id : '';

                // 找到二级,对一级先遍历拿到对应的二级list，再过滤到对应的
                let cate2: any[] = [];
                console.log("一级", this.cateFistList);
                this.cateFistList.map((element: any) => {
                    let ca = element.children?.filter((item: any) => item.id == this.pid);
                    if (ca && ca?.length > 0) {
                        cate2 = ca
                        return
                    }
                });
                console.log("22222", cate2, this.cate_id);
                // 找到一级
                let cate1 = this.cateFistList?.filter((item: any) => item.id == cate2[0]?.pid);
                console.log("1111", cate1);
                // 找到三级
                let cate3 = cate2[0]?.children?.filter((item: any) => item.id == this.cate_id);
                console.log("444", cate3);
                this.searchForm.patchValue({
                    order_status: this.order_status,
                    order_id: this.order_id,
                    goods_name: this.goods_name,
                    firstType: cate1 ? cate1[0] : '',
                    secondType: cate2 ? cate2[0] : '',
                    thirdType: cate3 ? cate3[0] : '',
                    is_postage: this.is_postage,
                    orderTime: this.date_start == null ? [] : [this.date_start, this.date_end],
                    deliveryTime: this.send_time_start == null ? [] : [this.send_time_start, this.send_time_end],
                    express_status: this.express_status,
                    consignee: this.consignee,
                    phone: this.phone,
                    store_id: this.store_id,
                    bind_id: this.bind_id,
                })
                this.getOrderList();
            })
        })
    }

    getOrderList() {
        this.adminGoodsService.orderList(this.page, this.per_page, this.order_status, this.order_id, this.express_status,
            this.goods_name, this.cate_id, this.is_postage, this.date_start, this.date_end, this.send_time_start, this.send_time_end, this.store_id,
            this.consignee, this.phone, this.bind_id).subscribe(res => {
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
                    });
                    res['allLength'] = s;
                })
                console.log("5555555", this.dataSource)
            })
    }

    search() {
        this.loading = true;
        this.page = 1;
        this.order_status = this.searchForm.value.order_status;
        this.order_id = this.searchForm.value.order_id;
        this.express_status = this.searchForm.value.express_status;
        this.goods_name = this.searchForm.value.goods_name;
        this.cate_id = this.isCateId;
        this.is_postage = this.searchForm.value.is_postage;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.send_time_start = this.dateArray1[0];
        this.send_time_end = this.dateArray1[1];
        this.store_id = this.searchForm.value.store_id;
        this.consignee = this.searchForm.value.consignee;
        this.phone = this.searchForm.value.phone;
        this.bind_id = this.searchForm.value.bind_id;
        this.getOrderList();
        // 筛选条件存进cookie
        this.setQuery = {
            order_status: this.order_status, order_id: this.order_id,
            express_status: this.express_status, goods_name: this.goods_name,
            is_postage: this.is_postage, date_start: this.date_start, date_end: this.date_end,
            send_time_start: this.send_time_start, send_time_end: this.send_time_end,
            consignee: this.consignee, phone: this.phone, bind_id: this.bind_id,
            store_id: this.store_id, cate_id: this.cate_id,
            page: this.page, pid: this.pid
        }
        localStorage.setItem('adminGoodsOrderListSearch', JSON.stringify(this.setQuery));
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
            express_status: this.express_status, goods_name: this.goods_name,
            is_postage: this.is_postage, date_start: this.date_start, date_end: this.date_end,
            send_time_start: this.send_time_start, send_time_end: this.send_time_end,
            consignee: this.consignee, phone: this.phone, bind_id: this.bind_id,
            store_id: this.store_id, cate_id: this.cate_id,
            page: this.page, pid: this.pid
        }
        localStorage.setItem('adminGoodsOrderListSearch', JSON.stringify(this.setQuery));
        this.getOrderList();

    }



    reset() {
        this.cate_id = '';
        this.isCateId = '';
        this.pid = '';
        this.searchForm.patchValue({
            order_status: '',
            order_id: '',
            goods_name: '',
            firstType: '',
            secondType: '',
            thirdType: '',
            is_postage: '',
            orderTime: '',
            deliveryTime: '',
            express_status: '',
            consignee: '',
            phone: '',
            store_id: '',
            bind_id: ''
        })
    }

    // 选择分类
    changeTypeFirst(event: any) {
        console.log("1111", event);
        if (event) {
            this.cateSecondList = event?.children;
            this.searchForm.patchValue({
                secondType: this.cateSecondList[0] ? this.cateSecondList[0] : ''
            })
        }
    }


    changeTypeSecond(event: any) {
        console.log("2222", event);
        if (event) {
            this.cateThirdList = event?.children;
            this.searchForm.patchValue({
                thirdType: this.cateThirdList[0] ? this.cateThirdList[0] : ''
            })
        }


    }

    changeTypeThird(event: any) {
        if (event) {
            this.isCateId = event.id;
            this.pid = event.pid;
        }

    }


    onChangeOrderDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
    }



    onChangeDeliveryDate(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
    }


    // 查看详情
    edit(data: any) {
        this.router.navigate(['/admin/main/goodsOrderList/detail'], { queryParams: { id: data.id } })
    }


    // 收款
    money(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '收款',
            nzContent: AdminGoodsProOrderMoneyComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: [
                {
                    label: '提交',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.add()

                    }
                }
            ]
        })
        addmodal.afterClose.subscribe(res => {
            this.getOrderList();
        })
    }
}
