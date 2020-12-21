import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataDetailModel, UpdateStoreTermsManagementeRequestModel } from '../../../../../interfaces/store/storeTermsManagement/store-terms-management-model';
import { StoreTermsManagementService } from '../../../../../services/store/store-terms-management/store-terms-management.service';

@Component({
  selector: 'app-store-terms-management-detail',
  templateUrl: './store-terms-management-detail.component.html',
  styleUrls: ['./store-terms-management-detail.component.css']
})
export class StoreTermsManagementDetailComponent implements OnInit {
  addForm!: FormGroup;
  dataDetailModel: DataDetailModel;
  updateStoreTermsManagementeRequestModel: UpdateStoreTermsManagementeRequestModel;

  validationMessage: any = {
    title: {
      'required': '请输入标题！'
    },
    content: {
      'required': '请输入内容！'
    }
  };
  formErrors: any = {
    title: '',
    content: '',
  };


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreTermsManagementDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public storeTermsManagementService: StoreTermsManagementService) {
    this.dataDetailModel = this.data;
    this.forms();
    this.updateStoreTermsManagementeRequestModel = {
      title: '',
      content: '',
      status:1
    
    }
  }

  forms() {
    this.addForm = this.fb.group({
      title: [this.dataDetailModel.title, [Validators.required]],
      content: [this.dataDetailModel.content, [Validators.required]],
      status: [this.dataDetailModel.status, [Validators.required]],
     
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


  ngOnInit(): void {
  }


  setValue() {
    this.updateStoreTermsManagementeRequestModel.title = this.addForm.value.title;
    this.updateStoreTermsManagementeRequestModel.content = this.addForm.value.content;
    this.updateStoreTermsManagementeRequestModel.status = this.addForm.value.status;

  }



  update() {
    this.setValue();
    this.updateStoreTermsManagementeRequestModel.id = this.dataDetailModel.id;
    console.log("提交的model是什么", this.updateStoreTermsManagementeRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.storeTermsManagementService.updateStoreTerms(this.updateStoreTermsManagementeRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res === null) {
          // alert("更新成功");
          this.dialogRef.close(1);
        }
        else {
          // alert("更新失败");
        }
      })
    }
  }


  close(): void {
    this.dialogRef.close();
  }
}
