import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminStoreService } from '../../../services/admin/admin-store.service';
import { AdminStoreCreateComponent } from './admin-store-create/admin-store-create.component';
import { AdminStoreDetailComponent } from './admin-store-detail/admin-store-detail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-admin-store',
  templateUrl: './admin-store.component.html',
  styleUrls: ['./admin-store.component.css']
})
export class AdminStoreComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword:any;

  constructor(public fb: FormBuilder,public dialog: MatDialog, public adminStoreService: AdminStoreService) {
    this.searchForm = fb.group({
      storeName: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.adminStoreService.storeList(this.page, this.per_page,this.keyword).subscribe((result: any) => {
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
      });
    };
  
  changePageIndex(page:number ) {
    console.log("当前页",page);
    this.page = page;
    this.getData();
  }
   changePageSize(per_page:number) {
    console.log("一页显示多少",per_page);
    this.per_page = per_page;
     this.getData();
  }


  search(){
    this.keyword = this.searchForm.value.storeName;
    this.getData();
    console.log("this.keyword",this.keyword);

  }



  add() {
    const dialogRef = this.dialog.open(AdminStoreCreateComponent, {
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getData();
      }

    });
  }


  edit(element: any): void {
    console.log("拿到的值", element);
    const dialogRef = this.dialog.open(AdminStoreDetailComponent, {
      width: '550px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log("result", result);
      if (result !== undefined) {
        this.getData();
      }

    });
  }

}




