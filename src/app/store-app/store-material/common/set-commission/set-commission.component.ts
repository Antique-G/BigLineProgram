import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommissionModel } from '../../../../../interfaces/store/common/commission';
import { StoreProductService } from '../../../../../services/store/store-product/store-product.service';

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
    defaultMoney: any;
    isLess = false;


    constructor(private fb: FormBuilder, public storeProductService: StoreProductService) {
        this.commissionModel = {
            dist_reward: 0,
            store_reward: 0,
            third_reward: 0,
            commerce_reward: 0,
            product_id: '',
            reward_set: '',
            day: '',
        }
        this.addForm = this.fb.group({
            title: [''],
            day: [''],
            reward_set: [''],
            dist_reward: [''],
            store_reward: [''],
            third_reward: [''],
            commerce_reward: [''],
        });
    }


    ngOnInit() {
        console.log('1111111', this.data);
        this.values = this.data?.obj?.reward_set;
        if (this.data?.day > 3) {
            this.disSet = true;
            this.isLess = false;
        }
        else {
            console.log("223232", this.defaultMoney)
            this.disSet = false;
            this.isLess = true;
            this.storeProductService.getProductReward().subscribe(res => {
                console.log("结果是", res.data, res.data['1'], res.data['1']['money']);
                switch (this.data?.day) {
                    case 1: this.defaultMoney = res.data['1']['money']; break;
                    case 2: this.defaultMoney = res.data['2']['money']; break;
                    case 3: this.defaultMoney = res.data['3']['money']; break;
                }
            })
        }
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
            this.disSet = true;
            this.addForm.patchValue({
                dist_reward: this.defaultMoney,
                store_reward: this.defaultMoney,
                third_reward: this.defaultMoney,
                commerce_reward: this.defaultMoney,
            })
        }
        else if (data === 0) {
            this.disSet = false;
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
