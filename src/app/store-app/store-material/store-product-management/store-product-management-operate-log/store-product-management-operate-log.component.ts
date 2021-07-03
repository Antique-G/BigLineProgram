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

    constructor(public storeProductService: StoreProductService,) { }

    ngOnInit(): void {
        this.storeProductService.getOperateLog(this.data.id).subscribe(res => {
            console.log("12312", res);
            this.dataSource = res.data;
        })

    }

}
