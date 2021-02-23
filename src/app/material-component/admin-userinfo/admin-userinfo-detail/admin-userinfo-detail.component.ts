import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { UpdateInfoModel } from '../../../../interfaces/adminUserinfo/admin-userinfo-model';
import { AdminUserinfoService } from '../../../../services/admin/admin-userinfo.service';

@Component({
  selector: 'app-admin-userinfo-detail',
  templateUrl: './admin-userinfo-detail.component.html',
  styleUrls: ['./admin-userinfo-detail.component.css']
})
export class AdminUserinfoDetailComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  updateInfoModel: UpdateInfoModel;


  constructor(public fb: FormBuilder, private adminUserinfoService: AdminUserinfoService,) {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      real_name: [''],
      gender: ['', [Validators.required]],
      phone: ['', [mobile]]
    });
    this.updateInfoModel = {
      name: '',
      real_name: '',
      gender: '',
      phone: '',
    }
  }

  ngOnInit(): void {
    console.log('object :>> ', this.data);
    this.addForm.setValue({
      name: this.data.name,
      real_name: this.data.real_name,
      gender: this.data.gender,
      phone: this.data.phone
    });
  }


  setValue() {
    this.updateInfoModel.name = this.addForm.value.name;
    this.updateInfoModel.real_name = this.addForm.value.real_name;
    if (this.addForm.value.gender === '未知') {
      this.updateInfoModel.gender = '0';
    }
    else if (this.addForm.value.gender === '男') {
      this.updateInfoModel.gender = '1';
    }
    else if (this.addForm.value.gender === '女') {
      this.updateInfoModel.gender = '2';
    }
    this.updateInfoModel.phone = this.addForm.value.phone;
  }


  update() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.updateInfoModel.id = this.data.user_id;
      this.adminUserinfoService.updateUserinfo(this.updateInfoModel).subscribe(res => {
        console.log("结果是", res)
      })
    }
  }

}




// 手机号码校验
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
