import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreRefundService } from '../../../../services/store/store-order/store-refund.service';
import { StoreOrderRefundTurnoverDetailComponent } from './store-order-refund-turnover-detail/store-order-refund-turnover-detail.component';

@Component({
  selector: 'app-store-order-refund-turnover',
  templateUrl: './store-order-refund-turnover.component.html',
  styleUrls: ['./store-order-refund-turnover.component.css']
})
export class StoreOrderRefundTurnoverComponent implements OnInit {
  searchForm!: FormGroup;
  dataSource: any;
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  order_id: any;
  store_id: any;
  refund_id: any;
  transaction_id: any;
  date_start: any;
  date_end: any;
  status: any;
  dateArray: any[] = [];
  storeList: any[] = [];


  constructor(public fb: FormBuilder, public router: Router, public dialog: MatDialog,
    public storeRefundService: StoreRefundService,) {
    this.searchForm = fb.group({
      order_id: [''],
      refund_id: [''],
      time: [''],
      transaction_id: [''],
    });
  }



  ngOnInit(): void {

    this.getRefundlist();
  }

  getRefundlist() {
    this.storeRefundService.getRefundLog(this.page, this.per_page, this.order_id, this.refund_id, this.transaction_id, this.date_start, this.date_end).subscribe(res => {
      this.dataSource = res.data;
      this.total = res.meta.pagination.total;
      this.loading = false;

    })
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
    this.order_id = this.searchForm.value.order_id;
    this.refund_id = this.searchForm.value.refund_id;
    this.transaction_id = this.searchForm.value.transaction_id;
    this.date_start = this.dateArray[0];
    this.date_end = this.dateArray[1];
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



  edit(data: any) {
    console.log('data :>> ', data, data.status === 2);
    if (data.status === 3) {
      const dialogRef = this.dialog.open(StoreOrderRefundTurnoverDetailComponent, {
        width: '900px',
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {


      });
    }
  }

}