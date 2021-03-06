import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneCodeService } from '../../../../services/common/phone-code.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { MobilCodeModel } from '../../../../interfaces/store/storeForgetPassword/storeForgetPassword.model';
import { StoreForgetPasswordService } from '../../../../services/store/store-forget-password/store-forget-password.service';

@Component({
  selector: 'app-store-forget-password',
  templateUrl: './store-forget-password.component.html',
  styleUrls: ['./store-forget-password.component.css']
})
export class StoreForgetPasswordComponent implements OnInit {
  addForm!:FormGroup;
  disabledClick = false;
  paracont = '发送验证码';
  mobilCodeModel:MobilCodeModel;

  constructor(public fb: FormBuilder, public router: Router,public phoneCodeService: PhoneCodeService,public storeForgetPasswordService:StoreForgetPasswordService) {
    this.forms();
    this.mobilCodeModel={
      mobile: '',
      code: ''
    }
   }

  forms() {
    const { mobile } =MyValidators;
    this.addForm = this.fb.group({
      mobile: ['', [Validators.required, mobile]],
      verificationCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  getverifycode() {
    this.addForm.controls['mobile'].markAsDirty();           // 点击获取验证码要以输入了手机号为前提 
    this.addForm.controls['mobile'].updateValueAndValidity();
    this.phoneCodeService.sendCode(this.addForm.controls.mobile.value ).subscribe(res => {   // 如果手机号验证通过
      console.log("res",res)
      if (res) {
        const numbers = interval(1000);
        const takeFourNumbers = numbers.pipe(take(60));
        takeFourNumbers.subscribe(res => {
          this.paracont = (60 - res) + "秒后可重发";
          this.disabledClick = true;
        },
          error => { },
          () => {
            this.paracont = "重新发送";
            this.disabledClick = false;
          });
      }
    });
  }

  setValue() {
    this.mobilCodeModel.mobile = this.addForm.value.mobile;
    this.mobilCodeModel.code = this.addForm.value.verificationCode;
  }


  next() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("ddddd",this.addForm.value)
    if (this.addForm.valid) {
      this.storeForgetPasswordService.storeForgetPassword(this.mobilCodeModel.mobile,this.mobilCodeModel.code).subscribe(res=>{
        console.log("res",res.token)
        if (res?.token) {
          this.router.navigate(['/store/forgetPassword/setNewPassword'], { queryParams: { token:res.token , mobile:this.mobilCodeModel.mobile} });
        }
      })

    }

  }
}

// 手机号码校验
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
