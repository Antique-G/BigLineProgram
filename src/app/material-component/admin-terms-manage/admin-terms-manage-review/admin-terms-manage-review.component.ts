import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminTermsManagementSetCheckRequestModel } from '../../../../interfaces/adminTerms/admin-terms-manage-model';
import { AdminTermsManageService } from '../../../../services/admin/admin-terms-manage.service';

@Component({
  selector: 'app-admin-terms-manage-review',
  templateUrl: './admin-terms-manage-review.component.html',
  styleUrls: ['./admin-terms-manage-review.component.css']
})
export class AdminTermsManageReviewComponent implements OnInit {
  addForm!: FormGroup;
  statusValue: any;
  disabled = true;
  adminTermsManagementSetCheckRequestModel: AdminTermsManagementSetCheckRequestModel;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminTermsManageReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminTermsManageService: AdminTermsManageService) {
    this.addForm = this.fb.group({
      title: new FormControl({ value: this.data.title, disabled: true }, Validators.required),
      content: new FormControl({ value: this.data.content, disabled: true }, Validators.required),
      check_status: new FormControl({ value: this.data.check_status }, Validators.required)
    });
    this.adminTermsManagementSetCheckRequestModel = {
      id: this.data.id,
      check_status: 0
    }
  }

  ngOnInit(): void {
  }

  setValue() {
    this.adminTermsManagementSetCheckRequestModel.check_status = parseInt(this.addForm.value.check_status);
  }

  close() {
    this.dialogRef.close();
  }


  review() {
    this.setValue();
    this.adminTermsManageService.termsCheckStatus(this.adminTermsManagementSetCheckRequestModel).subscribe(res => {
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
