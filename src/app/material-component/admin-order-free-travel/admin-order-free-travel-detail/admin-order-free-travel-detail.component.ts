import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminOrderFreeTravelService } from '../../../../services/admin/admin-order-free-travel.service';
import { DetailsModel } from '../../../../interfaces/store/storeOrder/store-order-free-travel-model';
import { AOFTDChangePriceComponent } from './a-o-f-t-d-change-price/a-o-f-t-d-change-price.component';
import { format } from 'date-fns';


@Component({
  selector: 'app-admin-order-free-travel-detail',
  templateUrl: './admin-order-free-travel-detail.component.html',
  styleUrls: ['./admin-order-free-travel-detail.component.css']
})
export class AdminOrderFreeTravelDetailComponent implements OnInit {
  public isSpinning = false;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DetailsModel;
  dataMember: any;
  audltPrice: any;
  childPrice: any;
  priceTotal: any;
  dataPayLog: any[] = [];
  refundLog: any[] = [];



  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public adminOrderFreeTravelService: AdminOrderFreeTravelService, private modal: NzModalService) {
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
      internal_remarks: ['', [Validators.required]],
      quote_type: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params)
      this.detailId = params?.detailId;
      // 详情
      this.getDetail();

    });
  }


  getDetail() {
    this.adminOrderFreeTravelService.getfreeTravelDetail(this.detailId).subscribe(res => {
      console.log("自由行详情结果是", res);
      this.detailModel = res.data;
      // 支付流水
      let pagLogArr: any[] = [];
      res.data?.pay_log?.data.forEach((element: any) => {
        if (element.status == 2) {
          pagLogArr.push(element)
        }
      });
      this.dataPayLog = pagLogArr;
      // 退款流水
      let reFundLogArr: any[] = [];
      res.data?.refund?.data.forEach((element: any) => {
        if (element.status == 2 || element.status == 3) {
          reFundLogArr.push(element)
        }
      });
      this.refundLog = reFundLogArr;

      this.dataMember = res.data?.member?.data;
      this.dataMember.forEach((element: any) => {
        if (element.birthday === null) {
          let year = element.id_num.slice(6, 10);
          let month = element.id_num.slice(10, 12);
          let date = element.id_num.slice(12, 14);
          element.birthday = year + '-' + month + '-' + date;
        }
        element['edit'] = false;
        if (element?.assembling_time != null) {
          let i = '2021-01-01' + ' ' + element?.assembling_time;
          let newDate = new Date(i);
          console.log('object :>> ', newDate, i);
          element.assembling_time = format(new Date(newDate), 'yyyy-MM-dd HH:mm');
        }
      });
      this.fee();
    })
  }


  fee() {
    // 费用明细
    this.audltPrice = Number(this.detailModel?.price_adult) * Number(this.detailModel?.num_adult);
    this.childPrice = Number(this.detailModel?.price_kid) * Number(this.detailModel?.num_kid);
    // this.babyPrice = Number(this.detailModel?.price_baby) * Number(this.detailModel?.baby_num);
    this.priceTotal = Number(this.detailModel?.price_total) - Number(this.detailModel?.amount_received);
    this.priceTotal = this.toDecimal(this.priceTotal);
  }


  
  // 保留两位小数
  toDecimal(x: any) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    f = Math.round(x * 100) / 100;
    return f;
  }


  // 订单改价
  changePrice() {
    const editmodal = this.modal.create({
      nzTitle: '订单改价',
      nzContent: AOFTDChangePriceComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: null

    })
    editmodal.afterClose.subscribe(res => {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = params?.detailId;
        // 详情
        this.getDetail();
        this.fee();
      });
    })
  }

}



