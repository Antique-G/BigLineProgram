import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {differenceInCalendarDays,format} from 'date-fns';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import {StoreQuoteBydateComponent} from '../store-quote-bydate.component';
import {StoreQuoteBydateRequestModel,StoreQuoteBydateModel,FreeTraveQuoteBydateModel} from '../../../../../interfaces/store/storeQuote/store-quote-bydate';

import {StoreQuoteBydateService} from '../../../../../services/store/store-quote-bydate/store-quote-bydate.service';
import { isNumber, isFloat } from '../../../../util/validators';
import { DeleteComfirmComponent } from '../../common/delete-comfirm/delete-comfirm.component';

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
  type:any;//freeTravel 自由行 management 产品管理   是从自由行 还是产品跳过来的

  //自由行
  freeTraveModel:FreeTraveQuoteBydateModel 

  productId:number;
  selectDate:any
  dateArr:any
  selectItem:any ////当前点击项

  listDataMap:any

  confirmValue:any
  freeTravelModel:any
  currentDate = null

  validationMessage: any = {
    adult_price: {
      'isFloat': '请输入正确的数字',
      'required':'成人价格数量必填'
    },
    child_price: {
      'isFloat': '请输入正确的数字',
    },
    original_adult_price: {
      'isFloat': '请输入正确的数字',
    },
    original_child_price: {
      'isFloat': '请输入正确的数字',
    },
    difference_price: {
      'isFloat': '请输入正确的数字',
    },
    inventory_num:{
      'isNumber': '请输入非零的正数',
      'required':'库存数量必填'
    }
  }

  formErrors: any = {
    adult_price: '',
    child_price: '',
    original_adult_price: '',
    original_child_price: '',
    difference_price:'',
    inventory_num:''
  };

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreQuoteBydateComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,public quoteBydateService:StoreQuoteBydateService,private modal: NzModalService) { 
      console.log(this.data,'this.data');
      this.productId = this.data.productId
      this.type = this.data.type
      this.listDataMap = this.data.listDataMap.data
      this.selectItem = this.data.date; //当前点击项

      this.freeTraveModel={
        id: 0,
        independent_product_id: 0,
        start_date: '',
        end_date: '',
        adult_price: 0,
        child_price: 0,
        difference_price: 0,
        inventory_num: 0,
        set_inventory: 0,
        allow_over: 0,
        check_status: 0,
        created_at: '',
        updated_at: '',
      }

      this.quoteBydateRequestModel = {data:[]}
      this.quoteBydateModel = {
        date:''
      }
      if(this.type==='freeTravel'){
        this.buildFreeTravel();
      }else{
          this.buildProduct();
      }
    
    // 拼接之前的
    // this.quoteBydateRequestModel.data.push(...this.listDataMap)

     // 每次表单数据发生变化的时候更新错误信息
      this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
    this.GetDetail();
      
}


  ngOnInit(): void {
    
  
  }

  buildProduct(){
    this.addForm = this.fb.group({
      date: ['', [Validators.required]],
      adult_price: ['',[isFloat]],
      child_price: ['',[isFloat]],
      original_adult_price: ['',[isFloat]],
      original_child_price: ['',[isFloat]],
      difference_price: ['',[isFloat]],
    
    });
  }
  buildFreeTravel(){
    this.addForm = this.fb.group({
      // date: [[new Date(),new Date()], [Validators.required]],
      date: ['', [Validators.required]],
      adult_price: ['',[Validators.required,isFloat]],
      child_price: ['',[isFloat]],
      difference_price: ['',[isFloat]],
      inventory_num:['', [Validators.required,isNumber]],
      set_inventory:['', [Validators.required]],
      allow_over:['', [Validators.required]],
    });
  }

  // 获取详情
  GetDetail(){
      if(this.type==='management'){
          // 修改
          if(this.selectItem){
            this.selectDate=[new Date(this.selectItem.date),new Date(this.selectItem.date)]
            this.addForm.controls["adult_price"].setValue(this.selectItem.adult_price)
            this.addForm.controls["child_price"].setValue(this.selectItem.child_price)
            this.addForm.controls["original_adult_price"].setValue(this.selectItem.original_adult_price)
            this.addForm.controls["original_child_price"].setValue(this.selectItem.original_child_price)
            this.addForm.controls["difference_price"].setValue(this.selectItem.difference_price)
          }
  
      }else{
        if(this.selectItem){
          console.log(this.listDataMap,'this.listDataMap');
          console.log(this.productId,'this.productId');
          console.log(this.selectItem);
            this.quoteBydateService.getFreeTravelQuoteDateDetail(this.selectItem.id).subscribe(res=>{
              if(res.data){
                this.freeTravelModel = res.data
                console.log('拿到的data',res.data);
                this.setfreeTravelFormValue()
              }
            })
          }
      }
      
  }

  setfreeTravelFormValue(){
    console.log(this.freeTravelModel,'freeTravelModel');
    this.selectDate = [new Date(this.freeTravelModel.start_date),new Date(this.freeTravelModel.end_date)]
    this.addForm.controls["adult_price"].setValue(this.freeTravelModel.adult_price)
    this.addForm.controls["child_price"].setValue( this.freeTravelModel.child_price)
    this.addForm.controls["difference_price"].setValue(this.freeTravelModel.difference_price)
    this.addForm.controls["inventory_num"].setValue(this.freeTravelModel.inventory_num)

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

  onDateChange(dateStr:any){
   
    
  }

  disabledDate= (current: Date): boolean => {
    // 禁用之前的日期
    return differenceInCalendarDays(current, this.today) < 0;
  };

  // 产品报价
  setValue(){
    this.dateArr = this.getAllDateCN(this.selectDate[0],this.selectDate[1])
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

  // 自由行报价
  setFreeTravelValue(){
    console.log('this.currentDate',this.currentDate);
    this.freeTraveModel.id = this.freeTravelModel?this.freeTravelModel.id:0;
    this.freeTraveModel.independent_product_id = this.productId;
    this.freeTraveModel.start_date = format(this.selectDate[0],'yyyy-MM-dd');
    this.freeTraveModel.end_date = format(this.selectDate[1],'yyyy-MM-dd');
    this.freeTraveModel.adult_price = this.addForm.value.adult_price;
    this.freeTraveModel.child_price = this.addForm.value.child_price;
    this.freeTraveModel.difference_price = this.addForm.value.difference_price;
    this.freeTraveModel.inventory_num = this.addForm.value.inventory_num;
    this.freeTraveModel.set_inventory = this.addForm.value.set_inventory;
    this.freeTraveModel.allow_over = this.addForm.value.allow_over;
    this.freeTraveModel.check_status = this.addForm.value.check_status;
    console.log(this.freeTraveModel,'this.freeTraveModel');
  }

  add(){
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log(this.addForm);
    console.log(this.addForm.valid);
    if(this.selectDate===''){
      alert("请输入日期范围");
      return
    }
    
    if (this.addForm.valid) {
      if(this.type==='management'){
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
      }else{
        // 自由行产品编辑
        this.setFreeTravelValue();
        console.log( this.listDataMap,' this.listDataMap');
        if(this.selectItem){
          this.listDataMap = this.listDataMap.filter((ele:any)=>ele.id!=this.selectItem.id)
        }
        //判断添加日期是否在已有的日期内,若有,就不让加
        let flag = this.listDataMap.some((ele:any)=>{
          let start_date = new Date(ele.start_date).getTime()
          let end_date = new Date(ele.end_date).getTime()
          let selectBegin = new Date(this.selectDate[0]).getTime()
          let selectEnd = new Date(this.selectDate[1]).getTime()
        
          return selectBegin<=start_date && selectEnd>=end_date 
          || selectEnd<=end_date && selectEnd>=start_date
          || selectBegin<=end_date && selectBegin>=start_date
          || selectBegin>=start_date && selectEnd<=end_date
          
            
        })
        if(flag){
          this.modal['error']({
            nzMask: false,
            nzTitle: `<h3>提示</h3>`,
            nzContent: `<h6>存在日期有报价</h6>`,
            nzStyle: { position: 'absolute', top: `70px`, left: `40%` }
          })
          this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
          setTimeout(() => this.modal.closeAll(), 2500);
          return false;
        }
      
        console.log(222);
        // 修改
        if(this.selectItem){

          this.quoteBydateService.updateFreeTravelQuteDate(this.freeTraveModel).subscribe(res=>{
              this.dialogRef.close();
          })
        }else{
            
            
            // 添加
            this.quoteBydateService.createFreeTravelQuteDate(this.freeTraveModel).subscribe(res=>{
              console.log(res);
              this.dialogRef.close();
            })
          
        }
        
      }
      
    }
  }



  deleteInfo(){
     this.modal.confirm({
      nzTitle: `<h2>删除<h2>`,
      nzContent:  `<h6>请确认是否删除</h6>`,
      nzOnOk: () =>{
        if(this.type=='management'){
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
        }else{
          console.log('删除');
          this.quoteBydateService.delQuoteInfo(this.selectItem.id).subscribe(res=>{
            this.dialogRef.close();
            if(res ==null){
              // alert("删除成功")
            }else{
              // alert("删除成功")
            }
          })
        }
       
      }

    });
  }

  close(){
    this.dialogRef.close();
  }
}
