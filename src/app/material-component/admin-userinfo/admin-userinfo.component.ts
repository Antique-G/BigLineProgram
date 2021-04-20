import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SetStatusRequestModel } from '../../../interfaces/adminUserinfo/admin-userinfo-model';
import { AdminUserinfoService } from '../../../services/admin/admin-userinfo.service';
import { AdminUserinfoDetailComponent } from './admin-userinfo-detail/admin-userinfo-detail.component';

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
  setStatusRequestModel: SetStatusRequestModel;


  constructor(public fb: FormBuilder, private adminUserinfoService: AdminUserinfoService, private modal: NzModalService) {
    this.searchForm = fb.group({
      status: [""],
      name: [""],
    });
    this.setStatusRequestModel = {
      user_id: 0,
      status: 0,
    }
  }

  ngOnInit(): void {
    this.getDataList();
  }
  getDataList(): void {
    this.loading = true;
    this.adminUserinfoService.userinfoList(this.page, this.per_page, this.keyword, this.status).subscribe((result: any) => {
      console.log('接口列表返回', result);
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

  //修改状态
  up(data: any) {
    console.log('11111', data)
    this.setStatusRequestModel.user_id = data.user_id;
    if (data.status === 1) {
      this.setStatusRequestModel.status = 0;
    } else if (data.status === 0) {
      this.setStatusRequestModel.status = 1;
    }
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>请确认操作</h6>',
      nzOnOk: () => {
        this.adminUserinfoService.userinfoSetStatus(this.setStatusRequestModel).subscribe(res => {
          this.getDataList();
        })
      }
    })

  }

  edit(data: any) {
      const editmodal = this.modal.create({
        nzTitle: '修改用户信息',
        nzContent: AdminUserinfoDetailComponent,
        nzComponentParams: {
          data: data
        },
        nzFooter: [
          {
            label: '提交',
            onClick: componentInstance => {
              componentInstance?.update()
            }
          }
        ]
      })
      editmodal.afterClose.subscribe(res => {
        this.getDataList();
      })
  }


  
  // 重置
  reset() {
    this.searchForm.patchValue({
      status: '',
      name: '',
    })
  }
}
