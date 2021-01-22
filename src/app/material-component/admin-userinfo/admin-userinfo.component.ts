import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminUserinfoService } from '../../../services/admin/admin-userinfo.service';

@Component({
  selector: 'app-admin-userinfo',
  templateUrl: './admin-userinfo.component.html',
  styleUrls: ['./admin-userinfo.component.css']
})
export class AdminUserinfoComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  keyword: any;
  status: any;
  constructor(public fb:FormBuilder,private adminUserinfoService:AdminUserinfoService) {
    this.searchForm = fb.group({
      status: [""],
      name: [""],
    });
   }

  ngOnInit(): void {
    this.getDataList();
  }
  getDataList(): void {
    this.loading = true;
    this.adminUserinfoService.userinfoList(this.page,this.per_page,this.keyword,this.status).subscribe((result: any) => {
      console.log('接口列表返回',result);
      this.loading = false;
      this.total = result.total;
      this.dataSource = result.data;
    })
  }
  changePageIndex(page: number) {
    console.log("aaa", page);
    this.page = page;
    this.getDataList();
  }
  changePageSize(per_page: number) {
    console.log("bbb", per_page);
    this.per_page = per_page;
    this.getDataList();
  }
  search() {
    this.keyword = this.searchForm.value.name;
    this.status = this.searchForm.value.status;
    this.getDataList();
    console.log("value", this.searchForm.value);
  }
  add(){

  }
}
