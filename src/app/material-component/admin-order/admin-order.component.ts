import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdminOrderService } from '../../../services/admin/admin-order.service';
import { AdminRegionService } from '../../../services/admin/admin-region.service';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  searchForm: FormGroup;
  dataSource: any;
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  product_id: any;
  product_name: any;
  group_id: any;
  order_number: any;
  destination_city: any;
  date_start: any;
  date_end: any;


  dateArray: any[] = [];
  // 城市
  nzOptions: any[] | null = null;
  idRegion: any;

  group_status: any;
  group_code: any;
  store_id: any;
  storeList: any[] = [];


  constructor(public fb: FormBuilder, public router: Router, public adminOrderService: AdminOrderService,
    public adminRegionService: AdminRegionService, public adminProductManagementService: AdminProductManagementService,) {
    this.searchForm = fb.group({
      product_id: [''],
      product_name: [''],
      group_id: [''],
      order_number: [''],
      date_start: [''],
      destination_city: [''],
      group_status: [''],
      group_code: [''],
      store_id: [''],
    });
  }

  ngOnInit(): void {
    // 城市
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      this.adminProductManagementService.storeList('').subscribe(res => {
        console.log("24234", res);
        this.storeList = res;
        this.getStoreOrderGroup();
      })

    })

  }

  getStoreOrderGroup() {
    this.adminOrderService.getStoreOrderGroup(this.page, this.per_page, this.product_id, this.product_name, this.group_id, this.order_number, this.destination_city, this.date_start, this.date_end, this.group_status, this.group_code, this.store_id).subscribe(res => {
      console.log("结果是", res)
      this.dataSource = res?.data;
      this.total = res.meta?.pagination?.total;
      this.loading = false;
    })
  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getStoreOrderGroup();
  }

  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getStoreOrderGroup();
  }


  search() {
    this.product_id = this.searchForm.value.product_id;
    this.product_name = this.searchForm.value.product_name;
    this.group_id = this.searchForm.value.group_id;
    this.order_number = this.searchForm.value.order_number;
    this.destination_city = this.idRegion;
    this.date_start = this.dateArray[0];
    this.date_end = this.dateArray[1];
    this.group_status = this.searchForm.value.group_status;
    this.group_status = this.searchForm.value.group_status;
    this.group_status = this.searchForm.value.group_status;
    this.group_code = this.searchForm.value.group_code;
    this.store_id = this.searchForm.value.store_id;
    console.log('3242342 ', this.group_status);
    this.adminOrderService.getStoreOrderGroup(this.page, this.per_page, this.product_id, this.product_name, this.group_id, this.order_number, this.destination_city, this.date_start, this.date_end, this.group_status, this.group_code, this.store_id).subscribe(res => {
      console.log("结果是", res)
      this.dataSource = res?.data;
      this.total = res.meta?.pagination?.total;
    })


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


  onChanges(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.idRegion = data[data.length - 1];
    }
  }



  edit(data: any) {
    this.router.navigate(['/admin/main/orderList/detail'], { queryParams: { detailId: data.group_id } });
  }


  // 重置
  reset() {
    this.searchForm.patchValue({
      product_id: '',
      product_name: '',
      group_id: '',
      order_number: '',
      date_start: '',
      destination_city: '',
      group_status: '',
      group_code: '',
      store_id: '',
    });
  }
}