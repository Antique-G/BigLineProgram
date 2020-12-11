import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNumber, isFloat } from '../../../../util/validators';
import { AdminProductManagementUpdateModel, DataProductDetailModel, Datum2 } from '../../../../../interfaces/adminProduct/product-management-model';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';
import { AdminProductTagService } from '../../../../../services/admin/admin-product-tag.service';
import { AdminMeetingPlaceService } from '../../../../../services/admin/admin-meeting-place.service';

@Component({
  selector: 'app-admin-product-management-detail',
  templateUrl: './admin-product-management-detail.component.html',
  styleUrls: ['./admin-product-management-detail.component.css']
})
export class AdminProductManagementDetailComponent implements OnInit {
  addForm!: FormGroup;
  selectedPlace: any[] = [];
  selectedTag: any[] = [];;
  assemblingPlaceList: any[] = [];
  tagList: any[] = [];
  detailData: any;
  dataProductDetailModel: any;
  adminProductManagementUpdateModel: AdminProductManagementUpdateModel;
  public isSpinning: any = true;


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


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminProductManagementDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminProductManagementService: AdminProductManagementService,
    public adminProductTagService: AdminProductTagService,
    public adminMeetingPlaceService: AdminMeetingPlaceService) {
    this.detailData = data;
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
      status: 0,
      tag_id: []
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
    this.adminProductTagService.getProductTagList().subscribe(res => {
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
    this.adminMeetingPlaceService.adminMeetingPlaceList(1, 1000).subscribe(res => {
      console.log("集合地点", res.data);
      for (let i of res.data) {
        console.log('iiiiii', i);
        let a = { value: i.id, label: i.name };
        this.assemblingPlaceList.push(a);
      }
      this.getProductDetail();
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
    this.adminProductManagementUpdateModel.title = this.addForm.value.title;
    this.adminProductManagementUpdateModel.region_code = this.addForm.value.region_code
    this.adminProductManagementUpdateModel.earlier = this.addForm.value.earlier
    this.adminProductManagementUpdateModel.confirm = this.addForm.value.confirm
    this.adminProductManagementUpdateModel.pay_method = this.addForm.value.pay_method
    this.adminProductManagementUpdateModel.few_days = this.addForm.value.few_days;
    this.adminProductManagementUpdateModel.few_nights = this.addForm.value.few_nights;
    this.adminProductManagementUpdateModel.adult_price = this.addForm.value.adult_price;
    this.adminProductManagementUpdateModel.child_price = this.addForm.value.child_price;
    this.adminProductManagementUpdateModel.original_adult_price = this.addForm.value.original_adult_price;
    this.adminProductManagementUpdateModel.original_child_price = this.addForm.value.original_child_price;
    this.adminProductManagementUpdateModel.difference_price = this.addForm.value.difference_price;
    this.adminProductManagementUpdateModel.feature = this.addForm.value.feature;
    this.adminProductManagementUpdateModel.details = this.addForm.value.details;
    this.adminProductManagementUpdateModel.fee = this.addForm.value.fee;
    this.adminProductManagementUpdateModel.notice = this.addForm.value.notice;
    this.adminProductManagementUpdateModel.status = this.addForm.value.status;
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
      console.log("更新的model是", this.adminProductManagementUpdateModel);
      this.adminProductManagementService.updateProduct(this.adminProductManagementUpdateModel).subscribe(res => {
        console.log("res结果", res);
        if (res.status_code) {
          // alert("更新失败");
        }
        else {
          // alert("更新成功");
          this.dialogRef.close(1);
        }
      })

    }
  }


  getProductDetail() {
    this.adminProductManagementService.productDetail(this.detailData.id).subscribe(res => {
      console.log('res.data', res);
      this.dataProductDetailModel = res.data;
      this.setFormValue();
      this.isSpinning = false;
    })
  }


  setFormValue() {
    console.log("拿到的值是", this.dataProductDetailModel)
    this.addForm.get('title')?.setValue(this.dataProductDetailModel.title);
    this.addForm.get('region_code')?.setValue(this.dataProductDetailModel.region_code);
    this.addForm.get('earlier')?.setValue(this.dataProductDetailModel.earlier);
    this.addForm.controls['few_days'].setValue(this.dataProductDetailModel.few_days);
    this.addForm.get('few_nights')?.setValue(this.dataProductDetailModel.few_nights);
    this.addForm.get('adult_price')?.setValue(this.dataProductDetailModel.adult_price);
    this.addForm.get('child_price')?.setValue(this.dataProductDetailModel.child_price);
    this.addForm.get('original_adult_price')?.setValue(this.dataProductDetailModel.original_adult_price);
    this.addForm.get('original_child_price')?.setValue(this.dataProductDetailModel.original_child_price);
    this.addForm.get('difference_price')?.setValue(this.dataProductDetailModel.difference_price);
    this.addForm.get('feature')?.setValue(this.dataProductDetailModel.feature);
    this.addForm.get('fee')?.setValue(this.dataProductDetailModel.fee);
    this.addForm.get('notice')?.setValue(this.dataProductDetailModel.notice);
    this.addForm.get('details')?.setValue(this.dataProductDetailModel.details);
    console.log("this.dataProductDetailModel.assembling_place.data", this.dataProductDetailModel.assembling_place.data)
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

  }

  close() {
    this.dialogRef.close();
  }



  changePlace(a: any): void {
    console.log('选择的值是sss', a);
    this.adminProductManagementUpdateModel.assembling_place_id = a;
  }

  changeTag(a: any): void {
    console.log('选择的值是vvv', a);
    this.adminProductManagementUpdateModel.tag_id = a;
  }

}

