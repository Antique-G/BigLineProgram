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


    // 商品类型
    cateList: any;
    isCateId: any;

    constructor(private commonService: CommonServiceService, public storeGoodsService: StoreGoodsService,
        private msg: NzMessageService, private modalRef: NzModalRef) {
        this.addForm = new FormGroup({
            type: new FormControl(''),
            name: new FormControl(''),
        });
    }



    ngOnInit(): void {
        this.type = this.data;
        this.getImgList();
        this.storeGoodsService.getCateListTree().subscribe(res => {
            console.log("11111", res);
            this.cateList = res;
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
        this.cate_id = this.isCateId;
        this.name = this.addForm.value.name;
        this.getImgList();

    }


    // 选择分类
    onChangeCate(event: any) {
        console.log("选择分类", event);
        if (event !== null) {
            this.isCateId = event[event.length - 1];
        }
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


}