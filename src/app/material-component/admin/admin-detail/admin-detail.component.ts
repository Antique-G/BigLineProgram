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

  validationMessage: any = {
    account: {
      'maxlength': '用户名长度最多为32个字符',
      'required': '请输入用户名！'
    },
    name: {
      'maxlength': '真实姓名长度最多为32个字符',
      'required': '请输入真实姓名！'
    },
    phoneNumber: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入您的手机号！'
    },
  };
  formErrors: any = {
    account: '',
    name: '',
    phoneNumber: '',
  };




  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminAdminService: AdminAdminService) {
    this.adminDetailModel = this.data;
    this.forms();
    // this.addForm = this.fb.group({
    //   account: [this.adminDetailModel.account, [Validators.required]],
    //   name: [this.adminDetailModel.real_name, [Validators.required]],
    //   phoneNumber: [this.adminDetailModel.mobile, [Validators.required]],
    //   status: [this.adminDetailModel.status, [Validators.required]]
    // });
    this.updateRequestModel = {
      real_name: '',
      mobile: '',
      status: ''
    }
  }


  forms() {
    this.addForm = this.fb.group({
      account: [this.adminDetailModel.account, [Validators.required]],
      name: [this.adminDetailModel.real_name, [Validators.required]],
      phoneNumber: [this.adminDetailModel.mobile, [Validators.required]],
      status: [this.adminDetailModel.status, [Validators.required]]
    });
    // 每次表单数据发生变化的时候更新错误信息
    this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
  }

  // 表单验证
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.addForm) return;
    // 获取当前的表单
    const form = this.addForm;
    // 遍历错误消息对象
    for (const field in this.formErrors) {
      // 清空当前的错误消息
      this.formErrors[field] = '';
      // 获取当前表单的控件
      const control: any = form.get(field);
      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && !control.valid) {
        // 获取验证不通过的控件名，为了获取更详细的不通过信息
        const messages = this.validationMessage[field];
        // 遍历当前控件的错误对象，获取到验证不通过的属性
        for (const key in control.errors) {
          // 把所有验证不通过项的说明文字拼接成错误消息
          this.formErrors[field] = messages[key];
        }
      }
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
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.updateRequestModel.admin_id = this.adminDetailModel.admin_id;
      this.adminAdminService.updateUser(this.updateRequestModel).subscribe(res => {
        console.log("res", res);
        if (res === null) {
          alert("更新成功");
          this.dialogRef.close(1);
        }
        else {
          alert("更新失败");
        }
      })
    }
  }
}
