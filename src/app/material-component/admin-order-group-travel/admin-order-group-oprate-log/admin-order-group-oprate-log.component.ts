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
    page = 1;
    per_page = 10;
    total = 1;

    constructor(public adminOrderGroupTravelService: AdminOrderGroupTravelService,) { }

    ngOnInit(): void {
        this.getOperateLog();
    }

    getOperateLog() {
        this.adminOrderGroupTravelService.getOperateLog(this.page, this.per_page, this.data.id).subscribe(res => {
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
