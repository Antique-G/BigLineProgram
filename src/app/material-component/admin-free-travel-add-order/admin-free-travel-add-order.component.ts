import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../services/admin/admin-product-free-travel.service';

@Component({
  selector: 'app-admin-free-travel-add-order',
  templateUrl: './admin-free-travel-add-order.component.html',
  styleUrls: ['./admin-free-travel-add-order.component.css']
})
export class AdminFreeTravelAddOrderComponent implements OnInit {
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  searchForm!: FormGroup;
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;
  title: any;
  few_days: any;

  constructor(public fb: FormBuilder,  public adminProductFreeTravelService: AdminProductFreeTravelService,
    public router: Router, ) {
    this.searchForm = this.fb.group({
      title: [''],
      few_days: [''],
    })
   }

  ngOnInit(): void {
    this.getFeeTravelList();
  }



  getFeeTravelList() {
    this.loading = true;
    this.adminProductFreeTravelService.freeTravelList(this.page, this.per_page, 1, 2, this.title, '', '', this.few_days, '').subscribe(res => {
      console.log("结果是", res)
      this.loading = false;
      this.total = res.total;   //总页数
      this.dataSource = res.data;
    })
  }


  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getFeeTravelList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getFeeTravelList();
  }

  search() {
    this.title = this.searchForm.value.title;
    this.few_days = this.searchForm.value.few_days;
    this.getFeeTravelList();

  }



  anOrder(data: any) {
    localStorage.setItem('freeOrderData', JSON.stringify(data))
    this.router.navigate(['/admin/main/addFreeOrder/add'])
  }
}
