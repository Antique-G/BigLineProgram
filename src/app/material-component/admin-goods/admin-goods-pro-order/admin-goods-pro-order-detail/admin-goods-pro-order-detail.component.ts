import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminGoodsService } from 'services/admin/admin-goods.service';

@Component({
  selector: 'app-admin-goods-pro-order-detail',
  templateUrl: './admin-goods-pro-order-detail.component.html',
  styleUrls: ['./admin-goods-pro-order-detail.component.css']
})
export class AdminGoodsProOrderDetailComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;
    detailModel:any;
    detailId:any;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public adminGoodsService: AdminGoodsService,) {
        this.addForm = this.fb.group({
            order_id: [''],
            orderDate: [''],
            bind_name: [''],
            consignee: [''],
            phone: [''],
            address: [''],
        })
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
            console.log("订单详情",res)
        })
    }

}
