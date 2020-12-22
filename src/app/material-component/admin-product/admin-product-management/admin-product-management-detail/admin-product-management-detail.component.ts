import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumber, isFloat } from '../../../../util/validators';
import { AdminProductManagementUpdateModel, DataProductDetailModel, Datum2 } from '../../../../../interfaces/adminProduct/product-management-model';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';
import { AdminProductTagService } from '../../../../../services/admin/admin-product-tag.service';
import { AdminMeetingPlaceService } from '../../../../../services/admin/admin-meeting-place.service';
import { AdminRegionService } from '../../../../../services/admin/admin-region.service';
import { ActivatedRoute, Router } from '@angular/router';
import wangEditor from 'wangeditor';



@Component({
  selector: 'app-admin-product-management-detail',
  templateUrl: './admin-product-management-detail.component.html',
  styleUrls: ['./admin-product-management-detail.component.css']
})
export class AdminProductManagementDetailComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;

  // 集合地以及标题
  selectedPlace: any[] = [];
  selectedTag: any[] = [];
  assemblingPlaceList: any[] = [];
  tagList: any[] = [];

  // 预定截止日期
  hourList: any[] = [];
  minsList: any[] = [];
  selectedDay: any;
  selectedHour: any;
  selectedMins: any;

  addForm!: FormGroup;
  detailId: any;
  dataProductDetailModel: any;
  adminProductManagementUpdateModel: AdminProductManagementUpdateModel //更新
  public isSpinning: any = true;    //loading 

  @ViewChild("featureBox") featureBox: any;       //获取dom
  @ViewChild("detailBox") detailBox: any;     //获取dom
  @ViewChild("noticeBox") noticeBox: any;     //获取dom


  validationMessage: any = {
    title: {
      'maxlength': '标题长度最多为225个字符',
      'required': '请填写标题'
    },
    few_days: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入出行几天！'
    },
    few_nights: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入出行几晚！'

    },
    adult_price: {
      'isFloat': '请输入非零的正整数',
      'required': '请输入成人价格！'
    },
    child_price: {
      'isFloat': '请输入非零的正整数',
      'required': '请输入儿童价格！'
    },
    original_adult_price: {
      'isFloat': '请输入非零的正整数',
      'required': '请输入成人原价！'
    },
    original_child_price: {
      'isFloat': '请输入非零的正整数',
      'required': '请输入儿童原价！'
    },
    difference_price: {
      'isFloat': '请输入非零的正整数',
      'required': '请输入补差价！'
    },
  };
  formErrors: any = {
    title: '',
    few_days: '',
    few_nights: '',
    adult_price: '',
    child_price: '',
    original_adult_price: '',
    original_child_price: '',
    difference_price: '',
  };


  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    public adminProductManagementService: AdminProductManagementService, public adminRegionService: AdminRegionService,
    public adminProductTagService: AdminProductTagService,
    public adminMeetingPlaceService: AdminMeetingPlaceService) {
    this.buildForm();

    this.adminProductManagementUpdateModel = {
      title: '',
      region_code: '',
      earlier: 0,
      confirm: 0,
      pay_method: 0,
      few_days: 0,
      few_nights: 0,
      adult_price: 0,
      child_price: 0,
      original_adult_price: 0,
      original_child_price: 0,
      difference_price: 0,
      assembling_place_id: [],
      feature: '',
      details: '',
      fee: '',
      notice: '',
      tag_id: []
    }

  }

  buildForm(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(225)]],
      region_code: ['', [Validators.required, , Validators.maxLength(16)]],
      earlier1: [0, [Validators.required]],
      earlier2: ['', [Validators.required]],
      earlier3: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
      pay_method: ['', [Validators.required]],
      few_days: ['', [Validators.required, isNumber]],
      few_nights: ['', [Validators.required, isNumber]],
      adult_price: ['', [Validators.required, isFloat]],
      child_price: ['', [Validators.required, isFloat]],
      original_adult_price: ['', [Validators.required, isFloat]],
      original_child_price: ['', [Validators.required, isFloat]],
      difference_price: ['', [Validators.required, isFloat]],
      fee: ['', [Validators.required]],
      assembling_place_id: ['', [Validators.required]],
      tag_id: ['', [Validators.required]],
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
    });
  }


  setValue() {
    this.adminProductManagementUpdateModel.title = this.addForm.value.title;
    this.adminProductManagementUpdateModel.confirm = this.addForm.value.confirm;
    this.adminProductManagementUpdateModel.pay_method = this.addForm.value.pay_method;
    this.adminProductManagementUpdateModel.few_days = this.addForm.value.few_days;;
    this.adminProductManagementUpdateModel.few_nights = this.addForm.value.few_nights;
    this.adminProductManagementUpdateModel.adult_price = this.addForm.value.adult_price;
    this.adminProductManagementUpdateModel.child_price = this.addForm.value.child_price;
    this.adminProductManagementUpdateModel.original_adult_price = this.addForm.value.original_adult_price;
    this.adminProductManagementUpdateModel.original_child_price = this.addForm.value.original_child_price;
    this.adminProductManagementUpdateModel.difference_price = this.addForm.value.difference_price;
    this.adminProductManagementUpdateModel.fee = this.addForm.value.fee;
    let i = this.addForm.value.earlier1 * 24 * 60 + this.addForm.value.earlier2 * 60 + this.addForm.value.earlier3;
    this.adminProductManagementUpdateModel.earlier = i;
    console.log("12121212", this.adminProductManagementUpdateModel.earlier);
  }


  updateProduct() {
    this.setValue();
    // 验证表单
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminProductManagementUpdateModel.id = this.dataProductDetailModel.id;
      this.adminProductManagementUpdateModel.region_code = this.idRegion;
      console.log("更新的model是", this.adminProductManagementUpdateModel);
      this.adminProductManagementService.updateProduct(this.adminProductManagementUpdateModel).subscribe(res => {
        console.log("res结果", res);
        if (res?.status_code) {
          // alert("更新失败");
        }
        else {
          this.router.navigate(['/admin/main/productManagement']);
        }
      })

    }
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
    this.addForm.get('fee')?.setValue(this.dataProductDetailModel.fee);
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
    const str = this.dataProductDetailModel.region_code;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    this.addForm.get('region_code')?.setValue(this.values);   //区域
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
    this.adminProductManagementUpdateModel.assembling_place_id = a;
  }

  changeTag(a: any): void {
    this.adminProductManagementUpdateModel.tag_id = a;
  }


  // 区域
  onChanges(values: any): void {
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }
  }


  changeHour(values: any) {
    this.addForm.value.earlier2 = values;
  }


  changeMins(values: any) {
    this.addForm.value.earlier3 = values;
  }



  // 富文本
  textChange() {
    // 预约须知
    const editorNotice = new wangEditor("#editorNotice", "#noticeContent");
    console.log("拿到的notice", this.dataProductDetailModel.notice);
    this.noticeBox.nativeElement.innerHTML = this.dataProductDetailModel.notice;    //赋值
    this.adminProductManagementUpdateModel.notice = this.dataProductDetailModel.notice;
    editorNotice.config.onchange = (newHtml: any) => {
      this.adminProductManagementUpdateModel.notice = newHtml;
    }
    editorNotice.create();
    // 上传图片
    editorNotice.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorNotice.config.customUploadImg = (files: any, insert: any) => {
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


    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    console.log("拿到的feature", this.dataProductDetailModel.feature);
    this.featureBox.nativeElement.innerHTML = this.dataProductDetailModel.feature;    //赋值

    this.adminProductManagementUpdateModel.feature = this.dataProductDetailModel.feature;
    console.log("没改之前的model", this.adminProductManagementUpdateModel.feature);
    editorFeature.config.onchange = (newHtml: any) => {
      this.adminProductManagementUpdateModel.feature = newHtml;
      console.log("修改后的model", this.adminProductManagementUpdateModel.feature)

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
      this.adminProductManagementService.uploadImg(formData).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }




    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    console.log("拿到的details", this.dataProductDetailModel.details)
    this.detailBox.nativeElement.innerHTML = this.dataProductDetailModel.details;    //赋值
    this.adminProductManagementUpdateModel.details = this.dataProductDetailModel.details;
    console.log("没改之前的model", this.adminProductManagementUpdateModel.details);
    editorDetail.config.onchange = (newHtml: any) => {
      this.adminProductManagementUpdateModel.details = newHtml;
      console.log("修改后的model", this.adminProductManagementUpdateModel.details);

    }
    editorDetail.create();

    // 上传图片
    editorDetail.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorDetail.config.customUploadImg = (files: any, insert: any) => {
      // 限制一次最多上传 1 张图片
      if (files.length !== 1) {
        alert('单次只能上传一个图片')
        return
      }
      console.log("files是什么", files);

      console.log(files[0]);
      let formDataDetail = new FormData();
      formDataDetail.append('image', files[0] as any);
      console.log("formData是什么", formDataDetail.get('file'));
      this.adminProductManagementService.uploadImg(formDataDetail).subscribe(res => {
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

  refreshTag(){
    this.adminProductTagService.getProductTagList(1, 1000, '', '', '').subscribe(res => {
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
        console.log("tagList", this.tagList)
      }
    })
  }


}



