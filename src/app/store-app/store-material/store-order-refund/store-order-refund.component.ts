import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreRefundService } from '../../../../services/store/store-order/store-refund.service';

@Component({
  selector: 'app-store-order-refund',
  templateUrl: './store-order-refund.component.html',
  styleUrls: ['./store-order-refund.component.css']
})
export class StoreOrderRefundComponent implements OnInit {

  dataSource1: any;
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  dateArray1: any[] = [];
  searchForm1: FormGroup;
  order_id: any;
  product_id: any;
  date_start: any;
  date_end: any;
  id: any;
  status: any;
  product_name: any;
  setQuery: any;

  constructor(public fb: FormBuilder, public router: Router, public storeRefundService: StoreRefundService) {
    this.searchForm1 = fb.group({
      order_id: [''],
      product_id: [''],
      product_name: [''],
      time: [''],
      id: [''],
    });
  }

  ngOnInit(): void {
    // 将上次查询的筛选条件赋值
    let getSeatch1 = JSON.parse(localStorage.getItem("storeRefundSearch")!);
    this.order_id = getSeatch1?.order_id ? getSeatch1.order_id : '';
    this.product_id = getSeatch1?.product_id ? getSeatch1?.product_id : '';
    this.product_name = getSeatch1?.product_name ? getSeatch1?.product_name : '';
    this.date_start = getSeatch1?.date_start ? getSeatch1?.date_start : null;
    this.date_end = getSeatch1?.date_end ? getSeatch1?.date_end : null;
    this.id = getSeatch1?.id ? getSeatch1?.id : '';
    this.page = 1;
    this.searchForm1.patchValue({
      order_id: this.order_id,
      product_id: this.product_id,
      product_name: this.product_name,
      time: this.date_start == null ? [] : [this.date_start, this.date_end],
      id: '',
    })
    this.getRefundlist()
  }

  getRefundlist() {
    this.loading = true;
    this.storeRefundService.getRefundList(this.page, this.per_page, this.order_id, this.product_id, this.product_name, this.date_start, this.date_end, this.id).subscribe(res => {
      this.loading = false;
      this.dataSource1 = res?.data;
      this.total = res.meta?.pagination?.total;
    })
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    // 筛选条件存进cookie
    this.setQuery = {
      order_id: this.order_id, product_id: this.product_id, product_name: this.product_name,
      id: this.id, date_start: this.date_start, date_end: this.date_end, page: this.page
    }
    localStorage.setItem('storeRefundSearch', JSON.stringify(this.setQuery));
    this.getRefundlist();
  }


  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getRefundlist();
  }


  search1() {
    this.order_id = this.searchForm1.value.order_id;
    this.product_id = this.searchForm1.value.product_id;
    this.product_name = this.searchForm1.value.product_name
    this.date_start = this.dateArray1[0];
    this.date_end = this.dateArray1[1];
    this.id = this.searchForm1.value.id;
    this.page = 1;
    // 筛选条件存进cookie
    this.setQuery = {
      order_id: this.order_id, product_id: this.product_id, product_name: this.product_name,
      id: this.id, date_start: this.date_start, date_end: this.date_end, page: this.page
    }
    localStorage.setItem('storeRefundSearch', JSON.stringify(this.setQuery));
    this.getRefundlist();
  }



  onChangeDate(event: any) {
    this.dateArray1 = [];
    const datePipe = new DatePipe('en-US');
    console.log('object :>> ', event);
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate1);
  }



  edit(data: any) {
    this.router.navigate(['/store/main/storeRefund/detail'], { queryParams: { detailId: data.id, isFinished: data.status } });
  }


  // 重置
  reset() {
    this.searchForm1.patchValue({
      order_id: '',
      product_id: '',
      product_name: '',
      time: '',
      id: '',
    })
  }
}
