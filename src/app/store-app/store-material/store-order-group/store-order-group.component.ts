import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreRegionService } from '../../../../services/store/store-region/store-region.service';
import { StoreOrderService } from '../../../../services/store/store-order/store-order.service';
import { differenceInCalendarDays, format } from 'date-fns';
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


  dateArray: any[] =[];
  // 城市
  nzOptions: any[] | null = null;
  idRegion: any;


  constructor(public fb: FormBuilder, public router: Router, public storeOrderService: StoreOrderService,
    public storeRegionService: StoreRegionService,) {
    this.searchForm = fb.group({
      product_id: [''],
      product_name: [''],
      group_id: [''],
      order_number: [''],
      date_start: [''],
      destination_city: ['']
    });
  }

  ngOnInit(): void {
    // 城市
    this.storeRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      this.storeOrderService.getStoreOrderGroup(this.page, this.per_page, this.product_id, this.product_name, this.group_id, this.order_number, this.destination_city, this.date_start, this.date_end).subscribe(res => {
        console.log("结果是", res)
        this.dataSource = res?.data;
        this.total = res.meta?.pagination?.total;
        this.loading = false;
      })
    })

  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;

  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
  }


  search() {
    this.product_id = this.searchForm.value.product_id;
    this.product_name = this.searchForm.value.product_name;
    this.group_id = this.searchForm.value.group_id;
    this.order_number = this.searchForm.value.order_number;
    this.destination_city = this.idRegion;
    this.date_start = this.dateArray[0];
    this.date_end = this.dateArray[1];
    this.storeOrderService.getStoreOrderGroup(this.page, this.per_page, this.product_id, this.product_name, this.group_id, this.order_number, this.destination_city, this.date_start, this.date_end).subscribe(res => {
      console.log("结果是", res)
      this.dataSource = res?.data;
      this.total = res.meta?.pagination?.total;
    })


  }


  onChangeDate(event: any) {
    const datePipe = new DatePipe('en-US');
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
    this.router.navigate(['/store/main/storeOrderGroup/detail'],{ queryParams: { detailId: data.id } });
  }

}

