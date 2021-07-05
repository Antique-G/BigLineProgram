import { Component, Input, OnInit } from '@angular/core';
import { StoreProductTreeTravelService } from '../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';



@Component({
    selector: 'app-store-product-free-travel-operate-log',
    templateUrl: './store-product-free-travel-operate-log.component.html',
    styleUrls: ['./store-product-free-travel-operate-log.component.css']
})
export class StoreProductFreeTravelOperateLogComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];
    page = 1;
    per_page = 10;
    total = 1;

    constructor(public storeProductTreeTravelService: StoreProductTreeTravelService,) { }

    ngOnInit(): void {
        this.getOperateLog();
    }

    getOperateLog() {
        this.storeProductTreeTravelService.getOperateLog(this.page, this.per_page, this.data.id).subscribe(res => {
            console.log("12312", res);
            this.dataSource = res.data;
        })
    }


    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getOperateLog();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        this.getOperateLog();
    }


}
