import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageService } from 'ng-zorro-antd/message';
import { GroupSmsModel } from '../../../../../../../interfaces/store/storeOrder/store-order-model';
import { StoreOrderService } from '../../../../../../../services/store/store-order/store-order.service';

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
  @Input() data: any;
  dataSource: any;

  tbsArr: any[] = [];

  // 表格
  setOfCheckedId = new Set<number>();

  groupSmsModel: GroupSmsModel;

  constructor(public fb: FormBuilder, public message: NzMessageService, public storeOrderService: StoreOrderService) {
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

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  setValue() {
    this.groupSmsModel.sub_group_id = this.data.sub_group_id;
    this.groupSmsModel.contact_name = this.addForm.value.name;
    this.groupSmsModel.contact_phone = this.addForm.value.phone;
  }

  add() {
    let arr = [...this.setOfCheckedId];
    this.groupSmsModel.orders = arr;
    console.log('arr是什么 ', arr);
    if (arr.length === 0) {
      this.message.create('error', `请选择订单`);
    }
    else {
      this.setValue();
      for (const i in this.addForm.controls) {
        this.addForm.controls[i].markAsDirty();
        this.addForm.controls[i].updateValueAndValidity();
      }
      if (this.addForm.valid) {
        this.storeOrderService.groupSms(this.groupSmsModel).subscribe(res => {
          console.log('res是什么', res);
        })
      }
    }
  }

}
