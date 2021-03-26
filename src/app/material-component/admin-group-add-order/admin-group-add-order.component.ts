import { format } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminOrderGroupTravelService } from '../../../services/admin/admin-order-group-travel.service';
import { AdminRegionService } from '../../../services/admin/admin-region.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-group-add-order',
  templateUrl: './admin-group-add-order.component.html',
  styleUrls: ['./admin-group-add-order.component.css']
})
export class AdminGroupAddOrderComponent implements OnInit {
  searchForm: FormGroup;
  dataSource: any;
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  title: any;
  start_date: any;
  departure_city: any;
  destination_city: any;
  few_days: any;
  date = null;

  // 目的城市
  nzOptions: any[] | null = null;
  idRegion: any;
  isDeparture_city: any;
  isDestination_city: any;
  sortName: any;
  sortValue: any;
  sort_field = 'minimum_price';
  sort: any;
  group_status = 1;
  isStatus = 1;



  constructor(public fb: FormBuilder, public router: Router, public adminRegionService: AdminRegionService,
    public adminOrderGroupTravelService: AdminOrderGroupTravelService, public modal: NzModalService,) {
    this.searchForm = fb.group({
      title: [''],
      start_date: [''],
      departure_city: [''],
      destination_city: [''],
      few_days: [''],
      group_status: [''],
    });
  }

  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
    this.getPro();
  }

  getPro() {
    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.group_status).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource.forEach((value: any, index: any) => {
        value['expand'] = false; //展开属性
      })
      this.total = res?.total;
    })
  }


  setValue() {
    this.title = this.searchForm.value.title;
    console.log('this.searchForm.value.start_date :>> ', this.searchForm.value.start_date);
    this.start_date = this.searchForm.value.start_date === null ? '' : format(new Date(this.searchForm.value.start_date), 'yyyy-MM-dd');
    this.departure_city = this.isDeparture_city;
    this.destination_city = this.isDestination_city;
    this.few_days = this.searchForm.value.few_days;
    this.group_status = this.searchForm.value.group_status;
    console.log('3242342 ', this.group_status );
    console.log('this.start_date :>> ', this.searchForm.value.start_date === '', this.start_date);
  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getPro();
  }


  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getPro();
  }


  anOrder(data: any) {
    localStorage.setItem('orderData', JSON.stringify(data))
    this.router.navigate(['/admin/main/addGroupOrder/add'])
  }



  search() {
    this.loading = true;
    this.setValue();
    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.group_status).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource.forEach((value: any, index: any) => {
        value['expand'] = false; //展开属性
      })
      this.total = res?.total;
    })
  }




  // 城市
  onChangesdestinationCity(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.isDestination_city = data[data.length - 1];

    }
  }

  onChangesdepartureCity(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.isDeparture_city = data[data.length - 1];
    }
  }




  sortAsc() {
    this.setValue();
    this.sort = 'asc';
    this.loading = true;
    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.sort_field, this.sort).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource?.forEach((value: any) => {
        value['checked'] = false;
        value['expand'] = false; //展开属性
      })
      this.total = res?.total;
    })
  }


  sortDesc() {
    this.setValue();
    this.sort = 'desc';
    this.loading = true;
    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.sort_field, this.sort).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource?.forEach((value: any) => {
        value['checked'] = false;
        value['expand'] = false; //展开属性
      })
      this.total = res?.total;
    })
  }




  onExpandChange(id: number, checked: boolean): void {
    console.log("点击的是", id, checked)
  }
}
