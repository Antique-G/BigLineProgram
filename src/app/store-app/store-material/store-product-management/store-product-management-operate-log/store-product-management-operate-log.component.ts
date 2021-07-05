import { Component, Input, OnInit } from '@angular/core';
import { StoreProductService } from '../../../../../services/store/store-product/store-product.service';



@Component({
    selector: 'app-store-product-management-operate-log',
    templateUrl: './store-product-management-operate-log.component.html',
    styleUrls: ['./store-product-management-operate-log.component.css']
})
export class StoreProductManagementOperateLogComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];
    page = 1;
    per_page = 10;
    total = 1;

    constructor(public storeProductService: StoreProductService,) { }

    ngOnInit(): void {
        this.getOperateLog();
    }

    getOperateLog() {
        this.storeProductService.getOperateLog(this.page, this.per_page, this.data.id).subscribe(res => {
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
