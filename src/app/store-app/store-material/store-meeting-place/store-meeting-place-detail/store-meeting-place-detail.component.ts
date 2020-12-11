import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import { Datum, UpdateStoreMeetingPlaceRequestModel } from '../../../../../interfaces/store/storeMeetingPlace/store-meeting-place-model';
import { StoreMeetingPlaceService } from '../../../../../services/store/store-meeting-place/store-meeting-place.service';


@Component({
  selector: 'app-store-meeting-place-detail',
  templateUrl: './store-meeting-place-detail.component.html',
  styleUrls: ['./store-meeting-place-detail.component.css']
})
export class StoreMeetingPlaceDetailComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;
  addForm!: FormGroup;

  updateStoreMeetingPlaceRequestModel: UpdateStoreMeetingPlaceRequestModel;
  detailModel: Datum;

  validationMessage: any = {
    name: {
      'maxlength': '集合地点名称长度最多为32个字符',
      'required': '请输入集合地点名称！'
    },
    regionCode: {
      'maxlength': '区域长度最多为16个字符',
      'required': '请选择区域！'
    },
    address: {
      'maxlength': '地址长度最多为255个字符',
      'required': '请输入具体地址！'
    }
  };
  formErrors: any = {
    name: '',
    regionCode: '',
    address: ''
  };



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreMeetingPlaceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public storeRegionService: StoreRegionService, public storeMeetingPlaceService: StoreMeetingPlaceService) {
    this.detailModel = this.data;
    const str = this.detailModel.region_code;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    console.log("111", this.values);    //区域
    this.forms();
    this.updateStoreMeetingPlaceRequestModel = {
      name: '',
      region_code: '',
      address: '',
      status: 1,
    }
  }

  forms() {
    this.addForm = this.fb.group({
      name: [this.detailModel.name, [Validators.required]],
      regionCode: [this.detailModel.region_code, [Validators.required]],
      address: [this.detailModel.address, [Validators.required]],
      status: [this.detailModel.status, [Validators.required]],
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
    this.storeRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
    })
  }

  setValue() {
    this.updateStoreMeetingPlaceRequestModel.name = this.addForm.value.name;
    this.updateStoreMeetingPlaceRequestModel.region_code = this.addForm.value.regionCode;
    this.updateStoreMeetingPlaceRequestModel.address = this.addForm.value.address;
    this.updateStoreMeetingPlaceRequestModel.status = this.addForm.value.status;
  }


  update() {
    this.setValue();
    this.updateStoreMeetingPlaceRequestModel.region_code = this.idRegion;
    this.updateStoreMeetingPlaceRequestModel.id = this.detailModel.id;
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      console.log("提交的model是什么", this.updateStoreMeetingPlaceRequestModel);
      this.storeMeetingPlaceService.updateStoreMeetingPlace(this.updateStoreMeetingPlaceRequestModel).subscribe(res => {
        console.log("res结果", res);
        if (res === null) {
          alert("更新成功");
          this.dialogRef.close(1);
        }
        else {
          alert("更新失败，请重新填写");
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
