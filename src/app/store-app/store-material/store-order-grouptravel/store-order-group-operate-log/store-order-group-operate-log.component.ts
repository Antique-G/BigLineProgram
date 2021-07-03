import { Component, Input, OnInit } from '@angular/core';
import { StoreOrderGroupTravelService } from '../../../../../services/store/store-order/store-order-group-travel.service';



@Component({
    selector: 'app-store-order-group-operate-log',
    templateUrl: './store-order-group-operate-log.component.html',
    styleUrls: ['./store-order-group-operate-log.component.css']
})
export class StoreOrderGroupOperateLogComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];

    constructor(public storeOrderGroupTravelService: StoreOrderGroupTravelService,) { }

    ngOnInit(): void {
        this.storeOrderGroupTravelService.getOperateLog(this.data.id).subscribe(res => {
            console.log("12312", res);
            this.dataSource = res.data;
        })

    }

}
