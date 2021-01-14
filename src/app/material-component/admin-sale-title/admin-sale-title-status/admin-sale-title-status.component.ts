import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminSaleTitleService } from '../../../../services/admin/admin-sale-title.service';
import { SaleTitleDetailtModel, SaleTitleStatusReviewRequestModel } from '../../../../interfaces/adminSaleTitle/admin-sale-title-model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin-sale-title-status',
  templateUrl: './admin-sale-title-status.component.html',
  styleUrls: ['./admin-sale-title-status.component.css']
})
export class AdminSaleTitleStatusComponent implements OnInit {
  addForm!: FormGroup;
  saleTitleDetailModel:SaleTitleDetailtModel;
  saleTitleStatusReviewRequestModel:SaleTitleStatusReviewRequestModel;

  precision = 2;
  customPrecisionFn(value: string | number, precision?: number): number {
    return +Number(value).toFixed(precision! + 1);
  }
 

  constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AdminSaleTitleStatusComponent>,public adminSaleTitleService:AdminSaleTitleService,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.saleTitleDetailModel = this.data;
    this.addForm =this.fb.group({
      title: new FormControl({ value: this.saleTitleDetailModel.title, disabled: true }),
      reward_rate: new FormControl({ value: this.saleTitleDetailModel.reward_rate, disabled: true }),
      status: new FormControl({ value: this.saleTitleDetailModel.status}),

    });
    this.saleTitleStatusReviewRequestModel = {
      title:'',
      reward_rate:0,
      id:0,
      status:0
    
    }
  }

  ngOnInit(): void {
  }
  //审核
  review(){
    this.saleTitleStatusReviewRequestModel.title = this.saleTitleDetailModel.title;
    this.saleTitleStatusReviewRequestModel.status = this.addForm.value.status;;
    this.saleTitleStatusReviewRequestModel.id = this.saleTitleDetailModel.id;
    this.saleTitleStatusReviewRequestModel.reward_rate = this.saleTitleDetailModel.reward_rate;
    console.log(this.saleTitleStatusReviewRequestModel);
    this.adminSaleTitleService.saleTitleStatus(this.saleTitleStatusReviewRequestModel).subscribe(res =>{
      console.log(res)
      if (res === null) {
        this.dialogRef.close(1);
      }
      else {
        
      }
    })
  }

  //关闭弹窗
  close(): void {
    this.dialogRef.close();
  }
}
