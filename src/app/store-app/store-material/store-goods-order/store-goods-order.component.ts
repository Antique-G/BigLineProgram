import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-store-goods-order',
  templateUrl: './store-goods-order.component.html',
  styleUrls: ['./store-goods-order.component.css']
})
export class StoreGoodsOrderComponent implements OnInit {
    searchForm: FormGroup;

    constructor(public fb: FormBuilder,) {
        this.searchForm = this.fb.group({
            status: [''],
            check_status: [''],
            title: [''],
            firstType: [''],
            secondType: [''],
            thirdType: [''],
            is_order: [''],
        });
   }

  ngOnInit(): void {
  }

}
