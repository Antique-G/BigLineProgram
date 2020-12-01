import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { StoreBankAccountRequestModel } from '../../../../interfaces/adminStoreBankAccount/admin-store-bank-account-model';
import { AdminStoreBankAccountService } from '../../../../services/admin/admin-store-bank-account.service';


@Component({
  selector: 'app-admin-store-bank-account-create',
  templateUrl: './admin-store-bank-account-create.component.html',
  styleUrls: ['./admin-store-bank-account-create.component.css']
})
export class AdminStoreBankAccountCreateComponent implements OnInit {
  addForm!: FormGroup;
  statusValue = 0;

  storeBankAccountRequestModel: StoreBankAccountRequestModel;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreBankAccountCreateComponent>,
    public adminStoreBankAccountService: AdminStoreBankAccountService,) {
    this.addForm = this.fb.group({
      storeId: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankAccount: ['', [Validators.required]],
      accountAddress: ['', [Validators.required]],
      isCorporate: ['', [Validators.required]],
      contacts: ['', [Validators.required]],
      contactsPhone: ['', [Validators.required]]
    });
    this.storeBankAccountRequestModel = {
      store_id: '',
      bank_name: '',
      bank_account: '',
      account_address: '',
      is_corporate: 0,
      contacts: '',
      contacts_phone: '',
    }
  }

  ngOnInit(): void {

  }

  setValue() {
    this.storeBankAccountRequestModel.store_id = this.addForm.value.storeId;
    this.storeBankAccountRequestModel.bank_name = this.addForm.value.bankName;
    this.storeBankAccountRequestModel.bank_account = this.addForm.value.bankAccount;
    this.storeBankAccountRequestModel.account_address = this.addForm.value.accountAddress;
    this.storeBankAccountRequestModel.is_corporate = this.addForm.value.isCorporate;
    this.storeBankAccountRequestModel.contacts = this.addForm.value.contacts;
    this.storeBankAccountRequestModel.contacts_phone = this.addForm.value.contactsPhone;
  }


  add() {
    this.setValue();
    console.log("提交的model是什么", this.storeBankAccountRequestModel);
    this.adminStoreBankAccountService.addStoreBankAccount(this.storeBankAccountRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res.code) {
        alert("创建失败，请重新填写");
      }
      else{
        alert("创建成功");
        this.dialogRef.close(1);
      }
    })
  }


  close(): void {
    this.dialogRef.close();
  }


}
