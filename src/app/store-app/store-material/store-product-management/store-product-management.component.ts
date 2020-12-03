import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductManagementCreateComponent } from './store-product-management-create/store-product-management-create.component';
import {StoreProductService} from '../../../../services/store/store-product/store-product.service';
import { ProductModelRequestModel, Datum } from '../../../../interfaces/store/storeProduct/ProductModel';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
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
  isLoadingResults = true;
  isRateLimitReached = false;


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
      page: 1,
      per_page: 1,
      keyword: ''
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
    console.log('12312312',this.productModelRequestModel);
    this.storeProductService.getProduct(this.productModelRequestModel).subscribe(res => {
      console.log("1111", res);
      this.dataSource.data = res.data;
      console.log("表格的数据", this.dataSource)
      this.resultsLength = res.meta.pagination.total;  //总数
    
      this.dataSource.paginator=this.paginator;
      this.dataSource = new MatTableDataSource(res.data);
      merge(this.paginator.page)
      .pipe(
          startWith({}),
          switchMap(() => {
          this.isLoadingResults = true;
          this.productModelRequestModel.page=this.paginator.pageIndex + 1;
          return this.storeProductService.getProduct(this.productModelRequestModel)
          }),
          map(data => {
            console.log("data",data)
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          return data;
          }),
          catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return [];
          })
      ).subscribe(data => this.dataSource.data = data.data);
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
