import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreTermsManagementRequestModel } from '../../../../../interfaces/store/storeTermsManagement/store-terms-management-model';
import { StoreTermsManagementService } from '../../../../../services/store/store-terms-management/store-terms-management.service';


@Component({
  selector: 'app-store-term-management-review',
  templateUrl: './store-term-management-review.component.html',
  styleUrls: ['./store-term-management-review.component.css']
})
export class StoreTermManagementReviewComponent implements OnInit {
  storeTermsManagementRequestModel: StoreTermsManagementRequestModel;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreTermManagementReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public storeTermsManagementService: StoreTermsManagementService) {
    this.storeTermsManagementRequestModel = {
      id: this.data.id,
      check_status: 0
    }
  }

  ngOnInit(): void {
  }

  update() {
    this.storeTermsManagementRequestModel.check_status = 1;
    this.storeTermsManagementService.productCheckStatus(this.storeTermsManagementRequestModel).subscribe(res => {
      console.log("222222", res)
      if (res?.status_code) {
        // alert("审核更新不成功");
      }
      else {
        // alert("审核更新成功");
        this.dialogRef.close(1);

      }
    })
  }


  cancel() {
    this.dialogRef.close();
  }



  close() {
    this.dialogRef.close();
  }
}
