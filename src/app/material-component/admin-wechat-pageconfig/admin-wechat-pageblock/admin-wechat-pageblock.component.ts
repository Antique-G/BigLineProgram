import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminWechatPageconfigService } from '../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { AdminWechatPageblockCreateComponent } from './admin-wechat-pageblock-create/admin-wechat-pageblock-create.component';
import { AdminWechatPageblockDetailComponent } from './admin-wechat-pageblock-detail/admin-wechat-pageblock-detail.component';

@Component({
  selector: 'app-admin-wechat-pageblock',
  templateUrl: './admin-wechat-pageblock.component.html',
  styleUrls: ['./admin-wechat-pageblock.component.css']
})
export class AdminWechatPageblockComponent implements OnInit {
  searchForm!: FormGroup;
  dataSource: any[] = [];
  page = 1;
  per_page = 10;
  total = 1;
  block_name: any;
  block_key: any;
  page_id: any;
  loading = false;
  status: any;
  dataList: any[] = [];
  isValue: any;

  constructor(public activatedRoute: ActivatedRoute, public fb: FormBuilder, private modal: NzModalService,
    public adminWechatPageconfigService: AdminWechatPageconfigService, public router: Router) {
    this.searchForm = this.fb.group({
      status: [''],
      name: [''],
      key: [''],
    })
  }



  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page_id = params.pageId;
      console.log("111", this.page_id);
      this.getBlockList();
    });
  }

  getBlockList() {
    this.adminWechatPageconfigService.pageBlockList(this.page, this.per_page, this.status, this.page_id, this.block_name, this.block_key).subscribe(res => {
      console.log("结果是", res);
      this.loading = false;
      this.total = res.total;   //总页数
      this.dataSource = res?.data;
    })
  }

  search() {
    this.status = this.searchForm.value.status;
    this.block_name = this.searchForm.value.name;
    this.block_key = this.searchForm.value.key;
    this.getBlockList();
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



  add() {
    const addmodal = this.modal.create({
      nzTitle: '添加页面模块设置',
      nzContent: AdminWechatPageblockCreateComponent,
      nzFooter: [
        {
          label: '添加',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    addmodal.afterClose.subscribe(res => {
      this.getBlockList();
    })
  }

  edit(data: any) {
    const addmodal = this.modal.create({
      nzTitle: '添加页面设置',
      nzContent: AdminWechatPageblockDetailComponent,
      nzComponentParams: {
        data: data
      },
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    addmodal.afterClose.subscribe(res => {
      this.getBlockList();
    })
  }


}
