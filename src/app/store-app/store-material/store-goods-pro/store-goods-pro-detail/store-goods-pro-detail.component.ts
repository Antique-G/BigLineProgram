import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';

@Component({
    selector: 'app-store-goods-pro-detail',
    templateUrl: './store-goods-pro-detail.component.html',
    styleUrls: ['./store-goods-pro-detail.component.css']
})
export class StoreGoodsProDetailComponent implements OnInit {
    selectedTabIndex = 0;    //选中的tab 默认第一个


    addDataDetailModel: any;
    detailId: any;
    goodsName: any;

    constructor(public activatedRoute: ActivatedRoute, public storeGoodsService: StoreGoodsService) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.detailId = params.detailId;

        });
        if (this.detailId) {
            this.getGoodsDetail()
        } else {
        }
    }



    getGoodsDetail() {
        this.storeGoodsService.getGoodsDetail(this.detailId).subscribe(res => {
            console.log("结果是12", res)
            this.addDataDetailModel = res.data;
            this.goodsName = res.data.title;
        })
    }



    
    onTabChange(event: any) {
        this.selectedTabIndex = event;
        this.getGoodsDetail();
    }

}
