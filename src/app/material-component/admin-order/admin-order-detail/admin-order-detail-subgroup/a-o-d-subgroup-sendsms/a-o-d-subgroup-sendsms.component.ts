import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageService } from 'ng-zorro-antd/message';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupSmsModel } from '../../../../../../interfaces/store/storeOrder/store-order-model';
import { AdminOrderService } from '../../../../../../services/admin/admin-order.service';

// 手机号码校验
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}

export class MyValidators extends Validators {

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

@Component({
  selector: 'app-a-o-d-subgroup-sendsms',
  templateUrl: './a-o-d-subgroup-sendsms.component.html',
  styleUrls: ['./a-o-d-subgroup-sendsms.component.css']
})
export class AODSubgroupSendsmsComponent implements OnInit {
  addForm!: FormGroup;
  groupSmsModel: GroupSmsModel;
  ordersId: any[] = [];

  constructor(public dialogRef: MatDialogRef<AODSubgroupSendsmsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder,
    public message: NzMessageService, public adminOrderService: AdminOrderService,) {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, mobile]]
    });
    this.groupSmsModel = {
      sub_group_id: '',
      contact_name: '',
      contact_phone: '',
      orders: []
    }
  }

  ngOnInit(): void {
    console.log('弹窗拿到的值', this.data);
    this.data.forEach((element: any) => {
      let i = { 'order_id': element.id, 'address': element.assembling_place, 'time': element.assembling_time };
      this.ordersId.push(i)
    });
    console.log('this.ordersId :>> ', this.ordersId);

  }


  setValue() {
    this.groupSmsModel.contact_name = this.addForm.value.name;
    this.groupSmsModel.contact_phone = this.addForm.value.phone;
  }

  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.groupSmsModel.orders = this.ordersId;
      this.groupSmsModel.sub_group_id = this.data[0].sub_group_id;
      this.adminOrderService.groupSms(this.groupSmsModel).subscribe(res => {
        console.log('res是什么', res, res.status_code, res.status_code === '200');
        if (res.status_code === 200) {
          this.message.create('success', `成功发送${res.success}条信息，${res.failed}条失败信息`);
          this.dialogRef.close()
        }
        else {
          this.message.create('error', ` ${res.message}`);
          this.dialogRef.close()
        }
      })

    }
  }


  close() {
    this.dialogRef.close()
  }
}
