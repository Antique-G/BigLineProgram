import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreOrderGroupTravelService } from '../../../../../services/store/store-order/store-order-group-travel.service';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderGroupProduct } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { Router } from '@angular/router';

// 手机号码校验
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}


@Component({
  selector: 'app-store-order-grouptravel-order',
  templateUrl: './store-order-grouptravel-order.component.html',
  styleUrls: ['./store-order-grouptravel-order.component.css']
})
export class StoreOrderGrouptravelOrderComponent implements OnInit {
  public isLoadingBtn = false;
  public isLoadingAdd = false;
  isShow = true;
  searchForm!: FormGroup;
  addForm!: FormGroup;
  informationForm!: FormGroup;
  contactForm!: FormGroup;
  detailModel: any;
  code: any;
  isDay: any;
  assembling_time: any;
  seletYearMonth: any = format(new Date(), 'yyyy-MM');
  selectedYear = format(new Date(), 'yyyy');
  yearList = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'];
  nzPageIndex = new Date().getMonth() + 1;
  selectedDateValue = new Date();
  listDataMap: any;
  isshared_status = '0';
  orderGroupProduct: OrderGroupProduct;
  isdate_quotes_id: any;
  ids: any[] = [];
  numIsShow = false;



  constructor(public fb: FormBuilder, private message: NzMessageService, public router: Router,
    public storeOrderGroupTravelService: StoreOrderGroupTravelService) {
    this.searchForm = this.fb.group({
      product_code: ['',],
    });
    this.addForm = this.fb.group({
      product_id: ['',],
      departure_city_name: ['',],
      destination_city_name: ['',],
      isDay: ['',],
      assembling_place: ['',],
      assembling_time: ['',],
    });
    this.informationForm = this.fb.group({
      humanList: this.fb.array([]),
      num_adult: [1, [Validators.required]],
      num_kid: [0,],
      num_room: [1, [Validators.required]],
      shared_status: ['', [Validators.required]],
      customer_remarks: ['',],
    });
    // 校验手机
    const { mobile } = MyValidators;
    this.contactForm = this.fb.group({
      contact_name: ['', [Validators.required]],
      contact_phone: ['', [Validators.required, mobile]],
      contact_wechat: ['',],
      contact_qq: ['',],
      contact_email: ['',],
    });
    this.orderGroupProduct = {
      product_id: '',
      date_quotes_id: '',
      num_adult: '',
      num_kid: '',
      num_room: '',
      members: [],
      contact_name: '',
      contact_phone: '',
      contact_wechat: '',
      contact_qq: '',
      contact_email: '',
      customer_remarks: '',
      assembling_place_id: '',
      shared_status: '',
    }
  }


  // 出行人
  get humanArray() {
    return this.informationForm.get("humanList") as FormArray;
  }


  //添加
  addHuman() {
    // this.humanArray.controls = [];
    // let nums = Number(this.informationForm.value.num_adult) + Number(this.informationForm.value.num_kid);
    // console.log('nums :>> ', nums);
    // for (let i = 0; i < nums-1; i++) {
    //   this.humanArray.push(this.fb.group({
    //     name: new FormControl('', [Validators.required]),
    //     phone: new FormControl('', [Validators.required]),
    //     is_kid: new FormControl('', [Validators.required]),
    //     id_type: new FormControl('', [Validators.required]),
    //     id_num: new FormControl('', [Validators.required]),
    //   }))
    // }
    this.humanArray.push(this.fb.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      is_kid: new FormControl('', [Validators.required]),
      id_type: new FormControl('', [Validators.required]),
      id_num: new FormControl('', [Validators.required]),
    }))
    this.isNum();
  }

  removeIcon(index: number) {
    if (this.humanArray.length > 1) {
      this.humanArray.removeAt(index);
      this.isNum();
    }
    else {
      this.message.create('warning', '无法删除，至少存在一组');
    }
  }

  onEnter(data: any) {
    console.log('data :>> ', data);
    this.isNum();
  }

  onEnter1(data: any) {
    this.isNum();
  }

  isNum() {
    let nums = Number(this.informationForm.value.num_adult) + Number(this.informationForm.value.num_kid);
    console.log('nums, :>> ', nums, Number(this.humanArray.controls.length), nums === Number(this.humanArray.controls.length))
    if (nums > Number(this.humanArray.controls.length)) {
      this.numIsShow = true;
    }
    else {
      this.numIsShow = false;
    }
  }



  ngOnInit(): void { }


  search() {
    this.isLoadingBtn = true;
    this.code = this.searchForm.value.product_code;
    this.storeOrderGroupTravelService.getPro(this.code).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.isLoadingBtn = false;
      this.isShow = false;
      this.detailModel = res.data;
      this.isDay = this.detailModel.few_days + '天' + this.detailModel.few_nights + '晚';
      if (this.detailModel?.assembling_place?.data[0].time === '00:00:00') {
        this.assembling_time = '待定';
      }
      else {
        let i = '2021-01-01' + ' ' + this.detailModel?.assembling_place?.data[0].time;
        let newDate = new Date(i);
        console.log('object :>> ', newDate, i);
        this.assembling_time = format(new Date(newDate), 'HH:mm');
      };
      this.listDataMap = this.detailModel?.date_quote;
      this.listDataMap.forEach((value: any) => {
        value['checked'] = false;
      })
      let control = <FormArray>this.informationForm.controls['humanList'];
      // 校验手机
      const { mobile } = MyValidators;
      control.push(new FormGroup({
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, mobile]),
        is_kid: new FormControl(''),
        id_type: new FormControl('', [Validators.required]),
        id_num: new FormControl('', [Validators.required]),
      }));
    },
      error => {
        this.isLoadingBtn = false;
      })
  }


  setValue() {
    this.orderGroupProduct.product_id = this.detailModel.id;
    this.orderGroupProduct.num_adult = this.informationForm.value.num_adult;
    this.orderGroupProduct.num_kid = this.informationForm.value.num_kid;
    this.orderGroupProduct.num_room = this.informationForm.value.num_room;
    this.orderGroupProduct.customer_remarks = this.informationForm.value.customer_remarks;
    this.orderGroupProduct.shared_status = this.informationForm.value.shared_status;
    this.orderGroupProduct.members = this.informationForm.value.humanList;
    this.orderGroupProduct.contact_name = this.contactForm.value.contact_name;
    this.orderGroupProduct.contact_phone = this.contactForm.value.contact_phone;
    this.orderGroupProduct.contact_wechat = this.contactForm.value.contact_wechat;
    this.orderGroupProduct.contact_qq = this.contactForm.value.contact_qq;
    this.orderGroupProduct.contact_email = this.contactForm.value.contact_email;
    this.orderGroupProduct.assembling_place_id = this.detailModel?.assembling_place?.data[0].id;
    this.orderGroupProduct.date_quotes_id = this.isdate_quotes_id;
  }


  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.isLoadingAdd = true;
      this.storeOrderGroupTravelService.addOrderGroup(this.orderGroupProduct).subscribe(res => {
        this.isLoadingAdd = false;
        this.router.navigate(['/store/main/storeOrdergroupTravel']);
      },
        error => {
          this.isLoadingAdd = false;
        })
    }
  }




  // 选择年
  ngYearChange(year: any) {
    let month = this.nzPageIndex < 10 ? '0' + this.nzPageIndex : this.nzPageIndex;
    this.seletYearMonth = this.selectedYear + '-' + month;

  }

  nzPageIndexChange(index: any) {
    console.log(index);
    let month = index < 10 ? '0' + index : index;
    let year = new Date().getFullYear();
    let day = new Date().getDate();
    this.selectedDateValue = new Date(year + '-' + month + '-' + day);
    this.seletYearMonth = this.selectedYear + '-' + month;
    this.nzPageIndex = index;

  }


  changeId(item: any) {
    console.log('object :>> ', item);
    if (item.checked === true) {
      this.isdate_quotes_id = item.id;
      console.log('this.orderGroupProduct.date_quotes_id ', this.orderGroupProduct.date_quotes_id);
      this.ids.push(item.id)
      console.log("333333", this.ids);
      this.ids.forEach((element: any, index: any) => {
        if (element != this.isdate_quotes_id) {
          this.listDataMap.filter(function (item: any, index: any) {
            if (item.id === element) {
              item.checked = false;

            }
          });
        }
      })
    }
    else if (item.checked === false) {
    }
  }

  sharedStatus(data: any) { }
}
