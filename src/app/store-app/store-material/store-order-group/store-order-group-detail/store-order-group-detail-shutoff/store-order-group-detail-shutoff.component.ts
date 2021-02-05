import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { StoreOrderService } from '../../../../../../services/store/store-order/store-order.service';
import { ShuffOrderModel } from '../../../../../../interfaces/store/storeOrder/store-order-model';

@Component({
  selector: 'app-store-order-group-detail-shutoff',
  templateUrl: './store-order-group-detail-shutoff.component.html',
  styleUrls: ['./store-order-group-detail-shutoff.component.css']
})
export class StoreOrderGroupDetailShutoffComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  shuffOrderModel: ShuffOrderModel;
  isValue: any

  constructor(public fb: FormBuilder, public storeOrderService: StoreOrderService) {
    this.addForm = this.fb.group({
      group_id: ['', [Validators.required]],
      reason: ['']
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
    this. setValue();
    this.storeOrderService.shutoff(this.shuffOrderModel).subscribe(res=>{

    })
   }

}
