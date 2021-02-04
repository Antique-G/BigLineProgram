import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetGuideModel } from 'src/interfaces/store/storeOrder/store-order-model';
import { StoreOrderService } from '../../../../../../../services/store/store-order/store-order.service';

@Component({
  selector: 'app-store-order-group-detail-subgroup-setguide',
  templateUrl: './store-order-group-detail-subgroup-setguide.component.html',
  styleUrls: ['./store-order-group-detail-subgroup-setguide.component.css']
})
export class StoreOrderGroupDetailSubgroupSetguideComponent implements OnInit {
  public isSpinning: any = true;    //loading 
  addForm!: FormGroup;
  isValue: any;
  name: any;
  dataList: any[] = [];
  @Input() data: any;

  setGuideModel: SetGuideModel;

  constructor(public fb: FormBuilder, public storeOrderService: StoreOrderService) {
    this.addForm = this.fb.group({
      guide_name: ['', [Validators.required]],
      guide_phone: ['', [Validators.required]]
    });
    this.setGuideModel = {
      sub_group_id: this.data,
      guide_name: '',
      guide_phone: ''
    }
  }

  ngOnInit(): void {
    this.storeOrderService.getGuide().subscribe(res => {
      console.log('结果是', res);
      this.dataList = res.data;
      this.isSpinning = false;
    })
  }


  changeList(event: any) {
    console.log("event", event);
    this.name = event.name;
    this.isValue = event.mobile;
  }


  setValue() {
    this.setGuideModel.sub_group_id = this.data;
    this.setGuideModel.guide_name = this.name;
    this.setGuideModel.guide_phone = this.isValue;
  }

  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("this.addForm.valid", this.addForm.valid);
    console.log("this.addForm.valid", this.addForm);
    if (this.addForm.valid) {
      console.log('this.setGuideModel', this.setGuideModel);
      this.storeOrderService.setGuide(this.setGuideModel).subscribe(res => {
        console.log('object :>> ', res);
      })
    }
  }
}
