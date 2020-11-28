import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterRequestModel } from '../../../../interfaces/adminAdmin/admin-admin-model';
import { AdminLoginService } from '../../../../services/admin-login/admin-login.service';


@Component({
  selector: 'app-admin-store-bank-account-detail',
  templateUrl: './admin-store-bank-account-detail.component.html',
  styleUrls: ['./admin-store-bank-account-detail.component.css']
})
export class AdminStoreBankAccountDetailComponent implements OnInit {
  addForm!: FormGroup;
  statusValue = '1';
  // registerRequestModel: RegisterRequestModel;



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreBankAccountDetailComponent>,
    public adminLoginService: AdminLoginService,) {
    this.addForm = this.fb.group({
      storeId: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankAccount: ['', [Validators.required]],
      accountAddress: ['', [Validators.required]],
      isCorporate: ['', [Validators.required]],
      contacts: ['', [Validators.required]],
      contactsPhone: ['', [Validators.required]]
    });
    // this.registerRequestModel = {
    //   account: '',
    //   password: '',
    //   password_confirmation: '',
    //   real_name: '',
    //   mobile: '',
    //   status: '',
    // }
  }




  ngOnInit(): void {

  }

  setValue() {
    // this.registerRequestModel.account = this.addForm.value.account;
    // this.registerRequestModel.password = this.addForm.value.password;
    // this.registerRequestModel.password_confirmation = this.addForm.value.checkPassword;
    // this.registerRequestModel.real_name = this.addForm.value.name;
    // this.registerRequestModel.mobile = this.addForm.value.phoneNumber
    // this.registerRequestModel.status = this.addForm.value.status;
  }


  add() {
    this.setValue();
    // console.log("提交的model是什么", this.registerRequestModel);
    // this.adminLoginService.register(this.registerRequestModel).subscribe(res => {
    //   console.log("res结果", res);
    //   if (res === null) {
    //     alert("创建成功");
    //     this.dialogRef.close(1);
    //   }
    //   else{
    //     alert("创建失败，请重新填写")
    //   }
    // })
  }


  close(): void {
    this.dialogRef.close();
  }


}

