import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailsModel } from '../../../../../interfaces/store/storeOrder/store-order-free-travel-model';
import { StoreOrderFreeTravelService } from '../../../../../services/store/store-order/store-order-free-travel.service';
import { StoreOrderFreeChangePriceComponent } from './store-order-free-change-price/store-order-free-change-price.component';


@Component({
  selector: 'app-store-order-freetravel-detail',
  templateUrl: './store-order-freetravel-detail.component.html',
  styleUrls: ['./store-order-freetravel-detail.component.css']
})
export class StoreOrderFreetravelDetailComponent implements OnInit {
  public isSpinning = false;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DetailsModel;
  dataMember: any;



  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public storeOrderFreeTravelService: StoreOrderFreeTravelService,private modal: NzModalService) {
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
      this.storeOrderFreeTravelService.getfreeTravelDetail(this.detailId).subscribe(res => {
        console.log("结果是", res);
        this.detailModel = res.data;
        this.dataMember = res.data?.member?.data;
      })
    });
  }


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
    
    })

  }

}


