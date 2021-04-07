import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RewardSetModel } from '../../../../interfaces/adminStore/admin-store-model';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';

@Component({
  selector: 'app-admin-store-commiss',
  templateUrl: './admin-store-commiss.component.html',
  styleUrls: ['./admin-store-commiss.component.css']
})
export class AdminStoreCommissComponent implements OnInit {
  addForm!: FormGroup;
  settlement = '7';
  isShow = false;
  rewardSetModel: RewardSetModel;

  constructor(public dialogRef: MatDialogRef<AdminStoreCommissComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder, public adminStoreService: AdminStoreService) {
    this.addForm = this.fb.group({
      settlement_cycle: ['', [Validators.required]],
      day: ['0', [Validators.required]],
      reward_percent: ['', [Validators.required]],
      remark: ['', [Validators.required]],
    });
    this.rewardSetModel = {
      store_id: '',
      settlement_cycle: '',
      reward_percent: '',
      remark: '',
    }
  }

  ngOnInit(): void {
    console.log('this.data :>> ', this.data);
    console.log('122222 :>> ', this.data?.settlement_cycle != 7, this.data?.settlement_cycle === 7);
    console.log('222222222 :>> ', this.data?.settlement_cycle != 7 && this.data?.settlement_cycle != 30
      && this.data?.settlement_cycle != 90 && this.data?.settlement_cycle != 180
      && this.data?.settlement_cycle != 360);
    let isSet = this.data?.settlement_cycle != 7 && this.data?.settlement_cycle != 30 && this.data?.settlement_cycle != 90 && this.data?.settlement_cycle != 180 && this.data?.settlement_cycle != 360;
    if (isSet === true) {
      this.isShow = true;
      this.settlement = '1';
      this.addForm.patchValue({
        settlement_cycle: [1, [Validators.required]],
        day: [this.data?.settlement_cycle, [Validators.required]],
      })
    }
    else if (isSet === false) {
      this.isShow = false;
      this.addForm.patchValue({
        settlement_cycle: [this.data?.settlement_cycle, [Validators.required]],
      })
    }
  }

  setValue() {
    if (this.isShow === false) {
      this.rewardSetModel.settlement_cycle = this.addForm.value.settlement_cycle;

    }
    else if (this.isShow === true) {
      this.rewardSetModel.settlement_cycle = this.addForm.value.day;
    }
    this.rewardSetModel.reward_percent = this.addForm.value.reward_percent;
    this.rewardSetModel.remark = this.addForm.value.remark;
    this.rewardSetModel.store_id = this.data.store_id;
  }

  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log('5555555 ', this.addForm);
    if (this.addForm.valid) {
      this.adminStoreService.rewardSet(this.rewardSetModel).subscribe(res => {
        console.log('res :>> ', res);
        this.dialogRef.close();

      })
    }
  }

  close() {
    this.dialogRef.close();
  }


  change(event: any) {
    console.log('event :>> ', event, event === '1');
    if (event === '1') {
      this.isShow = true;
    }
    else {
      this.isShow = false;
    }
  }
}
