import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminProductManagementDetailComponent } from './admin-product-management-detail/admin-product-management-detail.component';
import { AdminProductManagementUpComponent } from './admin-product-management-up/admin-product-management-up.component';
import { AdminProductReviewComponent } from './admin-product-review/admin-product-review.component';

@Component({
  selector: 'app-admin-product-management',
  templateUrl: './admin-product-management.component.html',
  styleUrls: ['./admin-product-management.component.css']
})
export class AdminProductManagementComponent implements OnInit {
  searchForm!: FormGroup;
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;
  status: any;
  check_status: any;
  title: any;


  constructor(public fb: FormBuilder, public dialog: MatDialog, public adminProductManagementService: AdminProductManagementService,
    public router: Router) {
      this.searchForm = this.fb.group({
        status: ['', [Validators.required]],
        checkStatus: ['', [Validators.required]],
        title: ['', [Validators.required]],
      })
   
  }


  ngOnInit(): void {
    this.getProductList();
  }


  getProductList() {
    this.loading = true;
    this.adminProductManagementService.productList(this.page, this.per_page,this.status,this.check_status,this.title).subscribe(res => {
      console.log("结果是", res)
      this.loading = false;
      this.total = res.total;   //总页数
      this.dataSource = res.data;
    })
  }


  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getProductList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getProductList();
  }

  search(){
    this.status = this.searchForm.value.status;
    this.check_status = this.searchForm.value.checkStatus;
    this.title = this.searchForm.value.title;
    this.getProductList();

  }


   // 查看详情
   edit(data: any) {
    this.router.navigate(['/admin/main/productManagement/detail'], { queryParams: { detailDataId: data.id } });
  }


  // 审核
  review(data: any){
    console.log("编辑",data);
    const dialogRef = this.dialog.open(AdminProductReviewComponent,{
      width:'800px',
      data: data
    })
    dialogRef.afterClosed().subscribe(result=>{
      if (result !== undefined) {
        this.getProductList();
      }
    })
  }


  // 上架
  up(data: any){
    console.log("编辑",data);
    const dialogRef = this.dialog.open(AdminProductManagementUpComponent,{
      width:'800px',
      data: data
    })
    dialogRef.afterClosed().subscribe(result=>{
      if (result !== undefined) {
        this.getProductList();
      }
    })
  }

}
