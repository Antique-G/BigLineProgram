import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataOrderDetail } from '../../../../interfaces/store/storeOrder/store-order-model';
import { AdminOrderService } from '../../../../services/admin/admin-order.service';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  public isSpinning = false;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DataOrderDetail;
  isReturnDate: any;
  isActiveDate: any;
  subGroupModel!: DataOrderDetail;

  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public adminOrderService: AdminOrderService,) {
    this.addForm = this.fb.group({
      group_id: ['', [Validators.required]],
      member_min: ['', [Validators.required]],
      active_date: ['', [Validators.required]],
      returnDate: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params)
      this.detailId = JSON.parse(params["detailId"]);
      // 详情
      this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
        console.log("结果是", res);
        this.detailModel = res.data;
        // 成团日期
        this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
        // 往返日期
        this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
        this.subGroupModel = this.detailModel;
      })
    });
  }


}