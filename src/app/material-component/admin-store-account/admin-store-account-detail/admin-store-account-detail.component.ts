import { AdminStoreAccountService } from './../../../../services/admin/admin-store-account.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, ValidatorFn,Validators  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { DataDetailStoreAccountResponseModel, StoreAccountDetailUpdateRequestModel } from '../../../../interfaces/adminStoreAccount/admin-store-account-model';
@Component({
  selector: 'app-admin-store-account-detail',
  templateUrl: './admin-store-account-detail.component.html',
  styleUrls: ['./admin-store-account-detail.component.css']
})

export class AdminStoreAccountDetailComponent implements OnInit {
  detaileForm: FormGroup;  //1.1使用form表单时需要实例化一个FormGroup
  status =3; 
  storeAccountDetailUpdateRequestModel: StoreAccountDetailUpdateRequestModel;
  dataDetailStoreAccountResponseModel: DataDetailStoreAccountResponseModel;

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
    setTimeout(() => this.detaileForm.controls.password_confirmation.updateValueAndValidity());
  };

//验证用户名是否已注册
  nameAsyncValidator = (control: FormControl) =>
  new Observable((observer: Observer<MyValidationErrors | null>) => {
    setTimeout(() => {
      if (control.value === "") {
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
    } else if (control.value !== this.detaileForm.controls.password.value) {
      return { password_confirmation: true, error: true };
    }
    return {};
  };



  constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AdminStoreAccountDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,public adminStoreAccountService:AdminStoreAccountService) {
    this.dataDetailStoreAccountResponseModel = this.data;
    // use `MyValidators`
    console.log("点击编辑传过来的当前商铺id数据",this.dataDetailStoreAccountResponseModel);
    const { required, maxLength, minLength, mobile ,email} = MyValidators;  
    this.detaileForm = this.fb.group({   //表单验证
      name: [this.dataDetailStoreAccountResponseModel.name , [required, maxLength(12), minLength(2)]],   // , [this.nameAsyncValidator]
      password: ['' ],
      password_confirmation: [''],     // ,[this.confirmValidator] 
      email: [this.dataDetailStoreAccountResponseModel.email, [required,email]],
      mobile: [this.dataDetailStoreAccountResponseModel.mobile, [required, mobile]],
      level: [this.dataDetailStoreAccountResponseModel.level, [required]],
      store_id: [this.dataDetailStoreAccountResponseModel.store_id, [required]],
      status: [this.dataDetailStoreAccountResponseModel.status, [required]]
    });
    this.storeAccountDetailUpdateRequestModel = {
      name: '',
      password: '',
      password_confirmation: '',
      mobile: '',
      email: '',
      level: 0,
      store_id: '',
      status: '',
      account_id: ''
    }

  }  

  ngOnInit(): void {

  };
  
  setValue() {   //获取表单内容赋值给修改内容接口请求的数据模块
    this.storeAccountDetailUpdateRequestModel.name = this.detaileForm.value.name;
    this.storeAccountDetailUpdateRequestModel.password = this.detaileForm.value.password;
    this.storeAccountDetailUpdateRequestModel.password_confirmation = this.detaileForm.value.password_confirmation;
    this.storeAccountDetailUpdateRequestModel.mobile = this.detaileForm.value.mobile;
    this.storeAccountDetailUpdateRequestModel.email = this.detaileForm.value.email;
    this.storeAccountDetailUpdateRequestModel.level = this.detaileForm.value.level;
    this.storeAccountDetailUpdateRequestModel.store_id = this.detaileForm.value.store_id;
    this.storeAccountDetailUpdateRequestModel.status = this.detaileForm.value.status;
  }

  update(){
    for (const key in this.detaileForm.controls) {  //验证表单输入内容不能为空
      this.detaileForm.controls[key].markAsDirty();
      this.detaileForm.controls[key].updateValueAndValidity();
    };
    console.log("看看表单里面的输入内容",this.detaileForm.value)
    this.setValue();
    this.storeAccountDetailUpdateRequestModel.account_id =  this.dataDetailStoreAccountResponseModel.account_id;
    console.log("看看修改提交的model是什么", this.storeAccountDetailUpdateRequestModel,this.storeAccountDetailUpdateRequestModel.account_id);
    this.adminStoreAccountService.updateStoreAccount(this.storeAccountDetailUpdateRequestModel).subscribe(res => {
      console.log("res结果",res);
      if (res.status_code){
        alert("修改失败");
      }
      else {
        alert("修改成功");
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
