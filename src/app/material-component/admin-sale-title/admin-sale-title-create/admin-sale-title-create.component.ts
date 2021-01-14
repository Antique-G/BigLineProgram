import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { SaleTitleCreateRequestModel } from '../../../../interfaces/adminSaleTitle/admin-sale-title-model';
import { AdminSaleTitleService } from '../../../../services/admin/admin-sale-title.service';

@Component({
  selector: 'app-admin-sale-title-create',
  templateUrl: './admin-sale-title-create.component.html',
  styleUrls: ['./admin-sale-title-create.component.css']
})
export class AdminSaleTitleCreateComponent implements OnInit {
  addForm!: FormGroup;
  saleTitleCreateRequestModel:SaleTitleCreateRequestModel;

  precision = 2;
  customPrecisionFn(value: string | number, precision?: number): number {
    return +Number(value).toFixed(precision! + 1);
  }

  validationMessage: any = {
    title: {
      'maxlength': '门店头衔长度最多为32个字符',
      'required': '请输入门店头衔！'
    },
    reward_rate: {
      // 'isNumber': '请输入数字',
      'required': '请输入最多2位小数位的数字！'
    }

  };

  formErrors: any = {
    title: '',
    reward_rate: '',
  };

  
  constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AdminSaleTitleCreateComponent>,public adminSaleTitleService:AdminSaleTitleService) {
    this.forms();
    this.saleTitleCreateRequestModel ={
      title: '',
      reward_rate: 0,
    }

  }
  
  forms(){
    this.addForm =this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(32)]],
      reward_rate: [0, [Validators.required]],
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
  
  add(){
    console.log('表单输入了啥', this.addForm.value);
    this.saleTitleCreateRequestModel.title = this.addForm.value.title;
    this.saleTitleCreateRequestModel.reward_rate = this.addForm.value.reward_rate;
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log('接口需要提交的参数', this.saleTitleCreateRequestModel);
    if(this.addForm.valid){
      this.adminSaleTitleService.saleTitleCreate(this.saleTitleCreateRequestModel).subscribe(res =>{
        console.log('res结果',res)
        if (res === null) {
          this.dialogRef.close(1);
        }else{
          
        }
      })
    }
  }

  //关闭弹窗
  close(): void {
    this.dialogRef.close();
  }
}
