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
  createReundModel: CreateReundModel

  constructor(public fb: FormBuilder, public adminRefundService: AdminRefundService) {
    this.addForm = fb.group({
      order_id: [''],
      reason: [''],
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
  }


  add() { }
}
