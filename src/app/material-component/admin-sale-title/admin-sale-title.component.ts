import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminSaleTitleService } from '../../../services/admin/admin-sale-title.service';
import { AdminSaleTitleCreateComponent } from './admin-sale-title-create/admin-sale-title-create.component';
import { AdminSaleTitleDetailComponent } from './admin-sale-title-detail/admin-sale-title-detail.component';
import { AdminSaleTitleStatusComponent } from './admin-sale-title-status/admin-sale-title-status.component';

@Component({
  selector: 'app-admin-sale-title',
  templateUrl: './admin-sale-title.component.html',
  styleUrls: ['./admin-sale-title.component.css']
})
export class AdminSaleTitleComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];   //1.4接收数据的参数
  page = 1;  //页数，默认设置为1
  per_page = 10;  //每页显示数据数量，默认设置为10
  total = 1;     //总页数，默认设置为1
  loading = true;   //loading动画
  keyword: any;
  status: any;

  setStatusModel:any

  constructor(public fb: FormBuilder,public adminSaleTitleService:AdminSaleTitleService,public dialog:MatDialog) { 
    this.searchForm = fb.group({
      status: [''],
      name:['']
    })
    this.setStatusModel={
      status:0,
   
    }
  }

  ngOnInit(): void {
    this.getData();
  };

  //销售头衔列表
  getData(): void {
    this.loading = true ;
    this.adminSaleTitleService.saleTitleList(this.page, this.per_page, this.keyword, this.status).subscribe((result:any) => {
      console.log('列表接口返回数据', result);
      this.loading = false;
      this.total = result.total;
      this.dataSource = result.data;
    })
  }
  changePageIndex(page: number) {
    console.log("当前页",page)
    this.page = page;
    this.getData();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getData();
  }
  search(){
    this.keyword =  this.searchForm.value.name;
    this.status = this.searchForm.value.status;
    this.getData();
    console.log('搜索输入条件',this.keyword);
    
  }

  add(){
    const dialogRef =  this.dialog.open(AdminSaleTitleCreateComponent,{
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.getData();
      }
    });
  }

  edit(element:any){
    console.log("点编辑获取到的当前id详情",element);
    const dialogRef = this.dialog.open(AdminSaleTitleDetailComponent,{
      width: '550px',
      data:element
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.getData();
      }
    });
    
  }

  //状态编辑
  editStatus(element:any){
    const dialogRef =  this.dialog.open(AdminSaleTitleStatusComponent,{
      width: '550px',
      data:element
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.getData();
      }
    });
  }
}
