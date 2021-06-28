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

    cateFistList: any;
    cateSecondList: any;
    cateThirdList: any;
    isCateId: any;

    storeList: any[] = [];

    goodsSetStatusModel: any;

    setQuery: any;
    pid: any;

    constructor(public fb: FormBuilder, public router: Router, public adminProductManagementService: AdminProductManagementService,
        public adminGoodsService: AdminGoodsService, private modal: NzModalService,) {
        this.searchForm = this.fb.group({
            status: [''],
            check_status: [''],
            title: [''],
            firstType: [''],
            secondType: [''],
            thirdType: [''],
            is_order: [''],
            store_id: [''],
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
                this.cateFistList = res;

                let getSeatch = JSON.parse(localStorage.getItem("adminGoodsSearch")!);
                this.status = getSeatch?.status ? getSeatch.status : '';
                this.check_status = getSeatch?.check_status ? getSeatch?.check_status : '';
                this.title = getSeatch?.title ? getSeatch?.title : '';
                this.is_order = getSeatch?.is_order ? getSeatch?.is_order : '';
                this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
                this.pid = getSeatch?.pid ? getSeatch?.pid : '';
                this.cate_id = getSeatch?.cate_id ? getSeatch?.cate_id : '';


                // 三级就是这个
                // this.selectedcateThird = this.addDataDetailModel.goods_cate;
                // // 找到二级,对一级先遍历拿到对应的二级list，再过滤到对应的
                let cate2: any;
                console.log("一级", this.cateFistList);
                this.cateFistList.map((element: any) => {
                    cate2 = element.children?.filter((item: any) => item.id == this.pid);
                });
                console.log("22222", cate2,this.cate_id);
                // 找到一级
                let cate1 = this.cateFistList?.filter((item: any) => item.id == cate2[0]?.pid);
                console.log("1111", cate1);
                // 找到三级
                let cate3 = cate2[0]?.children?.filter((item: any) => item.id == this.cate_id);
                console.log("444",cate3)
                this.searchForm.patchValue({
                    status: this.status,
                    check_status: this.check_status,
                    title: this.title,
                    firstType: cate1?cate1[0]:'',
                    secondType: cate2?cate2[0]:'',
                    thirdType: cate3?cate3[0]:'',
                    is_order: this.is_order,
                    store_id: this.store_id,
                })

                this.getGoodList();
            })
        })

    }


    getGoodList() {
        this.adminGoodsService.goodsList(this.page, this.per_page, this.status, this.check_status, this.is_order, this.cate_id, this.title, this.store_id).subscribe(res => {
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
        this.store_id = this.searchForm.value.store_id;
        this.cate_id = this.isCateId;
        this.getGoodList();
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, check_status: this.check_status, title: this.title,
            is_order: this.is_order, store_id: this.store_id, cate_id: this.cate_id,
            page: this.page, pid: this.pid
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
            page: this.page, pid: this.pid
        }
        localStorage.setItem('adminGoodsSearch', JSON.stringify(this.setQuery));
        this.getGoodList();

    }




    reset() {
        this.cate_id = '';
        this.isCateId = '';
        this.searchForm.patchValue({
            status: '',
            check_status: '',
            title: '',
            firstType: '',
            secondType: '',
            thirdType: '',
            is_order: '',
            store_id: '',
        })
    }



    // 编辑
    edit(data: any) {
        this.router.navigate(['/admin/main/goodsList/detail'], { queryParams: { detailId: data.id } });
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
