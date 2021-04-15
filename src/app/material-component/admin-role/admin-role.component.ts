import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRoleService } from '../../../services/admin/admin-role.service';
import { AdminRoleCreateComponent } from './admin-role-create/admin-role-create.component';
import { AdminRoleDetailComponent } from './admin-role-detail/admin-role-detail.component';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  key_word: any;
  loading = true;

  constructor(public fb: FormBuilder,private modal: NzModalService, public adminRoleService:AdminRoleService) {
    this.searchForm = fb.group({
      name: [""],
    });
   }

  ngOnInit(): void {
    this.getDataList();
  }

  //角色列表
  getDataList(): void {
    this.loading = true;
    this.adminRoleService.roleList(this.page, this.per_page, this.key_word).subscribe((result: any) => {
      console.log("列表接口返回什么", result);
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

  add(){
    const addModal = this.modal.create({
      nzTitle: "添加角色",
      nzContent: AdminRoleCreateComponent,
      nzWidth:800,
      nzFooter: [
        {
          label: "添加",
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance?.submitForm();
          },
        },
      ],
    });
    addModal.afterClose.subscribe((res) => {
      this.getDataList();
    });

  }

  edit(element: any) {
    console.log("当前id", element);
    const editmodal = this.modal.create({
      nzTitle: "更新角色",
      nzContent: AdminRoleDetailComponent,
      nzWidth:800,
      nzComponentParams: {
        data: element,
      },
      nzFooter: [
        {
          label: "更新",
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance?.update();
          },
        },
      ],
    });
    editmodal.afterClose.subscribe((res) => {
      this.getDataList();
    });
  }

}
