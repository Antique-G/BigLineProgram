import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AdminRefundService } from '../../../services/admin/admin-refund.service';


@Component({
  selector: 'app-admin-order-refund',
  templateUrl: './admin-order-refund.component.html',
  styleUrls: ['./admin-order-refund.component.css']
})
export class AdminOrderRefundComponent implements OnInit {
  dateArray1: any[] = [];
  dateArray2: any[] = [];
  searchForm1?: FormGroup;
  searchForm2?: FormGroup;

  dataSource: any;
  dataSource1: any;
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;

  dataSource2: any;
  page1 = 1;
  per_page1 = 20;
  total1 = 1;
  loading1 = true;


  constructor(public fb: FormBuilder, public router: Router, public adminRefundService: AdminRefundService) {
    this.searchForm1 = fb.group({
      product_name: [''],
      store_name: [''],
      order_id: [''],
      time: [''],
      refund_id: [''],
    });
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.adminRefundService.getRefundList(this.page, this.per_page).subscribe(res => {
      console.log('res :>> ', res);
      this.dataSource1 = res.data;
      this.loading = false;
    })
  }


  search() {

  }


  handle(data: any) {
    this.router.navigate(['/admin/main/refund/detail'], { queryParams: { detailId: data.id } });
  }



  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;

  }

  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
  }

  changePageIndex1(page: number) {
    console.log("当前页", page);
    this.page = page;

  }

  changePageSize1(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
  }



  onChangeDate(event: any) {
    this.dateArray1 = [];
    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate1);
    console.log("event", this.dateArray1);
  }
}
