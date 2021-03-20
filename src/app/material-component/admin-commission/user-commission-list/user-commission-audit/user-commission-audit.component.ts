import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUserCommissionListService } from '../../../../../services/admin/admin-user-commission-list.service';
import { UserCommissionAuditModel } from '../../../../../interfaces/adminUserCommissionList/admin-userCommissionList-model';

@Component({
  selector: 'app-user-commission-audit',
  templateUrl: './user-commission-audit.component.html',
  styleUrls: ['./user-commission-audit.component.css']
})
export class UserCommissionAuditComponent implements OnInit {
  addForm!: FormGroup;
  disabled = true;
  isContent = false;
  loading = true;
  userCommissionAuditModel:UserCommissionAuditModel;
  
  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<UserCommissionAuditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,public adminUserCommissionListService:AdminUserCommissionListService,) {
    console.log("data是什么", this.data,this.data.length);
    this.addForm = this.fb.group({
      product_nam: new FormControl({ value: this.data[0].orders.product_name, disabled: true }, Validators.required),
      dist_reward: new FormControl({ value: this.data[0].dist_reward, disabled: true }, Validators.required),
      status: new FormControl({ value: this.data[0].status }, Validators.required),
      content: new FormControl(this.data[1])
    });
    this.userCommissionAuditModel = {
      id: this.data[0].id,
      status: 0,
      content: ''

    }
    
  }

  ngOnInit(): void {
   
  }
  setValue(){
    this.userCommissionAuditModel.status = parseInt(this.addForm.value.status);
    if (this.userCommissionAuditModel.status === 4 ) {
      this.userCommissionAuditModel.content = this.addForm.value.reason
    }else{
      this.userCommissionAuditModel.content = '';
    }
  }

  review() {
    this.setValue();
    this.loading = true;
    console.log('this.userCommissionAuditModel',this.userCommissionAuditModel);
    this.adminUserCommissionListService.UserCommissionAudit(this.userCommissionAuditModel).subscribe((result: any) => {
      console.log("result", result)
      this.loading = false;
      if (result?.status_code) {
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
    if (element === '4') {
      this.isContent = true;
    }
    else {
      this.isContent = false;
    }
  }

  close() {
    this.dialogRef.close();
  }


}
