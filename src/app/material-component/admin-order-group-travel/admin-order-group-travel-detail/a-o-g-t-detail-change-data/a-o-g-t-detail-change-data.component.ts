import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ChangeDateRequestModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminOrderGroupTravelService } from '../../../../../services/admin/admin-order-group-travel.service';



@Component({
  selector: 'app-a-o-g-t-detail-change-data',
  templateUrl: './a-o-g-t-detail-change-data.component.html',
  styleUrls: ['./a-o-g-t-detail-change-data.component.css']
})
export class AOGTDetailChangeDataComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  order_id: any;
  new_date: any;
  dateList: any;
  isShow = false;
  dataModel: any;
  changeDateRequestModel: ChangeDateRequestModel;


  //  public storeQuoteBydateService: StoreQuoteBydateService
  constructor(public fb: FormBuilder, public adminOrderGroupTravelService: AdminOrderGroupTravelService,
  ) {
    this.addForm = fb.group({
      new_date: [''],
      adult_price: [''],
      new_adult_price: [''],
      child_price: [''],
      new_child_price: [''],
      difference_price: [''],
      new_difference_price: [''],
      diff_price_total: [''],
    });
    this.changeDateRequestModel = {
      order_id: '',
      new_date: ''
    }
  }

  ngOnInit(): void {
    console.log("传过来的值", this.data);
    // this.storeQuoteBydateService.getQuoteDateList(this.data.product_id, 'management', 1, '', 1000, 2).subscribe(res => {
    //   console.log('object :>> ', res.data);
    //   this.dateList = res.data;
    // })
  }


  changeDate(data: any) {
    this.order_id = this.data.id;
    this.new_date = this.addForm.value.new_date;
    this.isShow = true;
    this.adminOrderGroupTravelService.changGetDateGroup(this.order_id, this.new_date).subscribe(res => {
      console.log('结果是', res);
      this.dataModel = res;
      this.addForm.patchValue({
        adult_price: this.dataModel?.date_quote?.adult_price,
        new_adult_price: this.dataModel?.new_date_quote?.adult_price,
        child_price: this.dataModel?.date_quote?.child_price,
        new_child_price: this.dataModel?.new_date_quote?.child_price,
        difference_price: this.dataModel?.date_quote?.difference_price,
        new_difference_price: this.dataModel?.new_date_quote?.difference_price,
        diff_price_total: this.dataModel?.diff_price_total
      })
    })
  }


  update() {
    this.changeDateRequestModel.order_id = this.data.id;
    this.changeDateRequestModel.new_date = this.addForm.value.new_date;
    this.adminOrderGroupTravelService.changeDateGroup(this.changeDateRequestModel).subscribe(res=>{
      console.log('11111 ', res);
    })
  }
}
