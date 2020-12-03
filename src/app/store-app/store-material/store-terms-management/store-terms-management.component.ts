import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreTermsManagementService } from '../../../../services/store/store-terms-management/store-terms-management.service';
import { StoreTermsManagementCreateComponent } from './store-terms-management-create/store-terms-management-create.component';
import { StoreTermsManagementDetailComponent } from './store-terms-management-detail/store-terms-management-detail.component';


@Component({
  selector: 'app-store-terms-management',
  templateUrl: './store-terms-management.component.html',
  styleUrls: ['./store-terms-management.component.css']
})
export class StoreTermsManagementComponent implements OnInit {
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;

  constructor(public storeTermsManagementService: StoreTermsManagementService, public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.storeTermsList();
  }


  storeTermsList(): void {
    this.loading = true;
    this.storeTermsManagementService.storeTermsList(this.page, this.per_page).subscribe((result: any) => {
      console.log("jieguyo", result)
      this.loading = false;
      this.total = result.meta.pagination.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.storeTermsList();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.storeTermsList();
  }


  edit(element: any): void {
    console.log("拿到的值", element);
    this.storeTermsManagementService.storeTermsDetail(element.id).subscribe(res=>{
      if(res.data){
        const dialogRef = this.dialog.open(StoreTermsManagementDetailComponent, {
          width: '550px',
          data: res.data
        });
        dialogRef.afterClosed().subscribe(result => {
          // console.log("result", result);
          if (result !== undefined) {
            this.storeTermsList();
          }
        });
      }
      else{
        alert("查看详情失败")
      }
    })

  }

  add() {
    const dialogRef = this.dialog.open(StoreTermsManagementCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.storeTermsList();
      }

    });
  }



  delete(data: any) {
    console.log("nadao", data);
    this.storeTermsManagementService.deleteStoreTerms(data.id).subscribe(res=>{
      console.log("res",res);
      if (res === null) {
        alert("删除成功");
        this.storeTermsList(); 
      }
      else {
        alert("删除失败");
      }
    })
  }
}




