import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-lottery',
  templateUrl: './admin-lottery.component.html',
  styleUrls: ['./admin-lottery.component.css']
})
export class AdminLotteryComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword: any;
  status: any;
  constructor(public fb: FormBuilder, ) { 
    this.searchForm = fb.group({
      status: [''],
      name: ['']
    });
  }

  ngOnInit(): void {
    this.getData()
  }
  
  getData(): void {
    this.loading = false;
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getData();
  }

  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getData();
  }


  search() {
    this.keyword = this.searchForm.value.name;
    this.status = this.searchForm.value.status;
    this.page = 1;
    this.getData();
    console.log("this.keyword", this.keyword);

  }

  edit(element: any): void {

  }

}
