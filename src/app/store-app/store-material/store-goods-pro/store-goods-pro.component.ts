import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreGoodsService } from '../../../../services/store/store-goods/store-goods.service';


@Component({
    selector: 'app-store-goods-pro',
    templateUrl: './store-goods-pro.component.html',
    styleUrls: ['./store-goods-pro.component.css']
})
export class StoreGoodsProComponent implements OnInit {
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
    is_hot: any;

    cateFistList: any;
    cateSecondList: any;
    cateThirdList: any;

    isCateId: any;

    goodsSetStatusModel: any;
    goodsSetCheckStatusModel: any;

    setQuery: any;
    pid: any;

    constructor(public fb: FormBuilder, public router: Router, private modal: NzModalService,
        public storeGoodsService: StoreGoodsService) {
        this.searchForm = this.fb.group({
            status: [''],
            check_status: [''],
            title: [''],
            firstType: [''],
            secondType: [''],
            thirdType: [''],
            is_order: [''],
            is_hot: [''],
        });
        this.goodsSetStatusModel = {
            id: '',
            status: ''
        };
        this.goodsSetCheckStatusModel = {
            id: '',
            check_status: ''
        };
    }

    ngOnInit(): void {
        this.storeGoodsService.getCateListTree().subscribe(res => {
            console.log("11111", res);
            this.cateFistList = res;

            let getSeatch = JSON.parse(localStorage.getItem("storeGoodsSearch")!);
            this.status = getSeatch?.status ? getSeatch.status : '';
            this.check_status = getSeatch?.check_status ? getSeatch?.check_status : '';
            this.title = getSeatch?.title ? getSeatch?.title : '';
            this.is_order = getSeatch?.is_order ? getSeatch?.is_order : '';
            this.pid = getSeatch?.pid ? getSeatch?.pid : '';
            this.cate_id = getSeatch?.cate_id ? getSeatch?.cate_id : '';
            this.is_hot = getSeatch?.is_hot ? getSeatch?.is_hot : '';

            // 三级就是这个
            // this.selectedcateThird = this.addDataDetailModel.goods_cate;
            // // 找到二级,对一级先遍历拿到对应的二级list，再过滤到对应的
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
            console.log("444", cate3)
            this.searchForm.patchValue({
                status: this.status,
                check_status: this.check_status,
                title: this.title,
                firstType: cate1 ? cate1[0] : '',
                secondType: cate2 ? cate2[0] : '',
                thirdType: cate3 ? cate3[0] : '',
                is_order: this.is_order,
                is_hot: this.is_hot
            })

            this.getGoodList();

        })
    }


    getGoodList() {
        this.storeGoodsService.goodsList(this.page, this.per_page, this.status, this.check_status, this.is_order, this.cate_id, this.title, this.is_hot).subscribe(res => {
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
        this.cate_id = this.isCateId;
        this.getGoodList();

        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, check_status: this.check_status, title: this.title, is_hot: this.is_hot,
            is_order: this.is_order, cate_id: this.cate_id, page: this.page, pid: this.pid
        }
        localStorage.setItem('storeGoodsSearch', JSON.stringify(this.setQuery));
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
            status: this.status, check_status: this.check_status, title: this.title, is_hot: this.is_hot,
            is_order: this.is_order, cate_id: this.cate_id, page: this.page, pid: this.pid
        }
        localStorage.setItem('storeGoodsSearch', JSON.stringify(this.setQuery));
        this.getGoodList();

    }




    reset() {
        this.cate_id = '';
        this.isCateId = '';
        this.pid = '';
        this.searchForm.patchValue({
            status: '',
            check_status: '',
            title: '',
            firstType: '',
            secondType: '',
            thirdType: '',
            is_order: '',
            is_hot: '',
        })
    }



    // 添加
    addStep() {
        this.router.navigate(['/store/main/storeGoods/create']);
    }

    // 编辑
    edit(data: any) {
        this.router.navigate(['/store/main/storeGoods/detail'], { queryParams: { detailId: data.id } });
    }



    // 选择分类
    changeTypeFirst(event: any) {
        console.log("1111", event);
        if (event) {
            this.cateSecondList = event?.children;
            if (this.cateSecondList != undefined) {
                this.searchForm.patchValue({
                    secondType: this.cateSecondList[0] ? this.cateSecondList[0] : ''
                })
            }
            else {
                this.searchForm.patchValue({
                    secondType: '',
                    thirdType: ''
                })
                this.isCateId = event?.id;
                this.pid = event.pid;
            }
        }
    }


    changeTypeSecond(event: any) {
        console.log("2222", event);
        if (event) {
            this.cateThirdList = event?.children;
            if (this.cateThirdList != undefined) {
                this.searchForm.patchValue({
                    thirdType: this.cateThirdList[0] ? this.cateThirdList[0] : ''
                })
            }
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
                this.storeGoodsService.setStatus(this.goodsSetStatusModel).subscribe(res => {
                    this.getGoodList();
                })
        });
    }




    // 提交审核
    checkStatusClick(data: any) {
        this.goodsSetCheckStatusModel.id = data.id;
        this.goodsSetCheckStatusModel.check_status = 1;
        this.modal.confirm({
            nzTitle: '<h5>请确认操作?</h5>',
            nzContent: '提交审核',
            nzOnOk: () => {
                this.storeGoodsService.checkStatus(this.goodsSetCheckStatusModel).subscribe(res => {
                    console.log(res);
                    this.getGoodList();
                })
            }
        });
    }


    // 撤销审核
    revokeStatus(data: any) {
        this.goodsSetCheckStatusModel.id = data.id;
        this.goodsSetCheckStatusModel.check_status = 0;
        this.modal.confirm({
            nzTitle: '<h5>请确认操作?</h5>',
            nzContent: '撤销审核',
            nzOnOk: () => {
                this.storeGoodsService.checkStatus(this.goodsSetCheckStatusModel).subscribe(res => {
                    console.log(res);
                    this.getGoodList();
                })
            }
        });
    }

}
