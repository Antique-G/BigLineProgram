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
  statusValue = '1';
  registerRequestModel: RegisterRequestModel;


  validationMessage: any = {
    account: {
      'maxlength': '用户名长度最多为32个字符',
      'required': '请输入用户名！'
    },
    password: {
      'maxlength': '密码长度最多为16个字符',
      'required': '请输入密码！'
    },
    name: {
      'maxlength': '真实姓名长度最多为32个字符',
      'required': '请输入真实姓名！'
    },
    phoneNumber: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入您的手机号！'
    },

  };
  formErrors: any = {
    account: '',
    password: '',
    name: '',
    phoneNumber: '',
  };




  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminCreateComponent>,
    public adminAdminService: AdminAdminService) {
    this.forms();
    this.registerRequestModel = {
      account: '',
      password: '',
      password_confirmation: '',
      real_name: '',
      mobile: '',
      status: 1,
    }
  }

  forms() {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      account: ['', [Validators.required, Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.maxLength(16)]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      name: ['', [Validators.required, Validators.maxLength(32)]],
      phoneNumber: ['', [Validators.required, mobile]],
      status: ['', [Validators.required]]
    });
     // 每次表单数据发生变化的时候更新错误信息
     this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
  }

  
  // 表单验证
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.addForm) return;
    // 获取当前的表单
    const form = this.addForm;
    // 遍历错误消息对象
    for (const field in this.formErrors) {
      // 清空当前的错误消息
      this.formErrors[field] = '';
      // 获取当前表单的控件
      const control: any = form.get(field);
      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && !control.valid) {
        // 获取验证不通过的控件名，为了获取更详细的不通过信息
        const messages = this.validationMessage[field];
        // 遍历当前控件的错误对象，获取到验证不通过的属性
        for (const key in control.errors) {
          // 把所有验证不通过项的说明文字拼接成错误消息
          this.formErrors[field] = messages[key];
        }
      }
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
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      console.log("提交的model是什么", this.registerRequestModel);
      this.adminAdminService.register(this.registerRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res === null) {
          // alert("创建成功");
          this.dialogRef.close(1);
        }
        else {
          // alert("创建失败，请重新填写")
        }
      })
    }
  }


  close(): void {
    this.dialogRef.close();
  }


}




// 手机号码校验
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {

 static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
