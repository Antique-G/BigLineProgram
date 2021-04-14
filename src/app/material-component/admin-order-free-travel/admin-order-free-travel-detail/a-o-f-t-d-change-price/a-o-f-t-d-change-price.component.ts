import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ChangePriceModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminOrderGroupTravelService } from '../../../../../services/admin/admin-order-group-travel.service';

@Component({
  selector: 'app-a-o-f-t-d-change-price',
  templateUrl: './a-o-f-t-d-change-price.component.html',
  styleUrls: ['./a-o-f-t-d-change-price.component.css']
})
export class AOFTDChangePriceComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  dataDetail: any;
  isId: any;
  changePriceModel: ChangePriceModel;


  constructor(public fb: FormBuilder, public adminOrderGroupTravelService: AdminOrderGroupTravelService,) {
    this.addForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
    this.changePriceModel = {
      order_id: '',
      type: 0,
      title: '',
      price: 0
    }
  }

  ngOnInit(): void {
    console.log("传过来的值", this.data);
    this.dataDetail = this.data;
    this.isId = this.dataDetail.id;
  }


  setValue() {
    this.changePriceModel.order_id = this.isId;
    this.changePriceModel.title = this.addForm.value.name;
    this.changePriceModel.type = this.addForm.value.type;
    this.changePriceModel.price = this.addForm.value.price;
  }


  update() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("this.addForm.valid", this.addForm.valid);
    console.log("this.addForm.valid", this.addForm);
    if (this.addForm.valid) {
      this.adminOrderGroupTravelService.changePrice(this.changePriceModel).subscribe(res=>{
        console.log("ada",res);
      })
    }
  }
}
