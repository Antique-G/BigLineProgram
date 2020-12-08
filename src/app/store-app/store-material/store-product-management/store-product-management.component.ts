import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductManagementCreateComponent } from './store-product-management-create/store-product-management-create.component';
import {StoreProductService} from '../../../../services/store/store-product/store-product.service';

@Component({
  selector: 'app-store-product-management',
  templateUrl: './store-product-management.component.html',
  styleUrls: ['./store-product-management.component.css']
})

export class StoreProductManagementComponent implements OnInit {
  // nameForm: FormGroup;
  dataSource =[];   //1.4将数据添加到dataSource

  loading = true;
  page = 1;
  per_page = 10;
  total = 1;
  keyword =''



  constructor(public fb: FormBuilder,public dialog:MatDialog,public storeProductService:StoreProductService) {
    // this.nameForm = this.fb.group({
    //   storeId: new FormControl(' ')
    // });
  }

 
  ngOnInit(): void {
    this.getProductList();
  }

 
  getProductList(){
    this.loading = true;
    this.storeProductService.getProduct(this.page, this.per_page,this.keyword).subscribe(res => {
      this.loading = false;
      console.log(res);
      this.total = res.meta.pagination.total;   //总页数
      this.dataSource = res.data;
    })
  }


  changePageSize(per_page:number){
    this.per_page = per_page;
    this.getProductList();
  }

  changePageIndex(page:number){
    console.log("当前页",page);
    this.page = page;
    this.getProductList();
  }

  

  addProduct(){
    const dialogRef = this.dialog.open(StoreProductManagementCreateComponent,{
      width:'800px'
    })
    dialogRef.afterClosed().subscribe(result=>{
      console.log('result',result);
    })
  }

  edit(index: any){
    console.log("编辑",index);
    const dialogRef = this.dialog.open(StoreProductManagementCreateComponent,{
      width:'800px',
      data: index
    })
    dialogRef.afterClosed().subscribe(result=>{
      console.log('result',result);
    })
    
  }

}
