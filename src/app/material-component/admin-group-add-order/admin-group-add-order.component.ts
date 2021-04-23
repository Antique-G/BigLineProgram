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

  setQuery: any;
  code: any;


  constructor(public fb: FormBuilder, public router: Router, public adminRegionService: AdminRegionService,
    public adminOrderGroupTravelService: AdminOrderGroupTravelService, public modal: NzModalService,) {
    this.searchForm = fb.group({
      title: [''],
      start_date: [''],
      departure_city: [''],
      destination_city: [''],
      few_days: [''],
      group_status: [''],
      code: [''],
    });
  }

  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
    // 将上次查询的筛选条件赋值
    let getSeatch = JSON.parse(localStorage.getItem("adminAddGroupOrderSearch")!);
    this.title = getSeatch?.title ? getSeatch.title : '';
    this.start_date = getSeatch?.start_date ? getSeatch?.start_date : null;
    this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
    this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';
    this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
    this.code = getSeatch?.code ? getSeatch?.code : '';

    this.searchForm.patchValue({
      title: this.title,
      start_date: this.start_date,
      departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
      destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
      few_days: this.few_days,
      code: this.code
    })
    this.getPro();
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


  getPro() {
    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.code).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource.forEach((value: any, index: any) => {
        value['expand'] = false; //展开属性
        if (value.schedule_file_url != '') {
          let filePath = value.schedule_file_url;
          //获取最后一个.的位置
          let index = filePath.lastIndexOf(".");
          //获取后缀
          let ext = filePath.substr(index + 1);
          //输出结果
          console.log('1212121', ext, ext === 'doc');
          if (ext != 'pdf') {
            value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
          }

        }
      })
      this.total = res?.total;
    })
  }


  setValue() {
    this.title = this.searchForm.value.title;
    console.log('this.searchForm.value.start_date :>> ', this.searchForm.value.start_date);
    this.start_date = this.searchForm.value.start_date == null ? '' : format(new Date(this.searchForm.value.start_date), 'yyyy-MM-dd');
    this.departure_city = this.isDeparture_city;
    this.destination_city = this.isDestination_city;
    this.few_days = this.searchForm.value.few_days;
    this.code = this.searchForm.value.code;

    // 筛选条件存进cookie
    this.setQuery = {
      title: this.title, start_date: this.start_date, departure_city: this.departure_city,
      destination_city: this.destination_city, few_days: this.few_days,code:this.code
    }
    localStorage.setItem('adminAddGroupOrderSearch', JSON.stringify(this.setQuery));

  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    // 筛选条件存进cookie
    this.setQuery = {
      title: this.title, start_date: this.start_date, departure_city: this.departure_city,
      destination_city: this.destination_city, few_days: this.few_days,code:this.code
    }
    localStorage.setItem('adminAddGroupOrderSearch', JSON.stringify(this.setQuery));
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
    this.page = 1;
    this.setValue();

    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days,this.code).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource.forEach((value: any, index: any) => {
        value['expand'] = false; //展开属性
        value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
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
    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.sort_field, this.sort,this.code).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource?.forEach((value: any) => {
        value['checked'] = false;
        value['expand'] = false; //展开属性
        value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
      })
      this.total = res?.total;
    })
  }


  sortDesc() {
    this.setValue();
    this.sort = 'desc';
    this.loading = true;
    this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.start_date, this.departure_city, this.destination_city, this.few_days, this.sort_field, this.sort,this.code).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.loading = false;
      this.dataSource = res?.data;
      this.dataSource?.forEach((value: any) => {
        value['checked'] = false;
        value['expand'] = false; //展开属性
        value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
      })
      this.total = res?.total;
    })
  }




  onExpandChange(id: number, checked: boolean): void {
    console.log("点击的是", id, checked)
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
      code:''
    });
  }

}
