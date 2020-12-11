import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminStoreBankAccountService } from '../../../../services/admin/admin-store-bank-account.service';
import { DataDetailResponseModel, StoreBankAccountUpdateRequestModel } from '../../../../interfaces/adminStoreBankAccount/admin-store-bank-account-model';


@Component({
  selector: 'app-admin-store-bank-account-detail',
  templateUrl: './admin-store-bank-account-detail.component.html',
  styleUrls: ['./admin-store-bank-account-detail.component.css']
})
export class AdminStoreBankAccountDetailComponent implements OnInit {
  addForm!: FormGroup;
  statusValue = 0;
  storeBankAccountUpdateRequestModel: StoreBankAccountUpdateRequestModel;
  dataDetailResponseModel: DataDetailResponseModel;

  validationMessage: any = {
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
    bankName: '',
    bankAccount: '',
    accountAddress: '',
    contacts: '',
    contactsPhone: '',
  };



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreBankAccountDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public adminStoreBankAccountService: AdminStoreBankAccountService,) {
    this.dataDetailResponseModel = this.data;
    console.log("弹窗拿到的值", this.dataDetailResponseModel);
    this.forms();
    this.storeBankAccountUpdateRequestModel = {
      bank_name: '',
      bank_account: '',
      account_address: '',
      is_corporate: 0,
      contacts: '',
      contacts_phone: '',
    }
  }

  forms() {
    this.addForm = this.fb.group({
      bankName: [this.dataDetailResponseModel.bank_name, [Validators.required]],
      bankAccount: [this.dataDetailResponseModel.bank_account, [Validators.required]],
      accountAddress: [this.dataDetailResponseModel.account_address, [Validators.required]],
      isCorporate: [this.dataDetailResponseModel.is_corporate, [Validators.required]],
      contacts: [this.dataDetailResponseModel.contacts, [Validators.required]],
      contactsPhone: [this.dataDetailResponseModel.contacts_phone, [Validators.required]]
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

  }

  setValue() {
    this.storeBankAccountUpdateRequestModel.bank_name = this.addForm.value.bankName;
    this.storeBankAccountUpdateRequestModel.bank_account = this.addForm.value.bankAccount;
    this.storeBankAccountUpdateRequestModel.account_address = this.addForm.value.accountAddress;
    this.storeBankAccountUpdateRequestModel.is_corporate = this.addForm.value.isCorporate;
    this.storeBankAccountUpdateRequestModel.contacts = this.addForm.value.contacts;
    this.storeBankAccountUpdateRequestModel.contacts_phone = this.addForm.value.contactsPhone;
  }


  update() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.storeBankAccountUpdateRequestModel.bank_id = this.dataDetailResponseModel.bank_id;
      console.log("提交的model是什么", this.storeBankAccountUpdateRequestModel);
      this.adminStoreBankAccountService.updateStoreBank(this.storeBankAccountUpdateRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res.status_code) {
          // alert("更新失败");
        }
        else {
          // alert("更新成功");
          this.dialogRef.close(1);
        }
      })
    }
  }


  close(): void {
    this.dialogRef.close();
  }

}

