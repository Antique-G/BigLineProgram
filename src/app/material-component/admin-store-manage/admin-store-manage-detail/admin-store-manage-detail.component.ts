import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
// 手机号码校验
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AdminStoreManageService } from '../../../../services/admin/admin-store-manage.service';
import { StoreManageRequestModel } from '../../../../interfaces/adminStoreManage/admin-store-manage-model';
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
  selector: 'app-admin-store-manage-detail',
  templateUrl: './admin-store-manage-detail.component.html',
  styleUrls: ['./admin-store-manage-detail.component.css']
})
export class AdminStoreManageDetailComponent implements OnInit {
  @Input() data: any;

  addForm!: FormGroup;
  status = '1';
  // 城市
  nzOptions: any[] | null = null;
  idRegion: any;
  values: any[] = [];

  storeManageRequestModel: StoreManageRequestModel;

  constructor(public fb: FormBuilder, public adminRegionService: AdminRegionService, public adminStoreManageService: AdminStoreManageService,) {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      shop_name: ['', [Validators.required]],
      contact_name: ['',],
      contact_mobile: ['', [mobile]],
      phone: ['',],
      fax: ['',],
      region_code: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: [''],

    });
    this.storeManageRequestModel = {
      shop_name: '',
      contact_name: '',
      contact_mobile: '',
      phone: '',
      fax: '',
      region_code: '',
      address: '',
      status: 0,
      id:''
    }
  }

  ngOnInit(): void {
    // 城市
    console.log('data :>> ', this.data);
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      const str = this.data.region_code;
      for (let i = 0; i < str.length / 4; i++) {
        let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
        this.values.push(temp);
      }
      this.addForm.get('region_code')?.setValue(this.values);   //区域
    })
  }



  setValue() {
    this.storeManageRequestModel.shop_name = this.addForm.value.shop_name;
    this.storeManageRequestModel.contact_name = this.addForm.value.contact_name;
    this.storeManageRequestModel.contact_mobile = this.addForm.value.contact_mobile;
    this.storeManageRequestModel.phone = this.addForm.value.phone;
    this.storeManageRequestModel.fax = this.addForm.value.fax;
    this.storeManageRequestModel.region_code = this.idRegion;
    this.storeManageRequestModel.address = this.addForm.value.address;
    this.storeManageRequestModel.status = this.addForm.value.status;
  }

  add() {
    this.setValue();
    for (const key in this.addForm.controls) {  //验证表单输入内容不能为空
      this.addForm.controls[key].markAsDirty();
      this.addForm.controls[key].updateValueAndValidity();
    };
    if (this.addForm.valid) {
      this.storeManageRequestModel.id = this.data?.id;
      this.adminStoreManageService.updateStore(this.storeManageRequestModel).subscribe(res => {
        console.log('结果是 :>> ', res);
      })
    }
  }



  onChanges(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.idRegion = data[data.length - 1];
    }
  }
}
