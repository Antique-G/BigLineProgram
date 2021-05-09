import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreProductTreeTravelService } from '../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';

@Component({
    selector: 'app-store-product-free-travel-detail',
    templateUrl: './store-product-free-travel-detail.component.html',
    styleUrls: ['./store-product-free-travel-detail.component.css']
})
export class StoreProductFreeTravelDetailComponent implements OnInit {
    isIndex = 0;     //tab的index
    selectedTabIndex = 0;    //选中的tab 默认第一个
    detailId: any
    dataDetailModel: any
    isSpinning: boolean = true;
    productName: any;
    // 预售产品
    is_presell: any;

    constructor(public activatedRoute: ActivatedRoute, private freeTravelService: StoreProductTreeTravelService) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.detailId = params.detailId;
            this.is_presell = params.is_presell;
            console.log(this.detailId, 'this.detailId');
        });
        if (this.detailId) {
            this.getDetail()
        } else {
            this.isSpinning = false
        }
    }

    getDetail() {
        this.freeTravelService.GetFreeTravelDetail(this.detailId).subscribe((res: any) => {
            this.dataDetailModel = res.data;
            this.productName = this.dataDetailModel?.title;
            this.isSpinning = false
            localStorage.setItem("few_days", this.dataDetailModel.few_days);
        })
    }

    onTabChange(event: any) {
        this.selectedTabIndex = event;
        this.getDetail()
    }

}
