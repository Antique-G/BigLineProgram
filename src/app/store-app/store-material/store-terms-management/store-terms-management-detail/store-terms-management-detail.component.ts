import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDetailModel, UpdateStoreTermsManagementeRequestModel } from '../../../../../interfaces/store/storeTermsManagement/store-terms-management-model';
import { StoreTermsManagementService } from '../../../../../services/store/store-terms-management/store-terms-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import wangEditor from 'wangeditor';
@Component({
  selector: 'app-store-terms-management-detail',
  templateUrl: './store-terms-management-detail.component.html',
  styleUrls: ['./store-terms-management-detail.component.css']
})
export class StoreTermsManagementDetailComponent implements OnInit {
  addForm!: FormGroup;
  dataDetailModel: DataDetailModel;
  updateStoreTermsManagementeRequestModel: UpdateStoreTermsManagementeRequestModel;
  public isSpinning: any = true;    //loading 
  detailId: any
  @ViewChild("featureBox") featureBox: any;       //获取dom
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

  status = 1;



  constructor(public fb: FormBuilder, public storeTermsManagementService: StoreTermsManagementService,
    public router: Router, public activatedRoute: ActivatedRoute,) {
    this.dataDetailModel = {
      id: 0,
      title: '',
      content: '',
      status: 0,
      created_at: '',
      updated_at: ''
    };
    this.forms();
    this.updateStoreTermsManagementeRequestModel = {
      title: '',
      content: '',
      status: 1
    }

  }

  forms() {
    this.addForm = this.fb.group({
      title: [this.dataDetailModel.title, [Validators.required]],
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailId;
      this.getTermsDetail();
    });

  }


  setValue() {
    this.updateStoreTermsManagementeRequestModel.title = this.addForm.value.title;
    this.updateStoreTermsManagementeRequestModel.status = this.addForm.value.status;

  }

  getTermsDetail() {
    this.storeTermsManagementService.storeTermsDetail(this.detailId).subscribe(res => {
      this.dataDetailModel = res.data;
      this.status = this.dataDetailModel.status;
      this.isSpinning = false;
      this.setFormValue()
      this.textChange();  //富文本初始化
      console.log(this.dataDetailModel);
    })

  }
  setFormValue() {
    this.addForm.get('title')?.setValue(this.dataDetailModel.title);
    this.addForm.get('status')?.setValue(this.dataDetailModel.status);
  }

  update() {
    this.setValue();
    this.updateStoreTermsManagementeRequestModel.id = this.dataDetailModel.id;
    console.log("提交的model是什么", this.updateStoreTermsManagementeRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log(this.addForm.valid, this.addForm);
    if (this.addForm.valid) {
      this.storeTermsManagementService.updateStoreTerms(this.updateStoreTermsManagementeRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res===null) {
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


  close(): void {
    // this.dialogRef.close();
  }

  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    console.log("拿到的feature", this.dataDetailModel.content);
    this.featureBox.nativeElement.innerHTML = this.dataDetailModel.content;    //赋值
    this.updateStoreTermsManagementeRequestModel.content = this.dataDetailModel.content;
    editorFeature.config.onchange = (newHtml: any) => {
      console.log(newHtml);
      this.updateStoreTermsManagementeRequestModel.content = newHtml;
    }
    editorFeature.create();
    // 上传图片
    editorFeature.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorFeature.config.customUploadImg = (files: any, insert: any) => {
      // 限制一次最多上传 1 张图片
      if (files.length !== 1) {
        alert('单次只能上传一个图片')
        return
      }
      console.log("files是什么", files);
      console.log(files[0]);
      let formData = new FormData();
      formData.append('image', files[0] as any);
      console.log("formData是什么", formData.get('file'));
      this.storeTermsManagementService.uploadImg(formData).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }



  }

}
