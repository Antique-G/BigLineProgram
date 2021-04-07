import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStoreRequestModel } from '../../../../interfaces/adminStore/admin-store-model';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { format } from 'date-fns';



@Component({
  selector: 'app-admin-store-create',
  templateUrl: './admin-store-create.component.html',
  styleUrls: ['./admin-store-create.component.css']
})
export class AdminStoreCreateComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  idRegion: any;


  addForm!: FormGroup;
  status = '1';

  addStoreRequestModel: AddStoreRequestModel;



  // 选择了周几
  weekValue: any[] = [1, 2, 3, 4, 5, 6, 0];
  // 选择周几
  checkWeeks = [
    { label: '周一', value: 1, checked: false },
    { label: '周二', value: 2, checked: false },
    { label: '周三', value: 3, checked: false },
    { label: '周四', value: 4, checked: false },
    { label: '周五', value: 5, checked: false },
    { label: '周六', value: 6, checked: false },
    { label: '周日', value: 0, checked: false },
  ]
  time1: any;
  time2: any;
  HourArr1: any;
  HourArr2: any;


  constructor(public fb: FormBuilder, private msg: NzMessageService,
    public adminRegionService: AdminRegionService, public adminStoreService: AdminStoreService) {
    this.forms();
    this.addStoreRequestModel = {
      name: '',
      region_code: '',
      address: '',
      fax: '',
      phone: '',
      status: '',
      contact: '',
      mobile: '',
      work_date: '',
      work_time: '',
    }
  }


  forms() {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      regionCode: ['', [Validators.required]],
      address: ['',],
      fax: ['',],
      phone: ['',],
      status: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      mobile: ['', [Validators.required, mobile]],
      week: ['', [Validators.required]],
      date1: [null, [Validators.required]],
      date2: [null, [Validators.required]],
    });

  }


  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
    })


  }


  setValue() {
    this.addStoreRequestModel.name = this.addForm.value.name;
    this.addStoreRequestModel.region_code = this.addForm.value.regionCode;
    this.addStoreRequestModel.address = this.addForm.value.address;
    this.addStoreRequestModel.fax = this.addForm.value.fax;
    this.addStoreRequestModel.phone = this.addForm.value.phone
    this.addStoreRequestModel.status = this.addForm.value.status;
    this.addStoreRequestModel.contact = this.addForm.value.contact;
    this.addStoreRequestModel.mobile = this.addForm.value.mobile;
    this.addStoreRequestModel.work_date = this.weekValue;
    this.addStoreRequestModel.work_time = format(new Date(this.addForm.value.date1), 'HH:mm') + '-' + format(new Date(this.addForm.value.date2), 'HH:mm');

  }


  add() {
    this.setValue();
    this.addStoreRequestModel.region_code = this.idRegion;
    console.log("提交的model是什么", this.addStoreRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.HourArr1 = format(new Date(this.addForm.value.date1), 'HH');
      this.HourArr2 = format(new Date(this.addForm.value.date2), 'HH');
      if (Number(this.HourArr2) < Number(this.HourArr1)) {
        this.msg.error('时间选择错误，请重新选择时间');
      }
      else {
        this.adminStoreService.addStore(this.addStoreRequestModel).subscribe(res => {
          console.log("res结果", res);
          if (res.message) {
            // alert("创建成功");

          }
          else {
            // alert("创建失败，请重新填写");
          }
        })
      }

    }
  }



  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }
  }

  ngCheckBoxChange(value: object[]): void {
    let a: any;
    a = value;
    let i: any[] = [];
    a.forEach((element: any) => {
      console.log('11111111 :>> ', element);
      if (element['checked'] === true) {
        i.push(element['value'])
      }
    })
    this.weekValue = i;
    console.log('11111111111', value, this.weekValue);

  }


}





// 手机号码校验
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageService } from 'ng-zorro-antd/message';


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
