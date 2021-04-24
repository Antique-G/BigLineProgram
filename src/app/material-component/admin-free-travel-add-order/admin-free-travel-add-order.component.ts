import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRegionService } from '../../../services/admin/admin-region.service';
import { AdminOrderFreeTravelService } from '../../../services/admin/admin-order-free-travel.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-admin-free-travel-add-order',
  templateUrl: './admin-free-travel-add-order.component.html',
  styleUrls: ['./admin-free-travel-add-order.component.css']
})
export class AdminFreeTravelAddOrderComponent implements OnInit {
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
  sort_field = 'min_price';
  sort: any;
  setQuery: any;
  quote_type: any;
  id: any;

  constructor(public fb: FormBuilder, public router: Router, public adminRegionService: AdminRegionService,
    public adminOrderFreeTravelService: AdminOrderFreeTravelService, public modal: NzModalService,) {
    this.searchForm = fb.group({
      title: [''],
      start_date: [''],
      departure_city: [''],
      destination_city: [''],
      few_days: [''],
      group_status: [''],
      quote_type: [''],
      id: [''],
    });
  }

  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      // 将上次查询的筛选条件赋值
      let getSeatch = JSON.parse(localStorage.getItem("adminAddFreeOrderSearch")!);
      this.title = getSeatch?.title ? getSeatch.title : '';
      this.start_date = getSeatch?.start_date ? getSeatch?.start_date : null;
      this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
      this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';
      this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
      this.quote_type = getSeatch?.quote_type ? getSeatch?.quote_type : '';
      this.id = getSeatch?.id ? getSeatch?.id : '';

      console.log('this.quote_type', this.quote_type);
      this.searchForm.patchValue({
        title: this.title,
        start_date: this.start_date,
        departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
        destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
        few_days: this.few_days,
        quote_type: this.quote_type,
        id: this.id
      })
      this.getFeeTravelList();
    })


  }


  //区域解析
  cityChange(data: any) {
    let arr: any[] = []
    for (let i = 0; i < data.length / 4; i++) {
      let temp = arr[i] || '' + data.substr(0, 4 * (i + 1))
      arr.push(temp);
    }
    return arr
  }


  getFeeTravelList() {
    this.loading = true;
    this.adminOrderFreeTravelService.getFreePro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.quote_type, this.id).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
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
    this.quote_type = this.searchForm.value.quote_type;
    this.id = this.searchForm.value.id;

    // 筛选条件存进cookie
    this.setQuery = {
      title: this.title, start_date: this.start_date, departure_city: this.departure_city,
      destination_city: this.destination_city, few_days: this.few_days, quote_type: this.quote_type,id:this.id
    }
    localStorage.setItem('adminAddFreeOrderSearch', JSON.stringify(this.setQuery));
  }


  anOrder(data: any) {
    console.log('传递的值 :>> ', data);
    localStorage.setItem('freeOrderData', JSON.stringify(data))
    if (data.quote_type == 2) {
      this.router.navigate(['/admin/main/addFreeOrder/add'])
    }
    else {
      this.router.navigate(['/admin/main/addFreeOrder/add/byQuote']);
    }

  }

  search() {
    this.loading = true;
    this.page = 1;
    this.setValue();
    this.adminOrderFreeTravelService.getFreePro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.quote_type,this.id).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
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
    this.adminOrderFreeTravelService.getFreePro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.sort_field, this.sort, this.quote_type,this.id).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.total = res?.total;
    })
  }


  sortDesc() {
    this.setValue();
    this.sort = 'desc';
    this.loading = true;
    this.adminOrderFreeTravelService.getFreePro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.sort_field, this.sort, this.quote_type,this.id).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.total = res?.total;
    })
  }


  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getFeeTravelList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    // 筛选条件存进cookie
    this.setQuery = {
      title: this.title, start_date: this.start_date, departure_city: this.departure_city,
      destination_city: this.destination_city, few_days: this.few_days, quote_type: this.quote_type,id:this.id
    }
    localStorage.setItem('adminAddFreeOrderSearch', JSON.stringify(this.setQuery));
    this.getFeeTravelList();
  }



  // 重置
  reset() {
    this.searchForm.patchValue({
      title: '',
      start_date: null,
      departure_city: '',
      destination_city: '',
      few_days: '',
      group_status: '',
      quote_type: '',
      id:''
    });
  }
}
