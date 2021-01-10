import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumber, isFloat } from '../../../../../util/validators';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { AddStoreProductModel, DetailModel } from '../../../../../../interfaces/store/storeProduct/ProductModel';
import { StoreRegionService } from '../../../../../../services/store/store-region/store-region.service';
import { ActivatedRoute, Router } from '@angular/router';
import wangEditor from 'wangeditor';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';

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
  earlierTime = new Date('2021-01-01 18:00');

  // 添加model
  addStoreProductModel: AddStoreProductModel;

  @ViewChild("feeBox") feeBox: any;       // 费用 获取dom
  feeList: any[] = []    //图片

  isReserveChildren = '0';
  isReserveAhead = '0';


  cateId: any;

  validationMessage: any = {
    title: {
      'maxlength': '标题长度最多为64个字符',
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
    tag_id: {
      'required': '请选择产品标签'!
    },
    departure_city: {
      'required': '请输入出发城市！'
    },
    destination_city: {
      'required': '请输入目的城市！'
    },
    reserve_num: {
      'required': '请输入可预订人数！'
    },
  };
  formErrors: any = {
    title: '',
    few_days: '',
    few_nights: '',
    tag_id: '',
    departure_city: '',
    destination_city: '',
    reserve_num: '',
  }




  constructor(public fb: FormBuilder, public router: Router, public dialog: MatDialog,
    public storeProductService: StoreProductService, private msg: NzMessageService,
    public storeRegionService: StoreRegionService,
    private modal: NzModalService,private viewContainerRef: ViewContainerRef) {
    this.buildForm();
    this.addStoreProductModel = {
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
      reserve_ahead:1
    }
  }

  buildForm(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required]],
      few_days: [2, [Validators.required]],
      few_nights: [1, [Validators.required]],
      tag_id: ['', [Validators.required]],
      departure_city: ['', [Validators.required]],
      destination_city: ['', [Validators.required]],
      assembling_place_id: ['', [Validators.required]],
      confirm: ['1', [Validators.required]],
      contacts_status: ['1', [Validators.required]],
      reserve_ahead: new FormControl(1, [Validators.required]),
      child_status: ['1', [Validators.required]],
      child_age_max: [14],
      child_height_min: [''],
      child_height_max: [''],
      reserve_num_min: ['', [Validators.required]],
      reserve_num_max: ['', [Validators.required]],
      earlier1: new FormControl(1, [Validators.required]),
      earlier2: new FormControl(null, [Validators.required]),

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
    this.getCateList();

  }

  // 标签分类列表
  getCateList() {
    this.storeProductService.productCateList().subscribe(res => {
      console.log("结果是111", res.data)
      console.log("name", res.data[0].name)
      console.log("name", res.data[1].name)
      let name1 = res.data[0].name;
      let name2 = res.data[1].name;
      if (name1 === '跟团游') {
        this.cateId = res.data[0].id
      }
      else if (name2 === '跟团游') {
        this.cateId = res.data[1].id
      }
      this.getTagList();
    })
  }


  // 标签  --按顺序执行
  getTagList() {
    this.storeProductService.productTagList(this.cateId).subscribe(res => {
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
    this.addStoreProductModel.confirm = this.addForm.value.confirm;
    this.addStoreProductModel.contacts_status = this.addForm.value.contacts_status;
    this.addStoreProductModel.child_status = this.addForm.value.child_status;
    this.addStoreProductModel.reserve_ahead = this.addForm.value.reserve_ahead;
    if (parseInt(this.isReserveAhead) === 0) {
      this.addStoreProductModel.earlier = 0;
    }
    else if (parseInt(this.isReserveAhead) === 1) {
       // 时间处理
    let earlier1 = this.addForm.value.earlier1
    let date = new Date(this.addForm.value.earlier2);
    let min = date.getMinutes();
    let hour = date.getHours();
    let resMin = earlier1 * 24 * 60 + hour * 60 + min;
    this.addStoreProductModel.earlier = resMin;
    }
    if (parseInt(this.isReserveChildren) === 0) {
      this.addStoreProductModel.child_age_max = 14;
      this.addStoreProductModel.child_height_min = 0;
      this.addStoreProductModel.child_height_max = 0;
    }
    else if (parseInt(this.isReserveChildren) === 1) {
      this.addStoreProductModel.child_age_max = this.addForm.value.child_age_max;
      this.addStoreProductModel.child_height_min = this.addForm.value.child_height_min;
      this.addStoreProductModel.child_height_max = this.addForm.value.child_height_max;
    }
    this.addStoreProductModel.reserve_num_min = this.addForm.value.reserve_num_min;
    this.addStoreProductModel.reserve_num_max = this.addForm.value.reserve_num_max;
   
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

  // 富文本
  textChange() {
    // 预约须知
    const editorFee = new wangEditor("#editorFee", "#feeContent");
    editorFee.config.onchange = (newHtml: any) => {
      console.log("213123", newHtml);
      this.addStoreProductModel.fee = newHtml;
    }
    // InsertABCMenu
    // 注册菜单
    editorFee.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorFee.config.menus = editorFee.config.menus.concat('insertABC')
    editorFee.config.customFunction = (insert: any) => {
      const modal:NzModalRef = this.modal.create({
        nzTitle:'图片上传',
        nzViewContainerRef: this.viewContainerRef,
        nzContent:CommonModelComponent,
        nzWidth:660,
        nzFooter:null
      })
      modal.afterClose.subscribe(result =>{
        let res = result?.data||[]
        res.forEach((item: any) => {
              insert(item.url)
            });
      });
      
    }
    editorFee.create();


  }

  importImg() {
    const modal:NzModalRef = this.modal.create({
      nzTitle:'从图库导入资源',
      nzViewContainerRef: this.viewContainerRef,
      nzContent:ChooseGalleryComponent,
      nzWidth:1105,
      nzFooter:null
    })
    modal.afterClose.subscribe(res =>{
      let result = res||[]
      result.forEach((item: any) => {
        this.feeList.push(item)
        if (this.feeList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        this.feeBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`;
        console.log("this.addStoreProductModel.fee", this.addStoreProductModel.fee)
      });
    });
    
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
    this.storeProductService.productTagList(this.cateId).subscribe(res => {
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
        if (res.id) {
          this.tabIndex.emit({ id: res.id, tabIndex: 1 })
        }

      })
    }
  }


  isReserveAheadChange(status: any) {
    console.log(status, 'status');
    this.isReserveAhead = status;
    this.addForm.value.reserve_ahead = this.isReserveAhead;
  }

  isReserveChildrenChange(status: any) {
    console.log(status, 'status');
    this.isReserveChildren = status;
    this.addForm.value.child_status = this.isReserveChildren;
  }
}




