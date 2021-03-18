import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreRefundService } from '../../../../../services/store/store-order/store-refund.service';

@Component({
  selector: 'app-store-order-refund-detail',
  templateUrl: './store-order-refund-detail.component.html',
  styleUrls: ['./store-order-refund-detail.component.css']
})
export class StoreOrderRefundDetailComponent implements OnInit {
  detailId: any;
  selectedTabIndex = 0;    //选中的tab 默认第一个
  addForm!: FormGroup;
  detailModel: any;
  isType: any;
  dataSource: any;

  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public storeRefundService: StoreRefundService) {
    this.addForm = this.fb.group({
      order_id: [''],
      refund_id: [''],
      type: [''],
      refund_reason: [''],
    })

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailId;
      this.storeRefundService.getRefundDetail(this.detailId).subscribe(res => {
        this.detailModel = res.data;
        this.isType = this.detailModel.type === 0 ? "全部退款" : "部分退款";

        console.log('结果是 :>> ', this.detailModel);
      })
    });
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event;
  }

  next1() {
    this.selectedTabIndex = 1;
  }

  next2() {
    this.selectedTabIndex = 2;
  }
}
