import { AdminStoreAccountService } from './../../../../services/admin/admin-store-account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, ValidatorFn,Validators  } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { AddStoreAccountRequestModel } from '../../../../interfaces/adminStoreAccount/admin-store-account-model';




@Component({
  selector: 'app-admin-store-account-create-aaaa',
  templateUrl: './admin-store-account-create.component.html',
  styleUrls: ['./admin-store-account-create.component.css']
})
export class AdminStoreAccountCreateComponent implements OnInit {
  validateForm: FormGroup;  //1.1使用form表单时需要实例化一个FormGroup
  status = '1';

  addStoreAccountRequestModel:AddStoreAccountRequestModel;   //引入定义的请求参数模块

  //表单验证初始输入内容不能为空
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '内容不能为空'
    },
    default: {
      email: '邮箱格式不正确'
    }
  };


 

  //密码验证
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.password_confirmation.updateValueAndValidity());
  };

//验证用户名是否已注册
  nameAsyncValidator = (control: FormControl) =>
  new Observable((observer: Observer<MyValidationErrors | null>) => {
    setTimeout(() => {
      if (control.value === "anya") {
        observer.next({
          duplicated: { 'zh-cn': `用户名已存在` }
        });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

//确认密码与输入密码是否一致
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { password_confirmation: true, error: true };
    }
    return {};
  };



  constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AdminStoreAccountCreateComponent>, public adminStoreAccountService:AdminStoreAccountService) {
    // use `MyValidators`
    const { required, maxLength, minLength, mobile ,email} = MyValidators;  //
    this.validateForm = this.fb.group({   //表单验证
      name: ['', [required, maxLength(12), minLength(2)], [this.nameAsyncValidator]],
      password: ['', [required,maxLength(12), minLength(6)]],
      password_confirmation: ['', [this.confirmValidator]],
      email: ['', [required,email]],
      mobile: ['', [required, mobile]],
      level: ['', [required]],
      store_id: ['', [required]],
      status: ['', [required]]
    });
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

  ngOnInit(): void {

  };


  setValue(){  //获取表单输入值
    this.addStoreAccountRequestModel.name =  this.validateForm.value.name;
    this.addStoreAccountRequestModel.password =  this.validateForm.value.password;
    this.addStoreAccountRequestModel.password_confirmation =  this.validateForm.value.password_confirmation;
    this.addStoreAccountRequestModel.mobile =  this.validateForm.value.mobile;
    this.addStoreAccountRequestModel.email =  this.validateForm.value.email;
    this.addStoreAccountRequestModel.level =  this.validateForm.value.level;
    this.addStoreAccountRequestModel.store_id =  this.validateForm.value.store_id;
    this.addStoreAccountRequestModel.status =  this.validateForm.value.status;
  }

  //商铺账号创建
  add() {
    
    for (const key in this.validateForm.controls) {  //验证表单输入内容不能为空
       this.validateForm.controls[key].markAsDirty();
       this.validateForm.controls[key].updateValueAndValidity();
    };

    this.setValue();   
    console.log("提交的model是什么",this.addStoreAccountRequestModel);
    this.adminStoreAccountService.addStoreAccount(this.addStoreAccountRequestModel).subscribe(res => {
      console.log("res结果",res);
      if (res.status_code){
        alert("创建失败，请重新填写")
      }else{
        alert("创建成功");
        this.dialogRef.close(1);
      }
    })
  }
  //关闭弹窗
  close(): void {
    this.dialogRef.close();
  }


 


}


// 表单验证提示message
export type MyErrorsOptions = { 'zh-cn': string;} & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

//手机号码格式验证
function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
