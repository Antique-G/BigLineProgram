import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, ValidatorFn,Validators  } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';




@Component({
  selector: 'app-admin-store-account-create-aaaa',
  templateUrl: './admin-store-account-create.component.html',
  styleUrls: ['./admin-store-account-create.component.css']
})
export class AdminStoreAccountCreateComponent implements OnInit {
  values: any[] | null = null;
  validateForm: FormGroup;  //1.1使用form表单时需要实例化一个FormGroup
  status = '1';

  //初始输入不能为空
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '不能为空'
    }
  };


  submitForm(value: { userName: string;  password: string; confirm: string;  realName:string; mobile: string ; status: string}): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  };


  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  };

//验证用户名是否已注册
  userNameAsyncValidator = (control: FormControl) =>
  new Observable((observer: Observer<MyValidationErrors | null>) => {
    setTimeout(() => {
      if (control.value === 'JasonWood') {
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
      return { confirm: true, error: true };
    }
    return {};
  };



  constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AdminStoreAccountCreateComponent>,) {
    // use `MyValidators`
    const { required, maxLength, minLength, mobile } = MyValidators;  //
    this.validateForm = this.fb.group({
      userName: ['', [required, maxLength(12), minLength(6)], [this.userNameAsyncValidator]],
      password: ['', [required]],
      confirm: ['', [this.confirmValidator]],
      realName: ['', [required]],
      mobile: ['', [required, mobile]],
      status: ['', [required]]
    });
  }  

  //关闭弹窗
  close(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {


  };


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
