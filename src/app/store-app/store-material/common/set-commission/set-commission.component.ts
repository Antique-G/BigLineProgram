import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommissionModel } from '../../../../../interfaces/store/common/commission';

@Component({
  selector: 'app-set-commission',
  templateUrl: './set-commission.component.html',
  styleUrls: ['./set-commission.component.css']
})
export class SetCommissionComponent implements OnInit {

  public isSpinning:Boolean = false
  commissionModel:CommissionModel 
  @Input() data: any
  constructor(private fb: FormBuilder,) {
    this.commissionModel={
      dist_reward:0,
      store_reward:0,
      third_reward:0,
      commerce_reward:0
    }
   }
  addForm!: FormGroup;
  
  ngOnInit() {
    this.formInit()
   
  }

  formInit() {
    this.addForm = this.fb.group({
      title: [this.data.title],
      dist_reward: [0, [Validators.required]],
      store_reward: [0, [Validators.required]],
      third_reward: [0,[Validators.required]],
      commerce_reward: [0, [Validators.required]]
    });
  }

  getValue(){
    console.log(this.addForm.value);
    this.commissionModel.dist_reward =  this.addForm.value?.dist_reward;
    this.commissionModel.store_reward =  this.addForm.value?.store_reward;
    this.commissionModel.third_reward =  this.addForm.value?.third_reward;
    this.commissionModel.commerce_reward =  this.addForm.value?.commerce_reward;
    return this.commissionModel
  }

  Add(){
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    return this.addForm.valid
  }


}
