import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AdminOrderService } from '../../../../../services/admin/admin-order.service';
import { ShuffOrderModel } from '../../../../../interfaces/store/storeOrder/store-order-model';

@Component({
  selector: 'app-a-o-d-shut-off',
  templateUrl: './a-o-d-shut-off.component.html',
  styleUrls: ['./a-o-d-shut-off.component.css']
})
export class AODShutOffComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  shuffOrderModel: ShuffOrderModel;
  isValue: any

  constructor(public fb: FormBuilder, public adminOrderService: AdminOrderService) {
    this.addForm = this.fb.group({
      group_id: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
    this.shuffOrderModel = {
      group_id: '',
      reason: '',
    }
  }

  ngOnInit(): void {
    this.isValue = this.data;
  }

  setValue() {
    this.shuffOrderModel.group_id = this.data;
    this.shuffOrderModel.reason = this.addForm.value.reason;
  }


  // 不成团关团
  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("66666", this.addForm.valid)
    if (this.addForm.valid) {
      this.adminOrderService.shutoff(this.shuffOrderModel).subscribe(res => {

      })
    }

  }

}

