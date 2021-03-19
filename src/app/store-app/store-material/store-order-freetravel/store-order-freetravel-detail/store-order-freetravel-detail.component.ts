import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailsModel } from '../../../../../interfaces/store/storeOrder/store-order-free-travel-model';
import { StoreOrderFreeTravelService } from '../../../../../services/store/store-order/store-order-free-travel.service';
import { StoreOrderFreeChangeDateComponent } from './store-order-free-change-date/store-order-free-change-date.component';
import { StoreOrderFreeChangePriceComponent } from './store-order-free-change-price/store-order-free-change-price.component';


@Component({
  selector: 'app-store-order-freetravel-detail',
  templateUrl: './store-order-freetravel-detail.component.html',
  styleUrls: ['./store-order-freetravel-detail.component.css']
})
export class StoreOrderFreetravelDetailComponent implements OnInit {
  public isSpinning = true;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DetailsModel;
  dataMember: any;



  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public storeOrderFreeTravelService: StoreOrderFreeTravelService, private modal: NzModalService) {
    this.addForm = this.fb.group({
      order_id: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      assembling_place: ['', [Validators.required]],
      assembling_time: ['', [Validators.required]],
      contact_name: ['', [Validators.required]],
      contact_phone: ['', [Validators.required]],
      contact_wechat: ['', [Validators.required]],
      contact_qq: ['', [Validators.required]],
      contact_email: ['', [Validators.required]],
      emergency_contact_person: ['', [Validators.required]],
      emergency_contact_number: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params)
      this.detailId = JSON.parse(params["detailId"]);
      // 详情
      this.storeOrderFreeTravelService.getfreeTravelDetail(this.detailId).subscribe(res => {
        console.log("结果是", res);
        this.detailModel = res.data;
        this.dataMember = res.data?.member?.data;
        this.dataMember.forEach((element: any) => {
          if (element.birthday === null) {
            let year = element.id_num.slice(6, 10);
            let month = element.id_num.slice(10, 12);
            let date = element.id_num.slice(12, 14);
            element.birthday = year + '-' + month + '-' + date;
          }
        });
        this.isSpinning = false;
      })
    });
  }


  // 订单修改日期
  changePrice() {
    const editmodal = this.modal.create({
      nzTitle: '订单改价',
      nzContent: StoreOrderFreeChangePriceComponent,
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
        this.storeOrderFreeTravelService.getfreeTravelDetail(this.detailId).subscribe(res => {
          console.log("结果是", res);
          this.detailModel = res.data;
          this.dataMember = res.data?.member?.data;
          this.dataMember.forEach((element: any) => {
            if (element.birthday === null) {
              let year = element.id_num.slice(6, 10);
              let month = element.id_num.slice(10, 12);
              let date = element.id_num.slice(12, 14);
              element.birthday = year + '-' + month + '-' + date;
            }
          });
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
      nzContent: StoreOrderFreeChangeDateComponent,
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
        this.storeOrderFreeTravelService.getfreeTravelDetail(this.detailId).subscribe(res => {
          console.log("结果是", res);
          this.detailModel = res.data;
          this.dataMember = res.data?.member?.data;
          this.dataMember.forEach((element: any) => {
            if (element.birthday === null) {
              let year = element.id_num.slice(6, 10);
              let month = element.id_num.slice(10, 12);
              let date = element.id_num.slice(12, 14);
              element.birthday = year + '-' + month + '-' + date;
            }
          });
          this.isSpinning = false;
        })
      });
    })
  }

}


