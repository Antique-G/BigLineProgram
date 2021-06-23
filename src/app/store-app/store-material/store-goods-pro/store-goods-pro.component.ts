import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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


    cateFistList: any;
    cateSecondList: any;
    isCateId: any;

    constructor(public fb: FormBuilder, public router: Router,
        public storeGoodsService: StoreGoodsService) {
        this.searchForm = this.fb.group({
            status: [''],
            check_status: [''],
            title: [''],
            firstType: [''],
            secondType: [''],
            is_order: [''],
        })
    }

    ngOnInit(): void {
        this.storeGoodsService.getCateListTree().subscribe(res => {
            console.log("11111", res);
            this.cateFistList = res;
            this.getGoodList();
        })
    }


    getGoodList() {
        this.storeGoodsService.goodsList(this.page, this.per_page, this.status, this.check_status, this.is_order, this.cate_id, this.title).subscribe(res => {
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
        this.cate_id = this.isCateId;
        this.getGoodList();
    }



    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getGoodList();

    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        // this.setQuery = {
        //     status: this.status, check_status: this.checkStatus, title: this.title,
        //     code: this.code, few_days: this.few_days, tag: this.tag,
        //     page: this.page, operation_id: this.operation_id,
        //     departure_city: this.departure_city, destination_city: this.destination_city
        // }
        // localStorage.setItem('storeGroupSearch', JSON.stringify(this.setQuery));
        this.getGoodList();

    }




    reset() {
        this.searchForm.patchValue({
            status: '',
            check_status: '',
            title: '',
            firstType: '',
            secondType: '',
            is_order: '',
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
        this.cateSecondList = event?.children;
        this.searchForm.patchValue({
            secondType: this.cateSecondList[0] ? this.cateSecondList[0] : ''
        })
    }


    changeTypeSecond(event: any) {
        console.log("2222", event);
        this.isCateId = event.id;
    }
}
