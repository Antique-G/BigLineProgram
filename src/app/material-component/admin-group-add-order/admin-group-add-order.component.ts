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
  product_name: any;
  start_date: any;
  departure_city: any;
  destination_city: any;
  few_days: any;

  // 目的城市
  nzOptions: any[] | null = null;
  idRegion: any;
  isDeparture_city: any;
  isDestination_city: any;
  sortName :any;
  sortValue :any;




  constructor(public fb: FormBuilder, public router: Router, public adminRegionService: AdminRegionService,
    public adminOrderGroupTravelService: AdminOrderGroupTravelService, public modal: NzModalService,) {
    this.searchForm = fb.group({
      product_name: [''],
      start_date: [''],
      departure_city: [''],
      destination_city: [''],
      few_days: [''],
    });
  }

  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
    this.getPro();
  }

  getPro() {
    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.product_name, this.start_date, this.departure_city, this.destination_city, this.few_days).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource?.forEach((value: any) => {
        value['checked'] = false;
      })
      this.total = res?.total;
    })
  }


  setValue() {
    this.product_name = this.searchForm.value.product_name;
    this.start_date = format(new Date(this.searchForm.value.start_date), 'yyyy-MM-dd');
    this.departure_city = this.isDeparture_city;
    this.destination_city = this.isDestination_city;
    this.few_days = this.searchForm.value.few_days;
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


  changeId(data: any) {
    console.log('object :>> ', data);
    if (data.checked === true) {
      this.dataSource.forEach((element: any) => {
        if (element.id != data.id) {
          element.checked = false;
        }
      });
      this.modal.confirm({
        nzTitle: "<h4>提示</h4>",
        nzContent: "<h6>是否选择该产品进行下单</h6>",
        nzOnOk: () =>
          setTimeout(() => {
            localStorage.setItem('orderData', JSON.stringify(data))
            this.router.navigate(['/admin/main/addGroupOrder/add'])
          }, 50)
      });
    }

  }




  search() {
    this.setValue();
    this.getPro();
  }




  // 城市
  onChangesdestinationCity(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.isDeparture_city = data[data.length - 1];
    }
  }

  onChangesdepartureCity(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.isDestination_city = data[data.length - 1];
    }
  }




  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search1();
  }

  search1(): void {
    if (this.sortName && this.sortValue) {
      this.dataSource = this.dataSource.sort((a:any, b:any) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.dataSource = this.dataSource;
    }
  }

}
