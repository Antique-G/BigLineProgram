import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminWechatPageconfigService } from '../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';

@Component({
  selector: 'app-admin-wechat-pageconfig',
  templateUrl: './admin-wechat-pageconfig.component.html',
  styleUrls: ['./admin-wechat-pageconfig.component.css']
})
export class AdminWechatPageconfigComponent implements OnInit {
  searchForm!: FormGroup;
  dataSource :any[]=[];
  page = 1;
  per_page = 10;
  total = 1;
  page_name: any;
  page_key: any;
  loading = false;
  status = '0';
  dataList: any[] = [];
  isValue: any;



  constructor(public dialog: MatDialog, public fb: FormBuilder, public adminWechatPageconfigService: AdminWechatPageconfigService) {
    this.searchForm = this.fb.group({
      status: [''],
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    // 可配置的页面
    this.adminWechatPageconfigService.pageList().subscribe(res => {
      console.log("结果是", res.data);
      this.dataList = res.data;
      console.log("结果是this.dataList", this.dataList);
    })
  }

  pageConfigList() {
    this.adminWechatPageconfigService.pageConfigList(this.page, this.per_page, this.status, this.page_name, this.page_key).subscribe(res => {
      console.log("结果是", res);
      this.loading = false;
      this.total = res.total;   //总页数
      this.dataSource = res?.data;
    })
  }

  search() {
    this.status = this.searchForm.value.status;
    this.pageConfigList();
  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.search();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.search();
  }


  edit(data: any) { }


  changeList(event: any) {
    console.log("event", event);
    this.page_name = event.page_name;
    this.page_key = event.page_key;
    this.isValue = this.page_key;
  }

  add(){
    
  }

}
