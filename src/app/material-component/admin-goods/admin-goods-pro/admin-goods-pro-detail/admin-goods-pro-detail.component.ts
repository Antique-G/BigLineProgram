import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminGoodsService } from 'services/admin/admin-goods.service';

@Component({
  selector: 'app-admin-goods-pro-detail',
  templateUrl: './admin-goods-pro-detail.component.html',
  styleUrls: ['./admin-goods-pro-detail.component.css']
})
export class AdminGoodsProDetailComponent implements OnInit {
    selectedTabIndex = 0;    //选中的tab 默认第一个


    addDataDetailModel: any;
    detailId: any;
    goodsName: any;

    constructor(public activatedRoute: ActivatedRoute,  public adminGoodsService: AdminGoodsService) { }

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
        this.adminGoodsService.getGoodsDetail(this.detailId).subscribe(res => {
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
