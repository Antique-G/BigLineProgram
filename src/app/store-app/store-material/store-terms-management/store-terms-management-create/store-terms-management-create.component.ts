import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import wangEditor from 'wangeditor';
import { AddStoreTermsManagementRequestModel } from '../../../../../interfaces/store/storeTermsManagement/store-terms-management-model';
import { StoreTermsManagementService } from '../../../../../services/store/store-terms-management/store-terms-management.service';
import { StoreTemplateExampleComponent } from './store-template-example/store-template-example.component';


@Component({
  selector: 'app-store-terms-management-create',
  templateUrl: './store-terms-management-create.component.html',
  styleUrls: ['./store-terms-management-create.component.css']
})
export class StoreTermsManagementCreateComponent implements OnInit {
  addForm!: FormGroup;
  status = '1';
  listOfOption: any[] = [];
  isCheck = false;

  addStoreTermsManagementRequestModel: AddStoreTermsManagementRequestModel;

  validationMessage: any = {
    temp_id: {
      'required': '请选择模板！'
    },
  };
  formErrors: any = {
    temp_id: '',
  };

  templateId: any;


  constructor(public fb: FormBuilder, public router: Router, public dialog: MatDialog,
    public storeTermsManagementService: StoreTermsManagementService) {
    this.forms();
    this.addStoreTermsManagementRequestModel = {
      title: '',
      content: '',
      status: 1,
      temp_id: 1,
    }
  }

  forms() {
    this.addForm = this.fb.group({
      temp_id: [''],
      title: [''],
      content: [''],
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
    this.templateList();
    this.textChange();  //富文本初始化
  }

  templateList() {
    this.storeTermsManagementService.termsTemplateList(1, 1000, '').subscribe(res => {
      console.log("结果", res);
      for (let i of res.data) {
        let a = { value: i.id, label: i.title };
        this.listOfOption.push(a);
      }
    })
  }

  selectTemplate(event: any) {
    console.log("event", event)
    this.isCheck = true;
    this.addStoreTermsManagementRequestModel.temp_id = event;
    this.templateId = event;
  }



  setValue() {
    this.addStoreTermsManagementRequestModel.title = this.addForm.value.title;
    this.addStoreTermsManagementRequestModel.status = this.addForm.value.status;
  }


  add() {
    this.setValue();
    console.log("提交的model是什么", this.addStoreTermsManagementRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("this.addForm.", this.addForm)
    if (this.addForm.valid) {
      this.storeTermsManagementService.addStoreTerms(this.addStoreTermsManagementRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res === null) {
          // alert("更新成功");
          // this.dialogRef.close(1);
          this.router.navigate(['/store/main/storeTermsManage']);
        }
        else {
          // alert("更新失败");

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
      this.addStoreTermsManagementRequestModel.content = newHtml;
    }
    editorFeature.create();
  }



  detail() {
    this.storeTermsManagementService.templateDetail(this.templateId).subscribe(res => {
      const dialogRef = this.dialog.open(StoreTemplateExampleComponent, {
        width: '1000px',
        data: res.data
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("result", result);


      });
    })

  }

}
