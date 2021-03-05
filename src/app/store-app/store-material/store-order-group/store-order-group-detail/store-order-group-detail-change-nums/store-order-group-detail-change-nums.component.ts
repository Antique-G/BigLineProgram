import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderGroupNum } from '../../../../../../interfaces/store/storeOrder/store-order-model';
import { StoreOrderService } from '../../../../../../services/store/store-order/store-order.service';

@Component({
  selector: 'app-store-order-group-detail-change-nums',
  templateUrl: './store-order-group-detail-change-nums.component.html',
  styleUrls: ['./store-order-group-detail-change-nums.component.css']
})
export class StoreOrderGroupDetailChangeNumsComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  orderGroupNum: OrderGroupNum;
  isMemberMax: any;


  constructor(public fb: FormBuilder, public storeOrderService: StoreOrderService) {
    this.addForm = this.fb.group({
      member_min: [''],
      member_max: ['0'],
      old_member_min: [''],
      old_member_max: [''],
    });
    this.orderGroupNum = {
      member_min: '',
      member_max: '',
    }
  }


  ngOnInit(): void {
    // 最大成团人数
    if (this.data[1]?.member_max === 0) {
      this.isMemberMax = '-';
    }
    else {
      this.isMemberMax = this.data[1]?.member_max;
    }
  }


  // 只输入整数
  numTest($event: any) {
    $event.target.value = $event.target.value.replace(/[^\d]/g, '');
  }


  setValue() {
    this.orderGroupNum.member_min = this.addForm.value.member_min;
    this.orderGroupNum.member_max = this.addForm.value.member_max;
  }


  add() {
    this.setValue();
    this.orderGroupNum.id = this.data[0];
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.storeOrderService.groupNum(this.orderGroupNum).subscribe(res => {
        console.log('object :>> ', res);
      })
    }

  }
}
