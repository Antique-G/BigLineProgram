import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAdminListRequestModel, AdminAdminListResponseModel, Datum } from '../../../interfaces/adminAdmin/admin-admin-model';
import { AdminLoginService } from '../../../services/admin-login/admin-login.service';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit, AfterViewInit {

  adminAdminListRequestModel: AdminAdminListRequestModel;
  // adminAdminListResponseModel: AdminAdminListResponseModel;
  datum: Datum[]=[];


  displayedColumns: string[] = ['name', 'account', 'tel', 'status', 'action'];
  dataSource = new MatTableDataSource<Datum>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  constructor(public adminLoginService: AdminLoginService, public dialog: MatDialog) {
   
    this.adminAdminListRequestModel = {
      // page: '',
      // status?: 1,
      // keyword: ''
    }
  }


  ngOnInit(): void {
    this.adminLoginService.adminList(this.adminAdminListRequestModel).subscribe(res => {
      console.log("1111", res);
      this.dataSource.data = res.data;
      console.log("表格的数据",this.dataSource)
      // this.dataSource.paginator = res.total;

    })
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
}


  edit(index: any): void {
    const dialogRef = this.dialog.open(AdminDetailComponent, {
      width: '550px',
      data: index
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  add() {

  }
}




