import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AdminCostService } from '../../../../../services/admin/admin-cost.service';
// 手机号码校验
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ActivatedRoute } from '@angular/router';
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
    selector: 'app-admin-pro-supply-detail',
    templateUrl: './admin-pro-supply-detail.component.html',
    styleUrls: ['./admin-pro-supply-detail.component.css']
})
export class AdminProSupplyDetailComponent implements OnInit {
    addForm!: FormGroup;
    @Input() data: any;
    supplyAddRequestModel: any;
    detailModel: any;

    constructor(public fb: FormBuilder, public adminCostService: AdminCostService) {
        // 校验手机
        const { mobile } = MyValidators;
        this.addForm = this.fb.group({
            supplier_name: ['', [Validators.required]],
            bank_name: ['', [Validators.required]],
            bank_account: ['', [Validators.required]],
            bank_open: ['', [Validators.required]],
            contacts: [''],
            contact_phone: ['', [mobile]],
            status: ['1', [Validators.required]]
        });
        this.supplyAddRequestModel = {
            supplier_name: '',
            bank_name: '',
            bank_account: '',
            bank_open: '',
            contacts: '',
            contact_phone: '',
            status: ''
        };
    }

    ngOnInit(): void {
        this.detailModel = this.data;
    }



    setValue() {
        this.supplyAddRequestModel.supplier_name = this.addForm.value.supplier_name;
        this.supplyAddRequestModel.bank_name = this.addForm.value.bank_name;
        this.supplyAddRequestModel.bank_account = this.addForm.value.bank_account;
        this.supplyAddRequestModel.bank_open = this.addForm.value.bank_open;
        this.supplyAddRequestModel.contacts = this.addForm.value.contacts;
        this.supplyAddRequestModel.contact_phone = this.addForm.value.contact_phone;
        this.supplyAddRequestModel.status = this.addForm.value.status;
    }


    update() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.supplyAddRequestModel.id = this.detailModel?.id;
            this.adminCostService.updateSupply(this.supplyAddRequestModel).subscribe(res => {

            });
        }
    }
}
