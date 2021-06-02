import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
    selector: 'app-admin-product-management-schedult',
    templateUrl: './admin-product-management-schedult.component.html',
    styleUrls: ['./admin-product-management-schedult.component.css']
})
export class AdminProductManagementSchedultComponent implements OnInit {

    detailId: any
    @Input() adminProductDetailModel: any;



    constructor(public modal: NzModalService, public dialog: MatDialog, public activatedRoute: ActivatedRoute,) {

    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.detailId = params?.detailDataId;
        });
        console.log("更新", this.adminProductDetailModel);
    }




}
