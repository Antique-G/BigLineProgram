import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminPermissionService } from '../../../services/admin/admin-permission.service';

@Component({
  selector: 'app-admin-permission',
  templateUrl: './admin-permission.component.html',
  styleUrls: ['./admin-permission.component.css']
})
export class AdminPermissionComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  key_word: any;
  loading = true;

  constructor(public fb: FormBuilder, public adminPermissionService:AdminPermissionService) { 
    this.searchForm = fb.group({
      name: [""],
    });
  }

  ngOnInit(): void {
    this.getDataList();
  }

    //保险列表
  getDataList(): void {
    this.loading = true;
    this.adminPermissionService.permissionList(this.page, this.per_page, this.key_word).subscribe((result: any) => {
        console.log("保险列表接口返回什么", result);
        this.loading = false;
        this.total = result.total;
        this.dataSource = result.data;
      });
  }

  changePageIndex(page: number) {
    console.log("page", page);
    this.page = page;
    this.getDataList();
  }

  changePageSize(per_page: number) {
    console.log("per_page", per_page);
    this.per_page = per_page;
    this.getDataList();
  }
  
  search() {
    this.key_word = this.searchForm.value.name;
    this.getDataList();
    console.log("value", this.searchForm.value);
  }

}
