import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminStoreBankAccountListRequestModel } from '../../../interfaces/adminStoreBankAccount/admin-store-bank-account-model';
import { AdminStoreBankAccountService } from '../../../services/admin/admin-store-bank-account.service';
import { AdminStoreBankAccountCreateComponent } from './admin-store-bank-account-create/admin-store-bank-account-create.component';
import { AdminStoreBankAccountDetailComponent } from './admin-store-bank-account-detail/admin-store-bank-account-detail.component';


@Component({
  selector: 'app-admin-store-bank-account',
  templateUrl: './admin-store-bank-account.component.html',
  styleUrls: ['./admin-store-bank-account.component.css']
})
export class AdminStoreBankAccountComponent implements OnInit {
  nameForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = false;
  store_id: any;

  constructor(public fb: FormBuilder, public dialog: MatDialog, public adminStoreBankAccountService: AdminStoreBankAccountService) {
    this.nameForm = fb.group({
      storeId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  search(): void {
    this.loading = true;
    this.store_id = this.nameForm.value.storeId;
    console.log("this.store_id",this.store_id);
    this.adminStoreBankAccountService.storeBankList(this.store_id, this.page, this.per_page).subscribe((result: any) => {
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.search();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.search();
  }


  add() {
    const dialogRef = this.dialog.open(AdminStoreBankAccountCreateComponent, {
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource != []) {
          this.search();
        }
      }
    });
  }


  edit(element: any): void {
    const dialogRef = this.dialog.open(AdminStoreBankAccountDetailComponent, {
      width: '550px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.search();
      }
    });
  }


}




