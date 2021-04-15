import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailsModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { StoreOrderGroupTravelService } from '../../../../../services/store/store-order/store-order-group-travel.service';
import { StoreOrderGroupChangeDateComponent } from './store-order-group-change-date/store-order-group-change-date.component';
import { StoreOrderGroupChangePriceComponent } from './store-order-group-change-price/store-order-group-change-price.component';
import { format } from 'date-fns';



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
  audltPrice: any;
  childPrice: any;
  babyPrice: any;

  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public storeOrderGroupTravelService: StoreOrderGroupTravelService, private modal: NzModalService) {
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
      customer_remarks: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params)
      this.detailId = params?.detailId;
      // 详情
      this.storeOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
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
        if (this.detailModel?.assembling_time === '00:00:00') {
          this.isAssemblinTime = '待定';
        }
        else {
          // 时间格式化，去除秒
          let i = '2021-01-01' + ' ' + this.detailModel?.assembling_time;
          let newDate = new Date(i);
          console.log('object :>> ', newDate, i);
          this.isAssemblinTime = format(new Date(newDate), 'HH:mm');

        }
        this.fee();
      })
    });
  }

  fee() {
    // 费用明细
    this.audltPrice = Number(this.detailModel?.price_adult) * Number(this.detailModel?.num_adult);
    this.childPrice = Number(this.detailModel?.price_kid) * Number(this.detailModel?.num_kid);
    this.babyPrice = Number(this.detailModel?.price_baby) * Number(this.detailModel?.baby_num);

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
        this.detailId = params?.detailId;
        // 详情
        this.storeOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
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
          this.fee();

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
        this.detailId = params?.detailId;
        // 详情
        this.storeOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
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
          this.fee();

        })
      });
    })
  }

}
