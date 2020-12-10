import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductManagementCreateComponent } from './store-product-management-create/store-product-management-create.component';
import { StoreProductService } from '../../../../services/store/store-product/store-product.service';
import { Router } from '@angular/router';
import { StoreProductManagementDetailComponent } from './store-product-management-detail/store-product-management-detail.component';

@Component({
  selector: 'app-store-product-management',
  templateUrl: './store-product-management.component.html',
  styleUrls: ['./store-product-management.component.css']
})

export class StoreProductManagementComponent implements OnInit {
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;



  constructor(public fb: FormBuilder, public dialog: MatDialog, public storeProductService: StoreProductService, public router: Router) {

  }


  ngOnInit(): void {
    this.getProductList();
  }


  getProductList() {
    this.loading = true;
    this.storeProductService.getProduct(this.page, this.per_page).subscribe(res => {
      this.loading = false;
      console.log("结果是", res);
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



  addProduct() {
    const dialogRef = this.dialog.open(StoreProductManagementCreateComponent, {
      width: '800px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        this.getProductList();
       }
    })
  }



  edit(data: any) {
    console.log("编辑", data);
    const dialogRef = this.dialog.open(StoreProductManagementDetailComponent, {
      width: '800px',
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
     if(result!=undefined){
      this.getProductList();
     }
    })

  }




  // 报价
  goToQuoteClick(data: any) {
    console.log(data);
    this.router.navigate(['/store/main/storeQuote'], { queryParams: { productId: data.id } });
  }


}
