import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAdminService } from '../../../services/admin/admin-admin.service';
import { AdminAdminListRequestModel, AdminAdminListResponseModel, Datum } from '../../../interfaces/adminAdmin/admin-admin-model';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {

  adminAdminListRequestModel: AdminAdminListRequestModel;
  // adminAdminListResponseModel: AdminAdminListResponseModel;
  datum: Datum[] = [];


  displayedColumns: string[] = ['name', 'account', 'tel', 'status', 'action'];
  dataSource = new MatTableDataSource<Datum>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  constructor(public adminAdminService: AdminAdminService, public dialog: MatDialog) {
    this.adminAdminListRequestModel = {
      page: 1,
      per_page: 10,
      keyword: ''
    }
  }


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.adminList();
  }

  adminList() {
    console.log("提交的model",this.adminAdminListRequestModel)
    this.adminAdminService.adminList(this.adminAdminListRequestModel).subscribe(res => {
      this.dataSource.data = res.data;
      console.log("表格的数据", this.dataSource);
      this.resultsLength = res.total;  //总数
      this.dataSource.paginator=this.paginator;
      this.dataSource = new MatTableDataSource(res.data);
      console.log("this.paginator.page",this.paginator.pageIndex)
      merge(this.paginator.page)
      .pipe(
          startWith({}),
          switchMap(() => {
          this.isLoadingResults = true;
          this.adminAdminListRequestModel.page=this.paginator.pageIndex + 1;
          return this.adminAdminService.adminList(this.adminAdminListRequestModel)
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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


  edit(element: any): void {
    console.log("拿到的值", element);
    const dialogRef = this.dialog.open(AdminDetailComponent, {
      width: '550px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log("result", result);
      if (result !== undefined) {
        this.adminList();
      }

    });
  }

  add() {
    const dialogRef = this.dialog.open(AdminCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.adminList();
      }

    });
  }
}




