import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AdminSaleTitleService } from '../../../../services/admin/admin-sale-title.service';
import { SaleTitleDetailModel, SaleTitleUpdateRequestModel } from '../../../../interfaces/adminSaleTitle/admin-sale-title-model';
import { isclearNoNum } from '../../../../app/util/validators';

@Component({
  selector: 'app-admin-sale-title-detail',
  templateUrl: './admin-sale-title-detail.component.html',
  styleUrls: ['./admin-sale-title-detail.component.css']
})
export class AdminSaleTitleDetailComponent implements OnInit {
  addForm!: FormGroup;
  saleTitleDetailModel:SaleTitleDetailModel;
  saleTitleUpdateRequestModel:SaleTitleUpdateRequestModel;

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
      'isclearNoNum': '不能输入数字以外的字符',
      'required': '请输入最多2位小数位的数字！'
    },

  };

  formErrors: any = {
    title: '',
    reward_rate: '',
  };

  
  constructor(public fb:FormBuilder, public dialogRef: MatDialogRef<AdminSaleTitleDetailComponent>,public adminSaleTitleService:AdminSaleTitleService,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.saleTitleDetailModel = this.data;
    this.forms();
    this.saleTitleUpdateRequestModel ={
      title: '',
      reward_rate: '',
    }

  }
  
  forms(){
    this.addForm =this.fb.group({
      title: [this.saleTitleDetailModel.title, [Validators.required, Validators.maxLength(32)]],
      reward_rate: [this.saleTitleDetailModel.reward_rate, [Validators.required]],
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
  update(){
    this.saleTitleUpdateRequestModel.title = this.addForm.value.title;
    this.saleTitleUpdateRequestModel.reward_rate = this.addForm.value.reward_rate;
    console.log('修改接口需要的传的参数',this.saleTitleUpdateRequestModel,this.saleTitleDetailModel.id)
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.saleTitleUpdateRequestModel.id = this.saleTitleDetailModel.id;
      this.adminSaleTitleService.saleTitleUpdate(this.saleTitleUpdateRequestModel).subscribe(res => {
        console.log("res",res);
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
