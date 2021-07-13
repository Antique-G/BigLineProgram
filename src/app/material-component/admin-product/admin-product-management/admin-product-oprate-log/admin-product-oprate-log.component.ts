import { Component, Input, OnInit } from '@angular/core';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';



@Component({
    selector: 'app-admin-product-oprate-log',
    templateUrl: './admin-product-oprate-log.component.html',
    styleUrls: ['./admin-product-oprate-log.component.css']
})
export class AdminProductOprateLogComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];
    page = 1;
    per_page = 10;
    total = 1;

    constructor(public adminProductManagementService: AdminProductManagementService,) { }

    ngOnInit(): void {
        this.getOperateLog();
    }

    getOperateLog() {
        this.adminProductManagementService.getOperateLog(this.page, this.per_page, this.data.id).subscribe(res => {
            console.log("12312", res);
            this.dataSource = res.data;
            this.total = res.total;
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
