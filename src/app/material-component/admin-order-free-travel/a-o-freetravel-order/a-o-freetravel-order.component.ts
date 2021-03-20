import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';


// 手机号码校验
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { OrderGroupProduct } from '../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminOrderFreeTravelService } from '../../../../services/admin/admin-order-free-travel.service';
import { UploadIdCardComponent } from '../../admin-order-group-travel/admin-order-group-order/upload-id-card/upload-id-card.component';
import { MatDialog } from '@angular/material/dialog';

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
  selector: 'app-a-o-freetravel-order',
  templateUrl: './a-o-freetravel-order.component.html',
  styleUrls: ['./a-o-freetravel-order.component.css']
})
export class AOFreetravelOrderComponent implements OnInit {

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

  isName: any;
  isPhone: any;

  isChangeData: any[] = [];    //证件类型
  newImgArr: any[] = []       //证件照片

  isBabyShow = false;
  isChangeBabyData: any[] = [];    //婴儿证件类型
  newBabyArr: any[] = []       //婴儿证件照片






  constructor(public fb: FormBuilder, private message: NzMessageService, public router: Router,
    public adminOrderFreeTravelService: AdminOrderFreeTravelService, public dialog: MatDialog,) {
    this.searchForm = this.fb.group({
      product_code: ['',],
    });
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
      babyList: this.fb.array([]),
      num_adult: [1, [Validators.required]],
      num_kid: [0,],
      num_room: [1, [Validators.required]],
      baby_num: [0],
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
    });
    this.orderGroupProduct = {
      product_id: '',
      date_quotes_id: '',
      num_adult: '',
      num_kid: '',
      num_room: '',
      baby_num: '',
      members: [],
      contact_name: '',
      contact_phone: '',
      contact_wechat: '',
      contact_qq: '',
      contact_email: '',
      customer_remarks: '',
    }
  }


  // 出行人
  get humanArray() {
    return this.informationForm.get("humanList") as FormArray;
  }

  // baby
  get babyArray() {
    return this.informationForm.get("babyList") as FormArray;
  }


  //添加
  addHuman() {
    // 校验手机
    const { mobile } = MyValidators;
    this.humanArray.push(this.fb.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [mobile]),
      is_kid: new FormControl(this.detailModel.reserve_children === 1 ? '' : 0, [Validators.required]),
      id_type: new FormControl('', [Validators.required]),
      id_num: new FormControl('', [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      id_photo: new FormControl('', [Validators.required]),
    }))
    this.isChangeData.push(false);
    this.newImgArr.push([])
    this.isNum();
  }


  // 添加婴儿
  addBaby() {
    // 校验手机
    const { mobile } = MyValidators;
    this.babyArray.push(this.fb.group({
      name: new FormControl('',),
      phone: new FormControl('', [mobile]),
      is_kid: new FormControl(2, [Validators.required]),
      id_type: new FormControl(''),
      id_num: new FormControl(''),
      birthday: new FormControl(null),
      id_photo: new FormControl(''),
    }))
    this.isChangeBabyData.push(false);
    this.newBabyArr.push([]);
    this.isBabyNum();
  }

  removeIcon(index: number) {
    if (this.humanArray.length > 1) {
      this.humanArray.removeAt(index);
      this.isBabyNum();
    }
    else {
      this.message.create('warning', '无法删除，至少存在一组');
    }
  }


  removeBaby(index: number) {
    this.babyArray.removeAt(index);
    this.isBabyNum();
  }


  // 验证类型与输入的成人儿童数是否一致
  onEnter(data: any) {
    console.log('data :>> ', data);
    this.isNum();
  }

  onEnter1(data: any) {
    this.isNum();
  }


  // 是否有baby
  onEnter2(data: any) {
    console.log('data :>> ', data);
    this.isBabyNum();
  }

  isBabyNum() {
    let nums = Number(this.informationForm.value.baby_num);
    if (nums > this.babyArray.controls.length) {
      this.isBabyShow = true;
    }
    else {
      this.isBabyShow = false;
    }
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



  ngOnInit(): void {

  }


  search() {
    this.isLoadingBtn = true;
    this.code = this.searchForm.value.product_code;
    this.adminOrderFreeTravelService.getPro(this.code).subscribe(res => {
      console.log('结果是 :>> ', res);
      this.isLoadingBtn = false;
      this.isShow = false;
      this.detailModel = res.data;
      this.isDay = this.detailModel.few_days + '天' + this.detailModel.few_nights + '晚';
      this.listDataMap = this.detailModel?.date_quote;
      this.listDataMap?.forEach((value: any) => {
        value['checked'] = false;
      })
      let control = <FormArray>this.informationForm.controls['humanList'];
      // 校验手机
      const { mobile } = MyValidators;
      control.push(new FormGroup({
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('',),
        is_kid: new FormControl(this.detailModel.reserve_children === 1 ? '' : 0, [Validators.required]),
        id_type: new FormControl('', [Validators.required]),
        id_num: new FormControl('', [Validators.required]),
        birthday: new FormControl(null, [Validators.required]),
        id_photo: new FormControl('', [Validators.required]),
      }));
      this.isChangeData.push(false);
      this.newImgArr.push([])
    },
      error => {
        this.isLoadingBtn = false;
      })
  }


  setValue() {
    this.orderGroupProduct.product_id = this.detailModel.id;
    this.orderGroupProduct.num_adult = this.informationForm.value.num_adult;
    this.orderGroupProduct.num_kid = this.informationForm.value.num_kid;
    if (this.detailModel.few_nights === 0) {
      this.orderGroupProduct.num_room = 0
    }
    else {
      this.orderGroupProduct.num_room = this.informationForm.value.num_room;
    }
    this.orderGroupProduct.customer_remarks = this.informationForm.value.customer_remarks;
    // 处理出生日期
    this.orderGroupProduct.members = this.informationForm.value.humanList.concat(this.informationForm.value.babyList);
    this.orderGroupProduct.members.forEach((element: any) => {
      if (element.birthday != null) {
        element.birthday = format(new Date(element.birthday), 'yyyy-MM-dd');
      }
    });
    this.orderGroupProduct.baby_num = this.informationForm.value.baby_num;
    this.orderGroupProduct.contact_name = this.contactForm.value.contact_name;
    this.orderGroupProduct.contact_phone = this.contactForm.value.contact_phone;
    this.orderGroupProduct.contact_wechat = this.contactForm.value.contact_wechat;
    this.orderGroupProduct.contact_qq = this.contactForm.value.contact_qq;
    this.orderGroupProduct.contact_email = this.contactForm.value.contact_email;
    this.orderGroupProduct.date_quotes_id = this.isdate_quotes_id;
  }



  add() {
    this.setValue();
    // 校验出行人信息
    let adult = this.orderGroupProduct.num_adult;
    let kid = this.orderGroupProduct.num_kid;
    let baby = this.orderGroupProduct.baby_num;
    let allData = Number(adult) + Number(kid) + Number(baby);
    if (this.orderGroupProduct.members.length != allData) {
      this.message.error("请补充出行人信息");
      this.isLoadingAdd = false;
    }
    else {
      let adultArr: any[] = [];
      let kidArr: any[] = [];
      let babyArr: any[] = [];
      this.orderGroupProduct.members.forEach((ele: any, index: any) => {
        if (ele.is_kid === 0) {
          adultArr.push(ele.is_kid)
        }
        if (ele.is_kid === 1) {
          kidArr.push(ele.is_kid)
        }
        else if (ele.is_kid === 2) {
          babyArr.push(ele.is_kid)
        }
      })
      console.log('123123123', adultArr, kidArr);
      if (adultArr.length != Number(adult) || kidArr.length != Number(kid) || babyArr.length != Number(baby)) {
        this.message.error("请正确填写出行人信息");
        this.isLoadingAdd = false;
      }
      else {
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





  // 上传证件照
  choiceImg(i: any) {
    console.log("i是什么", i);
    const dialogRef = this.dialog.open(UploadIdCardComponent, {
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


  changeBabyType(data: any, i: any) {
    console.log('data :>> ', data, data === 1, data === '1');
    if (data === 1) {
      this.isChangeBabyData[i] = false;
    }
    else {
      this.isChangeBabyData[i] = true;
    }
  }




  // 上传证件照
  choiceBabyImg(i: any) {
    console.log("i是什么", i);
    const dialogRef = this.dialog.open(UploadIdCardComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.newBabyArr[i].push(res.url);
        this.babyArray.controls[i].patchValue({ 'id_photo': this.newBabyArr[i] });
      }
    });
  }


  deleteBabyImg(i: any, index: any) {
    console.log('删除的是 :>> ', i, index);
    this.newBabyArr[i].splice(index, 1)
    this.babyArray.controls[i].patchValue({ 'id_photo': this.newBabyArr[i] });
  }
}
