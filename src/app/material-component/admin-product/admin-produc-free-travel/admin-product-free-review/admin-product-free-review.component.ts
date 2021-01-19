import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminProductFreeTravelService } from '../../../../../services/admin/admin-product-free-travel.service';
import { SetCheckModel } from '../../../../../interfaces/adminProduct/free-travel-model';

@Component({
  selector: 'app-admin-product-free-review',
  templateUrl: './admin-product-free-review.component.html',
  styleUrls: ['./admin-product-free-review.component.css']
})
export class AdminProductFreeReviewComponent implements OnInit {
  addForm!: FormGroup;
  isReason = false;
  setCheckModel: SetCheckModel;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminProductFreeReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminProductFreeTravelService: AdminProductFreeTravelService,) {
    console.log("data", this.data)
    this.addForm = this.fb.group({
      title: new FormControl({ value: this.data.title, disabled: true }, Validators.required),
      check_status: new FormControl({ value: this.data.check_status }, Validators.required),
      reason: new FormControl(this.data?.check_log[0]?.reason)
    });
    this.setCheckModel = {
      id: this.data.id,
      check_status: 1,
      reason: ''
    }
  }

  ngOnInit(): void {
  }


  setValue() {
    this.setCheckModel.check_status = parseInt(this.addForm.value.check_status);
    if (this.setCheckModel.check_status === 3) {
      this.setCheckModel.reason = this.addForm.value.reason;
    }
    else {
      this.setCheckModel.reason = '';
    }
  }



  review() {
    this.setValue();
    this.adminProductFreeTravelService.freeTravelReview(this.setCheckModel).subscribe(res => {
      if (res?.status_code) {
        // alert("审核更新不成功");
      }
      else {
        // alert("审核更新成功");
        this.dialogRef.close(1);

      }

    })
  }


  isCheck(element: any) {
    console.log("element", element);
    if (element === '3') {
      this.isReason = true;
    }
    else {
      this.isReason = false;
    }
  }


  close() {
    this.dialogRef.close();
  }


}
