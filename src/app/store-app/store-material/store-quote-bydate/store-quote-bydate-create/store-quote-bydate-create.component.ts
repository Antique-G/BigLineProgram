import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {differenceInCalendarDays,format} from 'date-fns';

import {StoreQuoteBydateComponent} from '../store-quote-bydate.component';
import {StoreQuoteBydateRequestModel,StoreQuoteBydateModel} from '../../../../../interfaces/store/storeQuote/store-quote-bydate';

import {StoreQuoteBydateService} from '../../../../../services/store/store-quote-bydate/store-quote-bydate.service';
import { isNumber, isFloat } from '../../../../util/validators';

@Component({
  selector: 'app-store-quote-bydate-create',
  templateUrl: './store-quote-bydate-create.component.html',
  styleUrls: ['./store-quote-bydate-create.component.css']
})


export class StoreQuoteBydateCreateComponent implements OnInit {
  today = new Date();
  addForm!: FormGroup;
  quoteBydateRequestModel:StoreQuoteBydateRequestModel
  quoteBydateModel:StoreQuoteBydateModel
  productId:number;
  selectDate:any
  dateArr:any
  listDataMap:any
  
  currentDate = ""

  validationMessage: any = {
    adult_price: {
      'isFloat': '请输入非零的正数',
    },
    child_price: {
      'isFloat': '请输入非零的正数',
    },
    original_adult_price: {
      'isFloat': '请输入非零的正数',
    },
    original_child_price: {
      'isFloat': '请输入非零的正数',
    },
    difference_price: {
      'isFloat': '请输入非零的正数',
    },
  }

  formErrors: any = {
    adult_price: '',
    child_price: '',
    original_adult_price: '',
    original_child_price: '',
    difference_price:''
  };

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreQuoteBydateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public quoteBydateService:StoreQuoteBydateService) { 
    this.addForm = fb.group({
      date: ['', [Validators.required]],
      adult_price: ['',[isFloat]],
      child_price: ['',[isFloat]],
      original_adult_price: ['',[isFloat]],
      original_child_price: ['',[isFloat]],
      difference_price: ['',[isFloat]],
    });
    this.quoteBydateRequestModel = {data:[]}
    this.quoteBydateModel = {
      date:''
    }
  
    this.productId = this.data.productId
    this.listDataMap = this.data.listDataMap.data
    // 拼接之前的
    // this.quoteBydateRequestModel.data.push(...this.listDataMap)

     // 每次表单数据发生变化的时候更新错误信息
     this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();

    // 修改
    if(this.data.date){
      this.currentDate = this.data.date
      this.selectDate=[new Date(this.data.date)]
      let strDate = format(this.data.date,'yyyy-MM-dd');
      this.listDataMap.forEach((ele:StoreQuoteBydateModel) => {
        if(ele.date == strDate){
          this.addForm.controls["adult_price"].setValue(ele.adult_price)
          this.addForm.controls["child_price"].setValue(ele.child_price)
          this.addForm.controls["original_adult_price"].setValue(ele.original_adult_price)
          this.addForm.controls["original_child_price"].setValue(ele.original_child_price)
          this.addForm.controls["difference_price"].setValue(ele.difference_price)
        }
      });

    }

  }

  ngOnInit(): void {
    

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

  getAllDateCN(startTime:Date, endTime:Date) {
    if(!startTime)return
    if(!endTime) return [format(startTime,'yyyy-MM-dd')]
    var date_all = []
    var i = 0
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      date_all[i] = format(startTime,'yyyy-MM-dd')
      startTime.setDate(startTime.getDate() + 1)
      i += 1
    }
    return date_all
  }

  onDateChange(dateArr:any){
    if(dateArr!=null&&dateArr!=""){
      this.dateArr = this.getAllDateCN(dateArr[0],dateArr[1])
    }
    
  }

  disabledDate= (current: Date): boolean => {
    // 禁用之前的日期
    return differenceInCalendarDays(current, this.today) < 0;
  };

  setValue(){
    // 过滤已存在的日期
    let newList = this.listDataMap.filter((item:StoreQuoteBydateModel)=>{
      let str = this.dateArr.map((e:string)=>e)
      return str.indexOf(item.date)==-1
    })
    this.quoteBydateRequestModel.data.push(...newList)
  
    this.dateArr.forEach((date:string) => {
      
      this.quoteBydateModel = {
        date:'',
      }
      this.quoteBydateModel.date = date;
      if (this.addForm.value.adult_price!=0) {
        this.quoteBydateModel.adult_price = Number(this.addForm.value.adult_price);
      }
      if (this.addForm.value.child_price!=0) {
        this.quoteBydateModel.child_price = Number(this.addForm.value.child_price);
        
      }
      if (this.addForm.value.original_adult_price!=0) {
        this.quoteBydateModel.original_adult_price = Number(this.addForm.value.original_adult_price);
        
      }
      if (this.addForm.value.original_child_price!=0) {
        this.quoteBydateModel.original_child_price = Number(this.addForm.value.original_child_price);
      }
      if (this.addForm.value.difference_price!=0) {
        this.quoteBydateModel.difference_price = Number(this.addForm.value.difference_price);
      }
      this.quoteBydateRequestModel.data.push(this.quoteBydateModel)
    });
  
    
  }

  add(){
    this.onValueChanged()
    console.log(this.addForm);
    console.log(this.addForm.valid);
    if(this.selectDate.length==0){
      alert("请输入日期范围");
      return
    }
    if (this.addForm.valid) {
    
      this.setValue();
      this.quoteBydateService.createQuoteInfo(this.quoteBydateRequestModel,this.productId).subscribe(res=>{
        this.dialogRef.close();
        if(res ==null){
          // alert("报价成功");
        }else{
          // alert("报价失败");
        }
      
        this.quoteBydateRequestModel.data =[]
      })
    }
  }

  deleteInfo(){
    let newList = this.listDataMap.filter((item:StoreQuoteBydateModel)=>{
      let str = this.dateArr.map((e:string)=>e)
      return str.indexOf(item.date)==-1
    })
    this.quoteBydateRequestModel.data.push(...newList)
    this.quoteBydateService.createQuoteInfo(this.quoteBydateRequestModel,this.productId).subscribe(res=>{
      this.dialogRef.close();
      if(res ==null){
        // alert("删除成功")
      }else{
        // alert("删除成功")
      }
     
      this.quoteBydateRequestModel.data =[]
    })
  }

  close(){
    this.dialogRef.close();
  }
}
