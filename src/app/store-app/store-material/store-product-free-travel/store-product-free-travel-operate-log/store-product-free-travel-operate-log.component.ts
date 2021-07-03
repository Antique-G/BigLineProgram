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

    constructor(public storeProductTreeTravelService: StoreProductTreeTravelService,) { }

    ngOnInit(): void {
        this.storeProductTreeTravelService.getOperateLog(this.data.id).subscribe(res => {
            console.log("12312", res);
            this.dataSource = res.data;
        })

    }

}
