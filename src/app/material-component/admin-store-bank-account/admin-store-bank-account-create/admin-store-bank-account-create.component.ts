import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreBankAccountRequestModel } from '../../../../interfaces/adminStoreBankAccount/admin-store-bank-account-model';
import { AdminStoreBankAccountService } from '../../../../services/admin/admin-store-bank-account.service';


@Component({
  selector: 'app-admin-store-bank-account-create',
  templateUrl: './admin-store-bank-account-create.component.html',
  styleUrls: ['./admin-store-bank-account-create.component.css']
})
export class AdminStoreBankAccountCreateComponent implements OnInit {
  addForm!: FormGroup;
  statusValue = '1';
  store_id: any;


  storeBankAccountRequestModel: StoreBankAccountRequestModel;

  validationMessage: any = {
    storeId: {
      'required': '请输入商铺id ！'
    },
    bankName: {
      'maxlength': '开户行名称长度最多为32个字符',
      'required': '请输入开户行名称 ！'
    },
    bankAccount: {
      'maxlength': '银行卡号长度最多为30个字符',
      'required': '请输入银行卡号！'
    },
    accountAddress: {
      'maxlength': '开户行地址长度最多为50个字符',
      'required': '请输入开户行地址！'
    },
    contacts: {
      'maxlength': '联系人姓名长度最多为30个字符',
      'required': '请输入联系人姓名！'
    },
    contactsPhone: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入联系人电话！'
    },
  };
  formErrors: any = {
    storeId: '',
    bankName: '',
    bankAccount: '',
    accountAddress: '',
    contacts: '',
    contactsPhone: '',
  };




  constructor(public fb: FormBuilder,
    public adminStoreBankAccountService: AdminStoreBankAccountService,
    public activatedRoute: ActivatedRoute,) {
    this.forms();
    this.storeBankAccountRequestModel = {
      store_id: this.store_id,
      bank_name: '',
      bank_account: '',
      account_address: '',
      is_corporate: 0,
      contacts: '',
      contacts_phone: '',
    }
  }

  forms() {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      // storeId: [{ value: this.store_id, disabled: true }, [Validators.required]],
      bankName: ['', [Validators.required]],
      bankAccount: ['', [Validators.required, Validators.maxLength(30)]],
      accountAddress: ['', [Validators.required]],
      isCorporate: ['', [Validators.required]],
      contacts: ['', [Validators.required]],
      contactsPhone: ['', [Validators.required, mobile]]
    });
    // 每次表单数据发生变化的时候更新错误信息
    this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
  }

  // 表单验证
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.addForm) return;
    // 获取当前的表单
    const form = this.addForm;
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.store_id = params?.id;

    });
  }

  setValue() {
    this.storeBankAccountRequestModel.store_id = this.store_id;
    this.storeBankAccountRequestModel.bank_name = this.addForm.value.bankName;
    this.storeBankAccountRequestModel.bank_account = this.addForm.value.bankAccount;
    this.storeBankAccountRequestModel.account_address = this.addForm.value.accountAddress;
    this.storeBankAccountRequestModel.is_corporate = this.addForm.value.isCorporate;
    this.storeBankAccountRequestModel.contacts = this.addForm.value.contacts;
    this.storeBankAccountRequestModel.contacts_phone = this.addForm.value.contactsPhone;
  }


  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      console.log("提交的model是什么", this.storeBankAccountRequestModel);
      this.adminStoreBankAccountService.addStoreBankAccount(this.storeBankAccountRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res.code) {
          // alert("创建失败，请重新填写");
        }
        else {
          // alert("创建成功");
       
        }
      })
    }
  }



}





// 手机号码校验
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { ActivatedRoute } from '@angular/router';

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

