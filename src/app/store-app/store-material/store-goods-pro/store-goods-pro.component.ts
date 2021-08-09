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


    // 商品类型
    cateList: any;
    isCateId: any;


    goodsSetStatusModel: any;
    goodsSetCheckStatusModel: any;

    setQuery: any;




    constructor(public fb: FormBuilder, public router: Router, private modal: NzModalService,
        public storeGoodsService: StoreGoodsService) {
        this.searchForm = this.fb.group({
            status: [''],
            check_status: [''],
            title: [''],
            type: [''],
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
            this.cateList = res;

            let getSeatch = JSON.parse(localStorage.getItem("storeGoodsSearch")!);
            this.status = getSeatch?.status ? getSeatch.status : '';
            this.check_status = getSeatch?.check_status ? getSeatch?.check_status : '';
            this.title = getSeatch?.title ? getSeatch?.title : '';
            this.is_order = getSeatch?.is_order ? getSeatch?.is_order : '';
            this.cate_id = getSeatch?.cate_id ? getSeatch?.cate_id : '';
            this.is_hot = getSeatch?.is_hot ? getSeatch?.is_hot : '';

            this.searchForm.patchValue({
                status: this.status,
                check_status: this.check_status,
                title: this.title,
                type: this.cate_id ? this.cateAnalyze(this.cate_id) : '',
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
            is_order: this.is_order, cate_id: this.cate_id, page: this.page
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
            is_order: this.is_order, cate_id: this.cate_id, page: this.page
        }
        localStorage.setItem('storeGoodsSearch', JSON.stringify(this.setQuery));
        this.getGoodList();

    }




    reset() {
        this.searchForm.patchValue({
            status: '',
            check_status: '',
            title: '',
            type: '',
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
