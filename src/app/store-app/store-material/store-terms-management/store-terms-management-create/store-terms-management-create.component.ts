import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStoreTermsManagementRequestModel } from '../../../../../interfaces/store/storeTermsManagement/store-terms-management-model';
import { StoreTermsManagementService } from '../../../../../services/store/store-terms-management/store-terms-management.service';


@Component({
  selector: 'app-store-terms-management-create',
  templateUrl: './store-terms-management-create.component.html',
  styleUrls: ['./store-terms-management-create.component.css']
})
export class StoreTermsManagementCreateComponent implements OnInit {
  addForm!: FormGroup;
  addStoreTermsManagementRequestModel: AddStoreTermsManagementRequestModel;

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



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreTermsManagementCreateComponent>,
    public storeTermsManagementService: StoreTermsManagementService) {
    this.forms();
    this.addStoreTermsManagementRequestModel = {
      title: '',
      content: ''
    }
  }

  forms() {
    this.addForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
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


  ngOnInit(): void { }



  setValue() {
    this.addStoreTermsManagementRequestModel.title = this.addForm.value.title;
    this.addStoreTermsManagementRequestModel.content = this.addForm.value.content;
  }


  add() {
    this.setValue();
    console.log("提交的model是什么", this.addStoreTermsManagementRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.storeTermsManagementService.addStoreTerms(this.addStoreTermsManagementRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res === null) {
          // alert("创建成功");
          this.dialogRef.close(1);
        }
        else {
          // alert("创建失败，请重新填写");
        }
      })
    }
  }


  close(): void {
    this.dialogRef.close();
  }


}
