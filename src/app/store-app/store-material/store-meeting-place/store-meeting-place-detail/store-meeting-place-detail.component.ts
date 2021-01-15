import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import { Datum, UpdateStoreMeetingPlaceRequestModel } from '../../../../../interfaces/store/storeMeetingPlace/store-meeting-place-model';
import { StoreMeetingPlaceService } from '../../../../../services/store/store-meeting-place/store-meeting-place.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-store-meeting-place-detail',
  templateUrl: './store-meeting-place-detail.component.html',
  styleUrls: ['./store-meeting-place-detail.component.css'],
  providers: [DatePipe]
})
export class StoreMeetingPlaceDetailComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;
  addForm!: FormGroup;
  isChoiceValue = '1';

  updateStoreMeetingPlaceRequestModel: UpdateStoreMeetingPlaceRequestModel;
  detailModel!: Datum;

  public isSpinning: any = true;    //loading 

  newtime = new Date();
  todayDate: any;

  @Input() data: any


  validationMessage: any = {
    name: {
      'maxlength': '集合地点名称长度最多为32个字符',
      'required': '请输入集合地点名称！'
    },
    timeMeeting: {
      'required': '请输入'
    },

  };
  formErrors: any = {
    name: '',
    timeMeeting: ''
  };



  constructor(public fb: FormBuilder, private datePipe: DatePipe,
    public storeRegionService: StoreRegionService, public storeMeetingPlaceService: StoreMeetingPlaceService) {
    this.forms();
    this.updateStoreMeetingPlaceRequestModel = {
      name: '',
      region_code: '',
      address: '',
      status: 1,
      time: '',
      time_state: 0
    }
  }

  forms() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      regionCode: ['', [Validators.required]],
      address: ['',],
      status: ['', [Validators.required]],
      timeMeeting: [null, [Validators.required]],
      time_state: [1, [Validators.required]],
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
    this.detailModel = this.data;
    console.log("this.detailModel", this.detailModel)
    const str = this.detailModel.region_code;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    console.log("111", this.values);    //区域
    console.log("newtime", this.datePipe.transform(this.newtime, 'yyyy-mm-dd '))
    let today = this.datePipe.transform(this.newtime, 'yyyy-MM-dd') + ' ' + this.detailModel.time;
    this.todayDate = new Date(today)
    console.log('today', this.todayDate);
    this.isChoiceValue = this.detailModel?.time_state;
    this.addForm.setValue({
      name: this.detailModel.name,
      regionCode: this.detailModel.region_code,
      address: this.detailModel.address,
      status: this.detailModel.status,
      timeMeeting: this.todayDate,
      time_state: this.detailModel?.time_state
    })
    this.storeRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
      this.isSpinning = false;
    })
  }

  setValue() {
    this.updateStoreMeetingPlaceRequestModel.name = this.addForm.value.name;
    this.updateStoreMeetingPlaceRequestModel.region_code = this.addForm.value.regionCode;
    this.updateStoreMeetingPlaceRequestModel.address = this.addForm.value.address;
    this.updateStoreMeetingPlaceRequestModel.status = this.addForm.value.status;
    this.updateStoreMeetingPlaceRequestModel.time_state = this.addForm.value.time_state;
    if (this.updateStoreMeetingPlaceRequestModel.time_state === '0') {
      let times = this.datePipe.transform(this.addForm.value.timeMeeting, 'HH:mm');
      this.updateStoreMeetingPlaceRequestModel.time = times;
    }
    else if (this.updateStoreMeetingPlaceRequestModel.time_state === '1') {
      this.updateStoreMeetingPlaceRequestModel.time = '00:00';
    }
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
          // alert("更新成功");
          // this.dialogRef.close(1);
        }
        else {
          // alert("更新失败，请重新填写");
        }
      })
    }
  }

  log(time: Date): void {
    console.log(time && time.toTimeString());
    console.log("time是什么", time)
  }



  close(): void {
    // this.dialogRef.close();
  }

  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }
  }



  isChoice(element: any) {
    console.log("this.values", element);
    if (element === '0') {
      this.isChoiceValue = '0';
      console.log("this.isChoiceValue", this.isChoiceValue)
    }
    else{
      this.isChoiceValue = '1';
    }
  
  }
}
