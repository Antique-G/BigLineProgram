import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import { AddStoreMeetingPlaceRequestModel } from '../../../../../interfaces/store/storeMeetingPlace/store-meeting-place-model';
import { StoreMeetingPlaceService } from '../../../../../services/store/store-meeting-place/store-meeting-place.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-store-meeting-place-create',
  templateUrl: './store-meeting-place-create.component.html',
  styleUrls: ['./store-meeting-place-create.component.css'],
  providers: [DatePipe]
})
export class StoreMeetingPlaceCreateComponent implements OnInit {
  public isSpinning: any = true;    //loading 
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;
  addForm!: FormGroup;
  status = '1';
  isChoiceValue = '1';

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
    time_state: {
      'required': '请选择'
    },
  };
  formErrors: any = {
    name: '',
    regionCode: '',
    time_state: ''
  };



  constructor(public fb: FormBuilder, private datePipe: DatePipe,
    public storeRegionService: StoreRegionService, public storeMeetingPlaceService: StoreMeetingPlaceService) {
    // 拿到缓存的集合地点
    console.log("234234", localStorage.getItem("storeRegion"));
    console.log("353535", localStorage.getItem("lastRegion"));
    // 缓存上一次输入的区域
    if (localStorage.getItem("lastRegion") == null) {
      const str = localStorage.getItem("storeRegion");
      if (str != null) {
        for (let i = 0; i < str.length / 4; i++) {
          let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
          this.values.push(temp);
        }

        console.log("111", this.values);    //区域
      }

    }
    // 刚登陆的店铺区域
    else if (localStorage.getItem("lastRegion") != null) {
      const str = localStorage.getItem("lastRegion");
      if (str != null) {
        for (let i = 0; i < str.length / 4; i++) {
          let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
          this.values.push(temp);
        }
        console.log("111", this.values);    //区域
      }
    }


    this.forms();
    this.addStoreMeetingPlaceRequestModel = {
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
      regionCode: [localStorage.getItem("storeRegion"), [Validators.required]],
      address: [''],
      status: [1, [Validators.required]],
      timeMeeting: [null],
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
    this.storeRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
      this.isSpinning = false
    })

  }


  setValue() {
    this.addStoreMeetingPlaceRequestModel.name = this.addForm.value.name;
    this.addStoreMeetingPlaceRequestModel.region_code = this.addForm.value.regionCode;
    this.addStoreMeetingPlaceRequestModel.address = this.addForm.value.address;
    this.addStoreMeetingPlaceRequestModel.status = this.addForm.value.status;
    this.addStoreMeetingPlaceRequestModel.time_state = this.addForm.value.time_state;
    if (this.addStoreMeetingPlaceRequestModel.time_state === 1) {
      let times = this.datePipe.transform(this.addForm.value.timeMeeting, 'HH:mm');
      this.addStoreMeetingPlaceRequestModel.time = times;
    }
    else if (this.addStoreMeetingPlaceRequestModel.time_state === 0) {
      let times = this.datePipe.transform(new Date(), 'HH:mm');
      this.addStoreMeetingPlaceRequestModel.time = times;
    }


  }

  log(time: Date): void {
    console.log(time && time.toTimeString());
    console.log("time是什么", time)
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
          localStorage.setItem("lastRegion", this.addStoreMeetingPlaceRequestModel.region_code);
          // this.dialogRef.close(1);
        }
        else {
          // alert("创建失败，请重新填写");
        }
      })
    }
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


  isChoice(data: any) {
    console.log("this.values", data);
    if (data === 1) {
      this.isChoiceValue = '1';
    }
  }


  

}
