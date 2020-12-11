import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreProductManagementComponent } from '../store-product-management.component';
import { isNumber, isFloat } from '../../../../util/validators';
import { StoreProductService } from '../../../../../services/store/store-product/store-product.service';
import { AddStoreProductModel } from '../../../../../interfaces/store/storeProduct/ProductModel';
import { StoreProductTagService } from '../../../../../services/store/store-product-tag/store-product-tag.service';
import { StoreMeetingPlaceService } from '../../../../../services/store/store-meeting-place/store-meeting-place.service';



@Component({
  selector: 'app-store-product-management-create',
  templateUrl: './store-product-management-create.component.html',
  styleUrls: ['./store-product-management-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StoreProductManagementCreateComponent implements OnInit {
  addForm!: FormGroup;
  confirmValue = 0;//是否需要客服确认：0/否，1/是
  payMethodValue = 1;//支付方式：1/在线支付,2/景区现付

  selectedPlace: any[] = [];
  selectedTag: any[] = [];;
  assemblingPlaceList: any[] = [];
  tagList: any[] = [];

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
    earlier: {
      'isNumber': '请填写预定截止时间（出发前一天，需提前多少分钟预定）',
      'required': '请填写预定截止时间（出发前一天，需提前多少分钟预定）'
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
    earlier: '',
    few_days: '',
    few_nights: '',
    adult_price: '',
    child_price: '',
    original_adult_price: '',
    original_child_price: '',
    difference_price: '',
  };


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreProductManagementComponent>,
    public storeProductService: StoreProductService,
    public storeProductTagService: StoreProductTagService,
    public storeMeetingPlaceService: StoreMeetingPlaceService) {

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
      earlier: ['', [Validators.required, isNumber]],
      confirm: ['', [Validators.required]],
      pay_method: ['', [Validators.required]],
      few_days: ['', [Validators.required, isNumber]],
      few_nights: ['', [Validators.required, isNumber]],
      adult_price: ['', [Validators.required, isFloat]],
      child_price: ['', [Validators.required, isFloat]],
      original_adult_price: ['', [Validators.required, isFloat]],
      original_child_price: ['', [Validators.required, isFloat]],
      difference_price: ['', [Validators.required, isFloat]],
      feature: ['', [Validators.required]],
      details: ['', [Validators.required]],
      fee: ['', [Validators.required]],
      notice: ['', [Validators.required]],
      assembling_place_id: ['', [Validators.required]],
      tag_id: ['', [Validators.required]],
      status: ['', [Validators.required]]
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
  }


  // 标签  --按顺序执行
  getTagList() {
    this.storeProductTagService.getProductTagList().subscribe(res => {
      console.log("标签", res.data);
      for (let i of res.data) {
        console.log('iiiiii', i);
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
      }
      this.getAccemList();
    }
    )
  }


  // 集合地点
  getAccemList() {
    this.storeMeetingPlaceService.storeMeetingPlaceList(1, 1000).subscribe(res => {
      console.log("集合地点", res.data);
      for (let i of res.data) {
        console.log('iiiiii', i);
        let a = { value: i.id, label: i.name };
        this.assemblingPlaceList.push(a);
      }
    });
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
    this.addStoreProductModel.region_code = this.addForm.value.region_code
    this.addStoreProductModel.earlier = this.addForm.value.earlier
    this.addStoreProductModel.confirm = this.addForm.value.confirm
    this.addStoreProductModel.pay_method = this.addForm.value.pay_method
    this.addStoreProductModel.few_days = this.addForm.value.few_days;
    this.addStoreProductModel.few_nights = this.addForm.value.few_nights;
    this.addStoreProductModel.adult_price = this.addForm.value.adult_price;
    this.addStoreProductModel.child_price = this.addForm.value.child_price;
    this.addStoreProductModel.original_adult_price = this.addForm.value.original_adult_price;
    this.addStoreProductModel.original_child_price = this.addForm.value.original_child_price;
    this.addStoreProductModel.difference_price = this.addForm.value.difference_price;
    this.addStoreProductModel.feature = this.addForm.value.feature;
    this.addStoreProductModel.details = this.addForm.value.details;
    this.addStoreProductModel.fee = this.addForm.value.fee;
    this.addStoreProductModel.notice = this.addForm.value.notice;
  }


  addProduct() {
    this.setValue();
    // 验证表单
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      // 添加
      this.storeProductService.createProduct(this.addStoreProductModel).subscribe(res => {
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


close() {
  this.dialogRef.close();
}

changePlace(a: any): void {
  console.log('选择的值是sss', a);
  this.addStoreProductModel.assembling_place_id = a;
}

changeTag(a: any): void {
  console.log('选择的值是vvv', a);
  this.addStoreProductModel.tag_id = a;
}


}

