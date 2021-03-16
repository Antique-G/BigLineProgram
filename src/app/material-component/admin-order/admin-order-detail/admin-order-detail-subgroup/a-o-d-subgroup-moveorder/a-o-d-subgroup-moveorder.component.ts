import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AdminOrderService } from '../../../../../../services/admin/admin-order.service';
import { MoveOrderModel } from '../../../../../../interfaces/store/storeOrder/store-order-model';

@Component({
  selector: 'app-a-o-d-subgroup-moveorder',
  templateUrl: './a-o-d-subgroup-moveorder.component.html',
  styleUrls: ['./a-o-d-subgroup-moveorder.component.css']
})
export class AODSubgroupMoveorderComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  isValue: any;  //订单所在子团
  dataList: any[] = []; //选择移动到的子团列表
  allTabs: any;   //所有tabs
  moveOrderModel: MoveOrderModel;
  orderArray: any[] = [];  //移动的所有订单id

  constructor(public fb: FormBuilder, public adminOrderService: AdminOrderService,) {
    this.addForm = this.fb.group({
      sub_group_id: ['', [Validators.required]],
      new_sub_group_id: ['', [Validators.required]]
    });
    this.moveOrderModel = {
      sub_group_id: '',
      order_numbers: [],
      new_sub_group_id: ''
    }
  }

  ngOnInit(): void {
    console.log('弹窗拿到所有tabs', this.data[0]);
    console.log('弹窗拿到当前的子团', this.data[1]);
    this.isValue = this.data[1].tabs;
    this.allTabs = this.data[0];
    this.allTabs.forEach((value: any) => {
      console.log('value是什么 ', value);
      if (value.sub_group_status === 1 || value.sub_group_status === 2) {
        if (value.tabs != this.isValue) {
          let newArr = { label: value.tabs, value: value.sub_group_id }
          this.dataList.push(newArr);
        }
      }
    });
    console.log('所要移动的订单内容', this.data[2]);
    let orderArr = this.data[2];
    orderArr.forEach((value: any) => {
      this.orderArray.push(value.id);
    });
  }

  setValue() {
    this.moveOrderModel.sub_group_id = this.data[1].sub_group_id;
    this.moveOrderModel.order_numbers = this.orderArray;
    this.moveOrderModel.new_sub_group_id = this.addForm.value.new_sub_group_id;
  }

  add() {
    this.setValue();
    this.adminOrderService.moveOrder(this.moveOrderModel).subscribe(res => {
      console.log('移动的结果是 ', res);
    })
  }



  changeSub(event: any) {

  }
}
