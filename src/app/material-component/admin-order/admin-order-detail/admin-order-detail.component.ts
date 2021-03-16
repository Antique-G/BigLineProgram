import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataOrderDetail } from '../../../../interfaces/store/storeOrder/store-order-model';
import { AdminOrderService } from '../../../../services/admin/admin-order.service';
import { AODChangeNumsComponent } from './a-o-d-change-nums/a-o-d-change-nums.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AODShutOffComponent } from './a-o-d-shut-off/a-o-d-shut-off.component';

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
  isMemberMax: any;
  subGroupModel!: DataOrderDetail;

  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public adminOrderService: AdminOrderService, public modal: NzModalService,) {
    this.addForm = this.fb.group({
      group_id: ['', [Validators.required]],
      member_min: ['', [Validators.required]],
      active_date: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
      member_max: ['', [Validators.required]],
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
        // 最大成团人数
        if (this.detailModel?.member_max === 0) {
          this.isMemberMax = '-';
        }
        else {
          this.isMemberMax = this.detailModel?.member_max;
        }
        // 成团日期
        this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
        // 往返日期
        this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
        this.subGroupModel = this.detailModel;
      })
    });
  }



  // 修改成团人数
  changeNums(data: any) {
    const editmodal = this.modal.create({
      nzTitle: '修改成团人数',
      nzContent: AODChangeNumsComponent,
      nzComponentParams: {
        data: [data, this.detailModel]
      },
      nzFooter: [
        {
          label: '提交',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = JSON.parse(params["detailId"]);
        // 详情
        this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
          console.log("结果是", res);
          this.detailModel = res.data;
          // 最大成团人数
          if (this.detailModel?.member_max === 0) {
            this.isMemberMax = '-';
          }
          else {
            this.isMemberMax = this.detailModel?.member_max;
          }
          // 成团日期
          this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
          // 往返日期
          this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
          this.subGroupModel = this.detailModel;
          this.isSpinning = false;

        })
      });
    })
  }


  // 关闭不成团订单
  shutoff(data: any) {
    const editmodal = this.modal.create({
      nzTitle: '关闭不成团订单',
      nzContent: AODShutOffComponent,
      nzComponentParams: {
        data: data
      },
      nzFooter: [
        {
          label: '提交',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = JSON.parse(params["detailId"]);
        // 详情
        this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
          console.log("结果是", res);
          this.detailModel = res.data;
          // 最大成团人数
          if (this.detailModel?.member_max === 0) {
            this.isMemberMax = '-';
          }
          else {
            this.isMemberMax = this.detailModel?.member_max;
          }
          // 成团日期
          this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
          // 往返日期
          this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
          this.subGroupModel = this.detailModel;
          this.isSpinning = false;

        })
      });
    })
  }
}
