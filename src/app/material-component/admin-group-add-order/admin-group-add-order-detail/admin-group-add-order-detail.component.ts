import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { MatDialog } from '@angular/material/dialog';
import { AdminUploadIdCardComponent } from '../../admin-common/admin-upload-id-card/admin-upload-id-card.component';
import { OrderGroupProduct } from '../../../../interfaces/adminOrder/admin-order-group-travel-model';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GroupPriceDetailComponent } from './group-price-detail/group-price-detail.component';


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
  selector: 'app-admin-group-add-order-detail',
  templateUrl: './admin-group-add-order-detail.component.html',
  styleUrls: ['./admin-group-add-order-detail.component.css']
})
export class AdminGroupAddOrderDetailComponent implements OnInit {
  public isLoadingAdd = false;
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
  isshared_status = '0';
  orderGroupProduct: OrderGroupProduct;
  isdate_quotes_id: any;
  ids: any[] = [];
  numIsShow = false;
  assemblingPlaceList: any;
  isAssemblingPlace: any;
  isName: any;
  isPhone: any;
  isChangeData: any[] = [];
  newImgArr: any[] = []


  isBabyShow = false;
  isChangeBabyData: any[] = [];    //婴儿证件类型
  newBabyArr: any[] = []       //婴儿证件照片



  audltPrice: any;
  audltAllPrice: any;
  childPrice: any;
  childAllPrice: any;
  babyPrice: any;
  babyAllPrice: any;
  difPrice: any;
  difAllPrice: any;
  difRoom: any


  totalPrice: any;
  feeAll: any;
  discountPrice = 0;
  other_price = 0;
  isShowFeeDetail = false;
  showRoom = true;
  isForRoom = 1;
  minNumber = 1;
  maxNumber = 1;

  constructor(public fb: FormBuilder, private message: NzMessageService, public router: Router, public activatedRoute: ActivatedRoute,
    public adminOrderGroupTravelService: AdminOrderGroupTravelService, public dialog: MatDialog, public modal: NzModalService,) {
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
      num_adult: [1,],
      num_kid: [0,],
      num_room: [1,[Validators.required]],
      baby_num: [0],
      shared_status: [0,],
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
      shared_status: '',
      emergency_contact_person: '',
      emergency_contact_number: '',
      discount: '',
      other_price: '',
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
      is_kid: new FormControl(this.detailModel.child_status === 1 ? '' : 0, [Validators.required]),
      id_type: new FormControl('', [Validators.required]),
      id_num: new FormControl('', [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      assembling_place_id: ['',],
      id_photo: new FormControl('', [Validators.required]),
      gender: new FormControl(1, [Validators.required]),
      eng_name: new FormControl(''),
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
      gender: new FormControl(1, [Validators.required]),
      eng_name: new FormControl(''),
    }))
    this.isChangeBabyData.push(false);
    this.newBabyArr.push([]);
    this.isBabyNum();
  }

  removeIcon(index: number) {
    if (this.humanArray.length > 1) {
      this.humanArray.removeAt(index);
      this.isChangeData.splice(index, 1)
      this.isNum();
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
    console.log('成人数 ', data);
    this.isNum();
    this.isForRoom = Math.ceil(Number(this.informationForm.value.num_adult / 2));
    this.minNumber = Math.ceil(Number(this.informationForm.value.num_adult / 2));
    this.maxNumber = Math.ceil((Number(this.informationForm.value.num_adult) + Number(this.informationForm.value.num_kid)) / 2);
    this.isShowRoom();
    this.priceAll();
  }

  onEnter1(data: any) {
    this.isNum();
    this.minNumber = Math.ceil(Number(this.informationForm.value.num_adult / 2));
    this.maxNumber = Math.ceil((Number(this.informationForm.value.num_adult) + Number(this.informationForm.value.num_kid)) / 2);
    this.isShowRoom();

    this.priceAll();
  }


  // 是否有baby
  onEnter2(data: any) {
    console.log('data :>> ', data);
    this.isBabyNum();
    this.priceAll();
  }

  // 房间数校验
  roomChange(a: any) {
    let min = Math.ceil(Number(this.informationForm.value.num_adult / 2));
    let max = Math.ceil((Number(this.informationForm.value.num_adult) + Number(this.informationForm.value.num_kid)) / 2);
    console.log('11111111 :>> ', min, max, a);
    if (a >= min && a <= max) {
      console.log('zhengque :>> ', 'zhengque');
    }
    else {
      this.message.error("最大房间数不能大于成人数和儿童数总和的一半");
    }
  }

  // 房间数
  onEnterRoom(data: any) {
    console.log('删除前', this.isForRoom, data != '')
    if (data != '') {
      console.log('房间数的修改', data);
      this.isForRoom = data;
      this.roomChange(data);
      this.isShowRoom();
      this.priceAll();
    }
    else {
      console.log('空值时候 ', this.isForRoom);
      this.isForRoom=this.isForRoom
    }

  }


  // 是否显示拼房
  isShowRoom() {
    console.log("房间数", this.isForRoom)
    let rooms = Number(this.isForRoom) * 2 - Number(this.informationForm.value.num_adult);
    console.log("666666", Number(rooms), Number(this.informationForm.value.num_adult))
    console.log("777777777", Number(rooms) === 1 || Number(rooms) > 1)
    if (Number(rooms) === 1) {
      this.showRoom = true;
    }

    else {

      this.showRoom = false;
      this.isshared_status = '0';
      console.log(this.isshared_status)
    }
  }



  priceAll() {
    this.audltAllPrice = Number(this.informationForm.value.num_adult) * Number(this.audltPrice);
    // 儿童是否可预订
    if (this.detailModel?.child_status === 1) {
      this.childAllPrice = Number(this.informationForm.value.num_kid) * Number(this.childPrice);
      this.babyAllPrice = Number(this.informationForm.value.baby_num) * Number(this.babyPrice);
    }
    else {
      this.childAllPrice = 0;
      this.babyAllPrice = 0
    }


    this.difRoom = Number(this.isForRoom) * 2 - Number(this.informationForm.value.num_adult) - Number(this.isshared_status);
    // 房间数
    console.log('222222222222 :>> ', Number(this.isForRoom), Number(this.isForRoom) * 2, Number(this.informationForm.value.num_adult), Number(this.isshared_status));
    console.log('Number(this.difRoom) :>> ', Number(this.difRoom));
    this.difAllPrice = Number(this.difRoom) * Number(this.difPrice);
    console.log('是否拼房 :>> ', Number(this.isshared_status));
    this.totalPrice = Number(this.audltAllPrice) + Number(this.childAllPrice) + Number(this.babyAllPrice) + Number(this.difAllPrice) - Number(this.discountPrice) + Number(this.other_price);
  }


  // 是否拼房
  isChangeRoom(event: any) {
    console.log('event :>> ', event);
    this.priceAll();
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


  // 详细人信息校验
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
    this.assemblingPlaceList = [];
    this.detailModel = JSON.parse(localStorage.getItem("orderData")!)
    this.isDay = this.detailModel?.few_days + '天' + this.detailModel?.few_nights + '晚';
    // 集合时间
    if (this.detailModel?.assembling_place.length === 0) {
      this.assemblingPlaceList = [];
    }
    else {
      for (let i of this.detailModel?.assembling_place) {
        console.log("集合地点ii", i, i.time_state === 0);
        if (i.time_state === 0) {
          let a = { value: i.id, label: i.name, time: i.time };
          this.assemblingPlaceList.push(a);
        }
        else if (i.time_state === 1) {
          let a = { value: i.id, label: i.name, time: '' };
          this.assemblingPlaceList.push(a);
        }
      }
      this.isShowRoom()
    }


    console.log('结婚', this.assemblingPlaceList)
    this.listDataMap = this.detailModel?.date_quote;
    console.log('this.listDataMap :>> ', this.listDataMap);
    this.listDataMap?.forEach((value: any) => {
      value['checked'] = false;
    })
    let control = <FormArray>this.informationForm.controls['humanList'];
    // 校验手机
    const { mobile } = MyValidators;
    control.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [mobile]),
      is_kid: new FormControl(this.detailModel.child_status === 1 ? '' : 0, [Validators.required]),
      id_type: new FormControl('', [Validators.required]),
      id_num: new FormControl('', [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      assembling_place_id: new FormControl('', [Validators.required]),
      id_photo: new FormControl('', [Validators.required]),
      gender: new FormControl(1, [Validators.required]),
      eng_name: new FormControl(''),

    }));
    this.isChangeData.push(false);
    this.newImgArr.push([])

  }





  setValue() {
    this.orderGroupProduct.product_id = this.detailModel.id;
    this.orderGroupProduct.num_adult = this.informationForm.value.num_adult;
    this.orderGroupProduct.num_kid = this.informationForm.value.num_kid;
    if (this.detailModel.few_nights === 0) {
      this.orderGroupProduct.num_room = 0;
    }
    else {
      this.orderGroupProduct.num_room = this.isForRoom;
    }
    this.orderGroupProduct.customer_remarks = this.informationForm.value.customer_remarks;
    this.orderGroupProduct.baby_num = this.informationForm.value.baby_num;
    this.orderGroupProduct.shared_status = this.isshared_status;

    // 处理出生日期
    this.orderGroupProduct.members = this.informationForm.value.humanList.concat(this.informationForm.value.babyList);
    this.orderGroupProduct.members.forEach((element: any) => {
      if (element.birthday != null) {
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
    // 优惠金额
    this.orderGroupProduct.discount = this.discountPrice;
    // 附加收费
    this.orderGroupProduct.other_price = this.other_price;

    console.log("提交的", this.orderGroupProduct)
  }

  add() {
    this.setValue();
    this.isLoadingAdd = true;
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
        this.adminOrderGroupTravelService.addOrderGroup(this.orderGroupProduct).subscribe(res => {
          this.isLoadingAdd = false;
          this.router.navigate(['/admin/main/groupTravelOrder']);
          localStorage.removeItem("orderData");
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
      this.feeAll = item;
      this.isdate_quotes_id = item.id;
      this.isShowFeeDetail = true;
      this.audltPrice = item.adult_price;
      this.childPrice = item.child_price;
      this.babyPrice = item.baby_price;
      this.difPrice = item.difference_price;
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



  feeDetail() {
    const editmodal = this.modal.create({
      nzTitle: '订单费用明细',
      nzContent: GroupPriceDetailComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        data: {
          feeAll: this.feeAll,
          audlts: Number(this.informationForm.value.num_adult),
          childs: Number(this.informationForm.value.num_kid),
          babys: Number(this.informationForm.value.baby_num),
          rooms: Number(this.difRoom)
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
      console.log(res, 'aaaaaaaaaaaa');
      if (res != undefined) {
        this.discountPrice = res?.discount;
        this.other_price = res?.other_price;
        this.totalPrice = res?.totalPrice;
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
    const dialogRef = this.dialog.open(AdminUploadIdCardComponent, {
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
