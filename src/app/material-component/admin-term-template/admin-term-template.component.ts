import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminTermTemplateService } from '../../../services/admin/admin-term-template.service';
import { NzModalService } from 'ng-zorro-antd/modal';


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

  constructor(public dialog: MatDialog, public adminTermTemplateService: AdminTermTemplateService,
    public fb: FormBuilder, private modal: NzModalService) {
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

  edit(data: any){

  }


  // 上下架操作
  up(data: any) {
    // console.log("nadao", data);
    // this.adminProductSetStatusModel.id = data.id;
    // if (data.status === 1) {
    //   this.adminProductSetStatusModel.status = 0;
    // }
    // else if (data.status === 0) {
    //   this.adminProductSetStatusModel.status = 1;
    // }
    // this.modal.confirm({
    //   nzTitle: '<h4>提示</h4>',
    //   nzContent: '<h6>请确认操作</h6>',
    //   nzOnOk: () =>
    //     this.adminProductManagementService.productSetStatus(this.adminProductSetStatusModel).subscribe(res => {
    //       this.getProductList();
    //     })
    // });
  }


  delete(data:any){

  }


}






