import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminStoreService } from '../../../services/admin/admin-store.service';
import { AdminStoreListRequestModel, Datum } from '../../../interfaces/adminStore/admin-store-model';
import { AdminStoreCreateComponent } from './admin-store-create/admin-store-create.component';
import { AdminStoreDetailComponent } from './admin-store-detail/admin-store-detail.component';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-admin-store',
  templateUrl: './admin-store.component.html',
  styleUrls: ['./admin-store.component.css']
})
export class AdminStoreComponent implements OnInit {
  adminStoreListRequestModel: AdminStoreListRequestModel;
  datum: Datum[] = [];

  displayedColumns: string[] = ['storeId', 'name', 'regionCode', 'address', 'contact', 'mobile', 'phone', 'fax', 'status', 'action'];
  dataSource = new MatTableDataSource<Datum>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  constructor(public dialog: MatDialog, public adminStoreService: AdminStoreService) {
    this.adminStoreListRequestModel = {
      page: 1,
      per_page: 10,
      keyword: ''
    }
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.storeList();
  }



  storeList() {
    this.adminStoreService.storeList(this.adminStoreListRequestModel).subscribe(res => {
      console.log("1111", res);  //结果；
      this.dataSource.data = res.data;
      console.log("表格的数据", this.dataSource);
      this.resultsLength = res.total;  //总数
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(res.data);
      console.log("this.paginator.page", this.paginator.pageIndex)
      merge(this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            this.adminStoreListRequestModel.page = this.paginator.pageIndex + 1;
            return this.adminStoreService.storeList(this.adminStoreListRequestModel)
          }),
          map(data => {
            console.log("data", data)
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


      this.dataSource.filterPredicate = (data: Datum, filter: string) => {
        return data.name == filter;
      };

    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


  add() {
    const dialogRef = this.dialog.open(AdminStoreCreateComponent, {
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.storeList();
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
        this.storeList();
      }

    });
  }

}




