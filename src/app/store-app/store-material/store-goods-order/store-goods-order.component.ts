import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';



@Component({
    selector: 'app-store-goods-order',
    templateUrl: './store-goods-order.component.html',
    styleUrls: ['./store-goods-order.component.css']
})
export class StoreGoodsOrderComponent implements OnInit {
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
    order_id: any;
    consignee: any;
    phone: any;
    bind_id: any;


    // 商品类型
    cateList: any;
    isCateId: any;

    storeList: any[] = [];
    dateArray: any[] = [];
    dateArray1: any[] = [];


    setQuery: any;
    isDeliver: any;

    constructor(public fb: FormBuilder, public storeGoodsService: StoreGoodsService, public router: Router,) {
        this.searchForm = this.fb.group({
            order_status: [''],
            order_id: [''],
            goods_name: [''],
            type: [''],
            is_postage: [''],
            orderTime: [''],
            deliveryTime: [''],
            express_status: [''],
            consignee: [''],
            phone: [''],
            bind_id: [''],
        });

    }

    ngOnInit(): void {
        this.storeGoodsService.getCateListTree().subscribe(res => {
            console.log("11111", res);
            this.cateList = res;
            let getSeatch = JSON.parse(localStorage.getItem("storeGoodsOrderListSearch")!);
            this.order_status = getSeatch?.order_status ? getSeatch?.order_status : '';
            this.order_id = getSeatch?.order_id ? getSeatch?.order_id : '';
            this.express_status = getSeatch?.express_status ? getSeatch?.express_status : '';
            this.goods_name = getSeatch?.goods_name ? getSeatch?.goods_name : '';
            this.cate_id = getSeatch?.cate_id ? getSeatch?.cate_id : '';
            this.is_postage = getSeatch?.is_postage ? getSeatch?.is_postage : '';
            this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
            this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
            this.send_time_start = getSeatch?.send_time_start ? getSeatch?.send_time_start : null;
            this.send_time_end = getSeatch?.send_time_end ? getSeatch?.send_time_end : null;
            this.consignee = getSeatch?.consignee ? getSeatch?.consignee : '';
            this.phone = getSeatch?.phone ? getSeatch?.phone : '';
            this.bind_id = getSeatch?.bind_id ? getSeatch?.bind_id : '';


            this.searchForm.patchValue({
                order_status: this.order_status,
                order_id: this.order_id,
                goods_name: this.goods_name,
                type: this.cate_id ? this.cateAnalyze(this.cate_id) : '',
                is_postage: this.is_postage,
                orderTime: this.date_start == null ? [] : [this.date_start, this.date_end],
                deliveryTime: this.send_time_start == null ? [] : [this.send_time_start, this.send_time_end],
                express_status: this.express_status,
                consignee: this.consignee,
                phone: this.phone,
                bind_id: this.bind_id,
            })
            this.getOrderList();
        })

    }

    getOrderList() {
        this.storeGoodsService.orderList(this.page, this.per_page, this.order_status, this.order_id, this.express_status,
            this.goods_name, this.cate_id, this.is_postage, this.date_start, this.date_end, this.send_time_start, this.send_time_end,
            this.consignee, this.phone, this.bind_id).subscribe(res => {
                console.log("结果是", res);
                this.loading = false;
                this.dataSource = res.data;
                this.total = res.meta.pagination.total;
                if (this.page == 1) {
                    this.isDeliver = res?.meta?.statistics?.deliver;
                }
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
            cate_id: this.cate_id, page: this.page
        }
        localStorage.setItem('storeGoodsOrderListSearch', JSON.stringify(this.setQuery));
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
            cate_id: this.cate_id, page: this.page
        }
        localStorage.setItem('storeGoodsOrderListSearch', JSON.stringify(this.setQuery));
        this.getOrderList();

    }



    reset() {
        this.searchForm.patchValue({
            order_status: '',
            order_id: '',
            goods_name: '',
            type: '',
            is_postage: '',
            orderTime: '',
            deliveryTime: '',
            express_status: '',
            consignee: '',
            phone: '',
            bind_id: ''
        })
    }

    // 选择分类
    onChangeCate(event: any) {
        console.log("选择分类", event);
        if (event !== null) {
            this.isCateId = event[event.length - 1];
        }
    }

    // 分类解析
    cateAnalyze(data: any) {
        const arr: any[] = [];
        this.cateList.forEach((element: any) => {
            console.log("element", element);
            // 若一级的id就是则返回
            if (element?.id == data) {
                arr.push(data);
            }
            // 没有则对二级遍历
            else {
                element?.children?.forEach((ele: any) => {
                    // 若二级的id是
                    if (ele?.id == data) {
                        arr.push(ele.pid, ele.id);
                    }
                    else {
                        // 对三级遍历
                        ele?.children?.forEach((a: any) => {
                            if (a?.id == data) {
                                arr.push(ele.pid, a.pid, a.id);
                            }
                        });
                    }
                });
            }
        });
        return arr;

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
        this.router.navigate(['/store/main/storeGoodsOrder/detail'], { queryParams: { id: data.id } })
    }
}
