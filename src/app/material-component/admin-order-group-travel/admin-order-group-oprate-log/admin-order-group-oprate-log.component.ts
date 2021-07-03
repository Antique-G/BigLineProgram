import { Component, Input, OnInit } from '@angular/core';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';



@Component({
    selector: 'app-admin-order-group-oprate-log',
    templateUrl: './admin-order-group-oprate-log.component.html',
    styleUrls: ['./admin-order-group-oprate-log.component.css']
})
export class AdminOrderGroupOprateLogComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];

    constructor(public adminOrderGroupTravelService: AdminOrderGroupTravelService,) { }

    ngOnInit(): void {
        this.adminOrderGroupTravelService.getOperateLog(this.data.id).subscribe(res => {
            console.log("12312", res);
            this.dataSource = res.data;
        })

    }

}
