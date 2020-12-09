import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminProductManagementDetailComponent } from './admin-product-management-detail/admin-product-management-detail.component';

@Component({
  selector: 'app-admin-product-management',
  templateUrl: './admin-product-management.component.html',
  styleUrls: ['./admin-product-management.component.css']
})
export class AdminProductManagementComponent implements OnInit {
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;


  constructor(public fb: FormBuilder, public dialog: MatDialog, public adminProductManagementService: AdminProductManagementService) {

  }


  ngOnInit(): void {
    this.getProductList();
  }


  getProductList() {
    this.loading = true;
    this.adminProductManagementService.productList(this.page, this.per_page).subscribe(res => {
      console.log("结果是", res)
      this.loading = false;
      this.total = res.meta.pagination.total;   //总页数
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



  edit(data: any) {
    console.log("编辑",data);
    const dialogRef = this.dialog.open(AdminProductManagementDetailComponent,{
      width:'800px',
      data: data
    })
    dialogRef.afterClosed().subscribe(result=>{
      console.log('result',result);
    })

  }


  change(){}

}
