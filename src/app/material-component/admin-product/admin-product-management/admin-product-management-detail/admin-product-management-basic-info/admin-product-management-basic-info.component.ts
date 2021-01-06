import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';
import { AdminProductTagService } from '../../../../../../services/admin/admin-product-tag.service';
import { AdminMeetingPlaceService } from '../../../../../../services/admin/admin-meeting-place.service';
import { AdminRegionService } from '../../../../../../services/admin/admin-region.service';
import { ActivatedRoute, Router } from '@angular/router';
import wangEditor from 'wangeditor';
import { format } from 'date-fns';



@Component({
  selector: 'app-admin-product-management-basic-info',
  templateUrl: './admin-product-management-basic-info.component.html',
  styleUrls: ['./admin-product-management-basic-info.component.css']
})
export class AdminProductManagementBasicInfoComponent implements OnInit {
  addForm!: FormGroup;

  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;

  // 集合地以及标题
  selectedPlace: any[] = [];
  // 目的地
  destinationPalce: any[] = [];
  idDestin: any

  selectedTag: any[] = [];
  assemblingPlaceList: any[] = [];
  tagList: any[] = [];

  // 预定截止日期
  earlierTime = new Date();

 
  dataProductDetailModel: any;
  // 更新model
  detailUpdateModel: any;
  detailId: any;
  isSpinning = true;
  @ViewChild("feeBox") feeBox: any;       // 费用 获取dom



 validationMessage: any = {
    title: {
      'maxlength': '标题长度最多为225个字符',
      'required': '请填写标题'
    },
    few_days: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入出行几天！'
    },
    departure_city: {
      'required': '请选择出发城市'
    },
    destination_city: {
      'required': '请选择目的城市'
    },
    child_age_max: {
      'required': '请输入最大年龄'
    },
    child_height_min: {
      'required': '请输入儿童身高范围'
    },
    reserve_num_min: {
      'required': '请输入预订人数范围'
    },
    earlier1: {
      'required': '请输入预定截止时间'
    },
  };
  formErrors: any = {
    title: '',
    departure_city: '',
    few_days: '',
    destination_city: '',
    child_age_max: '',
    child_height_min: '',
    reserve_num_min: '',
    earlier1: '',
  };


  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    public adminProductManagementService: AdminProductManagementService, public adminRegionService: AdminRegionService,
    public adminProductTagService: AdminProductTagService,
    public adminMeetingPlaceService: AdminMeetingPlaceService) {
    this.buildForm();
    this.detailUpdateModel = {
      title: '',
      departure_city: '',
      destination_city: '',
      earlier: 0,
      confirm: 0,
      few_days: 0,
      few_nights: 0,
      child_status: 0,
      child_age_max: 0,
      child_height_min: 0,
      child_height_max: 0,
      reserve_num_min: 0,
      reserve_num_max: 0,
      contacts_status: 0,
      assembling_place_id: [],
      fee: '',
      tag_id: [],
      step: 0
    }

  }


  buildForm(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required]],
      few_days: ['', [Validators.required]],
      few_nights: ['', [Validators.required]],
      tag_id: ['', [Validators.required]],
      departure_city: ['', [Validators.required]],
      destination_city: ['', [Validators.required]],
      assembling_place_id: ['', [Validators.required]],
      confirm: ['1', [Validators.required]],
      contacts_status: ['1', [Validators.required]],
      child_status: ['1', [Validators.required]],
      child_age_max: ['', [Validators.required]],
      child_height_min: [''],
      child_height_max: [''],
      reserve_num_min: ['', [Validators.required]],
      reserve_num_max: ['', [Validators.required]],
      earlier1: new FormControl('', [Validators.required]),
      earlier2: new FormControl(null, [Validators.required]),
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
    this.addForm.controls['assembling_place_id'].setValue([]);
    this.addForm.controls['tag_id'].setValue([]);
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });
    this.getTagList();
  }


  // 标签  --按顺序执行
  getTagList() {
    this.adminProductTagService.getProductTagList(1, 1000, '', '', '').subscribe(res => {
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
        console.log("tagList", this.tagList)
      }
      this.getRegionList();
    })
  }

  // 区域
  getRegionList() {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      this.getAccemList();
    })
  }

  // 集合地点
  getAccemList() {
    this.adminMeetingPlaceService.adminMeetingPlaceList(1, 1000).subscribe(res => {
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.assemblingPlaceList.push(a);
      }
      this.getProductDetail();
      console.log(this.destinationPalce, ' this.destinationPalce');
    });
  }
  
  setValue() {
    this.detailUpdateModel.title = this.addForm.value.title;
    this.detailUpdateModel.few_days = this.addForm.value.few_days;
    this.detailUpdateModel.few_nights = this.addForm.value.few_nights;
    this.detailUpdateModel.confirm = this.addForm.value.confirm;
    this.detailUpdateModel.contacts_status = this.addForm.value.contacts_status;
    this.detailUpdateModel.child_status = this.addForm.value.child_status;
    this.detailUpdateModel.child_age_max = this.addForm.value.child_age_max;
    this.detailUpdateModel.child_height_min = this.addForm.value.child_height_min;
    this.detailUpdateModel.child_height_max = this.addForm.value.child_height_max;
    this.detailUpdateModel.reserve_num_min = this.addForm.value.reserve_num_min;
    this.detailUpdateModel.reserve_num_max = this.addForm.value.reserve_num_max;
      // 时间处理
      let earlier1 = this.addForm.value.earlier1
      let date = new Date(this.addForm.value.earlier2);
      let min = date.getMinutes();
      let hour = date.getHours();
      let resMin = earlier1 * 24 * 60 + hour * 60 + min;
      this.detailUpdateModel.earlier = resMin;
  }


  getProductDetail() {
    this.adminProductManagementService.productDetail(this.detailId).subscribe(res => {
      console.log('详情拿到的model', res);
      this.dataProductDetailModel = res.data;
      this.setFormValue();
      this.isSpinning = false;
      this.textChange();  //富文本初始化
    })
  }


  setFormValue() {
    console.log("拿到的值是", this.dataProductDetailModel)
    this.addForm.get('title')?.setValue(this.dataProductDetailModel.title);
    this.addForm.controls['few_days'].setValue(this.dataProductDetailModel.few_days);
    this.addForm.get('few_nights')?.setValue(this.dataProductDetailModel.few_nights);
    this.addForm.get('child_age_max')?.setValue(this.dataProductDetailModel.child_age_max);
    this.addForm.get('child_height_min')?.setValue(this.dataProductDetailModel.child_height_min);
    this.addForm.get('confirm')?.setValue(this.dataProductDetailModel.confirm);
    this.addForm.get('child_height_max')?.setValue(this.dataProductDetailModel.child_height_max);
    this.addForm.get('reserve_num_min')?.setValue(this.dataProductDetailModel.reserve_num_min);
    this.addForm.get('reserve_num_max')?.setValue(this.dataProductDetailModel.reserve_num_max);
    let a = this.dataProductDetailModel.assembling_place.data;
    let aNums: any[] = []
    for (let int of a) {
      aNums.push(int.id)
      this.selectedPlace = aNums;
    }
    console.log("this.selectedPlace", this.selectedPlace);
    let b = this.dataProductDetailModel.tag.data;
    let bNums: any[] = []
    for (let ints of b) {
      bNums.push(ints.id)
      this.selectedTag = bNums
    }
    console.log("this.selectedTag", this.selectedTag);
    const str = this.dataProductDetailModel.departure_city;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    this.addForm.get('departure_city')?.setValue(this.values);   //区域
    // 目的地城市
    const strDest = this.dataProductDetailModel.destination_city;
    for (let i = 0; i < strDest.length / 4; i++) {
      let temp = this.destinationPalce[i] || '' + strDest.substr(0, 4 * (i + 1))
      this.destinationPalce.push(temp);
    }
    this.addForm.get('destination_city')?.setValue(this.destinationPalce);   //区域
   // 时间处理
   let timeArr = this.timeStamp(this.dataProductDetailModel.earlier);
   this.addForm.get('earlier1')?.setValue(timeArr[0]);   //目的城市
   let timeDate = format(this.earlierTime, 'yyyy-MM-dd') + ' ' + timeArr[1] + ':' + timeArr[2];
   this.earlierTime = new Date(timeDate)
 }

 //传入的分钟数  转换成天、时、分 [天,时,分]
 timeStamp(minutes: any) {
   var day = Math.floor(minutes / 60 / 24);
   var hour = Math.floor(minutes / 60 % 24);
   var min = Math.floor(minutes % 60);
   let str: any = [day, hour, min];
   //三元运算符 传入的分钟数不够一分钟 默认为0分钟，else return 运算后的minutes 
   return str;
 }



  changePlace(a: any): void {
    console.log('选择的值是sss', a);
    this.detailUpdateModel.assembling_place_id = a;
  }

  changeTag(a: any): void {
    console.log('选择的值是vvv', a);
    this.detailUpdateModel.tag_id = a;
  }


  onChanges(values: any): void {
    console.log("点击的结果是", values);
    if (values !== null) {
      this.detailUpdateModel.departure_city = values[values.length - 1];
    }
  }


  onDestChange(values: any): void {
    console.log("点击的结果是", values);
    if (values !== null) {
      this.detailUpdateModel.destination_city = values[values.length - 1];
    }
  }

  // 富文本
  textChange() {
    // 费用
    const editorFee = new wangEditor("#editorFee", "#feeContent");
    editorFee.config.height = 250;  // 设置编辑区域高度
    editorFee.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    editorFee.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    editorFee.config.uploadImgMaxLength = 1;
    this.feeBox.nativeElement.innerHTML = this.dataProductDetailModel?.fee;    //赋值
    this.detailUpdateModel.fee = this.dataProductDetailModel.fee;
    editorFee.config.onchange = (newHtml: any) => {
      console.log("213123", newHtml);
      this.detailUpdateModel.fee = newHtml;
    }
    editorFee.create();
    //  上传图片
    editorFee.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorFee.config.customUploadImg = (files: any, insert: any) => {
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
      this.adminProductManagementService.uploadImg(formData).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }


  }


  // 刷新区域和集合地点,标签
  refreshRegion() {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
  }


  refreshPlace() {
    this.adminMeetingPlaceService.adminMeetingPlaceList(1, 1000).subscribe(res => {
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.assemblingPlaceList.push(a);
      }
    });
  }

  refreshTag() {
    this.adminProductTagService.getProductTagList(1, 1000, '', '', '').subscribe(res => {
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
        console.log("tagList", this.tagList)
      }
    })
  }

  nextTab() {
    this.setValue();
    // 验证表单
    console.log("this.addForm", this.addForm)
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("66666", this.addForm.valid)
    if (this.addForm.valid) {
      //更新
      this.detailUpdateModel.id = this.detailId;
      this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
        console.log("res结果", res);
      })
    }
  }

}



