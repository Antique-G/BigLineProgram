import { format } from 'date-fns';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StoreRegionService } from '../../../../services/store/store-region/store-region.service';
import { StoreApplyService } from '../../../../services/store/store-apply/store-apply.service';
import { StoreApplyRequestModel } from '../../../../interfaces/store/storeApply/store-apply-model';
import { PhoneCodeService } from '../../../../services/common/phone-code.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';


// 手机号码校验
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
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




@Component({
  selector: 'app-store-registered',
  templateUrl: './store-registered.component.html',
  styleUrls: ['./store-registered.component.css']
})
export class StoreRegisteredComponent implements OnInit {
  current = 0;
  index = 0;
  addForm!: FormGroup;
  disabledClick = false;
  paracont = '发送验证码';
  // 区域联动
  nzOptions: any[] | null = null;
  city: any;

  // 选择了周几
  weekValue: any[] = [1, 2, 3, 4, 5, 6, 0];
  // 选择周几
  checkWeeks = [
    { label: '周一', value: 1, checked: true },
    { label: '周二', value: 2, checked: true },
    { label: '周三', value: 3, checked: true },
    { label: '周四', value: 4, checked: true },
    { label: '周五', value: 5, checked: true },
    { label: '周六', value: 6, checked: true },
    { label: '周日', value: 0, checked: true },
  ]
  time1 = new Date('2021-01-01 09:00:00');
  time2 = new Date('2021-01-01 18:00:00');

  storeApplyRequestModel: StoreApplyRequestModel;
  HourArr1: any;
  HourArr2: any;




  constructor(public fb: FormBuilder, public storeRegionService: StoreRegionService, public storeApplyService: StoreApplyService,
    public phoneCodeService: PhoneCodeService, private msg: NzMessageService, public router: Router) {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      account_name: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required, this.confirmValidator]],
      name: ['', [Validators.required]],
      contract_name: ['', [Validators.required]],
      mobile: ['', [Validators.required, mobile]],
      verificationCode: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      fax: [''],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      week: ['', [Validators.required]],
      date1: [null, [Validators.required]],
      date2: [null, [Validators.required]],

    });
    this.storeApplyRequestModel = {
      account_name: '',
      password: '',
      password_confirmation: '',
      name: '',
      code: '',
      address: '',
      fax: '',
      mobile: '',
      phone: '',
      region_code: '',
      contact: '',
      work_date: '',
      work_time: '',
    }
  }

  ngOnInit(): void {
    // 区域
    this.storeRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
    console.log('\this.weekValue :>> ', this.weekValue);
  }



  setValue() {
    this.storeApplyRequestModel.account_name = this.addForm.value.account_name;
    this.storeApplyRequestModel.password = this.addForm.value.password;
    this.storeApplyRequestModel.password_confirmation = this.addForm.value.password_confirmation;
    this.storeApplyRequestModel.name = this.addForm.value.name;
    this.storeApplyRequestModel.code = this.addForm.value.verificationCode;
    this.storeApplyRequestModel.address = this.addForm.value.address;
    this.storeApplyRequestModel.fax = this.addForm.value.fax;
    this.storeApplyRequestModel.mobile = this.addForm.value.mobile;
    this.storeApplyRequestModel.phone = this.addForm.value.phone;
    this.storeApplyRequestModel.region_code = this.city;
    this.storeApplyRequestModel.contact = this.addForm.value.contract_name;
    this.storeApplyRequestModel.work_date = this.weekValue;
    this.storeApplyRequestModel.work_time = format(new Date(this.addForm.value.date1), 'HH:mm') + '-' + format(new Date(this.addForm.value.date2), 'HH:mm');
  
  }



  next() {
    this.setValue();
    // 验证表单
    console.log("this.addForm", this.addForm)
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("66666", this.addForm.valid)
    if (this.addForm.valid) {
      this.HourArr1 = format(new Date(this.addForm.value.date1), 'HH');
      this.HourArr2 = format(new Date(this.addForm.value.date2), 'HH');
      if (Number(this.HourArr2) < Number(this.HourArr1)) {
        this.msg.error('时间选择错误，请重新选择时间');
      }
      else{
        this.storeApplyService.storeApply(this.storeApplyRequestModel).subscribe(res => {
          console.log('结果是 :>> ', res);
          if (res?.message) {
            this.router.navigate(['/store/registered/success'])
          }
        })
      }
    
    }

  }


  //密码验证
  validateConfirmPassword(): void {
    setTimeout(() => this.addForm.controls.password_confirmation.updateValueAndValidity());
  };

  //确认密码与输入密码是否一致
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.addForm.controls.password.value) {
      return { password_confirmation: true, error: true };
    }
    return {};
  };



  // 验证码
  getverifycode() {
    this.addForm.controls['mobile'].markAsDirty();           // 点击获取验证码要以输入了手机号为前提 
    this.addForm.controls['mobile'].updateValueAndValidity();
    this.phoneCodeService.sendCode(this.addForm.controls.mobile.value).subscribe(res => {   // 如果手机号验证通过
      console.log("res", res)
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

  // 区域
  onChanges(values: any): void {
    console.log("点击的结果是", values);
    if (values !== null) {
      this.city = values[values.length - 1];
    }
  }



  ngCheckBoxChange(value: object[]): void {
    this.weekValue = value;
    console.log('11111111111', value, this.weekValue);
  }


}
