import { Component, OnInit, Inject, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays, format } from 'date-fns';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { StoreQuoteBydateComponent } from '../store-quote-bydate.component';
import { StoreQuoteBydateRequestModel, StoreQuoteBydateModel, FreeTraveQuoteBydateModel } from '../../../../../interfaces/store/storeQuote/store-quote-bydate';

import { StoreQuoteBydateService } from '../../../../../services/store/store-quote-bydate/store-quote-bydate.service';
import { isNumber, isFloat } from '../../../../util/validators';
import { DeleteComfirmComponent } from '../../common/delete-comfirm/delete-comfirm.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-store-quote-bydate-create',
  templateUrl: './store-quote-bydate-create.component.html',
  styleUrls: ['./store-quote-bydate-create.component.css']
})


export class StoreQuoteBydateCreateComponent implements OnInit {
  @Input() data: any;
  today = new Date();
  addForm!: FormGroup;
  quoteBydateRequestModel: StoreQuoteBydateRequestModel;
  quoteBydateModel: StoreQuoteBydateModel;
  type: any;//freeTravel 自由行 management 产品管理   是从自由行 还是产品跳过来的
  isEarlier: any;
  public isSpinning: boolean = true;
  //自由行
  freeTraveModel: FreeTraveQuoteBydateModel;

  productId: number = 0;
  selectDate: any;
  dateArr: any;
  selectItem: any; ////当前点击项

  listDataMap: any[] = [];

  isSetInventory = '0';
  isAllowOver = '0';

  resultArr: FreeTraveQuoteBydateModel[] = [];

  confirmValue: any;
  freeTravelModel: any;
  currentDate = null;
  // 选择了周几
  weekValue: any[] = [1, 2, 3, 4, 5, 6, 0];
  // 选择周几
  checkWeeks = [
    { label: '周一', value: 1, checked: true },
    { label: '周二', value: 2, checked: true },
    { label: '周三', value: 3, checked: true },
    { label: '周四', value: 4, checked: true },
    { label: '周五', value: 5, checked: true },
    { label: '周六', value: 6, checked: true },
    { label: '周日', value: 0, checked: true },
  ]


  validationMessage: any = {
    adult_price: {
      'isNumber': '请输入非零的正数',
      'required': '成人价格数量必填'
    },
    child_price: {
      'isNumber': '请输入非零的正数',
    },
    original_adult_price: {
      'isNumber': '请输入非零的正数',
    },
    original_child_price: {
      'isNumber': '请输入非零的正数',
    },
    difference_price: {
      'isNumber': '请输入非零的正数',
    },
    inventory_num: {
      'isNumber': '请输入非零的正数',
      'required': '库存数量必填'
    }
  }

  formErrors: any = {
    adult_price: '',
    child_price: '',
    original_adult_price: '',
    original_child_price: '',
    difference_price: '',
    inventory_num: ''
  };

  constructor(public fb: FormBuilder, public quoteBydateService: StoreQuoteBydateService, private modal: NzModalService,
    private msg: NzMessageService) {
    this.freeTraveModel = {
      id: 0,
      date: '',
      independent_product_id: 0,
      adult_price: 0,
      child_price: 0,
      difference_price: 0,
      inventory_num: 1,
      set_inventory: 0,
      allow_over: 0,
      check_status: 0,
      created_at: '',
      updated_at: '',
    }

    this.quoteBydateRequestModel = { data: [] }
    this.quoteBydateModel = {
      date: ''
    }
    this.buildForm();
    this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();


  }

  ngOnInit(): void {
    console.log(this.data, 'this.data');
    this.productId = this.data.productId;
    this.type = this.data.type;
    this.isEarlier = this.data.earlier;
    console.log('object :>> ', this.isEarlier);
    this.selectItem = this.data.date?this.data.date[0]:''; //当前点击项
    this.GetDetail();
    console.log(this.selectItem, 'this.selectItem');
  }

  updateLoading() {
    this.isSpinning = true;
  }

  buildForm() {
    console.log('buildForm');
    this.addForm = this.fb.group({
      week: [false],
      date: ['', [Validators.required]],
      adult_price: ['', [Validators.required, isNumber]],
      child_price: [0, [isNumber]],
      difference_price: [0, [isNumber]],
      inventory_num: [1, [Validators.required, isNumber]],
      set_inventory: [0, [Validators.required]],
      allow_over: [0, [Validators.required]],
    });
  }

  // 获取详情
  GetDetail() {
    if (this.type === 'management') {
      this.getAllData();
      // 修改
      if (this.selectItem) {
        this.selectDate = [new Date(this.selectItem.date), new Date(this.selectItem.date)]
        console.log('this.selectDate',this.selectDate);
        this.addForm.controls["adult_price"].setValue(this.selectItem.adult_price)
        this.addForm.controls["child_price"].setValue(this.selectItem.child_price)
        this.addForm.controls["difference_price"].setValue(this.selectItem.difference_price)
        this.addForm.controls["inventory_num"].setValue(this.selectItem.inventory_num)
        // this.addForm.controls["set_inventory"].setValue(this.selectItem.set_inventory)
        this.isSetInventory = (this.selectItem.set_inventory).toString() || '0'
        this.isAllowOver = (this.selectItem.allow_over).toString() || '0'
        // this.addForm.controls["allow_over"].setValue(this.selectItem.allow_over)
      }
      else{
        if(this.data.date){
          this.selectDate = [new Date(this.data.date[1]), new Date(this.data.date[1])];
        }
      }

    } else {
      if (this.selectItem) {
        console.log('GetDetail');
        console.log(this.productId, 'this.productId');
        this.quoteBydateService.getFreeTravelQuoteDateDetail(this.selectItem.id).subscribe(res => {
          this.isSpinning = false
          if (res.data) {
            this.freeTravelModel = res.data
            console.log('拿到的data', res.data);
            this.setfreeTravelFormValue()
          }
        })
      } else {
        this.isSpinning = false
      }
    }

  }

  // 获取产品报价所有数据
  getAllData() {
    this.quoteBydateService.getQuoteDateList(this.productId, 'management', '', '', '').subscribe(res => {
      console.log(res, '获取产品报价所有数据');
      this.listDataMap.push(...res.data)
      console.log(this.listDataMap);
      this.isSpinning = false
    })
  }

  setfreeTravelFormValue() {
    console.log(this.freeTravelModel, 'freeTravelModel');
    this.selectDate = [new Date(this.freeTravelModel.date), new Date(this.freeTravelModel.date)]

    this.addForm.controls["adult_price"].setValue(this.freeTravelModel.adult_price)
    this.addForm.controls["child_price"].setValue(this.freeTravelModel.child_price)
    this.addForm.controls["difference_price"].setValue(this.freeTravelModel.difference_price)
    this.addForm.controls["inventory_num"].setValue(this.freeTravelModel.inventory_num || 0)
    console.log(this.freeTravelModel.set_inventory, ' this.freeTravelModel.set_inventory');
    this.isSetInventory = (this.freeTravelModel.set_inventory).toString() || '0'
    this.isAllowOver = (this.freeTravelModel.allow_over).toString() || 0
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

  getAllDateCN(startTime: Date, endTime: Date) {
    if (!startTime) return
    if (!endTime) return [format(startTime, 'yyyy-MM-dd')]
    var date_all = []
    var i = 0

    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      console.log(this.weekValue, startTime.getDay());
      if (this.weekValue.indexOf(startTime.getDay()) > -1) {
        console.log(123);
        date_all[date_all.length] = format(startTime, 'yyyy-MM-dd')
      }
      console.log(date_all, 'date_all');
      startTime.setDate(startTime.getDate() + 1)
      i += 1
    }

    return date_all
  }

  ngCheckBoxChange(value: object[]): void {
    this.weekValue = value
    console.log(value);
  }
  onDateChange(dateStr: any) {
  }
  ngRadioChange(status: EventEmitter<string>) {
    console.log(status, 'status');
    if (status.toString() == '0') {
      this.addForm.controls["inventory_num"].setValue(1)
      this.isAllowOver = '0'
    }
  }


  disabledDate = (current: Date): boolean => {
    // 禁用之前的日期
    console.log("this.isEarlier",this.isEarlier)
    let i = 1 + Number(this.isEarlier);
    return differenceInCalendarDays(current, this.today) < i;
  };

  // 产品报价
  setValue() {

    this.dateArr = this.getAllDateCN(this.selectDate[0], this.selectDate[1])
    console.log(this.listDataMap, this.dateArr);
    // 过滤已存在的日期
    // let newList = this.listDataMap.filter((item:StoreQuoteBydateModel)=>{
    //   let str = this.dateArr.map((e:string)=>e)
    //   return str.indexOf(item.date)==-1
    // })
    // console.log(newList,'newList');
    // this.quoteBydateRequestModel.data.push(...newList)
    this.dateArr.forEach((date: string) => {
      this.quoteBydateModel = {
        date: '',
      }
      this.quoteBydateModel.date = date;
      this.quoteBydateModel.adult_price = this.addForm.value.adult_price
      this.quoteBydateModel.product_id = this.productId;
      this.quoteBydateModel.child_price = this.addForm.value.child_price > 0 ? this.addForm.value.child_price : 0;
      this.quoteBydateModel.difference_price = this.addForm.value.difference_price > 0 ? this.addForm.value.difference_price : 0;
      this.quoteBydateModel.allow_over = this.addForm.value.allow_over
      this.quoteBydateModel.set_inventory = this.addForm.value.set_inventory
      this.quoteBydateModel.check_status = 1
      this.quoteBydateModel.inventory_num = this.addForm.value.inventory_num || 0
      this.quoteBydateRequestModel.data.push(this.quoteBydateModel)
    });
    console.log(this.quoteBydateRequestModel);
  }

  // 自由行报价
  setFreeTravelValue() {
    this.dateArr = this.getAllDateCN(this.selectDate[0], this.selectDate[1])
    this.dateArr.forEach((date: any) => {
      this.freeTraveModel = {
        id: 0,
        date: '',
        independent_product_id: 0,
        adult_price: 0,
        child_price: 0,
        difference_price: 0,
        inventory_num: 1,
        set_inventory: 0,
        allow_over: 0,
        check_status: 0,
        created_at: '',
        updated_at: '',
      }
      this.freeTraveModel.date = date;
      this.freeTraveModel.independent_product_id = this.productId;
      this.freeTraveModel.adult_price = this.addForm.value.adult_price;
      this.freeTraveModel.child_price = this.addForm.value.child_price > 0 ? this.addForm.value.child_price : 0;
      this.freeTraveModel.difference_price = this.addForm.value.difference_price > 0 ? this.addForm.value.difference_price : 0;
      this.freeTraveModel.inventory_num = this.addForm.value.inventory_num;
      this.freeTraveModel.set_inventory = this.addForm.value.set_inventory;
      this.freeTraveModel.allow_over = this.addForm.value.allow_over;
      // this.freeTraveModel.check_status = this.addForm.value.check_status;
      this.resultArr.push(this.freeTraveModel)
    });
    console.log('添加值', this.resultArr);
  }

  add() {
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }

    if (this.selectDate === '') {
      this.msg.error("请输入日期范围")
      return
    }
    if (this.addForm.valid) {
      if (this.type === 'management') {
        this.setValue();
        this.quoteBydateService.createQuoteInfo(this.quoteBydateRequestModel, this.productId).subscribe(res => {
          this.quoteBydateRequestModel.data = []
        })


      } else {
        console.log('自由行产品编辑 ');
        // 自由行添加
        this.setFreeTravelValue();
        // 修改
        if (this.selectItem) {
          this.quoteBydateService.createFreeTravelQuteDate(this.resultArr).subscribe(res => {
            console.log(res);
          })
        } else {
          // // 添加
          this.quoteBydateService.createFreeTravelQuteDate(this.resultArr).subscribe(res => {
            console.log(res);
          })

        }

      }

    } else {
      this.isSpinning = false
    }
  }



  deleteInfo() {
    this.modal.confirm({
      nzTitle: `<h2>删除<h2>`,
      nzContent: `<h6>请确认是否删除</h6>`,
      nzOnOk: () => {
        if (this.type == 'management') {
          // this.dateArr = this.getAllDateCN(this.selectDate[0],this.selectDate[1])
          // console.log(this.dateArr);
          // let newList = this.listDataMap.filter((item:StoreQuoteBydateModel)=>{
          //   let str = this.dateArr.map((e:string)=>e)
          //   return str.indexOf(item.date)==-1
          // })
          // this.quoteBydateRequestModel.data.push(...newList)
          // this.quoteBydateService.createQuoteInfo(this.quoteBydateRequestModel,this.productId).subscribe(res=>{
          //   this.quoteBydateRequestModel.data =[]
          // })
          this.quoteBydateService.deleteQuoteInfo(this.selectItem.id).subscribe(res => {
            this.quoteBydateRequestModel.data = []
          })
        } else if (this.type == 'freeTravel') {



          this.quoteBydateService.delQuoteInfo(this.selectItem.id).subscribe(res => {
          })
        }
      }

    });
  }

  close() {
  }
}
