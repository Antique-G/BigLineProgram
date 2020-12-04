import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ProductTagModel} from '../../../../interfaces/adminProduct/ProductTagModel';
import {AdminProductTagCreateComponent} from './admin-product-tag-create/admin-product-tag-create.component';
import { AdminProductTagService } from '../../../../services/admin/admin-product-tag.service';


@Component({
  selector: 'app-admin-product-tag',
  templateUrl: './admin-product-tag.component.html',
  styleUrls: ['./admin-product-tag.component.css']
})
export class AdminProductTagComponent implements OnInit {

  nameForm: FormGroup;
  dataSource = []

  loading = true;
  page = 1;
  per_page = 10;
  total = 1;
  keyword =''


  constructor(public fb: FormBuilder,public dialog:MatDialog,public adminProductTagService:AdminProductTagService) { 
    this.nameForm = this.fb.group({
      storeId: new FormControl(' ')
    });
  }
  

  ngOnInit(): void {
    this.getProductTagList()
  }

  getProductTagList(){
    this.adminProductTagService.getProductTagList().subscribe(res => {
      this.loading = false;
      console.log(res);
      this.total = res.data?.length||0;   //总页数
      this.dataSource = res.data||[];
    })
  }

  changePageSize(per_page:number){
    this.per_page = per_page;
    this.getProductTagList();
  }

  changePageIndex(page:number){
    console.log("当前页",page);
    this.page = page;
    this.getProductTagList();
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


