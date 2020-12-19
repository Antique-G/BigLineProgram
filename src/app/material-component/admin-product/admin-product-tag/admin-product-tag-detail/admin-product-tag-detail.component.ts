import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { AdminProductTagService } from '../../../../../services/admin/admin-product-tag.service';
import { DatumModel, UpdateAdminProductRequestModel } from '../../../../../interfaces/adminProduct/ProductTagModel';


@Component({
  selector: 'app-admin-product-tag-detail',
  templateUrl: './admin-product-tag-detail.component.html',
  styleUrls: ['./admin-product-tag-detail.component.css']
})
export class AdminProductTagDetailComponent implements OnInit {
  detailModel: DatumModel;
  updateAdminProductRequestModel: UpdateAdminProductRequestModel;
  addForm!: FormGroup;
  optionList: any[] = [];
  selectedValue: any;

  validationMessage: any = {
    name: {
      'maxlength': '产品标签长度最多为32个字符',
      'required': '请输入产品标签！'
    },
    cate_id: {
      'required': '请选择分类！'
    },
  };
  formErrors: any = {
    name: '',
    cate_id: ''
  };



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminProductTagDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public adminProductTagService: AdminProductTagService) {
    this.detailModel = this.data;
    this.selectedValue = this.detailModel.cate_id;
    this.forms();

    this.updateAdminProductRequestModel = {
      name: '',
      cate_id: 0,
      status: 0,
    }

  }

  forms() {
    this.addForm = this.fb.group({
      name: [this.detailModel.name, [Validators.required]],
      cate_id: [this.detailModel.cate_id, Validators.required],
      status: [this.detailModel.status, [Validators.required]]
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
    this.selectedValue = this.detailModel.cate_id;
    this.getCateList();
  }


  setValue() {
    this.updateAdminProductRequestModel.name = this.addForm.value.name;
    this.updateAdminProductRequestModel.cate_id = this.addForm.value.cate_id;
    this.updateAdminProductRequestModel.status = this.addForm.value.status;
  }

  update() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.updateAdminProductRequestModel.id = this.detailModel.id;
      this.adminProductTagService.updateProductTag(this.updateAdminProductRequestModel).subscribe(res => {
        console.log('分类的结果', res);
        if (res?.status_code) {
          // alert("更新失败");
        }
        else {
          // alert("更新成功");
          this.dialogRef.close(1);
        }
      })
    }

  }


  // 分类
  getCateList() {
    this.adminProductTagService.getProdectCateList().subscribe(res => {
      console.log('分类的结果', res.data);
      let a = { label: res.data[0].name, value: res.data[0].name, id: parseInt(res.data[0].id) };
      console.log("aaaa", a)
      this.optionList.push(a);
      let b = { label: res.data[1].name, value: res.data[1].name, id: parseInt(res.data[1].id) };
      this.optionList.push(b);
      console.log("this.optionList", this.optionList);
    })
  }


  


  close() {
    this.dialogRef.close();
  }


  log(a: any): void {
    console.log('选择的值是', a);
    this.updateAdminProductRequestModel.cate_id = a;
  }

}
