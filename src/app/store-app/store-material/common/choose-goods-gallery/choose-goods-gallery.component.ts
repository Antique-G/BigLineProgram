import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';
import { CommonServiceService } from '../../../../../services/store/common-service/common-service.service';

@Component({
    selector: 'app-choose-goods-gallery',
    templateUrl: './choose-goods-gallery.component.html',
    styleUrls: ['./choose-goods-gallery.component.css']
})
export class ChooseGoodsGalleryComponent implements OnInit {
    addForm!: FormGroup;
    @Input() data: any;


    listOfData: any = []
    setOfCheckedId = new Set<number>();
    checked = false
    indeterminate = false;
    listOfCurrentPageData: [] = [];


    loading = true;

    page = 1;
    per_page = 20;
    total = 1;
    name: any;
    cate_id: any;
    type = 1;


    is_cate_id: any;
    cateFistList: any;
    cateSecondList: any;
    cateThirdList: any;

    constructor(private commonService: CommonServiceService, public storeGoodsService: StoreGoodsService,
        private msg: NzMessageService, private modalRef: NzModalRef) {
        this.addForm = new FormGroup({
            firstType: new FormControl(''),
            secondType: new FormControl(''),
            thirdType: new FormControl(''),
            name: new FormControl(''),
        });
    }



    ngOnInit(): void {
        this.type = this.data;
        this.getImgList();
        this.storeGoodsService.getCateListTree().subscribe(res => {
            console.log("11111", res);
            this.cateFistList = res;
        })
    }


    getImgList() {
        this.commonService.getGoodImgList(this.page, this.per_page, this.name, this.cate_id, this.type).subscribe(res => {
            console.log('res', res);
            this.listOfData = res.data;
            this.loading = false;
            this.total = res.total
        })
    }


    getImgSearchList() {
        this.cate_id = this.is_cate_id;
        this.name = this.addForm.value.name;
        this.getImgList();

    }

    updateCheckedSet(id: number, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
        console.log(this.setOfCheckedId, 'updateCheckedSet');
    }


    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getImgList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        this.getImgList();
    }


    onCurrentPageDataChange(listOfCurrentPageData: []): void {
        this.listOfCurrentPageData = listOfCurrentPageData;
        this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
        this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item));
        this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item)) && !this.checked;

    }

    onAllChecked(checked: boolean): void {

        this.listOfCurrentPageData.forEach((item) => {
            this.updateCheckedSet(item, checked)
            // console.log(item,'item');
        });
        this.refreshCheckedStatus();

    }

    onItemChecked(id: any, checked: boolean): void {
        console.log(id, checked);
        this.updateCheckedSet(id, checked);
        this.refreshCheckedStatus();
    }

    importImg() {
        let arr: any[] = [...this.setOfCheckedId];
        this.modalRef.close(arr);
        console.log('arr :>> ', arr);
    }


    // 选择分类
    changeTypeFirst(event: any) {
        console.log("1111", event);
        this.cateSecondList = event?.children;
        this.is_cate_id = event.id;
    }


    changeTypeSecond(event: any) {
        console.log("2222", event);
        this.cateThirdList = event?.children;
        this.is_cate_id = event.id;
    }

    changeTypeThird(event: any) {
        this.is_cate_id = event.id;
    }
}