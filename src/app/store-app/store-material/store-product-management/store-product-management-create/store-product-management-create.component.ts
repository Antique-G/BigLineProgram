import { Component, OnInit,ChangeDetectionStrategy,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreProductManagementComponent } from '../store-product-management.component';
import { ProductModel } from '../../../../../interfaces/store/storeProduct/ProductModel';
import {isNumber,isFloat} from '../../../../util/validators';
import {StoreProductService} from '../../../../../services/store/store-product/store-product.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-store-product-management-create',
  templateUrl: './store-product-management-create.component.html',
  styleUrls: ['./store-product-management-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StoreProductManagementCreateComponent implements OnInit {
  addForm!: FormGroup;
  statusValue = '0';
  detailData:any ;
  assemblingPlaceList = [  { label:'待生成',value:0 },{ label:'已生成',value:1 },{ label:'待审批',value:2 },{ label:'审批通过',value:3 }];
  productModel:ProductModel;

  validationMessage:any = {
    title: {
     'maxlength': '标题长度最多为225个字符',
     'required': '请填写标题'
    },
    fewDays: {
      'required': '请输入出行几天！',
      'isNumber': '请输入非零的正整数'
     },
    fewNights: {
      'required': '请输入出行几晚！',
      'isNumber': '请输入非零的正整数'
     },
    adultPrice: {
      'required': '请输入成人价格！',
      'isFloat': '请输入非零的正整数'
     },
    childPrice: {
      'required': '请输入儿童价格！',
      'isFloat': '请输入非零的正整数'
     },
     originalAdultPrice:{
      'required': '请输入成人原价！',
      'isFloat': '请输入非零的正整数'
     },
     originalChildPrice:{
      'required': '请输入儿童原价！',
      'isFloat': '请输入非零的正整数'
     },
     differencePrice:{
      'required': '请输入补差价！',
      'isFloat': '请输入非零的正整数'
     },
  };
  formErrors:any = {
    title: '',
    fewDays:'',
    fewNights:'',
    adultPrice: '',
    childPrice: '',
    originalAdultPrice: '',
    originalChildPrice: '',
    differencePrice: '',
    
    };
    
  constructor(public fb: FormBuilder,public dialogRef: MatDialogRef<StoreProductManagementComponent>,
    public storeProductService:StoreProductService,@Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    this.buildForm();
    this.productModel = {
      title: '',
      fewDays: 0,
      fewNights: 0,
      adultPrice: 0,
      childPrice: 0,
      originalAdultPrice: 0,
      originalChildPrice: 0,
      differencePrice: 0,
      feature: '',
      details:'',
      fee: '',
      notice: '',
      assemblingPlaceId: [],
      tagId: [],
      status: 0
    }
    
    this.detailData = data

  }

  ngOnInit(): void {
    this.addForm.controls['assemblingPlaceId'].setValue([]);
    this.addForm.controls['tagId'].setValue([]);
    console.log('修改data',this.data);
  }

  buildForm(): void{
    this.addForm =  this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(225)]],
      fewDays: ['', [Validators.required,isNumber]],
      fewNights: ['', [Validators.required,isNumber]],
      adultPrice: ['', [Validators.required,isFloat]],
      childPrice: ['', [Validators.required,isFloat]],
      originalAdultPrice: ['', [Validators.required,isFloat]],
      originalChildPrice: ['', [Validators.required,isFloat]],
      differencePrice: ['', [Validators.required,isFloat]],
      feature: ['', [Validators.required]],
      details: ['', [Validators.required]],
      fee: ['', [Validators.required]],
      notice: ['', [Validators.required]],
      assemblingPlaceId: ['', [Validators.required]],
      tagId: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    

    // 每次表单数据发生变化的时候更新错误信息
    this.addForm.valueChanges.subscribe(data =>{
      this.onValueChanged(data)

    });
    // 初始化错误信息
    this.onValueChanged();
  }
  
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
      const control:any = form.get(field);
     
      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && !control.valid) {
            // 获取验证不通过的控件名，为了获取更详细的不通过信息
            const messages = this.validationMessage[field];
            // 遍历当前控件的错误对象，获取到验证不通过的属性
            for (const key in control.errors) {
            // 把所有验证不通过项的说明文字拼接成错误消息
             this.formErrors[field] = messages[key] ;
            }
        }
    }
  }


  setValue() {
    this.productModel.title = this.addForm.value.title;
    this.productModel.fewDays = this.addForm.value.fewDays;
    this.productModel.fewNights = this.addForm.value.fewNights;
    this.productModel.adultPrice = this.addForm.value.adultPrice;
    this.productModel.childPrice = this.addForm.value.childPrice;
    this.productModel.originalAdultPrice = this.addForm.value.originalAdultPrice;
    this.productModel.originalChildPrice = this.addForm.value.originalChildPrice;
    this.productModel.differencePrice = this.addForm.value.differencePrice;
    this.productModel.feature = this.addForm.value.feature;
    this.productModel.details = this.addForm.value.details;
    this.productModel.fee = this.addForm.value.fee;
    this.productModel.notice = this.addForm.value.notice;
    this.productModel.assemblingPlaceId = this.addForm.value.assemblingPlaceId;
    this.productModel.tagId = this.addForm.value.tagId;
    this.productModel.status = this.addForm.value.status;
  }


  addProduct(){
    this.setValue()
    // 验证表单
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log(this.addForm);
    console.log(this.addForm.valid);
    if(this.addForm.valid){
      console.log(2);
        if(this.data){
            // 修改
            console.log("修改");
        }else{
            console.log("添加");
           
          // 添加
          // this.storeProductService.createProduct(this.productModel).subscribe(res => {
          //   console.log("res结果", res);
          //   if (res === null) {
          //     alert("创建成功");
          //     this.dialogRef.close(1);
          //   }
          //   else{
          //     alert("创建失败，请重新填写")
          //   }
          // })
        }
        
    }
  }
  
  getProductDetail(){
    if(this.data){
      
      this.storeProductService.getProductDetail(this.detailData.id).subscribe(res => {
        console.log(res);
      })
    }
  }
  
  close(){
     this.dialogRef.close();
  }
}
