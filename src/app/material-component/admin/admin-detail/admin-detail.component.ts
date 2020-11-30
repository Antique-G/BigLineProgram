import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminAdminService } from '../../../../services/admin/admin-admin.service';
import { AdminDetailModel, UpdateRequestModel } from '../../../../interfaces/adminAdmin/admin-admin-model';



@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  addForm!: FormGroup;
  adminDetailModel: AdminDetailModel;
  updateRequestModel: UpdateRequestModel;



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminAdminService: AdminAdminService) {
    this.adminDetailModel = this.data;
    this.addForm = this.fb.group({
      account: [this.adminDetailModel.account, [Validators.required]],
      name: [this.adminDetailModel.real_name, [Validators.required]],
      phoneNumber: [this.adminDetailModel.mobile, [Validators.required]],
      status: [this.adminDetailModel.status, [Validators.required]]
    });
    this.updateRequestModel = {
      real_name: '',
      mobile: '',
      status: ''
    }
  }


  setValue() {
    this.updateRequestModel.real_name = this.addForm.value.name;
    this.updateRequestModel.mobile = this.addForm.value.phoneNumber;
    this.updateRequestModel.status = this.addForm.value.status;
  }


  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }


  update() {
    console.log("this.adminDetaiupdateRequestModellModel", this.updateRequestModel);
    this.setValue();
    this.updateRequestModel.admin_id = this.adminDetailModel.admin_id;
    this.adminAdminService.updateUser(this.updateRequestModel).subscribe(res => {
      console.log("res", res);
      if (res === null) {
        alert("更新成功");
        this.dialogRef.close(1);
      }
      else{
        alert("更新失败");
      }
    })
  }
}
