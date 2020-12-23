import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumber, isFloat } from '../../../../util/validators';
import { StoreProductService } from '../../../../../services/store/store-product/store-product.service';
import { AddStoreProductModel } from '../../../../../interfaces/store/storeProduct/ProductModel';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import E from 'wangeditor'
import { Router } from '@angular/router';


@Component({
  selector: 'app-store-product-management-create',
  templateUrl: './store-product-management-create.component.html',
  styleUrls: ['./store-product-management-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StoreProductManagementCreateComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  idRegion: any;


  addForm!: FormGroup;
  confirmValue = '1';//是否需要客服确认：0/否，1/是
  payMethodValue = '1'//支付方式：1/在线支付,2/景区现付

  // 集合地以及标题
  assemblingPlaceList: any[] = [];
  tagList: any[] = [];


  // 预定截止日期
  hourList: any[] = [];
  minsList: any[] = [];

  // 添加model
  addStoreProductModel: AddStoreProductModel;


  validationMessage: any = {
    title: {
      'maxlength': '标题长度最多为225个字符',
      'required': '请填写标题'
    },
    region_code: {
      'maxlength': '标题长度最多为16个字符',
      'required': '请填写区域编码'
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
  };
  formErrors: any = {
    title: '',
    region_code: '',
    few_days: '',
    few_nights: '',
    adult_price: '',
    child_price: '',
    original_adult_price: '',
    original_child_price: '',
    difference_price: '',
  };


  constructor(public fb: FormBuilder, public router: Router,
    public storeProductService: StoreProductService,
    public storeRegionService: StoreRegionService,) {

    this.buildForm();
    this.addStoreProductModel = {
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
      feature: '',
      details: '',
      fee: '',
      notice: '',
      assembling_place_id: [],
      tag_id: [],
    }
  }

  buildForm(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(225)]],
      region_code: ['', [Validators.required, , Validators.maxLength(16)]],
      earlier1: [0, [Validators.required]],
      earlier2: [0, [Validators.required]],
      earlier3: [0, [Validators.required]],
      confirm: [1, [Validators.required]],
      pay_method: [1, [Validators.required]],
      few_days: ['', [Validators.required, isNumber]],
      few_nights: ['', [Validators.required, isNumber]],
      adult_price: ['', [Validators.required, isFloat]],
      child_price: ['', [Validators.required, isFloat]],
      original_adult_price: ['', [Validators.required, isFloat]],
      original_child_price: ['', [Validators.required, isFloat]],
      difference_price: ['', [Validators.required, isFloat]],
      // feature: [''],
      // details: [''],
      // notice: [''],
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



  ngOnInit(): void {
    this.addForm.controls['assembling_place_id'].setValue([]);
    this.addForm.controls['tag_id'].setValue([]);
    this.getTagList();

    // 24小时遍历
    for (var i = 0; i < 24; i++) {
      // console.log('i是什么', i);
      let a = { value: i, label: i };
      this.hourList.push(a);
    }
    // 分钟
    for (var i = 0; i <= 55; i += 5) {
      // console.log('i是什么', i);
      let a = { value: i, label: i };
      this.minsList.push(a);
    }

    this.textChange();

  }


  // 标签  --按顺序执行
  getTagList() {
    this.storeProductService.productTagList().subscribe(res => {
      console.log("标签", res.data);
      for (let i of res.data) {
        // console.log('iiiiii', i);
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
      }
      this.getAccemList();
    })
  }


  // 集合地点
  getAccemList() {
    this.storeProductService.productAssemblingPlaceList().subscribe(res => {
      console.log("集合地点", res.data);
      for (let i of res.data) {
        // console.log('iiiiii', i);
        let a = { value: i.id, label: i.name };
        this.assemblingPlaceList.push(a);
      }
      this.regionList();
    });

  }

  // 区域
  regionList() {
    this.storeRegionService.getAllRegionList().subscribe(res => {
      // console.log("结果是", res);
      this.nzOptions = res;
    })
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


  setValue() {
    this.addStoreProductModel.title = this.addForm.value.title;
    this.addStoreProductModel.region_code = this.addForm.value.region_code;
    this.addStoreProductModel.confirm = this.addForm.value.confirm
    this.addStoreProductModel.pay_method = this.addForm.value.pay_method
    this.addStoreProductModel.few_days = this.addForm.value.few_days;
    this.addStoreProductModel.few_nights = this.addForm.value.few_nights;
    this.addStoreProductModel.adult_price = this.addForm.value.adult_price;
    this.addStoreProductModel.child_price = this.addForm.value.child_price;
    this.addStoreProductModel.original_adult_price = this.addForm.value.original_adult_price;
    this.addStoreProductModel.original_child_price = this.addForm.value.original_child_price;
    this.addStoreProductModel.difference_price = this.addForm.value.difference_price;
    // this.addStoreProductModel.feature = this.addForm.value.feature;
    // this.addStoreProductModel.details = this.addForm.value.details;
    // this.addStoreProductModel.notice = this.addForm.value.notice;
    this.addStoreProductModel.fee = this.addForm.value.fee;
    //  this.addStoreProductModel.earlier
    let i = this.addForm.value.earlier1 * 24 * 60 + this.addForm.value.earlier2 * 60 + this.addForm.value.earlier3;
    this.addStoreProductModel.earlier = i;
    console.log("12121212", this.addStoreProductModel.earlier);

  }


  addProduct() {
    this.setValue();
    // 验证表单
    console.log("this.addForm", this.addForm)
    this.addStoreProductModel.region_code = this.idRegion;
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("66666", this.addForm.valid)
    if (this.addForm.valid) {
      // 添加
      this.storeProductService.createProduct(this.addStoreProductModel).subscribe(res => {
        console.log("res结果", res);
        if (res === null) {
          // alert("创建成功");
          this.router.navigate(['/store/main/storeProduct']);
        }
        else {
          // alert("创建失败，请重新填写");
        }
      })
    }

  }


  changePlace(a: any): void {
    console.log('选择的值是sss', a);
    this.addStoreProductModel.assembling_place_id = a;
  }

  changeTag(a: any): void {
    console.log('选择的值是vvv', a);
    this.addStoreProductModel.tag_id = a;
  }


  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
    if (values !== null) {
      this.idRegion = values[values.length - 1];
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
    // 预约须知
    const editorNotice = new E(document.getElementById('noticeDiv'));
    editorNotice.config.height = 200;  // 设置编辑区域高度为 500px
    editorNotice.config.showFullScreen = true;    // 配置全屏功能按钮是否展示
    editorNotice.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    editorNotice.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    editorNotice.config.uploadImgMaxLength = 1;
    editorNotice.config.onchange = (newHtml: any) => {
      console.log("213123", newHtml);
      this.addStoreProductModel.notice = newHtml;
    }
    editorNotice.create();
    //  上传图片
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
      this.storeProductService.uploadImg(formData).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }



    // 产品特色
    const editorFeature = new E(document.getElementById('featureDiv'));
    editorFeature.config.height = 200;  // 设置编辑区域高度为 500px
    editorFeature.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    editorFeature.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    editorFeature.config.uploadImgMaxLength = 1;

    editorFeature.config.onchange = (newHtml: any) => {
      console.log("213123", newHtml);
      this.addStoreProductModel.feature = newHtml;
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
      this.storeProductService.uploadImg(formData).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }



    // 详情
    const editorDetail = new E(document.getElementById('detailDiv'));
    editorDetail.config.height = 200;  // 设置编辑区域高度为 500px
    editorDetail.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    editorDetail.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    editorDetail.config.uploadImgMaxLength = 1;
    editorDetail.config.onchange = (newHtml: any) => {
      console.log("213123", newHtml);
      this.addStoreProductModel.details = newHtml;
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
      this.storeProductService.uploadImg(formDataDetail).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }

  }

  // 刷新区域和集合地点，标签
  refreshRegion() {
    this.regionList();
  }


  refreshPlace() {
    this.storeProductService.productAssemblingPlaceList().subscribe(res => {
      console.log("集合地点", res.data);
      for (let i of res.data) {
        // console.log('iiiiii', i);
        let a = { value: i.id, label: i.name };
        this.assemblingPlaceList.push(a);
      }
    });
  }


  refreshTag(){
    this.storeProductService.productTagList().subscribe(res => {
      console.log("标签", res.data);
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
      }
    })
  }


}

