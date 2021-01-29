import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword: any;
  status: any;


  constructor(public fb: FormBuilder, public router: Router) {
    this.searchForm = fb.group({
      status: [''],
      name: ['']
    });
  }

  ngOnInit(): void {
  }


  edit(data: any) {

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
    this.keyword = this.searchForm.value.name;
    this.status = this.searchForm.value.status;
    this.router.navigate(['/admin/main/orderList/detail']);


  }

  add() { }

}
