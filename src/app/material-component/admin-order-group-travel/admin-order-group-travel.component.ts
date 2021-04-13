import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdminOrderGroupTravelService } from '../../../services/admin/admin-order-group-travel.service';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminOrderGroupMoneyComponent } from './admin-order-group-money/admin-order-group-money.component';


@Component({
  selector: 'app-admin-order-group-travel',
  templateUrl: './admin-order-group-travel.component.html',
  styleUrls: ['./admin-order-group-travel.component.css']
})
export class AdminOrderGroupTravelComponent implements OnInit {
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
  contact_name: any;
  contact_phone: any;
  store_id: any;
  date_start: any;
  date_end: any;
  order_start_date: any;
  order_end_date: any;
  dateArray: any[] = [];
  dateArray1: any[] = [];
  product_code: any;
  storeList: any[] = [];
  totalModel: any;


  constructor(public fb: FormBuilder, public router: Router,
    public modal: NzModalService, public adminOrderGroupTravelService: AdminOrderGroupTravelService,
    public adminProductManagementService: AdminProductManagementService,) {
    this.searchForm = fb.group({
      status: [''],
      product_id: [''],
      product_name: [''],
      order_number: [''],
      date_start: [''],
      product_code: [''],
      store_id: [''],
      order_start_date: [''],
      contact_name: [''],
      contact_phone: [''],
    });
  }

  ngOnInit(): void {
    this.adminProductManagementService.storeList('').subscribe(res => {
      console.log("24234", res);
      this.storeList = res;
      this.groupTravel();
      this.getTotal();
    })

  }

  groupTravel() {
    this.adminOrderGroupTravelService.groupTravelList(this.page, this.per_page, this.status, this.product_id, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.store_id, this.order_start_date, this.order_end_date,this.contact_name,this.contact_phone).subscribe(res => {
      console.log("结果是", res);
      this.dataSource = res?.data;
      this.total = res.meta?.pagination?.total;
      this.loading = false;
    })
  }

  getTotal() {
    this.adminOrderGroupTravelService.getOrderTotal(this.status, this.product_id, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.store_id, this.order_start_date, this.order_end_date,this.contact_name,this.contact_phone).subscribe(res => {
      console.log('统计', res?.data);
      this.totalModel = res?.data;
      console.log('totalModel?.refund_money!=', this.totalModel?.refund_money != '0');
    })
  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.groupTravel();
  }


  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.groupTravel();
  }


  search() {
    this.status = this.searchForm.value.status;
    this.product_id = this.searchForm.value.product_id;
    this.product_name = this.searchForm.value.product_name;
    this.order_number = this.searchForm.value.order_number;
    this.contact_name = this.searchForm.value.contact_name;
    this.contact_phone = this.searchForm.value.contact_phone;
    this.product_code = this.searchForm.value.product_code;
    this.store_id = this.searchForm.value.store_id;
    this.date_start = this.dateArray[0];
    this.date_end = this.dateArray[1];
    this.order_start_date = this.dateArray1[0];
    this.order_end_date = this.dateArray1[1];
    this.loading = true;
    this.groupTravel();
    this.getTotal();
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
    this.router.navigate(['/admin/main/groupTravelOrder/detail'], { queryParams: { detailId: data.id } });
  }


  addOrder() {
    this.router.navigate(['/admin/main/groupTravelOrder/adminOrdergroupTravelAddOrder']);
  }



  money(data: any) {
    const addmodal = this.modal.create({
      nzTitle: '收款',
      nzContent: AdminOrderGroupMoneyComponent,
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
      this.groupTravel();
    })
  }



}


