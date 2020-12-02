import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductManagementCreateComponent } from './store-product-management-create/store-product-management-create.component';
import {StoreProductService} from '../../../../services/store/store-product/store-product.service';
import { ProductModelRequestModel, Datum } from '../../../../interfaces/store/storeProduct/ProductModel';

export interface PeriodicElement {
  id: number;
  title: string;
  fewDays: number;
  fewNights: number;
  adultPrice: number;
  childPrice: number;
  status: number;
  updatedAt:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, title: '020', fewDays: 3, fewNights: 2, adultPrice: 225, childPrice: 337, status: 1,updatedAt:"2020-11-27T02:40:06.000000Z"},

];

@Component({
  selector: 'app-store-product-management',
  templateUrl: './store-product-management.component.html',
  styleUrls: ['./store-product-management.component.css']
})
export class StoreProductManagementComponent implements OnInit {
  nameForm: FormGroup;
  resultsLength = 0; //总数
  productModelRequestModel:ProductModelRequestModel
  datum: Datum[] = [];
  displayedColumns:string[] = ['id','title','few_days','few_nights','adult_price','child_price', 'status','updated_at','action'];   //1.3每个列需要渲染的行内容
  dataSource = new MatTableDataSource<Datum>();   //1.4将数据添加到dataSource


  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(public fb: FormBuilder,public dialog:MatDialog,public storeProductService:StoreProductService) {
  
    this.nameForm = this.fb.group({
      storeId: new FormControl(' ')
    });
   
    this.productModelRequestModel = {
      // page: '',
      // status?: 1,
      // keyword: ''
    }
  }


 
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.getProductList()
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
 
  getProductList(){
    this.storeProductService.getProduct(this.productModelRequestModel).subscribe(res => {
      console.log("1111", res);
      this.dataSource.data = res.data;
      console.log("表格的数据", this.dataSource)
      this.resultsLength = res.total;  //总数
      this.dataSource.paginator=this.paginator;
      this.dataSource = new MatTableDataSource(res.data);
      // this.dataSource.paginator = res.total;
      //   this.dataSource = new MatTableDataSource(res.data);
      //   // this.resultsLength
      //    this.dataSource.filterPredicate = (data: Datum, filter: string) => {
      //   return data.real_name == filter;
      //  };
    })
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
