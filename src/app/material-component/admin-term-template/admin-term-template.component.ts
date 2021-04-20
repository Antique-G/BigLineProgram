import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminTermTemplateService } from '../../../services/admin/admin-term-template.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdminTermTemplateCreateComponent } from './admin-term-template-create/admin-term-template-create.component';
import { AdminTermTemplateEditComponent } from './admin-term-template-edit/admin-term-template-edit.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-term-template',
  templateUrl: './admin-term-template.component.html',
  styleUrls: ['./admin-term-template.component.css']
})
export class AdminTermTemplateComponent implements OnInit {
  searchForm!: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  title: any;
  total = 1;
  loading = true;
  templateList: any[] = [];
  confirmModal?: NzModalRef; // g-zorro model 提示框
  isStatus: any;

  setStatusModel: any;


  constructor(public dialog: MatDialog, public adminTermTemplateService: AdminTermTemplateService,private router: Router,
    public fb: FormBuilder, private modal: NzModalService) {
    this.setStatusModel = {
      id: 0,
      status: 0
    }
    this.searchForm = this.fb.group({
      title: [''],
    })
  }


  ngOnInit(): void {
    this.adminTemplateList();
  }


  adminTemplateList(): void {
    this.loading = true;
    this.adminTermTemplateService.adminTermTemplateList(this.page, this.per_page, this.title).subscribe((result: any) => {
      console.log("jieguyo", result)
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.adminTemplateList();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.adminTemplateList();
  }


  search() {
    this.title = this.searchForm.value.title;
    this.adminTemplateList();
  }




  // 上下架操作
  up(data: any) {
    console.log("nadao", data);
    this.setStatusModel.id = data.id;
    if (data.status === 1) {
      this.setStatusModel.status = 0;
    }
    else if (data.status === 0) {
      this.setStatusModel.status = 1;
    }
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>请确认操作</h6>',
      nzOnOk: () =>
        this.adminTermTemplateService.templateSetStatus(this.setStatusModel).subscribe(res => {
          this.adminTemplateList();
        })
    });
  }


  delete(data: any) {
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>是否删除</h6>',
      nzOnOk: () =>
        this.adminTermTemplateService.deleteTemplate(data.id).subscribe(res => {
          this.adminTemplateList();
        })
    });
  }

  add() {
    this.router.navigate(['/admin/main/termTemplate/create']);
    // const dialogRef = this.dialog.open(AdminTermTemplateCreateComponent, {
    //   width: '550px',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("result", result);
    //   if (result !== undefined) {
    //     this.adminTemplateList();
    //   }

    // });
  }

  edit(data: any) {
    this.router.navigate(['/admin/main/termTemplate/detail'], { queryParams: { detailId: data.id } });
    // console.log("拿到的值", data);
    // const dialogRef = this.dialog.open(AdminTermTemplateEditComponent, {
    //   width: '550px',
    //   data: data
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.adminTemplateList();
    // });
  }

  // 重置
  reset() {
    this.searchForm.patchValue({
      title: '',
    })
  }
}






