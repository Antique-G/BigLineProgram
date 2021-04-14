import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreUpdateRequestModel, StoreDetailModel } from '../../../../interfaces/adminStore/admin-store-model';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-admin-store-detail',
  templateUrl: './admin-store-detail.component.html',
  styleUrls: ['./admin-store-detail.component.css']
})
export class AdminStoreDetailComponent implements OnInit {
  @Input() data: any;


  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;


  addForm!: FormGroup;
  status = '1';

  storeDetailModel!: StoreDetailModel;
  storeUpdateRequestModel: StoreUpdateRequestModel;

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


  // 选择了周几
  weekValue: any[] = [1, 2, 3, 4, 5, 6, 0];
  // 选择周几
  checkWeeks = [
    { label: '周一', value: 1, checked: false },
    { label: '周二', value: 2, checked: false },
    { label: '周三', value: 3, checked: false },
    { label: '周四', value: 4, checked: false },
    { label: '周五', value: 5, checked: false },
    { label: '周六', value: 6, checked: false },
    { label: '周日', value: 0, checked: false },
  ]
  time1: any;
  time2: any;
  HourArr1: any;
  HourArr2: any;



  constructor(public fb: FormBuilder,private msg: NzMessageService,
    public adminRegionService: AdminRegionService, public adminStoreService: AdminStoreService) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      regionCode: ['', [Validators.required]],
      address: ['',],
      fax: ['',],
      phone: ['',],
      status: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      week: ['', [Validators.required]],
      date1: [null, [Validators.required]],
      date2: [null, [Validators.required]],
      type: ['', [Validators.required]],
    });
    this.storeUpdateRequestModel = {
      name: '',
      region_code: '',
      address: '',
      fax: '',
      phone: '',
      status: 0,
      contact: '',
      mobile: '',
      work_date: '',
      work_time: '',
      type:1
    }

  }




  ngOnInit(): void {
    this.storeDetailModel = this.data;
    console.log("111", this.values);    //区域
    this.adminRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
      if (this.storeDetailModel.work_date != '') {
        this.weekValue = eval('(' + this.storeDetailModel?.work_date + ')');
        console.log('this.weekValue111111 ', this.weekValue);
        this.checkWeeks.forEach((item: any, index: any) => {
          if (this.weekValue.includes(item.value)) {
            item.checked = true;
          }
          else {
            item.checked = false;
          }
        });
      }
      else {
        this.checkWeeks.forEach((element: any) => {
          element.checked = false;
        });
      }
    
    })

    if (this.storeDetailModel.work_time != '') {
      console.log('object :>> ', this.storeDetailModel.work_time);
      let arr = this.storeDetailModel.work_time.split("-");
      console.log('arr :>> ', arr);
      let time11 = '2021-01-01' + ' ' + arr[0];
      this.time1 = new Date(time11);
      let time22 = '2021-01-01' + ' ' + arr[1];
      this.time2 = new Date(time22);
    }
    else {
      this.time1 = new Date();
      this.time2 = new Date();
    }

    const str = this.storeDetailModel.region_code;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }

  }


  setValue() {
    this.storeUpdateRequestModel.name = this.addForm.value.name;
    this.storeUpdateRequestModel.region_code = this.addForm.value.regionCode;
    this.storeUpdateRequestModel.address = this.addForm.value.address;
    this.storeUpdateRequestModel.fax = this.addForm.value.fax;
    this.storeUpdateRequestModel.phone = this.addForm.value.phone
    this.storeUpdateRequestModel.status = this.addForm.value.status;
    this.storeUpdateRequestModel.type = this.addForm.value.type;
    this.storeUpdateRequestModel.contact = this.addForm.value.contact;
    this.storeUpdateRequestModel.mobile = this.addForm.value.mobile;
    this.storeUpdateRequestModel.work_date = this.weekValue;
    this.storeUpdateRequestModel.work_time = format(new Date(this.addForm.value.date1), 'HH:mm') + '-' + format(new Date(this.addForm.value.date2), 'HH:mm');
 
  }


  update() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.HourArr1 = format(new Date(this.addForm.value.date1), 'HH');
      this.HourArr2 = format(new Date(this.addForm.value.date2), 'HH');
      if (Number(this.HourArr2) < Number(this.HourArr1)) {
        this.msg.error('时间选择错误，请重新选择时间');
      }
      else{
        this.storeUpdateRequestModel.store_id = this.storeDetailModel.store_id;
        this.storeUpdateRequestModel.region_code = this.idRegion;
        console.log("提交的model是什么", this.storeUpdateRequestModel);
        this.adminStoreService.updateStore(this.storeUpdateRequestModel).subscribe(res => {
          console.log("res结果", res);
          if (res.message) {
            // alert("更新成功");
  
          }
          else {
            // alert("更新失败")
          }
        })
      }
    
    }
  }




  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }
  }



  ngCheckBoxChange(value: object[]): void {
    let a: any;
    a = value;
    let i: any[] = [];
    a.forEach((element: any) => {
      console.log('11111111 :>> ', element);
      if (element['checked'] === true) {
        i.push(element['value'])
      }
    })
    this.weekValue = i;
    console.log('11111111111', value, this.weekValue);

  }
}
