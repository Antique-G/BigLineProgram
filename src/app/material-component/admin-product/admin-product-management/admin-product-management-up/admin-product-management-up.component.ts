import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminProductCheckStatusModel, AdminProductSetStatusModel } from '../../../../../interfaces/adminProduct/product-management-model';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';

@Component({
  selector: 'app-admin-product-management-up',
  templateUrl: './admin-product-management-up.component.html',
  styleUrls: ['./admin-product-management-up.component.css']
})
export class AdminProductManagementUpComponent implements OnInit {
  addForm!: FormGroup;
  disabled = true;
  adminProductSetStatusModel:AdminProductSetStatusModel;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminProductManagementUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminProductManagementService: AdminProductManagementService) {
    this.addForm = this.fb.group({
      title: new FormControl({ value: this.data.title, disabled: true }, Validators.required),
      few_days: new FormControl({ value: this.data.few_days, disabled: true }, Validators.required),
      few_nights: new FormControl({ value: this.data.few_nights, disabled: true }, Validators.required),
      adult_price: new FormControl({ value: this.data.adult_price, disabled: true }, Validators.required),
      child_price: new FormControl({ value: this.data.child_price, disabled: true }, Validators.required),
      status: new FormControl({ value: this.data.status }, Validators.required)
    });
    this.adminProductSetStatusModel = {
      id: this.data.id,
      status: 0
    }
  }

  ngOnInit(): void {
  }

  setValue() {
    this.adminProductSetStatusModel.status = parseInt(this.addForm.value.status);
  }

  close() {
    this.dialogRef.close();
  }


  submit() {
    this.setValue();
    this.adminProductManagementService.productSetStatus(this.adminProductSetStatusModel).subscribe(res => {
      console.log("222222", res)
      if (res?.status_code) {
        // alert("上架不成功");
      }
      else {
        // alert("上架成功");
        this.dialogRef.close(1);

      }
    })
  }
}

