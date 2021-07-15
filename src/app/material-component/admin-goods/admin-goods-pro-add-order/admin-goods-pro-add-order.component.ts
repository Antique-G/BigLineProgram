import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminProductManagementService } from 'services/admin/admin-product-management.service';


@Component({
    selector: 'app-admin-goods-pro-add-order',
    templateUrl: './admin-goods-pro-add-order.component.html',
    styleUrls: ['./admin-goods-pro-add-order.component.css']
})
export class AdminGoodsProAddOrderComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 10;
    total: any;

    is_order: any;
    cate_id: any;
    title: any;
    store_id: any;


    // 商品类型
    cateList: any;
    isCateId: any;

    storeList: any[] = [];
    setQuery: any;

    constructor(public fb: FormBuilder, public router: Router, public adminProductManagementService: AdminProductManagementService,
        public adminGoodsService: AdminGoodsService, private modal: NzModalService,) {
        this.searchForm = this.fb.group({
            title: [''],
            type: [''],
            is_order: [''],
            store_id: [''],
        });

    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            this.adminGoodsService.getCateListTree().subscribe(res => {
                console.log("11111", res);
                this.cateList = res;

                let getSeatch = JSON.parse(localStorage.getItem("adminGoodsAddOrderSearch")!);
                this.title = getSeatch?.title ? getSeatch?.title : '';
                this.is_order = getSeatch?.is_order ? getSeatch?.is_order : '';
                this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
                this.cate_id = getSeatch?.cate_id ? getSeatch?.cate_id : '';

                this.searchForm.patchValue({
                    title: this.title,
                    type: this.cate_id ? this.cateAnalyze(this.cate_id) : '',
                    is_order: this.is_order,
                    store_id: this.store_id,
                })

                this.getGoodList();
            })
        })

    }


    getGoodList() {
        this.adminGoodsService.goodsList(this.page, this.per_page, 1, 2, this.is_order, this.cate_id, this.title, this.store_id, '').subscribe(res => {
            this.loading = false;
            console.log("111", res.data);
            this.dataSource = res.data.data;
            this.total = res.data.total;
        })
    }


    search() {
        this.page = 1;
        this.title = this.searchForm.value.title;
        this.is_order = this.searchForm.value.is_order;
        this.store_id = this.searchForm.value.store_id;
        this.cate_id = this.isCateId;
        this.getGoodList();
        // 筛选条件存进cookie
        this.setQuery = {
            title: this.title, is_order: this.is_order, store_id: this.store_id, cate_id: this.cate_id,
            page: this.page,
        }
        localStorage.setItem('adminGoodsAddOrderSearch', JSON.stringify(this.setQuery));
    }



    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getGoodList();

    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            title: this.title, is_order: this.is_order, store_id: this.store_id, cate_id: this.cate_id,
            page: this.page
        }
        localStorage.setItem('adminGoodsAddOrderSearch', JSON.stringify(this.setQuery));
        this.getGoodList();

    }




    reset() {
        this.searchForm.patchValue({
            title: '',
            type: '',
            is_order: '',
            store_id: '',
        })
    }


    anOrder(data: any) {
        this.router.navigate(['/admin/main/goodsAddOrder/add'], { queryParams: { id: data.id } })
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
}
