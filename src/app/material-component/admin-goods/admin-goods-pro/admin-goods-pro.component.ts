import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminProductManagementService } from 'services/admin/admin-product-management.service';
import { AdminGoodsProIshotComponent } from './admin-goods-pro-ishot/admin-goods-pro-ishot.component';
import { AdminGoodsProReviewComponent } from './admin-goods-pro-review/admin-goods-pro-review.component';



@Component({
    selector: 'app-admin-goods-pro',
    templateUrl: './admin-goods-pro.component.html',
    styleUrls: ['./admin-goods-pro.component.css']
})
export class AdminGoodsProComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 10;
    total: any;

    status: any;
    check_status: any;
    is_order: any;
    cate_id: any;
    title: any;
    store_id: any;
    is_hot: any;

    // 商品类型
    cateList: any;
    isCateId: any;

    storeList: any[] = [];

    goodsSetStatusModel: any;

    setQuery: any;

    constructor(public fb: FormBuilder, public router: Router, public adminProductManagementService: AdminProductManagementService,
        public adminGoodsService: AdminGoodsService, private modal: NzModalService,) {
        this.searchForm = this.fb.group({
            status: [''],
            check_status: [''],
            title: [''],
            type: [''],
            is_order: [''],
            store_id: [''],
            is_hot: [''],
        });
        this.goodsSetStatusModel = {
            id: '',
            status: ''
        };
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            this.adminGoodsService.getCateListTree().subscribe(res => {
                console.log("11111", res);
                this.cateList = res;

                let getSeatch = JSON.parse(localStorage.getItem("adminGoodsSearch")!);
                this.status = getSeatch?.status ? getSeatch.status : '';
                this.check_status = getSeatch?.check_status ? getSeatch?.check_status : '';
                this.title = getSeatch?.title ? getSeatch?.title : '';
                this.is_order = getSeatch?.is_order ? getSeatch?.is_order : '';
                this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
                this.cate_id = getSeatch?.cate_id ? getSeatch?.cate_id : '';
                this.is_hot = getSeatch?.is_hot ? getSeatch?.is_hot : '';

                this.searchForm.patchValue({
                    status: this.status,
                    check_status: this.check_status,
                    title: this.title,
                    type: this.cate_id ? this.cateAnalyze(this.cate_id) : '',
                    is_order: this.is_order,
                    store_id: this.store_id,
                    is_hot: this.is_hot
                })
                this.getGoodList();
            })
        })

    }


    getGoodList() {
        this.adminGoodsService.goodsList(this.page, this.per_page, this.status, this.check_status, this.is_order, this.cate_id, this.title, this.store_id, this.is_hot).subscribe(res => {
            this.loading = false;
            console.log("111", res.data);
            this.dataSource = res.data.data;
            this.total = res.data.total;
        })
    }


    search() {
        this.page = 1;
        this.status = this.searchForm.value.status;
        this.check_status = this.searchForm.value.check_status;
        this.title = this.searchForm.value.title;
        this.is_order = this.searchForm.value.is_order;
        this.is_hot = this.searchForm.value.is_hot;
        this.store_id = this.searchForm.value.store_id;
        this.cate_id = this.isCateId;
        this.getGoodList();
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, check_status: this.check_status, title: this.title,
            is_order: this.is_order, store_id: this.store_id, cate_id: this.cate_id,
            page: this.page, is_hot: this.is_hot
        }
        localStorage.setItem('adminGoodsSearch', JSON.stringify(this.setQuery));
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
            status: this.status, check_status: this.check_status, title: this.title,
            is_order: this.is_order, store_id: this.store_id, cate_id: this.cate_id,
            page: this.page, is_hot: this.is_hot
        }
        localStorage.setItem('adminGoodsSearch', JSON.stringify(this.setQuery));
        this.getGoodList();

    }




    reset() {
        this.searchForm.patchValue({
            status: '',
            check_status: '',
            title: '',
            type: '',
            is_order: '',
            store_id: '',
            is_hot: ''
        })
    }



    // 编辑
    edit(data: any) {
        this.router.navigate(['/admin/main/goodsList/detail'], { queryParams: { detailId: data.id } });
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



    // 上下架操作
    up(data: any) {
        console.log("nadao", data);
        if (data.status == 0) {
            this.goodsSetStatusModel.status = 1;
        }
        else {
            this.goodsSetStatusModel.status = 0;
        }
        this.goodsSetStatusModel.id = data.id;
        this.modal.confirm({
            nzTitle: '<h4>提示</h4>',
            nzContent: '<h6>请确认操作</h6>',
            nzOnOk: () =>
                this.adminGoodsService.setStatus(this.goodsSetStatusModel).subscribe(res => {
                    this.getGoodList();
                })
        });
    }


    hot(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '设置商品推荐',
            nzWidth: 800,
            nzContent: AdminGoodsProIshotComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: null
        })
        editmodal.afterClose.subscribe(res => {
            this.getGoodList();
        })
    }


    // 审核
    review(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '审核',
            nzWidth: 1000,
            nzContent: AdminGoodsProReviewComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: null
        })
        editmodal.afterClose.subscribe(res => {
            this.getGoodList();
        })
    }
}
