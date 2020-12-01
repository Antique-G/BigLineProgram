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
  adminStoreBankAccountListRequestModel: AdminStoreBankAccountListRequestModel;

  displayedColumns: string[] = ['storeId', 'bankName', 'bankAccount', 'isCorporate', 'contacts', 'contactsPhone', 'action'];
  dataSource = new MatTableDataSource();


  constructor(public fb: FormBuilder, public dialog: MatDialog, public adminStoreBankAccountService: AdminStoreBankAccountService) {
    this.nameForm = fb.group({
      storeId: ['', [Validators.required]]
    });
    this.adminStoreBankAccountListRequestModel = {
      store_id: ''
    }
  }

  ngOnInit(): void {
  }

  setValue() {
    this.adminStoreBankAccountListRequestModel.store_id = this.nameForm.value.storeId;
  }


  search() {
    this.setValue();
    console.log("请求参数", this.adminStoreBankAccountListRequestModel);
    this.adminStoreBankAccountService.storeBankList(this.adminStoreBankAccountListRequestModel).subscribe(res => {
      console.log("结果", res);
      if (res.data) {
        if (res.data != []) {
          this.dataSource.data = res.data;
        }
        else{
          alert("该商户无银行账号");
        }
      }
    })
  }


  add() {
    const dialogRef = this.dialog.open(AdminStoreBankAccountCreateComponent, {
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if(this.dataSource.data!=[]){
          this.search();
        }
      }
    });
  }


  edit(element:any): void {
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




