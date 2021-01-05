import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumber, isFloat } from '../../../../../util/validators';
import { AdminProductDetailResponseModel, AdminProductManagementUpdateModel, DataProductDetailModel, Datum2 } from '../../../../../../interfaces/adminProduct/product-management-model';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';
import { AdminProductTagService } from '../../../../../../services/admin/admin-product-tag.service';
import { AdminMeetingPlaceService } from '../../../../../../services/admin/admin-meeting-place.service';
import { AdminRegionService } from '../../../../../../services/admin/admin-region.service';
import { ActivatedRoute, Router } from '@angular/router';
import wangEditor from 'wangeditor';


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
  hourList: any[] = [];
  minsList: any[] = [];
  selectedDay: any;
  selectedHour: any;
  selectedMins: any;
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
    work_t_tem: {
      'required': '请输入工作时间模板'
    },
    adult_price: {
      'isFloat': '请输入非零的正数',
      'required': '请输入成人价格！'
    },
    child_price: {
      'isFloat': '请输入非零的正数',
      'required': '请输入儿童价格！'
    },
    original_adult_price: {
      'isFloat': '请输入非零的正数',
      'required': '请输入成人原价！'
    },
    original_child_price: {
      'isFloat': '请输入非零的正数',
      'required': '请输入儿童原价！'
    },
    difference_price: {
      'isFloat': '请输入非零的正数',
      'required': '请输入补差价！'
    },
    child_age_max: {
      'required': '请输入最大年龄'
    },
    reserve_num_min: {
      'required': '请输入最小预订人数'
    },
    reserve_num_max: {
      'required': '请输入最大预订人数'
    },
    earlier: {
      'required': '请输入预定截止时间'
    },
    advance: {
      'required': '请输入提前预订时间'
    },
  };
  formErrors: any = {
    title: '',
    departure_city: '',
    few_days: '',
    destination_city: '',
    work_t_tem: '',
    adult_price: '',
    child_price: '',
    original_adult_price: '',
    original_child_price: '',
    difference_price: '',
    child_age_max: '',
    reserve_num_min: '',
    reserve_num_max: '',
    earlier: '',
    advance: '',
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
      adult_price: 0,
      child_price: 0,
      original_adult_price: 0,
      original_child_price: 0,
      difference_price: 0,
      advance: 0,
      child_status: 0,
      child_age_max: 0,
      child_height_min: 0,
      child_height_max: 0,
      reserve_num_min: 0,
      reserve_num_max: 0,
      contacts_status: 0,
      work_t_tem: 0,
      inventory: 0,
      inventory_num: 0,
      inventory_exceed: 0,
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
      work_t_tem: ['', [Validators.required]],
      confirm: ['1', [Validators.required]],
      contacts_status: ['1', [Validators.required]],
      inventory: ['1', [Validators.required]],
      inventory_num: ['1'],
      inventory_exceed: ['1'],
      adult_price: ['', [Validators.required]],
      child_price: ['', [Validators.required]],
      original_adult_price: ['', [Validators.required]],
      original_child_price: ['', [Validators.required]],
      difference_price: ['', [Validators.required]],
      child_status: ['1', [Validators.required]],
      child_age_max: ['', [Validators.required]],
      child_height_min: [''],
      child_height_max: [''],
      reserve_num_min: ['', [Validators.required]],
      reserve_num_max: ['', [Validators.required]],
      earlier1: [0, [Validators.required]],
      earlier2: [0, [Validators.required]],
      earlier3: [0, [Validators.required]],
      advance: ['', [Validators.required]],
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
    // 24小时遍历   
    for (var i = 0; i < 24; i++) {
      let a = { value: i, label: i };
      this.hourList.push(a);
    }
    // 分钟
    for (var i = 0; i <= 55; i += 5) {
      let a = { value: i, label: i };
      this.minsList.push(a);
    }

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
    this.detailUpdateModel.work_t_tem = this.addForm.value.work_t_tem;
    this.detailUpdateModel.confirm = this.addForm.value.confirm;
    this.detailUpdateModel.contacts_status = this.addForm.value.contacts_status;
    this.detailUpdateModel.inventory = this.addForm.value.inventory;
    this.detailUpdateModel.inventory_num = this.addForm.value.inventory_num;
    this.detailUpdateModel.inventory_exceed = this.addForm.value.inventory_exceed;
    this.detailUpdateModel.adult_price = this.addForm.value.adult_price;
    this.detailUpdateModel.child_price = this.addForm.value.child_price;
    this.detailUpdateModel.original_adult_price = this.addForm.value.original_adult_price;
    this.detailUpdateModel.original_child_price = this.addForm.value.original_child_price;
    this.detailUpdateModel.difference_price = this.addForm.value.difference_price;
    this.detailUpdateModel.child_status = this.addForm.value.child_status;
    this.detailUpdateModel.child_age_max = this.addForm.value.child_age_max;
    this.detailUpdateModel.child_height_min = this.addForm.value.child_height_min;
    this.detailUpdateModel.child_height_max = this.addForm.value.child_height_max;
    this.detailUpdateModel.reserve_num_min = this.addForm.value.reserve_num_min;
    this.detailUpdateModel.reserve_num_max = this.addForm.value.reserve_num_max;
    let i = this.addForm.value.earlier1 * 24 * 60 + this.addForm.value.earlier2 * 60 + this.addForm.value.earlier3;
    this.detailUpdateModel.earlier = i;
    console.log("12121212", this.detailUpdateModel.earlier);
    this.detailUpdateModel.advance = this.addForm.value.advance;
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
    this.addForm.get('adult_price')?.setValue(this.dataProductDetailModel.adult_price);
    this.addForm.get('child_price')?.setValue(this.dataProductDetailModel.child_price);
    this.addForm.get('original_adult_price')?.setValue(this.dataProductDetailModel.original_adult_price);
    this.addForm.get('original_child_price')?.setValue(this.dataProductDetailModel.original_child_price);
    this.addForm.get('difference_price')?.setValue(this.dataProductDetailModel.difference_price);
    this.addForm.get('child_age_max')?.setValue(this.dataProductDetailModel.child_age_max);
    this.addForm.get('child_height_min')?.setValue(this.dataProductDetailModel.child_height_min);
    this.addForm.get('confirm')?.setValue(this.dataProductDetailModel.confirm);
    this.addForm.get('child_height_max')?.setValue(this.dataProductDetailModel.child_height_max);
    this.addForm.get('reserve_num_min')?.setValue(this.dataProductDetailModel.reserve_num_min);
    this.addForm.get('reserve_num_max')?.setValue(this.dataProductDetailModel.reserve_num_max);
    this.addForm.get('work_t_tem')?.setValue(this.dataProductDetailModel.work_t_tem);
    this.addForm.get('inventory')?.setValue(this.dataProductDetailModel.inventory);
    this.addForm.get('inventory_exceed')?.setValue(this.dataProductDetailModel.inventory_exceed);
    this.addForm.get('inventory_num')?.setValue(this.dataProductDetailModel.inventory_num);
    this.addForm.get('advance')?.setValue(this.dataProductDetailModel.advance);
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
    // 截止日期
    console.log("截止日期", this.dataProductDetailModel.earlier);
    console.log("分钟", this.dataProductDetailModel.earlier % 60)
    console.log("小时", Math.floor(this.dataProductDetailModel.earlier / 60) % 24);
    console.log("", Math.floor(this.dataProductDetailModel.earlier / 60 / 24));
    this.selectedDay = Math.floor(this.dataProductDetailModel.earlier / 60 / 24); //天数
    //小时
    if (Math.floor(this.dataProductDetailModel.earlier / 60) > 25) {
      this.selectedHour = Math.floor(this.dataProductDetailModel.earlier / 60) % 24;
    }
    else {
      this.selectedHour = Math.floor(this.dataProductDetailModel.earlier / 60);

    }
    this.selectedMins = Math.floor(this.dataProductDetailModel.earlier % 60);  //分钟
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

  changeHour(values: any) {
    this.addForm.value.earlier2 = values;
    console.log("this.addForm.value.earlier2", this.addForm.value.earlier2);
  }


  changeMins(values: any) {
    this.addForm.value.earlier3 = values;
    console.log("3333", this.addForm.value.earlier3);

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



