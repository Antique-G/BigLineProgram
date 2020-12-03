import { Component, OnInit ,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AdminProductTagComponent} from '../admin-product-tag.component';
import {AdminProductTagService} from '../../../../../services/admin/admin-product-tag.service';
import { ProductTagModel } from '../../../../../interfaces/adminProduct/ProductTagModel';
import { NzMessageService } from 'ng-zorro-antd/message';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-admin-product-tag-create',
  templateUrl: './admin-product-tag-create.component.html',
  styleUrls: ['./admin-product-tag-create.component.css']
})
export class AdminProductTagCreateComponent implements OnInit {

  addForm: FormGroup;
  statusValue = '0';
  cateValue=""
  productTagModel:ProductTagModel
  productTagInfo:any
  validationMessage:any ={
    name: {
      'maxlength': '标签名称长度最多为32个字符',
      'required': '请填写标签名称'
    }
  }

  formErrors:any = {
    name: ''
  }

  constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AdminProductTagComponent>,
   public adminProductTagService:AdminProductTagService,@Inject(MAT_DIALOG_DATA) public tagInfo: DialogData,private message: NzMessageService) { 
   
    this.addForm =  fb.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      cate_id:['',Validators.required],
      status: ['', [Validators.required]]
  });
    this.productTagModel = {
      id:0,
      name:'',
      cate_id:0,
      status:0,
      updatedAt:''
    }
    console.log('tagInfo',tagInfo);
    this.productTagInfo = tagInfo
    
  }
 
  ngOnInit(): void {

    this.bindForm();
    this.productTagInfo&&this.editInfoInit()
  }

  bindForm(){
    // 每次表单数据发生变化的时候更新错误信息
    this.addForm.valueChanges.subscribe(data =>{
      this.onValueChanged(data)
    });
    // 初始化错误信息
    this.onValueChanged();
    // 获取标签分类
    this.getCateList()
  }

  editInfoInit(){
    this.addForm.get("name")?.setValue(this.productTagInfo.name)
    this.addForm.get("cate_id")?.setValue(this.productTagInfo.cate_id)
    this.addForm.get("status")?.setValue(this.productTagInfo.status)
    this.cateValue = this.productTagInfo.cate_id.toString()
    this.statusValue = this.productTagInfo.status.toString()
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
    this.productTagModel.name = this.addForm.value.name;
    this.productTagModel.cate_id = this.addForm.value.cate_id;
    this.productTagModel.status = this.addForm.value.status;
  }

  addProductTag(){
    this.setValue()
    // 验证表单
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log('productTagModel', this.productTagModel);

    if(this.productTagInfo.id){
    // 修改
    }else{
      // 添加
      if(this.addForm.valid){
        this.adminProductTagService.createProduct(this.productTagModel).subscribe(res=>{
          if(res.message!=null || res.message!=undefined){
            // alert(res.message)
            this.message.create('success', res.message);
          }
        })
      }
    }
   
   
  }

  getCateList(){
    this.adminProductTagService.getCateList().subscribe(res=>{
      console.log(res);
    })
  }


  close(){
    this.dialogRef.close();
  }

}
