import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { PhoneCodeService } from '../../../../../services/common/phone-code.service';
import { MatDialogRef } from '@angular/material/dialog';
import { StoreTouristService } from '../../../../../services/store/store-tourist/store-tourist.service';
import { AddTouristModel } from '../../../../../interfaces/store/storeTourist/store-tourist-model';


@Component({
  selector: 'app-store-tourist-create',
  templateUrl: './store-tourist-create.component.html',
  styleUrls: ['./store-tourist-create.component.css']
})
export class StoreTouristCreateComponent implements OnInit {
  status = '1';
  addForm!: FormGroup;
  disabledClick = false;
  paracont = '发送验证码';
  addTouristModel:AddTouristModel;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreTouristCreateComponent>, 
    public phoneCodeService: PhoneCodeService,public storeTouristService:StoreTouristService) {
    this.forms();
    this.addTouristModel={
      name: '',
      mobile: '',
      code: '',
      status: ''
    }
  }


  forms() {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, mobile]],
      verificationCode: ['', [Validators.required]],
      status: ['', [Validators.required]]
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
    this.addTouristModel.name = this.addForm.value.name;
    this.addTouristModel.mobile = this.addForm.value.mobile;
    this.addTouristModel.code = this.addForm.value.verificationCode;
    this.addTouristModel.status = this.addForm.value.status;
  }

  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
    this.storeTouristService.addTourist( this.addTouristModel).subscribe(res=>{
      console.log("res",res)
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
