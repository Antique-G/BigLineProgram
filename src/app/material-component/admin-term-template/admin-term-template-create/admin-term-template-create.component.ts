import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminTermTemplateService } from '../../../../services/admin/admin-term-template.service';
import { AddAdminTermsTemplateRequestModel } from '../../../../interfaces/adminTermTemplate/admin-term-template-model';
import wangEditor from 'wangeditor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-term-template-create',
  templateUrl: './admin-term-template-create.component.html',
  styleUrls: ['./admin-term-template-create.component.css']
})
export class AdminTermTemplateCreateComponent implements OnInit {
  addForm!: FormGroup;
  status = '1';

  addAdminTermsTemplateRequestModel: AddAdminTermsTemplateRequestModel;

  validationMessage: any = {
    title: {
      'required': '请输入标题！'
    },
  };
  formErrors: any = {
    title: '',

  };


  constructor(public fb: FormBuilder, public adminTermTemplateService: AdminTermTemplateService, private router: Router,) {
    this.forms();
    this.addAdminTermsTemplateRequestModel = {
      title: '',
      content: '',
      status: 1,
    }
  }

  forms() {
    this.addForm = this.fb.group({
      title: ['', [Validators.required]],
      status: [1, [Validators.required]],
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
    this.textChange();  //富文本初始化

  }



  setValue() {
    this.addAdminTermsTemplateRequestModel.title = this.addForm.value.title;
    this.addAdminTermsTemplateRequestModel.status = this.addForm.value.status;
  }


  add() {
    this.setValue();
    console.log("提交的model是什么", this.addAdminTermsTemplateRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminTermTemplateService.addTemplate(this.addAdminTermsTemplateRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res.status) {
        }
        else {
          this.router.navigate(['/admin/main/termTemplate']);
        }
      })
    }
  }


  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    editorFeature.config.onchange = (newHtml: any) => {
      console.log(newHtml);
      this.addAdminTermsTemplateRequestModel.content = newHtml;
    }
    editorFeature.create();
  }


}
