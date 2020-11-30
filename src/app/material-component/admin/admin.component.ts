import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAdminService } from '../../../services/admin/admin-admin.service';
import { AdminAdminListRequestModel, AdminAdminListResponseModel, Datum } from '../../../interfaces/adminAdmin/admin-admin-model';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit, AfterViewInit {

  adminAdminListRequestModel: AdminAdminListRequestModel;
  // adminAdminListResponseModel: AdminAdminListResponseModel;
  datum: Datum[] = [];


  displayedColumns: string[] = ['name', 'account', 'tel', 'status', 'action'];
  dataSource = new MatTableDataSource<Datum>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  constructor(public adminAdminService: AdminAdminService,public dialog: MatDialog) {

    this.adminAdminListRequestModel = {
      // page: '',
      // status?: 1,
      // keyword: ''
    }
  }


  ngOnInit(): void {
    this.adminList();
  }

  adminList() {
    this.adminAdminService.adminList(this.adminAdminListRequestModel).subscribe(res => {
      console.log("1111", res);  //结果；
      this.dataSource.data = res.data; 
      console.log("表格的数据", this.dataSource);
      this.resultsLength=res.total;  //总数
      // this.dataSource.paginator = res.total;
      this.dataSource = new MatTableDataSource(res.data);
   
      // this.resultsLength
       this.dataSource.filterPredicate = (data: Datum, filter: string) => {
      return data.real_name == filter;
     };

    })
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


  edit(element: any): void {
    console.log("拿到的值",element);
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




