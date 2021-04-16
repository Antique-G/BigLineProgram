import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { DetailsModel } from '../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { format } from 'date-fns';
import { AOGTDetailChangeDataComponent } from './a-o-g-t-detail-change-data/a-o-g-t-detail-change-data.component';
import { AOGTDFullRefundComponent } from './a-o-g-t-d-full-refund/a-o-g-t-d-full-refund.component';
import { AOGTDPartRefundComponent } from './a-o-g-t-d-part-refund/a-o-g-t-d-part-refund.component';
import { AOGTDChangePriceComponent } from './a-o-g-t-d-change-price/a-o-g-t-d-change-price.component';



@Component({
  selector: 'app-admin-order-group-travel-detail',
  templateUrl: './admin-order-group-travel-detail.component.html',
  styleUrls: ['./admin-order-group-travel-detail.component.css']
})
export class AdminOrderGroupTravelDetailComponent implements OnInit {
  public isSpinning = false;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DetailsModel;
  dataMember: any;
  isAssemblinTime: any;
  audltPrice: any;
  childPrice: any;
  babyPrice: any;

  priceTotal: any;
  dataPayLog: any;

  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public adminOrderGroupTravelService: AdminOrderGroupTravelService, private modal: NzModalService) {
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
      this.adminOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
        console.log("结果是", res);
        this.detailModel = res.data;
        let pagLogArr: any[] = [];
        res.data?.pay_log?.data.forEach((element: any) => {
          if (element.status == 2) {
            pagLogArr.push(element)
          }
        });
        this.dataPayLog = pagLogArr;
        this.dataMember = res.data?.member?.data;
        this.dataMember.forEach((element: any) => {
          if (element.birthday === null) {
            let year = element.id_num.slice(6, 10);
            let month = element.id_num.slice(10, 12);
            let date = element.id_num.slice(12, 14);
            element.birthday = year + '-' + month + '-' + date;
          }
        });
        if (this.detailModel?.assembling_time === '00:00:00') {
          this.isAssemblinTime = '待定';
        }
        else {
          let i = '2021-01-01' + ' ' + this.detailModel?.assembling_time;
          let newDate = new Date(i);
          console.log('object :>> ', newDate, i);
          this.isAssemblinTime = format(new Date(newDate), 'HH:mm');
        }
        // 费用明细
        this.fee();
      })
    });
  }


  fee() {
    // 费用明细
    this.audltPrice = Number(this.detailModel?.price_adult) * Number(this.detailModel?.num_adult);
    this.childPrice = Number(this.detailModel?.price_kid) * Number(this.detailModel?.num_kid);
    this.babyPrice = Number(this.detailModel?.price_baby) * Number(this.detailModel?.baby_num);
    this.priceTotal = Number(this.detailModel?.price_total) - Number(this.detailModel?.amount_received);
  }

  // 订单修改日期
  changeDate() {
    const editmodal = this.modal.create({
      nzTitle: '订单修改日期',
      nzWidth: 800,
      nzContent: AOGTDetailChangeDataComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
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
        this.adminOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
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


  orderFullRefund() {
    const editmodal = this.modal.create({
      nzTitle: '订单全额退款',
      nzWidth: 800,
      nzContent: AOGTDFullRefundComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: [
        {
          label: '提交退款申请',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
    })
  }


  orderPartRefund() {
    const editmodal = this.modal.create({
      nzTitle: '订单退款',
      nzWidth: 1000,
      nzContent: AOGTDPartRefundComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: null
    })
    editmodal.afterClose.subscribe(res => {
    })
  }





  // 订单改价
  changePrice() {
    const editmodal = this.modal.create({
      nzTitle: '订单改价',
      nzContent: AOGTDChangePriceComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: null
      // nzFooter: [
      //   {
      //     label: '提交',
      //     onClick: componentInstance => {
      //       componentInstance?.update()

      //     }
      //   }
      // ]
    })
    editmodal.afterClose.subscribe(res => {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = params?.detailId;
        // 详情
        this.adminOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
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

