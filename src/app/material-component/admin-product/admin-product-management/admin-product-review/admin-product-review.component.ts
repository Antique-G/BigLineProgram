import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminProductCheckStatusModel } from '../../../../../interfaces/adminProduct/product-management-model';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';

@Component({
  selector: 'app-admin-product-review',
  templateUrl: './admin-product-review.component.html',
  styleUrls: ['./admin-product-review.component.css']
})
export class AdminProductReviewComponent implements OnInit {
  addForm!: FormGroup;
  statusValue: any;
  disabled = true;
  adminProductCheckStatusModel: AdminProductCheckStatusModel;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminProductReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminProductManagementService: AdminProductManagementService) {
    this.addForm = this.fb.group({
      title: new FormControl({ value: this.data.title, disabled: true }, Validators.required),
      few_days: new FormControl({ value: this.data.few_days, disabled: true }, Validators.required),
      few_nights: new FormControl({ value: this.data.few_nights, disabled: true }, Validators.required),
      adult_price: new FormControl({ value: this.data.adult_price, disabled: true }, Validators.required),
      child_price: new FormControl({ value: this.data.child_price, disabled: true }, Validators.required),
      check_status: new FormControl({ value: this.data.check_status }, Validators.required)
    });
    this.adminProductCheckStatusModel = {
      id: this.data.id,
      check_status: 0
    }
  }

  ngOnInit(): void {
  }

  setValue() {
    this.adminProductCheckStatusModel.check_status = parseInt(this.addForm.value.check_status);
  }

  close() {
    this.dialogRef.close();
  }


  review() {
    this.setValue();
    this.adminProductManagementService.productCheckStatus(this.adminProductCheckStatusModel).subscribe(res => {
      console.log("222222", res)
      if (res.status_code) {
        // alert("审核更新不成功");
      }
      else {
        // alert("审核更新成功");
        this.dialogRef.close(1);

      }
    })
  }
}
