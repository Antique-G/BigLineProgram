import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumber, isFloat } from '../../../../../util/validators';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { AddStoreProductModel, DetailModel } from '../../../../../../interfaces/store/storeProduct/ProductModel';
import { StoreRegionService } from '../../../../../../services/store/store-region/store-region.service';
import { ActivatedRoute, Router } from '@angular/router';
import wangEditor from 'wangeditor';

@Component({
  selector: 'app-store-product-info',
  templateUrl: './store-product-info.component.html',
  styleUrls: ['./store-product-info.component.css']
})
export class StoreProductInfoComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;  

  
  addForm!: FormGroup;

  // 区域联动
  nzOptions: any[] | null = null;
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
    confirm: {
      'required': '请选择'
    },
    contacts_status: {
      'required': '请选择'
    },
    inventory: {
      'required': '请选择'
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
    child_status: {
      'required': '请选择'
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
    confirm: '',
    contacts_status: '',
    inventory: '',
    adult_price: '',
    child_price: '',
    original_adult_price: '',
    original_child_price: '',
    difference_price: '',
    child_status: '',
    child_age_max: '',
    reserve_num_min: '',
    reserve_num_max: '',
    earlier: '',
    advance: '',
  };


  constructor(public fb: FormBuilder, public router: Router,
    public storeProductService: StoreProductService,
    public storeRegionService: StoreRegionService,) {
    this.buildForm();
    this.addStoreProductModel = {
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
      inventory_num:['1'],
      inventory_exceed:['1'],
      adult_price: ['', [Validators.required]],
      child_price: ['', [Validators.required]],
      original_adult_price: ['', [Validators.required]],
      original_child_price: ['', [Validators.required]],
      difference_price: ['', [Validators.required]],
      child_status: ['1', [Validators.required]],
      child_age_max: ['', [Validators.required]],
      child_height_min:[''],
      child_height_max:[''],
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
  }


  // 标签  --按顺序执行
  getTagList() {
    this.storeProductService.productTagList().subscribe(res => {
      console.log("标签", res.data);
      for (let i of res.data) {
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
        let a = { value: i.id, label: i.name };
        this.assemblingPlaceList.push(a);
      }
      this.regionList();
    });

  }

  // 区域
  regionList() {
    this.storeRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      this.textChange();
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
    this.addStoreProductModel.few_days = this.addForm.value.few_days;
    this.addStoreProductModel.few_nights = this.addForm.value.few_nights;
    this.addStoreProductModel.work_t_tem = this.addForm.value.work_t_tem;
    this.addStoreProductModel.confirm = this.addForm.value.confirm;
    this.addStoreProductModel.contacts_status= this.addForm.value.contacts_status;
    this.addStoreProductModel.inventory= this.addForm.value.inventory;
    this.addStoreProductModel.inventory_num= this.addForm.value.inventory_num;
    this.addStoreProductModel.inventory_exceed= this.addForm.value.inventory_exceed;
    this.addStoreProductModel.adult_price = this.addForm.value.adult_price;
    this.addStoreProductModel.child_price = this.addForm.value.child_price;
    this.addStoreProductModel.original_adult_price = this.addForm.value.original_adult_price;
    this.addStoreProductModel.original_child_price = this.addForm.value.original_child_price;
    this.addStoreProductModel.difference_price = this.addForm.value.difference_price;
    this.addStoreProductModel.child_status = this.addForm.value.child_status;
    this.addStoreProductModel.child_age_max = this.addForm.value.child_age_max;
    this.addStoreProductModel.child_height_min = this.addForm.value.child_height_min;
    this.addStoreProductModel. child_height_max = this.addForm.value.child_height_max;
    this.addStoreProductModel.reserve_num_min = this.addForm.value.reserve_num_min;
    this.addStoreProductModel.reserve_num_max = this.addForm.value.reserve_num_max;
    let i = this.addForm.value.earlier1 * 24 * 60 + this.addForm.value.earlier2 * 60 + this.addForm.value.earlier3;
    this.addStoreProductModel.earlier = i;
    console.log("12121212", this.addStoreProductModel.earlier);
    this.addStoreProductModel.advance = this.addForm.value.advance;
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
    if (values !== null) {
      this.addStoreProductModel.departure_city = values[values.length - 1];
    }
  }


  onDestChange(values: any): void {
    console.log("点击的结果是", values);
    if (values !== null) {
      this.addStoreProductModel.destination_city = values[values.length - 1];
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
    const editorFee = new wangEditor("#editorFee", "#feeContent");
    editorFee.config.height = 250;  // 设置编辑区域高度
    editorFee.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    editorFee.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    editorFee.config.uploadImgMaxLength = 1;
    editorFee.config.onchange = (newHtml: any) => {
      console.log("213123", newHtml);
      this.addStoreProductModel.fee = newHtml;
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
      this.storeProductService.uploadImg(formData).subscribe(res => {
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


  refreshTag() {
    this.storeProductService.productTagList().subscribe(res => {
      console.log("标签", res.data);
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
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
        // 添加
        this.storeProductService.createProduct(this.addStoreProductModel).subscribe(res => {
          console.log("res结果", res);
          if(res.id){
            this.tabIndex.emit({id:res.id,tabIndex:1})
          }
          
        })
    }
  }
}




