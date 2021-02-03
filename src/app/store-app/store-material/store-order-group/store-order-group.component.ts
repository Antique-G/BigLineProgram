import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreOrderService } from '../../../../services/store/store-order/store-order.service';

@Component({
  selector: 'app-store-order-group',
  templateUrl: './store-order-group.component.html',
  styleUrls: ['./store-order-group.component.css']
})
export class StoreOrderGroupComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  name: any;
  mobile: any;
  status: any;


  constructor(public fb: FormBuilder, public router: Router,public storeOrderService:StoreOrderService) {
    this.searchForm = fb.group({
      status: [''],
      name: [''],
      mobile: ['']
    });
  }

  ngOnInit(): void {
  }


  edit(data: any) {

  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;

  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;

  }


  search() {
    this.name = this.searchForm.value.name;
    this.status = this.searchForm.value.status;
    this.router.navigate(['/admin/main/orderList/detail']);


  }

  add() { }

}

