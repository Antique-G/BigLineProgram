import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-order-refund-turnover',
  templateUrl: './admin-order-refund-turnover.component.html',
  styleUrls: ['./admin-order-refund-turnover.component.css']
})
export class AdminOrderRefundTurnoverComponent implements OnInit {
  searchForm!: FormGroup;
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
  group_code: any;

  dateArray: any;
  dateArray1: any;



  constructor(public fb: FormBuilder, public router: Router, ) {
    this.searchForm = fb.group({
      product_name: [''],
      order_number: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.getRefundlist()
  }

  getRefundlist() {
  
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getRefundlist();
  }


  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getRefundlist();
  }


  search() {
    this.getRefundlist();
  }




  onChangeDate(event: any) {
    this.dateArray = [];
    const datePipe = new DatePipe('en-US');
    console.log('object :>> ', event);
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray.push(myFormattedDate1);
    console.log("event", this.dateArray);
  }

  onChangeDate1(event: any) {
    this.dateArray1 = [];
    const datePipe = new DatePipe('en-US');
    console.log('object :>> ', event);
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate1);
    console.log("event", this.dateArray1);
  }

  
 

}