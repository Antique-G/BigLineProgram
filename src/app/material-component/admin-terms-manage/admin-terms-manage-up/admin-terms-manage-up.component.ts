import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminTermsManagementSetStatusRequestModel } from '../../../../interfaces/adminTerms/admin-terms-manage-model';
import { AdminTermsManageService } from '../../../../services/admin/admin-terms-manage.service';


@Component({
  selector: 'app-admin-terms-manage-up',
  templateUrl: './admin-terms-manage-up.component.html',
  styleUrls: ['./admin-terms-manage-up.component.css']
})
export class AdminTermsManageUpComponent implements OnInit {
  status: any;
  id: any;
  adminTermsManagementSetStatusRequestModel: AdminTermsManagementSetStatusRequestModel;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminTermsManageUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminTermsManageService: AdminTermsManageService) {
    console.log("返回的值", data);
    this.status = data.status;
    this.id = data.id;
    this.adminTermsManagementSetStatusRequestModel = {
      id: data.id,
      status: 1
    }
  }




  ngOnInit(): void {

  }



  update() {
    if (this.status === 1) {
      this.adminTermsManagementSetStatusRequestModel.status = 0;
    }
    else if (this.status === 0) {
      this.adminTermsManagementSetStatusRequestModel.status = 1;
    }
    this.adminTermsManageService.termsSetStatus(this.adminTermsManagementSetStatusRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res === null) {
        this.dialogRef.close(1);
      }
      else {
      }
    })
  }


  close(): void {
    this.dialogRef.close();
  }


  cancel(): void {
    this.dialogRef.close();
  }



}


