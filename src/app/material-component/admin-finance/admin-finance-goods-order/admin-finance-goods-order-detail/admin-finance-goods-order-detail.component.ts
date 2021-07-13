import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminRegionService } from 'services/admin/admin-region.service';


@Component({
    selector: 'app-admin-finance-goods-order-detail',
    templateUrl: './admin-finance-goods-order-detail.component.html',
    styleUrls: ['./admin-finance-goods-order-detail.component.css']
})
export class AdminFinanceGoodsOrderDetailComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;
    detailModel: any;
    detailId: any;
    // 修改信息
    dataPayLog: any[] = [];

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public adminGoodsService: AdminGoodsService,
        private modal: NzModalService, public adminRegionService: AdminRegionService,) {
        this.addForm = this.fb.group({
            order_id: [''],
            orderDate: [''],
            bind_name: [''],
            consignee: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            region_code: [''],
            region_code_id: ['', [Validators.required]],
            address: ['', [Validators.required]],
            remark: [''],
        });
    }
 
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.id;
            // 详情
            this.isSpinning = true;
            this.getOrderDetail();
        });
    }

    getOrderDetail() {
        this.adminGoodsService.orderDetail(this.detailId).subscribe(res => {
            this.isSpinning = false;
            this.detailModel = res.data;
            this.dataPayLog = this.detailModel?.pay_log?.data;
        })
    }

}
