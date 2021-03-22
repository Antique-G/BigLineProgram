import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommissionModel } from '../../../../../interfaces/store/common/commission';

@Component({
  selector: 'app-set-commission',
  templateUrl: './set-commission.component.html',
  styleUrls: ['./set-commission.component.css']
})
export class SetCommissionComponent implements OnInit {
  @Input() data: any;
  public isSpinning: Boolean = false
  commissionModel!: CommissionModel;
  addForm!: FormGroup;
  values = 1;
  disSet = true;


  constructor(private fb: FormBuilder,) {
    this.commissionModel = {
      dist_reward: 0,
      store_reward: 0,
      third_reward: 0,
      commerce_reward: 0,
      product_id: '',
      reward_set: '',
      day: '',
    }
  }


  ngOnInit() {
    this.formInit();
    if (this.data?.day > 3) {
      this.disSet = true;
    }
    else {
      this.disSet = false;
    }
    console.log('1111111', this.data);
    this.values = this.data?.obj?.reward_set;
  }

  formInit() {
    this.addForm = this.fb.group({
      title: [this.data?.title],
      day: [this.data?.day],
      reward_set: [this.data?.day > 3 ? 1 : 0],
      dist_reward: [this.data?.day > 3 ? '' : 0,],
      store_reward: [this.data?.day > 3 ? '' : 0,],
      third_reward: [this.data?.day > 3 ? '' : 0,],
      commerce_reward: [this.data?.day > 3 ? '' : 0,]
    });
  }

  getValue() {
    this.commissionModel.product_id = this.data.id;
    this.commissionModel.day = this.data.day;
    this.commissionModel.reward_set = this.addForm.value?.reward_set;
    this.commissionModel.dist_reward = this.addForm.value?.dist_reward;
    this.commissionModel.store_reward = this.addForm.value?.store_reward;
    this.commissionModel.third_reward = this.addForm.value?.third_reward;
    this.commissionModel.commerce_reward = this.addForm.value?.commerce_reward;
    return this.commissionModel
  }

  Add() {
    this.getValue();
    console.log('this.addForm.value', this.addForm.value);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    return this.addForm.valid
  }



  set(data: any) {
    if (data === 1) {
      this.values = 1;
      this.valid();
    }
    else if (data === 0) {
      this.values = 0;
      this?.addForm?.controls['dist_reward'].setValidators(null);
      this?.addForm?.controls['dist_reward'].updateValueAndValidity();
      this?.addForm?.controls['store_reward'].setValidators(null);
      this?.addForm?.controls['store_reward'].updateValueAndValidity();
      this?.addForm?.controls['third_reward'].setValidators(null);
      this?.addForm?.controls['third_reward'].updateValueAndValidity();
      this?.addForm?.controls['commerce_reward'].setValidators(null);
      this?.addForm?.controls['commerce_reward'].updateValueAndValidity();

    }
  }

  valid() {
    if (this.data?.day > 3) {
      this?.addForm?.controls['dist_reward'].setValidators(Validators.required);
      this?.addForm?.controls['dist_reward'].updateValueAndValidity();
      this?.addForm?.controls['store_reward'].setValidators(Validators.required);
      this?.addForm?.controls['store_reward'].updateValueAndValidity();
      this?.addForm?.controls['third_reward'].setValidators(Validators.required);
      this?.addForm?.controls['third_reward'].updateValueAndValidity();
      this?.addForm?.controls['commerce_reward'].setValidators(Validators.required);
      this?.addForm?.controls['commerce_reward'].updateValueAndValidity();
    }
    else {
      this?.addForm?.controls['dist_reward'].setValidators(null);
      this?.addForm?.controls['dist_reward'].updateValueAndValidity();
      this?.addForm?.controls['store_reward'].setValidators(null);
      this?.addForm?.controls['store_reward'].updateValueAndValidity();
      this?.addForm?.controls['third_reward'].setValidators(null);
      this?.addForm?.controls['third_reward'].updateValueAndValidity();
      this?.addForm?.controls['commerce_reward'].setValidators(null);
      this?.addForm?.controls['commerce_reward'].updateValueAndValidity();
    }
  }
}
