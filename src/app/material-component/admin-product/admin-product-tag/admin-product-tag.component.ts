import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import {ProductTagModel} from '../../../../interfaces/adminProduct/ProductTagModel';
import {AdminProductTagCreateComponent} from './admin-product-tag-create/admin-product-tag-create.component';

const ELEMENT_DATA: ProductTagModel[] = [
  { id: 1, name: '020',cate_id:0, status: 1,updatedAt:''}
];

@Component({
  selector: 'app-admin-product-tag',
  templateUrl: './admin-product-tag.component.html',
  styleUrls: ['./admin-product-tag.component.css']
})
export class AdminProductTagComponent implements OnInit {

  nameForm: FormGroup;
  displayedColumns:string[] =['id','name','cate_id','status','updatedAt','action'];
  dataSource = new MatTableDataSource<ProductTagModel>(ELEMENT_DATA);   //1.4将数据添加到dataSource

  constructor(public fb: FormBuilder,public dialog:MatDialog) { 
    this.nameForm = this.fb.group({
      storeId: new FormControl(' ')
    });
  }
  

  ngOnInit(): void {
  }

  
  edit(ele:any){
    console.log(ele);
    const dialogRef = this.dialog.open(AdminProductTagCreateComponent,{
      width:'800px',
      data: ele
    })
    dialogRef.afterClosed().subscribe(result=>{
      console.log('result',result);
    })
    
  }

  addTap(){
    const dialogRef = this.dialog.open(AdminProductTagCreateComponent,{
      width:'500px'
    })
    dialogRef.afterClosed().subscribe(result=>{
      console.log('result',result);
    })
  }
}


