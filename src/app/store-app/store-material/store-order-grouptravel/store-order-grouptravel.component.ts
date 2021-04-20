import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StoreOrderGroupTravelService } from '../../../../services/store/store-order/store-order-group-travel.service';
import { StoreOrderGroupMoneyComponent } from './store-order-group-money/store-order-group-money.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-store-order-grouptravel',
  templateUrl: './store-order-grouptravel.component.html',
  styleUrls: ['./store-order-grouptravel.component.css']
})

export class StoreOrderGrouptravelComponent implements OnInit {
  searchForm: FormGroup;
  dataSource: any;
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  status: any;
  product_id: any;
  product_name: any;
  order_number: any;
  date_start: any;
  contact_name: any;
  contact_phone: any;
  date_end: any;
  dateArray: any[] = [];
  dateArray1: any[] = [];
  product_code: any;
  order_start_date: any;
  order_end_date: any;


  constructor(public fb: FormBuilder, public router: Router,
    public modal: NzModalService, public storeOrderGroupTravelService: StoreOrderGroupTravelService) {
    this.searchForm = fb.group({
      status: [''],
      product_id: [''],
      product_name: [''],
      order_number: [''],
      date_start: [''],
      product_code: [''],
      order_start_date: [''],
      contact_name: [''],
      contact_phone: [''],
    });
  }

  ngOnInit(): void {
    this.getFreeTravel();
  }

  getFreeTravel() {
    this.storeOrderGroupTravelService.groupTravelList(this.page, this.per_page, this.status, this.product_id, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.order_start_date, this.order_end_date, this.contact_name, this.contact_phone).subscribe(res => {
      console.log("结果是", res);
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
    this.order_number = this.searchForm.value.order_number;
    this.product_code = this.searchForm.value.product_code;
    this.contact_name = this.searchForm.value.contact_name;
    this.contact_phone = this.searchForm.value.contact_phone;
    this.date_start = this.dateArray[0];
    this.date_end = this.dateArray[1];
    this.order_start_date = this.dateArray1[0];
    this.order_end_date = this.dateArray1[1];
    this.page = 1;
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


  onChangeDateOrder(event: any) {
    this.dateArray1 = [];
    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray1.push(myFormattedDate1);
    console.log("event", this.dateArray);
  }


  edit(data: any) {
    this.router.navigate(['/store/main/storeOrdergroupTravel/detail'], { queryParams: { detailId: data.id } });
  }


  addOrder() {
    this.router.navigate(['/store/main/storeOrdergroupTravel/storeOrdergroupTravelAddOrder'],);
  }


  money(data: any) {
    const addmodal = this.modal.create({
      nzTitle: '收款',
      nzContent: StoreOrderGroupMoneyComponent,
      nzComponentParams: {
        data: data
      },
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.add()

          }
        }
      ]
    })
    addmodal.afterClose.subscribe(res => {
      this.getFreeTravel();
    })
  }


  // 重置
  reset() {
    this.searchForm.patchValue({
      status: '',
      product_id: '',
      product_name: '',
      order_number: '',
      date_start: '',
      product_code: '',
      order_start_date: '',
      contact_name: '',
      contact_phone: '',
    })
  }
}


