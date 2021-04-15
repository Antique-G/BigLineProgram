import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminPermissionService } from '../../../services/admin/admin-permission.service';
import { AdminPermissionCreateComponent } from './admin-permission-create/admin-permission-create.component';
import { AdminPermissionDetailComponent } from './admin-permission-detail/admin-permission-detail.component';

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

  constructor(public fb: FormBuilder, public adminPermissionService:AdminPermissionService,private modal: NzModalService) { 
    this.searchForm = fb.group({
      name: [""],
    });
  }

  ngOnInit(): void {
    this.getDataList();
  }

  //权限列表
  getDataList(): void {
    this.loading = true;
    this.adminPermissionService.permissionList(this.page, this.per_page, this.key_word).subscribe((result: any) => {
        console.log("权限列表接口返回什么", result);
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
      nzTitle: "添加权限",
      nzContent: AdminPermissionCreateComponent,
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
      nzTitle: "更新权限",
      nzContent: AdminPermissionDetailComponent,
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
