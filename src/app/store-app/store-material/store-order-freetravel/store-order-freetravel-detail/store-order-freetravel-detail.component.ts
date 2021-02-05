import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreOrderService } from '../../../../../services/store/store-order/store-order.service';
import { DataOrderDetail, SubgroupDeatilModel } from '../../../../../interfaces/store/storeOrder/store-order-model';
import { NzModalService } from 'ng-zorro-antd/modal';



@Component({
  selector: 'app-store-order-freetravel-detail',
  templateUrl: './store-order-freetravel-detail.component.html',
  styleUrls: ['./store-order-freetravel-detail.component.css']
})
export class StoreOrderFreetravelDetailComponent implements OnInit {
  public isSpinning = false;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DataOrderDetail;
  isReturnDate: any;
  isActiveDate: any;
  subGroupModel!: DataOrderDetail;
  dataSource: any;
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;

  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public modal: NzModalService, public storeOrderService: StoreOrderService,) {
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
      this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
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


  shutoff(data: any) {
    // const editmodal = this.modal.create({
    //   nzTitle: '关闭不成团订单',
    //   nzContent: StoreOrderGroupDetailShutoffComponent,
    //   nzComponentParams: {
    //     data: data
    //   },
    //   nzFooter: [
    //     {
    //       label: '提交',
    //       onClick: componentInstance => {
    //         componentInstance?.add()
    //       }
    //     }
    //   ]
    // })
    // editmodal.afterClose.subscribe(res => {
    //   this.router.navigate(['/store/main/storeOrderGroup']);
    // })
  }
}
