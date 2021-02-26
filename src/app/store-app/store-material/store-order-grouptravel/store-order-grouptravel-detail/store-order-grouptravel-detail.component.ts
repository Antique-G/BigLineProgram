import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailsModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { StoreOrderGroupTravelService } from '../../../../../services/store/store-order/store-order-group-travel.service';
import { StoreOrderGroupChangeDateComponent } from './store-order-group-change-date/store-order-group-change-date.component';
import { StoreOrderGroupChangePriceComponent } from './store-order-group-change-price/store-order-group-change-price.component';

@Component({
  selector: 'app-store-order-grouptravel-detail',
  templateUrl: './store-order-grouptravel-detail.component.html',
  styleUrls: ['./store-order-grouptravel-detail.component.css']
})
export class StoreOrderGrouptravelDetailComponent implements OnInit {
  public isSpinning = true;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DetailsModel;
  dataMember: any;
  isAssemblinTime: any;



  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public storeOrderGroupTravelService: StoreOrderGroupTravelService, private modal: NzModalService) {
    this.addForm = this.fb.group({
      order_id: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      assembling_place: ['', [Validators.required]],
      assembling_time: ['', [Validators.required]],
      contact_name: ['', [Validators.required]],
      contact_phone: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params)
      this.detailId = JSON.parse(params["detailId"]);
      // 详情
      this.storeOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
        console.log("结果是", res);
        this.detailModel = res.data;
        this.dataMember = res.data?.member?.data;
        this.isSpinning = false;
        if (this.detailModel?.assembling_time === '00:00:00') {
          this.isAssemblinTime = '待定';
        }
        else {
          this.isAssemblinTime = this.detailModel?.assembling_time;
        }
      })
    });
  }


  // 订单改价
  changePrice() {
    const editmodal = this.modal.create({
      nzTitle: '订单改价',
      nzContent: StoreOrderGroupChangePriceComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: [
        {
          label: '提交',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = JSON.parse(params["detailId"]);
        // 详情
        this.storeOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
          console.log("结果是", res);
          this.detailModel = res.data;
          this.dataMember = res.data?.member?.data;
          this.isSpinning = false;

        })
      });
    })
  }



  // 订单修改日期
  changeDate() {
    const editmodal = this.modal.create({
      nzTitle: '订单修改日期',
      nzWidth: 800,
      nzContent: StoreOrderGroupChangeDateComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: [
        {
          label: '提交',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = JSON.parse(params["detailId"]);
        // 详情
        this.storeOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
          console.log("结果是", res);
          this.detailModel = res.data;
          this.dataMember = res.data?.member?.data;
          this.isSpinning = false;

        })
      });
    })
  }

}
