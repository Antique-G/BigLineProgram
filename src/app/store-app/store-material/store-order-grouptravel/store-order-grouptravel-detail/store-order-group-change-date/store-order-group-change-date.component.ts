import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { StoreOrderGroupTravelService } from '../../../../../../services/store/store-order/store-order-group-travel.service';
import { differenceInCalendarDays, format } from 'date-fns';
import { ReturnStatement } from '@angular/compiler';


@Component({
  selector: 'app-store-order-group-change-date',
  templateUrl: './store-order-group-change-date.component.html',
  styleUrls: ['./store-order-group-change-date.component.css']
})
export class StoreOrderGroupChangeDateComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  order_id: any;
  new_date: any;
  isDisabled!: boolean;

  constructor(public fb: FormBuilder, public storeOrderGroupTravelService: StoreOrderGroupTravelService,) {
    this.addForm = fb.group({
      new_date: [''],
      adult_price: [''],
      new_adult_price: [''],
      child_price: [''],
      new_child_price: [''],
      difference_price: [''],
      new_difference_price: [''],
      diff_price_total: [''],
    })
  }

  ngOnInit(): void {
    console.log("传过来的值", this.data);

  }

  disabledDate = (current: Date): boolean => {
    if (differenceInCalendarDays(current, new Date(this.data.start_date)) === 0) {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
    }
    return this.isDisabled;
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.order_id = this.data.id;
    this.new_date = format(new Date(result), 'yyyy-MM-dd');
    this.storeOrderGroupTravelService.changGetDateGroup(this.order_id, this.new_date).subscribe(res => {
      console.log('object :>> ', res);
    })

  }

  update() { }
}
