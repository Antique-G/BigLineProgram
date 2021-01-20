import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminWechatPageconfigService } from '../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { AdminWechatPageconfigCreateComponent } from './admin-wechat-pageconfig-create/admin-wechat-pageconfig-create.component';
import { AdminWechatPageconfigDetailComponent } from './admin-wechat-pageconfig-detail/admin-wechat-pageconfig-detail.component';

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
  status: any;
  dataList: any[] = [];
  isValue: any;



  constructor(public dialog: MatDialog, public fb: FormBuilder, private modal: NzModalService,
    public adminWechatPageconfigService: AdminWechatPageconfigService,public router:Router) {
    this.searchForm = this.fb.group({
      status: [''],
      name: [''],
      key: [''],
    })
  }

  ngOnInit(): void {
    // 可配置的页面
    this.adminWechatPageconfigService.pageList().subscribe(res => {
      this.dataList = res.data;
      this.pageConfigList();
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


  changeList(event: any) {
    console.log("event", event);
    this.page_name = event.page_name;
    this.page_key = event.page_key;
    this.isValue = this.page_key;
  }


  add() {
    const addmodal = this.modal.create({
      nzTitle: '添加页面设置',
      nzContent: AdminWechatPageconfigCreateComponent,
      nzFooter: [
        {
          label: '添加',
          type:'primary',
          onClick: componentInstance => {
              componentInstance?.add()
          }
        }
      ]
    })
    addmodal.afterClose.subscribe(res => {
      this. pageConfigList();
    })
  }

  edit(data: any) {
    const addmodal = this.modal.create({
      nzTitle: '添加页面设置',
      nzContent: AdminWechatPageconfigDetailComponent,
      nzComponentParams: {
        data: data
      },
      nzFooter: [
        {
          label: '提交',
          type:'primary',
          onClick: componentInstance => {
              componentInstance?.update()
          }
        }
      ]
    })
    addmodal.afterClose.subscribe(res => {
      this. pageConfigList();
    })
   }


   redirectTo(data:any){
    this.router.navigate(['/admin/main/pageBlock'], { queryParams: { pageId: data.id } });
   }

}
