import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRefundService } from '../../../../services/admin/admin-refund.service';

@Component({
  selector: 'app-admin-order-refund-detail',
  templateUrl: './admin-order-refund-detail.component.html',
  styleUrls: ['./admin-order-refund-detail.component.css']
})
export class AdminOrderRefundDetailComponent implements OnInit {
  detailId: any;
  selectedTabIndex = 0;    //选中的tab 默认第一个
  addForm!: FormGroup;
  detailModel: any;
  isType: any;
  dataSource: any;
  isFinished: any;


  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute,
    private modal: NzModalService, public adminRefundService: AdminRefundService) {
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
      this.isFinished = params.isFinished;
      this.adminRefundService.getRefundDetail(this.detailId).subscribe(res => {
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


  add() {
    this.modal.confirm({
      nzTitle: '<h4>确认提交退款</h4>',
      nzContent: '<h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
      // nzOnOk: () =>
      // this.adminProductManagementService.productSetStatus(this.adminProductSetStatusModel).subscribe(res => {
      //   this.getProductList();
      // })
    });
  }
}
