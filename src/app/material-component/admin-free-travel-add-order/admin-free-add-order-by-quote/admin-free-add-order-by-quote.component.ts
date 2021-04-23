import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { OrderGroupProduct } from '../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminOrderFreeTravelService } from '../../../../services/admin/admin-order-free-travel.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminUploadIdCardComponent } from '../../admin-common/admin-upload-id-card/admin-upload-id-card.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FreePriceDetailComponent } from '../admin-free-travel-add-order-detail/free-price-detail/free-price-detail.component';
import { FeeByQuoteComponent } from './fee-by-quote/fee-by-quote.component';
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
  selector: 'app-admin-free-add-order-by-quote',
  templateUrl: './admin-free-add-order-by-quote.component.html',
  styleUrls: ['./admin-free-add-order-by-quote.component.css']
})
export class AdminFreeAddOrderByQuoteComponent implements OnInit {
  public isLoadingAdd = false;
  addForm!: FormGroup;
  informationForm!: FormGroup;
  contactForm!: FormGroup;
  detailModel: any;

  isDay: any;
  seletYearMonth: any = format(new Date(), 'yyyy-MM');
  selectedYear = format(new Date(), 'yyyy');
  yearList = ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'];
  nzPageIndex = new Date().getMonth() + 1;
  selectedDateValue = new Date();
  listDataMap: any;
  orderGroupProduct: OrderGroupProduct;
  isdate_quotes_id: any;
  ids: any[] = [];
  numIsShow = false;

  //联系
  isName: any;
  isPhone: any;

  isChangeData: any[] = [];    //证件类型
  newImgArr: any[] = []       //证件照片




  isPackPrice: any;
  isPackAll: any;
  other_price = 0;

  totalPrice: any;
  feeAll: any;
  discountPrice = 0;
  isShowFeeDetail = false;

  discount_tit: any;
  other_price_tit: any;

  constructor(public fb: FormBuilder, private message: NzMessageService, public router: Router,
    public adminOrderFreeTravelService: AdminOrderFreeTravelService, public dialog: MatDialog,
    private modal: NzModalService) {
    this.addForm = this.fb.group({
      product_id: ['',],
      departure_city_name: ['',],
      destination_city_name: ['',],
      isDay: ['',],
    });
    // 校验手机
    const { mobile } = MyValidators;
    this.informationForm = this.fb.group({
      humanList: this.fb.array([]),
      customer_remarks: ['',],
      emergency_contact_person: [''],
      emergency_contact_number: ['', [mobile]],
    });
    this.contactForm = this.fb.group({
      contact_name: ['', [Validators.required]],
      contact_phone: ['', [Validators.required, mobile]],
      contact_wechat: ['',],
      contact_qq: ['',],
      contact_email: ['',],
      use_num: ['',],
      inclusive: ['',],
      num_total: [1, [Validators.required]],
      internal_remarks: ['',],
    });
    this.orderGroupProduct = {
      product_id: '',
      date_quotes_id: '',
      members: [],
      contact_name: '',
      contact_phone: '',
      contact_wechat: '',
      contact_qq: '',
      contact_email: '',
      customer_remarks: '',
      emergency_contact_person: '',
      emergency_contact_number: '',
      discount: '',
      other_price: '',
      num_total: '',
      internal_remarks: '',
      discount_tit: '',
      other_price_tit: '',
    }
  }


  // 出行人
  get humanArray() {
    return this.informationForm.get("humanList") as FormArray;
  }


  //添加
  addHuman() {
    // 校验手机
    const { mobile } = MyValidators;
    this.humanArray.push(this.fb.group({
      name: new FormControl(''),
      phone: new FormControl('', [mobile]),
      is_kid: new FormControl(this.detailModel.reserve_children === 1 ? '' : 0),
      id_type: new FormControl('',),
      id_num: new FormControl('',),
      birthday: new FormControl(null,),
      id_photo: new FormControl('',),
      gender: new FormControl(1,),
      eng_name: new FormControl(''),
    }))
    this.isChangeData.push(false);
    this.newImgArr.push([]);
    this.isNum();

  }


  removeIcon(index: number) {
    // if (this.humanArray.length > 1) {
    //   this.humanArray.removeAt(index);
    //   this.isNum();
    // }
    // else {
    //   this.message.create('warning', '无法删除，至少存在一组');
    // }
    this.humanArray.removeAt(index);
    this.isNum();
  }


  // 套餐数
  onEnterPack(event: any) {
    console.log('event :>> ', event);
    this.isNum();
    this.priceAll();
  }

  // 显示出行人按钮
  isNum() {
    //最大数
    let nums = Number(this.contactForm.value.num_total) * Number(this.detailModel?.use_num);
    if (nums > Number(this.humanArray.controls.length)) {
      this.numIsShow = true;
    }
    else {
      this.numIsShow = false;
    }
  }


  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("freeOrderData")!)
    this.isDay = this.detailModel.few_days + '天' + this.detailModel.few_nights + '晚';
    this.listDataMap = this.detailModel?.date_quote;
    this.listDataMap?.forEach((value: any) => {
      value['checked'] = false;
    })
    let control = <FormArray>this.informationForm.controls['humanList'];
    // 校验手机
    const { mobile } = MyValidators;
    // control.push(new FormGroup({
    //   name: new FormControl(''),
    //   phone: new FormControl('',),
    //   is_kid: new FormControl(this.detailModel.reserve_children === 1 ? '' : 0),
    //   id_type: new FormControl(''),
    //   id_num: new FormControl(''),
    //   birthday: new FormControl(null),
    //   id_photo: new FormControl(''),
    //   gender: new FormControl(1),
    //   eng_name: new FormControl(''),
    // }));
    this.isChangeData.push(false);
    this.isNum();
    this.newImgArr.push([])
  }




  setValue() {
    this.orderGroupProduct.product_id = this.detailModel.id;
    this.orderGroupProduct.customer_remarks = this.informationForm.value.customer_remarks;
    // 处理出生日期
    this.orderGroupProduct.members = this.informationForm.value.humanList;
    console.log('this.orderGroupProduct.members :>> ', this.orderGroupProduct.members);
    this.orderGroupProduct.members.forEach((element: any) => {
      if (element?.birthday != null) {
        element.birthday = format(new Date(element.birthday), 'yyyy-MM-dd');
      }
    });
    this.orderGroupProduct.contact_name = this.contactForm.value.contact_name;
    this.orderGroupProduct.contact_phone = this.contactForm.value.contact_phone;
    this.orderGroupProduct.contact_wechat = this.contactForm.value.contact_wechat;
    this.orderGroupProduct.contact_qq = this.contactForm.value.contact_qq;
    this.orderGroupProduct.contact_email = this.contactForm.value.contact_email;
    this.orderGroupProduct.date_quotes_id = this.isdate_quotes_id;
    this.orderGroupProduct.emergency_contact_person = this.informationForm.value.emergency_contact_person;
    this.orderGroupProduct.emergency_contact_number = this.informationForm.value.emergency_contact_number;
    this.orderGroupProduct.internal_remarks = this.contactForm.value.internal_remarks;
    this.orderGroupProduct.num_total = this.contactForm.value.num_total;
    // 优惠金额
    this.orderGroupProduct.discount = this.discountPrice;
    this.orderGroupProduct.discount_tit = this.discount_tit;
    // 收费
    this.orderGroupProduct.other_price = this.other_price;
    this.orderGroupProduct.other_price_tit = this.other_price_tit;


  }



  add() {
    this.setValue();
    for (const i in this.contactForm.controls) {
      this.contactForm.controls[i].markAsDirty();
      this.contactForm.controls[i].updateValueAndValidity();
    }
    if (this.contactForm.valid) {
      console.log('this.orderGroupProduct', this.orderGroupProduct);
      this.isLoadingAdd = true;
      this.adminOrderFreeTravelService.addOrderGroup(this.orderGroupProduct).subscribe(res => {
        this.isLoadingAdd = false;
        this.router.navigate(['/admin/main/freeTravelOrder']);
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
    let str = this.seletYearMonth + '-' + new Date().getDate()
    this.selectedDateValue = new Date(str)
    console.log('objec12111111t :>> ', str);
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


  selectChange(select: Date): void {
    console.log('选择的', select);
    this.seletYearMonth = format(new Date(select), 'yyyy-MM');
    let newMon = format(new Date(select), 'MM');
    newMon = newMon.replace(/\b(0+)/gi, "");
    this.nzPageIndex = Number(newMon);
  }



  changeId(item: any) {
    console.log('object :>> ', item);
    this.feeAll = item;
    if (item.checked === true) {
      this.isShowFeeDetail = true;
      this.isdate_quotes_id = item.id;
      this.isPackPrice = item.inclusive_price;
      this.priceAll();
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
      this.isShowFeeDetail = false;

    }
  }


  priceAll() {
    this.isPackAll = Number(this.isPackPrice) * Number(this.contactForm.value.num_total);
    this.totalPrice = Number(this.isPackAll) - Number(this.discountPrice) + Number(this.other_price);
  }



  feeDetail() {
    const editmodal = this.modal.create({
      nzTitle: '订单费用明细',
      nzContent: FeeByQuoteComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        data: {
          feeAll: this.feeAll,
          packNum: Number(this.contactForm.value.num_total),
        }
      },
      nzFooter: [
        {
          label: '确定',
          type: 'primary',
          onClick: componentInstance => {
            let a = componentInstance?.update();
            editmodal.close(a)
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      if (res != undefined) {
        this.discountPrice = res?.discount;
        this.other_price = res?.other_price;
        this.totalPrice = res?.totalPrice;
        this.discount_tit = res?.discount_tit;
        this.other_price_tit = res?.other_price_tit
      }
    })
  }

  // 上传证件照
  choiceImg(i: any) {
    console.log("i是什么", i);
    const dialogRef = this.dialog.open(AdminUploadIdCardComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.newImgArr[i].push(res.url)
        console.log(this.newImgArr, ' this.newImgArr');
        console.log('图片 ', this.newImgArr);
        this.humanArray.controls[i].patchValue({ 'id_photo': this.newImgArr[i] });
      }
    });
  }


  deleteImg(i: any, index: any) {
    console.log('删除的是 :>> ', i, index);
    this.newImgArr[i].splice(index, 1)
    console.log('this.newImgArr ', this.newImgArr);
    this.humanArray.controls[i].patchValue({ 'id_photo': this.newImgArr[i] });
  }


  // 出行人设为联系人
  setContract(human: any) {
    console.log('i3242342 :>> ', human, human.value.name);
    this.isName = human.value.name;
    this.isPhone = human.value.phone;
  }


  // 身份证不显示出生年月日
  changeType(data: any, i: any) {
    console.log('data :>> ', data, data === 1, data === '1');
    if (data === 1) {
      this.isChangeData[i] = false;
    }
    else {
      this.isChangeData[i] = true;
    }
  }




}

