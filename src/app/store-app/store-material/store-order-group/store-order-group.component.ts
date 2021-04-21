import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreRegionService } from '../../../../services/store/store-region/store-region.service';
import { StoreOrderService } from '../../../../services/store/store-order/store-order.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-store-order-group',
  templateUrl: './store-order-group.component.html',
  styleUrls: ['./store-order-group.component.css']
})
export class StoreOrderGroupComponent implements OnInit {
  searchForm: FormGroup;
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


  dateArray: any[] = [];
  // 城市
  nzOptions: any[] | null = null;
  idRegion: any;
  // 筛选条件
  setQuery: any;


  constructor(public fb: FormBuilder, public router: Router, public storeOrderService: StoreOrderService,
    public storeRegionService: StoreRegionService,) {
    this.searchForm = fb.group({
      product_id: [''],
      product_name: [''],
      group_id: [''],
      order_number: [''],
      date_starts: [''],
      destination_city: [''],
      group_code: ['']
    });
  }

  ngOnInit(): void {
    // 城市
    this.storeRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      // 将上次查询的筛选条件赋值
      let getSeatch = JSON.parse(localStorage.getItem("storeOrderSearch")!);
      this.product_id = getSeatch?.product_id ? getSeatch?.product_id : '';
      this.product_name = getSeatch?.product_name ? getSeatch?.product_name : '';
      this.group_id = getSeatch?.group_id ? getSeatch?.group_id : '';
      this.order_number = getSeatch?.order_number ? getSeatch?.order_number : '';
      this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';
      this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
      this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
      this.group_code = getSeatch?.group_code ? getSeatch?.group_code : '';
      this.page = getSeatch?.page ? getSeatch?.page : 1;


      this.searchForm.patchValue({
        product_id: this.product_id,
        product_name: this.product_name,
        group_id: this.group_id,
        order_number: this.order_number,
        date_starts: this.date_start == null ? [] : [this.date_start, this.date_end],
        destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
        group_code: this.group_code,
      })
      this.getStoreOrderGroup();
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


  getStoreOrderGroup() {
    this.storeOrderService.getStoreOrderGroup(this.page, this.per_page, this.product_id, this.product_name, this.group_id, this.order_number, this.destination_city, this.date_start, this.date_end, this.group_code).subscribe(res => {
      console.log("结果是", res)
      this.dataSource = res?.data;
      this.total = res.meta?.pagination?.total;
      this.loading = false;
    })
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    // 筛选条件存进cookie
    this.setQuery = { product_id: this.product_id, product_name: this.product_name, group_id: this.group_id, order_number: this.order_number, destination_city: this.destination_city, date_start: this.date_start, date_end: this.date_end, group_code: this.group_code, page: this.page }
    localStorage.setItem('storeOrderSearch', JSON.stringify(this.setQuery));

    this.getStoreOrderGroup();
  }


  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getStoreOrderGroup();
  }


  search() {
    this.product_id = this.searchForm.value.product_id;
    this.product_name = this.searchForm.value.product_name;
    this.group_id = this.searchForm.value.group_id;
    this.order_number = this.searchForm.value.order_number;
    this.destination_city = this.idRegion;
    this.date_start = this.dateArray[0];
    this.date_end = this.dateArray[1];
    this.group_code = this.searchForm.value.group_code;
    this.page = 1;
    console.log('object :>> ', this.searchForm.value.date_starts);

    // 筛选条件存进cookie
    this.setQuery = { product_id: this.product_id, product_name: this.product_name, group_id: this.group_id, order_number: this.order_number, destination_city: this.destination_city, date_start: this.date_start, date_end: this.date_end, group_code: this.group_code, page: this.page }
    localStorage.setItem('storeOrderSearch', JSON.stringify(this.setQuery));


    this.storeOrderService.getStoreOrderGroup(this.page, this.per_page, this.product_id, this.product_name, this.group_id, this.order_number, this.destination_city, this.date_start, this.date_end, this.group_code).subscribe(res => {
      console.log("结果是", res)
      this.dataSource = res?.data;
      this.total = res.meta?.pagination?.total;
    })


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
  onChanges(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.idRegion = data[data.length - 1];
    }
  }



  edit(data: any) {
    this.router.navigate(['/store/main/storeOrderGroup/detail'], { queryParams: { detailId: data.group_id } });
  }

  // 重置
  reset() {
    this.searchForm.patchValue({
      product_id: '',
      product_name: '',
      group_id: '',
      order_number: '',
      date_starts: '',
      destination_city: '',
      group_code: '',
    })
  }
}

