import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageService } from 'ng-zorro-antd/message';
import { GroupSmsModel } from '../../../../../../../interfaces/store/storeOrder/store-order-model';
import { StoreOrderService } from '../../../../../../../services/store/store-order/store-order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  selector: 'app-store-order-group-detail-subgroup-sentsms',
  templateUrl: './store-order-group-detail-subgroup-sentsms.component.html',
  styleUrls: ['./store-order-group-detail-subgroup-sentsms.component.css']
})
export class StoreOrderGroupDetailSubgroupSentsmsComponent implements OnInit {
  addForm!: FormGroup;
  dataSource: any;

  tbsArr: any[] = [];

  // 表格
  checked = false;
  setOfCheckedId = new Set<number>();

  groupSmsModel: GroupSmsModel;

  constructor(public dialogRef: MatDialogRef<StoreOrderGroupDetailSubgroupSentsmsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public message: NzMessageService, public storeOrderService: StoreOrderService) {
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
    console.log('this.data', this.data);
    this.data.forEach((value: any) => {
      console.log('2342342342 ', value);
      let tabdata = { order_id: value.id, product_name: value.product_name, address: value.assembling_place, time: value.assembling_time }
      this.tbsArr.push(tabdata);
      this.dataSource = this.tbsArr;
      console.log('this.dataSource ', this.dataSource);
    });

  }

  // 表格
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }


  onAllChecked(value: boolean): void {
    this.dataSource.forEach((item:any) => this.updateCheckedSet(item, value));
  }


  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
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
      let arr = [...this.setOfCheckedId];
      this.groupSmsModel.orders = arr;
      this.groupSmsModel.sub_group_id = this.data[0].sub_group_id;
      if (arr.length === 0) {
        this.message.create('error', `请选择订单`);
      }
      else {
        this.storeOrderService.groupSms(this.groupSmsModel).subscribe(res => {
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
  }


  close() {
    this.dialogRef.close()
  }
}
