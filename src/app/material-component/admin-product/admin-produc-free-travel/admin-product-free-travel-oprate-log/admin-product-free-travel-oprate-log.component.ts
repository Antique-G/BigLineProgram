import { Component, Input, OnInit } from '@angular/core';
import { AdminProductFreeTravelService } from '../../../../../services/admin/admin-product-free-travel.service';


@Component({
    selector: 'app-admin-product-free-travel-oprate-log',
    templateUrl: './admin-product-free-travel-oprate-log.component.html',
    styleUrls: ['./admin-product-free-travel-oprate-log.component.css']
})
export class AdminProductFreeTravelOprateLogComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];
    page = 1;
    per_page = 10;
    total = 1;

    constructor(public adminProductFreeTravelService: AdminProductFreeTravelService,) { }


    ngOnInit(): void {
        this.getOperateLog();
    }


    getOperateLog() {
        this.adminProductFreeTravelService.getOperateLog(this.page, this.per_page, this.data.id).subscribe(res => {
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
