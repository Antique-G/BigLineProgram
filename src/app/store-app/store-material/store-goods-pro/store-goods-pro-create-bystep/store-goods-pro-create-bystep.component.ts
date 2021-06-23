import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StoreGoodsService } from '../../../../../services/store/store-goods/store-goods.service';

@Component({
    selector: 'app-store-goods-pro-create-bystep',
    templateUrl: './store-goods-pro-create-bystep.component.html',
    styleUrls: ['./store-goods-pro-create-bystep.component.css']
})
export class StoreGoodsProCreateBystepComponent implements OnInit {
    isIndex = 0;     //tab的index
    selectedTabIndex = 0;    //选中的tab 默认第一个
    infoId: any;

    addDataDetailModel: any;
    isId: any;
    isShowId = true;
    goodsName: any;


    constructor(public fb: FormBuilder, public storeGoodsService: StoreGoodsService) {

    }

    ngOnInit(): void {
    }


    onTabChange(event: any) {
        this.selectedTabIndex = event;
        console.log("this.selectedTabIndex", this.selectedTabIndex)
        if (this.selectedTabIndex === 0) {
            this.getOneTab();
        }

    }

    getOneTab() {
        this.isId = this.infoId;
        if (this.isId === undefined) {
            this.isShowId = true;
        }
        else {
            this.isShowId = false;
        }
    }



    getTabIndex(event: any) {
        // 获取子组件传回来的index;
        this.selectedTabIndex = event.tabIndex;
        this.isIndex = event.tabIndex;
        this.infoId = event.id;
        this.getGoodsDetail();
    }


    getGoodsDetail() {
        this.storeGoodsService.getGoodsDetail(this.infoId).subscribe(res => {
            console.log("结果是12", res)
            this.addDataDetailModel = res.data;
            this.goodsName = res.data.title;
        })
    }

}
