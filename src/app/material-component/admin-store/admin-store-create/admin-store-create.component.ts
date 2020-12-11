import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStoreRequestModel } from '../../../../interfaces/adminStore/admin-store-model';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';



@Component({
  selector: 'app-admin-store-create',
  templateUrl: './admin-store-create.component.html',
  styleUrls: ['./admin-store-create.component.css']
})
export class AdminStoreCreateComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  idRegion: any;


  addForm!: FormGroup;
  status = '1';

  addStoreRequestModel: AddStoreRequestModel;

  validationMessage: any = {
    name: {
      'maxlength': '商户名长度最多为64个字符',
      'required': '请输入商户名！'
    },
    regionCode: {
      'maxlength': '区域长度最多为12个字符',
      'required': '请选择区域！'
    },
    contact: {
      'maxlength': '联系人长度最多为32个字符',
      'required': '请输入联系人姓名！'
    },
    mobile: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入联系人手机号！'
    },
  };
  formErrors: any = {
    name: '',
    regionCode: '',
    contact: '',
    mobile: ''
  };




  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreCreateComponent>,
    public adminRegionService: AdminRegionService, public adminStoreService: AdminStoreService) {
    this.forms();
    this.addStoreRequestModel = {
      name: '',
      region_code: '',
      address: '',
      fax: '',
      phone: '',
      status: '',
      contact: '',
      mobile: ''
    }
  }


  forms() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      regionCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      status: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
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
    this.adminRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
    })


  }



  setValue() {
    this.addStoreRequestModel.name = this.addForm.value.name;
    this.addStoreRequestModel.region_code = this.addForm.value.regionCode;
    this.addStoreRequestModel.address = this.addForm.value.address;
    this.addStoreRequestModel.fax = this.addForm.value.fax;
    this.addStoreRequestModel.phone = this.addForm.value.phone
    this.addStoreRequestModel.status = this.addForm.value.status;
    this.addStoreRequestModel.contact = this.addForm.value.contact;
    this.addStoreRequestModel.mobile = this.addForm.value.mobile;


  }


  add() {
    this.setValue();
    this.addStoreRequestModel.region_code = this.idRegion;
    console.log("提交的model是什么", this.addStoreRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
    this.adminStoreService.addStore(this.addStoreRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res.message) {
        alert("创建成功");
        this.dialogRef.close(1);
      }
      else {
        alert("创建失败，请重新填写");
      }
    })
  }
  }


  close(): void {
    this.dialogRef.close();
  }

  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }
  }


}
