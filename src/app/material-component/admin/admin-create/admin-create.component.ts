import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminAdminService } from '../../../../services/admin/admin-admin.service';
import { RegisterRequestModel } from '../../../../interfaces/adminAdmin/admin-admin-model';


@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  addForm!: FormGroup;
  statusValue = '0';
  registerRequestModel: RegisterRequestModel;



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminCreateComponent>,
    public adminAdminService: AdminAdminService,) {
    this.addForm = this.fb.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    this.registerRequestModel = {
      account: '',
      password: '',
      password_confirmation: '',
      real_name: '',
      mobile: '',
      status: '',
    }
  }


  //  密码校验
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.addForm.controls.checkPassword.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.addForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };



  ngOnInit(): void {

  }

  setValue() {
    this.registerRequestModel.account = this.addForm.value.account;
    this.registerRequestModel.password = this.addForm.value.password;
    this.registerRequestModel.password_confirmation = this.addForm.value.checkPassword;
    this.registerRequestModel.real_name = this.addForm.value.name;
    this.registerRequestModel.mobile = this.addForm.value.phoneNumber
    this.registerRequestModel.status = this.addForm.value.status;
  }


  add() {
    this.setValue();
    console.log("提交的model是什么", this.registerRequestModel);
    this.adminAdminService.register(this.registerRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res === null) {
        alert("创建成功");
        this.dialogRef.close(1);
      }
      else{
        alert("创建失败，请重新填写")
      }
    })
  }


  close(): void {
    this.dialogRef.close();
  }


}
