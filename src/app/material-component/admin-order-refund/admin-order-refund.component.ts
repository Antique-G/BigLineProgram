import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRefundService } from '../../../services/admin/admin-refund.service';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';


@Component({
  selector: 'app-admin-order-refund',
  templateUrl: './admin-order-refund.component.html',
  styleUrls: ['./admin-order-refund.component.css']
})
export class AdminOrderRefundComponent implements OnInit {
  dateArray1: any[] = [];
  dateArray2: any[] = [];
  searchForm1: FormGroup;
  searchForm2: FormGroup;
  storeList: any[] = [];


  dataSource: any;
  dataSource1: any;
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;

  dataSource2: any;
  page1 = 1;
  per_page1 = 10;
  total1 = 1;
  loading1 = true;

  order_id: any;
  store_id: any;
  product_id: any;
  date_start: any;
  date_end: any;
  id: any;
  status: any;

  selectedTabIndex = 0;    //选中的tab 默认第一个

  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    public adminProductManagementService: AdminProductManagementService, public adminRefundService: AdminRefundService) {
    this.searchForm1 = fb.group({
      product_id: [''],
      store_id: [''],
      order_id: [''],
      time: [''],
      refund_id: [''],
      id: [''],
    });
    this.searchForm2 = fb.group({
      product_id: [''],
      store_id: [''],
      order_id: [''],
      time: [''],
      refund_id: [''],
      id: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    // tabIndex
    this.activatedRoute.queryParams.subscribe(params => {
     console.log('params.tabIndex :>> ', params.tabIndex);
     if(params.tabIndex===undefined){
       this.selectedTabIndex = 0;
     }
     else{
      this.selectedTabIndex = 1;
     }
    })

    this.adminProductManagementService.storeList('').subscribe(res => {
      console.log("24234", res);
      this.storeList = res;
    })
    this.getList();
    this.getList1();
  }

  // 未处理
  getList() {
    this.adminRefundService.getRefundList(this.page, this.per_page, this.order_id, this.store_id, this.product_id, this.date_start, this.date_end, this.id, 1).subscribe(res => {
      console.log('res :>> ', res);
      this.dataSource1 = res.data;
      this.loading = false;
      this.total = res?.meta?.pagination?.total;
    })
  }


  search1() {
    this.order_id = this.searchForm1.value.order_id;
    this.store_id = this.searchForm1.value.store_id;
    this.product_id = this.searchForm1.value.product_id;
    this.date_start = this.dateArray1[0];
    this.date_end = this.dateArray1[1];
    this.id = this.searchForm1.value.id;
    this.getList();
  }


  getList1() {
    this.adminRefundService.getRefundList(this.page1, this.per_page1, this.order_id, this.store_id, this.product_id, this.date_start, this.date_end, this.id, this.status).subscribe(res => {
      console.log('res :>> ', res);
      this.dataSource2 = res.data;
      this.loading1 = false;
      this.total1 = res?.meta?.pagination?.total;
    })
  }

  search2() {
    this.order_id = this.searchForm2.value.order_id;
    this.store_id = this.searchForm2.value.store_id;
    this.product_id = this.searchForm2.value.product_id;
    this.date_start = this.dateArray2[0];
    this.date_end = this.dateArray2[1];
    this.id = this.searchForm2.value.id;
    this.status = this.searchForm2.value.status;
    this.getList1();
  }

  handle(data: any) {
    this.router.navigate(['/admin/main/refund/detail'], { queryParams: { detailId: data.id, isFinished: 1 } });
  }

  edit(data: any) {
    this.router.navigate(['/admin/main/refund/detail'], { queryParams: { detailId: data.id, isFinished: 2 } });
  }


  changePageIndex(page: number) {
    this.page = page;
    this.getList();
  }

  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getList();
  }

  changePageIndex1(page: number) {
    this.page1 = page;
    this.getList1();
  }

  changePageSize1(per_page: number) {
    this.per_page1 = per_page;
    this.getList1();
  }



  onChangeDate(event: any) {
    this.dateArray1 = [];
    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate1);
  }

  onChangeDate1(event: any) {
    this.dateArray2 = [];
    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray2.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray2.push(myFormattedDate1);
  }
}
