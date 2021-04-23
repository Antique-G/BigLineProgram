import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AdminRefundService } from '../../../../../services/admin/admin-refund.service';
import { CreateReundModel } from '../../../../../interfaces/store/storeRefund/storerefund';

@Component({
  selector: 'app-a-o-g-t-d-full-refund',
  templateUrl: './a-o-g-t-d-full-refund.component.html',
  styleUrls: ['./a-o-g-t-d-full-refund.component.css']
})
export class AOGTDFullRefundComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  createReundModel: CreateReundModel;
  precision = 2;
  cutValue = 0;

  constructor(public fb: FormBuilder, public adminRefundService: AdminRefundService) {
    this.addForm = fb.group({
      order_id: [''],
      reason: [''],
      price_total: [''],
      remark: [''],
    })
    this.createReundModel = {
      id: '',
      type: '',
      reason: '',
      refund_amount: '',
      members: '',
      amount_add: '',
      amount_cut: '',
      remark: '',
    }
  }

  ngOnInit(): void {
    console.log('data :>> ', this.data);
  }

  setValue() {
    this.createReundModel.id = this.data.id;
    this.createReundModel.type = 0;
    this.createReundModel.reason = this.addForm.value.reason;
    this.createReundModel.refund_amount = this.data?.price_total;
    this.createReundModel.members = this.data?.member?.data;
    this.createReundModel.amount_add = 0;
    this.createReundModel.amount_cut = 0;
    this.createReundModel.remark = this.addForm.value.remark;
  }

  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminRefundService.createRefund(this.createReundModel).subscribe(res => {
        console.log('res :>> ', res);
      })
    }
  }
}
