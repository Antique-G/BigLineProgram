import { AdminStoreAccountService } from './../../../../services/admin/admin-store-account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { AddStoreAccountRequestModel } from '../../../../interfaces/adminStoreAccount/admin-store-account-model';
import { isNumber } from '../../../../app/util/validators';




@Component({
  selector: 'app-admin-store-account-create-aaaa',
  templateUrl: './admin-store-account-create.component.html',
  styleUrls: ['./admin-store-account-create.component.css']
})
export class AdminStoreAccountCreateComponent implements OnInit {
  validateForm!: FormGroup;  //1.1使用form表单时需要实例化一个FormGroup
  status = '1';
  addStoreAccountRequestModel: AddStoreAccountRequestModel;   //引入定义的请求参数模块

  validationMessage: any = {
    name: {
      'maxlength': '用户名长度最多为64个字符',
      'required': '请输入用户名！'
    },
    password: {
      'maxlength': '密码长度最多为16个字符',
      'required': '请输入密码！'
    },
    mobile: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入您的手机号！'
    },
  };
  formErrors: any = {
    name: '',
    password: '',
    mobile: '',
  };


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreAccountCreateComponent>, public adminStoreAccountService: AdminStoreAccountService) {
    this.forms();
    this.addStoreAccountRequestModel = {    //接口请求参数
      name: '',
      password: '',
      password_confirmation: '',
      mobile: '',
      email: '',
      level: '',
      store_id: '',
      status: 0
    }
  }

  forms() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.maxLength(16)]],
      password_confirmation: ['', [Validators.required, this.confirmValidator]],
      email: ['', [Validators.required, Validators.maxLength(32)]],
      mobile: ['', [Validators.required, isNumber]],
      level: ['', [Validators.required]],
      store_id: ['', [Validators.required]],
      status: ['', [Validators.required]],

    });
    // 每次表单数据发生变化的时候更新错误信息
    this.validateForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
  }


  // 表单验证
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.validateForm) return;
    // 获取当前的表单
    const form = this.validateForm;
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



  ngOnInit(): void {
  };

  

  setValue() {  //获取表单输入值
    this.addStoreAccountRequestModel.name = this.validateForm.value.name;
    this.addStoreAccountRequestModel.password = this.validateForm.value.password;
    this.addStoreAccountRequestModel.password_confirmation = this.validateForm.value.password_confirmation;
    this.addStoreAccountRequestModel.mobile = this.validateForm.value.mobile;
    this.addStoreAccountRequestModel.email = this.validateForm.value.email;
    this.addStoreAccountRequestModel.level = this.validateForm.value.level;
    this.addStoreAccountRequestModel.store_id = this.validateForm.value.store_id;
    this.addStoreAccountRequestModel.status = this.validateForm.value.status;
  }

  //商铺账号创建
  add() {
    this.setValue();
    for (const key in this.validateForm.controls) {  //验证表单输入内容不能为空
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    };
    console.log("提交的model是什么", this.addStoreAccountRequestModel);
    if (this.validateForm.valid) {
      this.adminStoreAccountService.addStoreAccount(this.addStoreAccountRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res.status_code) {
          alert("创建失败，请重新填写")
        } else {
          alert("创建成功");
          this.dialogRef.close(1);   //如果创建成功就传一个1,父组件收到创建成功传的结果是1时调用帐号列表方法（search()）更新页面数据
        }
      })
    }
  }





  //关闭弹窗
  close(): void {
    this.dialogRef.close();
  }


  //密码验证
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.password_confirmation.updateValueAndValidity());
  };

  //确认密码与输入密码是否一致
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { password_confirmation: true, error: true };
    }
    return {};
  };


}

