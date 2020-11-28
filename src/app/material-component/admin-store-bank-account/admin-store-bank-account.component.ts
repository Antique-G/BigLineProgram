import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AdminStoreBankAccountCreateComponent } from './admin-store-bank-account-create/admin-store-bank-account-create.component';
import { AdminStoreBankAccountDetailComponent } from './admin-store-bank-account-detail/admin-store-bank-account-detail.component';


@Component({
  selector: 'app-admin-store-bank-account',
  templateUrl: './admin-store-bank-account.component.html',
  styleUrls: ['./admin-store-bank-account.component.css']
})
export class AdminStoreBankAccountComponent  implements AfterViewInit  {
  nameForm: FormGroup;

  displayedColumns: string[] = ['storeId', 'bankName', 'bankAccount', 'isCorporate','contacts', 'contactsPhone', 'action'];
  dataSource = new MatTableDataSource();



  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

// testing
  constructor(public fb: FormBuilder, public dialog: MatDialog) {
    this.nameForm = fb.group({
      storeId: new FormControl(' ')
    });
   }

   ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  add(){
    const dialogRef = this.dialog.open(AdminStoreBankAccountCreateComponent, {
      width: '550px',
      data: 1
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  edit(index: any): void  {
    const dialogRef = this.dialog.open(AdminStoreBankAccountDetailComponent, {
      width: '550px',
      data: 1
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}




