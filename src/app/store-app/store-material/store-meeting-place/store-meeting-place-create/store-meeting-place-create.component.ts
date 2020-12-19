import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import { AddStoreMeetingPlaceRequestModel } from '../../../../../interfaces/store/storeMeetingPlace/store-meeting-place-model';
import { StoreMeetingPlaceService } from '../../../../../services/store/store-meeting-place/store-meeting-place.service';


@Component({
  selector: 'app-store-meeting-place-create',
  templateUrl: './store-meeting-place-create.component.html',
  styleUrls: ['./store-meeting-place-create.component.css']
})
export class StoreMeetingPlaceCreateComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  idRegion: any;
  addForm!: FormGroup;
  status = '1';
  time: Date | null = null;

  addStoreMeetingPlaceRequestModel: AddStoreMeetingPlaceRequestModel;

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
    },
    timeMeeting: {
      'required': '请输入集合时间！'
    }
  };
  formErrors: any = {
    name: '',
    regionCode: '',
    address: '',
    timeMeeting: '',
  };



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreMeetingPlaceCreateComponent>,
    public storeRegionService: StoreRegionService, public storeMeetingPlaceService: StoreMeetingPlaceService) {
    this.forms();
    this.addStoreMeetingPlaceRequestModel = {
      name: '',
      region_code: '',
      address: '',
      status: 1,
      time: ''
    }
  }


  forms() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      regionCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: [1, [Validators.required]],
      timeMeeting: ['', [Validators.required]],
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
    this.addStoreMeetingPlaceRequestModel.name = this.addForm.value.name;
    this.addStoreMeetingPlaceRequestModel.region_code = this.addForm.value.regionCode;
    this.addStoreMeetingPlaceRequestModel.address = this.addForm.value.address;
    this.addStoreMeetingPlaceRequestModel.status = this.addForm.value.status;
    console.log(" this.addForm.value.timeMeeting", this.addForm.value.timeMeeting);
    console.log(" this.addForm.value.timeMeeting", this.time)
    this.addStoreMeetingPlaceRequestModel.time = this.addForm.value.timeMeeting;

  }

  log(time: Date): void {
    console.log(time && time.toTimeString());
  }


  add() {
    this.setValue();
    this.addStoreMeetingPlaceRequestModel.region_code = this.idRegion;
    console.log("提交的model是什么", this.addStoreMeetingPlaceRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.storeMeetingPlaceService.addStoreMeetingPlace(this.addStoreMeetingPlaceRequestModel).subscribe(res => {
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

  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }
  }


}
