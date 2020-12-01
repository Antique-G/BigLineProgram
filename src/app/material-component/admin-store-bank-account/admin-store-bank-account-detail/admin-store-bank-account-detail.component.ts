import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminStoreBankAccountService } from '../../../../services/admin/admin-store-bank-account.service';
import { DataDetailResponseModel, StoreBankAccountUpdateRequestModel } from '../../../../interfaces/adminStoreBankAccount/admin-store-bank-account-model';


@Component({
  selector: 'app-admin-store-bank-account-detail',
  templateUrl: './admin-store-bank-account-detail.component.html',
  styleUrls: ['./admin-store-bank-account-detail.component.css']
})
export class AdminStoreBankAccountDetailComponent implements OnInit {
  addForm!: FormGroup;
  statusValue = 0;
  storeBankAccountUpdateRequestModel: StoreBankAccountUpdateRequestModel;
  dataDetailResponseModel: DataDetailResponseModel;



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreBankAccountDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public adminStoreBankAccountService: AdminStoreBankAccountService,) {
    this.dataDetailResponseModel = this.data;
    console.log("弹窗拿到的值", this.dataDetailResponseModel);
    this.addForm = this.fb.group({
      bankName: [this.dataDetailResponseModel.bank_name, [Validators.required]],
      bankAccount: [this.dataDetailResponseModel.bank_account, [Validators.required]],
      accountAddress: [this.dataDetailResponseModel.account_address, [Validators.required]],
      isCorporate: [this.dataDetailResponseModel.is_corporate, [Validators.required]],
      contacts: [this.dataDetailResponseModel.contacts, [Validators.required]],
      contactsPhone: [this.dataDetailResponseModel.contacts_phone, [Validators.required]]
    });
    this.storeBankAccountUpdateRequestModel = {
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
    this.storeBankAccountUpdateRequestModel.bank_name = this.addForm.value.bankName;
    this.storeBankAccountUpdateRequestModel.bank_account = this.addForm.value.bankAccount;
    this.storeBankAccountUpdateRequestModel.account_address = this.addForm.value.accountAddress;
    this.storeBankAccountUpdateRequestModel.is_corporate = this.addForm.value.isCorporate;
    this.storeBankAccountUpdateRequestModel.contacts = this.addForm.value.contacts;
    this.storeBankAccountUpdateRequestModel.contacts_phone = this.addForm.value.contactsPhone;
  }


  update() {
    this.setValue();
    this.storeBankAccountUpdateRequestModel.bank_id = this.dataDetailResponseModel.bank_id;
    console.log("提交的model是什么", this.storeBankAccountUpdateRequestModel);
    this.adminStoreBankAccountService.updateStoreBank(this.storeBankAccountUpdateRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res.status_code){
        alert("更新失败");
      }
      else {
        alert("更新成功");
        this.dialogRef.close(1);
      }
    })
  }


  close(): void {
    this.dialogRef.close();
  }

}

