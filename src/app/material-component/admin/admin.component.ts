import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAdminService } from '../../../services/admin/admin-admin.service';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword: any;
  status: any;

  constructor(public fb: FormBuilder, public adminAdminService: AdminAdminService, private modal: NzModalService, public dialog: MatDialog) {
    this.searchForm = fb.group({
      status: [''],
      name: ['']
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.adminAdminService.adminList(this.page, this.per_page, this.keyword, this.status).subscribe((result: any) => {
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });
  };

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
    this.getData();
    console.log("this.keyword", this.keyword);

  }



  edit(element: any): void {
    const editmodal = this.modal.create({
      nzTitle: '修改',
      nzContent: AdminDetailComponent,
      nzWidth: 800,
      nzComponentParams: {
        data:element
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
    editmodal.afterClose.subscribe(res => {
      this.getData();
    })
  }

  add() {
    const editmodal = this.modal.create({
      nzTitle: '添加',
      nzContent: AdminCreateComponent,
      nzWidth: 800,
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.getData();
    })
  }


  // 重置
  reset(){
    this.searchForm.patchValue({
      status: '',
      name:''
    });
  }
}




