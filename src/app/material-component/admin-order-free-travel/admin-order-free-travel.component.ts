import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdminOrderFreeTravelService } from '../../../services/admin/admin-order-free-travel.service';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';


@Component({
  selector: 'app-admin-order-free-travel',
  templateUrl: './admin-order-free-travel.component.html',
  styleUrls: ['./admin-order-free-travel.component.css']
})
export class AdminOrderFreeTravelComponent implements OnInit {
  searchForm: FormGroup;
  dataSource: any;
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  status: any;
  product_id: any;
  product_name: any;
  store_id: any;
  order_number: any;
  date_start: any;
  date_end: any;
  dateArray: any[] = [];
  product_code: any;
  storeList: any[] = [];




  constructor(public fb: FormBuilder, public router: Router, public adminOrderFreeTravelService: AdminOrderFreeTravelService,
    public adminProductManagementService: AdminProductManagementService,) {
    this.searchForm = fb.group({
      status: [''],
      product_id: [''],
      product_name: [''],
      order_number: [''],
      date_start: [''],
      product_code: [''],
      store_id: [''],
    });
  }

  ngOnInit(): void {
    this.adminProductManagementService.storeList('').subscribe(res => {
      console.log("24234", res);
      this.storeList = res;
      this.getFreeTravel();
    })

  }

  getFreeTravel() {
    this.adminOrderFreeTravelService.freeTravelList(this.page, this.per_page, this.status, this.product_id, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.store_id).subscribe(res => {
      console.log("结果是", res)
      this.dataSource = res?.data;
      this.total = res.meta?.pagination?.total;
      this.loading = false;
    })
  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getFreeTravel();
  }


  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getFreeTravel();
  }


  search() {
    this.status = this.searchForm.value.status;
    this.product_id = this.searchForm.value.product_id;
    this.product_name = this.searchForm.value.product_name;
    this.product_code = this.searchForm.value.product_code;
    this.order_number = this.searchForm.value.order_number;
    this.store_id = this.searchForm.value.store_id;
    this.date_start = this.dateArray[0];
    this.date_end = this.dateArray[1];
    this.loading = true;
    this.getFreeTravel();
  }


  onChangeDate(event: any) {
    this.dateArray = [];
    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray.push(myFormattedDate1);
    console.log("event", this.dateArray);

  }

  edit(data: any) {
    this.router.navigate(['/admin/main/freeTravelOrder/detail'], { queryParams: { detailId: data.id } });
  }
}

