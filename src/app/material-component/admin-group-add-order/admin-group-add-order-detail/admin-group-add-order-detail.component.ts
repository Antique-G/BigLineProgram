import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderGroupProduct } from '../../../../interfaces/adminOrder/admin-order-group-travel-model';
import { AdminInsuranceService } from '../../../../services/admin/admin-insurance.service';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminUploadIdCardComponent } from '../../admin-common/admin-upload-id-card/admin-upload-id-card.component';
import { APMBIIDComponent } from '../../admin-product/admin-product-management/admin-product-management-detail/admin-product-management-basic-info/a-p-m-b-i-i-d/a-p-m-b-i-i-d.component';
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
    planForm!: FormGroup;
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
    newImgArr: any[] = [];
    // 性别数组
    idType: any[] = [];
    // 集合地点数组
    selectAssembling: any[] = [];


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
    baseInsurancePrice: any = 0//基础保险
    extraInsurancePrice: any = 0 //额外保险

    totalPrice: any;
    feeAll: any;
    discountPrice = 0;
    other_price = 0;
    isShowFeeDetail = false;
    showRoom = true;
    isForRoom = 1;
    minNumber = 1;
    maxNumber = 1;
    isRequestIdNum = false;
    isChangebirthday: any;

    discount_tit: any;
    other_price_tit: any;

    // 保险
    insuranceArr: any[] = [];
    extraInsurance: any[] = [];          //额外保险名称
    extraInsuranceId: any[] = [];

    // 补录
    supplementaryInfo: any;

    constructor(public fb: FormBuilder, private message: NzMessageService, public router: Router, public activatedRoute: ActivatedRoute,
        public adminOrderGroupTravelService: AdminOrderGroupTravelService, public adminInsuranceService: AdminInsuranceService,
        public adminProductManagementService: AdminProductManagementService, public dialog: MatDialog, public modal: NzModalService,) {
        // 校验手机
        const { mobile } = MyValidators;
        this.addForm = this.fb.group({
            product_id: ['',],
            departure_city_name: ['',],
            destination_city_name: ['',],
            isDay: ['',],
            insurance_base: ['',],
            insurance_extra: ['',],
            sales_note: ['',],
        });
        this.planForm = this.fb.group({
            internal_remarks: ['',],
            referrer_phone: ['', [mobile]],
        });
        this.informationForm = this.fb.group({
            humanList: this.fb.array([]),
            babyList: this.fb.array([]),
            num_adult: [1,],
            num_kid: [0,],
            num_room: [1, [Validators.required]],
            baby_num: [0],
            shared_status: [0,],
            customer_remarks: ['',],
            emergency_contact_person: [''],
            emergency_contact_number: ['', [mobile]],
            supplementaryInfo: ['0', [Validators.required]],
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
            internal_remarks: '',
            discount_tit: '',
            other_price_tit: '',
            insurance_extra_ids: [],
            referrer_phone: '',
        }
    }


    ngOnInit(): void {
        this.addForm.controls['insurance_extra'].setValue([]);
        this.assemblingPlaceList = [];
        this.activatedRoute.queryParams.subscribe(params => {
            //   调用产品详情接口拿到保险内容
            this.adminOrderGroupTravelService.productToBuy(params?.id).subscribe(res => {
                console.log("res1111111", res)
                this.detailModel = res?.data;
                this.isRequestIdNum = this.detailModel?.request_id_num == 1 ? true : false;
                this.isDay = this.detailModel?.few_days + '天' + this.detailModel?.few_nights + '晚';
                // 集合时间
                if (this.detailModel?.assembling_place?.data.length === 0) {
                    this.assemblingPlaceList = [];
                }
                else {
                    for (let i of this.detailModel?.assembling_place?.data) {
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
                this.listDataMap = this.detailModel?.date_quote?.data;
                console.log('this.listDataMap :>> ', this.listDataMap);
                this.listDataMap?.forEach((value: any) => {
                    value['checked'] = false;
                })

                // 初始化出行人信息
                let control = <FormArray>this.informationForm.controls['humanList'];
                // 校验手机
                const { mobile } = MyValidators;
                if (this.isRequestIdNum) {
                    control.push(new FormGroup({
                        name: new FormControl('', [Validators.required]),
                        phone: new FormControl('', [mobile]),
                        is_kid: new FormControl(0, [Validators.required]),
                        id_type: new FormControl(1, [Validators.required]),
                        id_num: new FormControl('', [Validators.required]),
                        birthday: new FormControl('', [Validators.required]),
                        assembling_place_id: new FormControl('', [Validators.required]),
                        id_photo: new FormControl('', [Validators.required]),
                        gender: new FormControl(1, [Validators.required]),
                        eng_name: new FormControl(''),
                    }));
                }
                else {
                    control.push(new FormGroup({
                        name: new FormControl('', [Validators.required]),
                        phone: new FormControl('', [mobile]),
                        is_kid: new FormControl(0, [Validators.required]),
                        id_type: new FormControl(1),
                        id_num: new FormControl(''),
                        birthday: new FormControl('', [Validators.required]),
                        assembling_place_id: new FormControl('', [Validators.required]),
                        id_photo: new FormControl('', [Validators.required]),
                        gender: new FormControl(1, [Validators.required]),
                        eng_name: new FormControl(''),
                    }));
                }
                this.isChangeData.push(false);
                this.newImgArr.push([]);
                this.idType.push(1);
                this.selectAssembling.push(0);
                // 获取产品保险
                this.insuranceArr = this.detailModel?.insurance_extra?.data;
            })
        })


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
        let totalMember: number = Number(this.informationForm.value.num_adult) + Number(this.informationForm.value.num_kid);
        let oldLength: number = this.informationForm.value.humanList.length;
        let needAdd: number = totalMember - oldLength;
        console.log("this.humanArray", this.informationForm.value.humanList);
        console.log("totalMember", totalMember);
        // 校验手机
        const { mobile } = MyValidators;
        for (let i = 0; i < needAdd; i++) {
            // 信息必填
            if (this.isRequestIdNum) {
                this.humanArray.push(this.fb.group({
                    name: new FormControl('', [Validators.required]),
                    phone: new FormControl('', [mobile]),
                    is_kid: new FormControl(0, [Validators.required]),
                    id_type: new FormControl(1, [Validators.required]),
                    id_num: new FormControl('', [Validators.required]),
                    birthday: new FormControl('', [Validators.required]),
                    assembling_place_id: ['',],
                    id_photo: new FormControl('', [Validators.required]),
                    gender: new FormControl(1, [Validators.required]),
                    eng_name: new FormControl(''),
                }))
            }
            else {
                this.humanArray.push(this.fb.group({
                    name: new FormControl('', [Validators.required]),
                    phone: new FormControl('', [mobile]),
                    is_kid: new FormControl(0, [Validators.required]),
                    id_type: new FormControl(1),
                    id_num: new FormControl(''),
                    birthday: new FormControl('', [Validators.required]),
                    assembling_place_id: ['',],
                    id_photo: new FormControl('', [Validators.required]),
                    gender: new FormControl(1, [Validators.required]),
                    eng_name: new FormControl(''),
                }))
            }
            this.isChangeData.push(false);
            this.newImgArr.push([]);
            this.idType.push(1);
            this.selectAssembling.push(0);
        }

        this.isNum();


        console.log("点击添加", this.isChangeData, this.newImgArr, this.idType, this.selectAssembling)
    }


    // 添加婴儿
    addBaby() {
        // 校验手机
        const { mobile } = MyValidators;
        this.babyArray.push(this.fb.group({
            name: new FormControl('',),
            phone: new FormControl('', [mobile]),
            is_kid: new FormControl(2, [Validators.required]),
            id_type: new FormControl(1),
            id_num: new FormControl(''),
            birthday: new FormControl(''),
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
            this.isChangeData.splice(index, 1);
            this.idType.splice(index, 1);
            this.selectAssembling.splice(index, 1);
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


    // 输入证件号码
    idCardEnter(event: any, i: any) {
        console.log("this.informationForm.value.humanList.length", this.informationForm.value.humanList)
        console.log("11111", event, i)
        let newbir = this.informationForm.value.humanList[i].id_num;
        let sex = this.getSex(newbir);
        // 性别数组
        this.idType[i] = sex;
        console.log("newbir", newbir, sex);
        console.log("this.idType", this.idType);
    }

    // 根据输入的身份证信息获取性别
    getSex(idCardany: any) {
        let sexStr: number = 1;
        if (parseInt(idCardany.slice(-2, -1)) % 2 == 1) {
            sexStr = 1;
        }
        else {
            sexStr = 2;
        }
        return sexStr;

    }

    // 选择集合地点
    changeAssembling(event: any, i: any) {
        console.log("点击的集合地点", event, i, this.selectAssembling);
    }

    // 集合地点应用到全部
    applyAll(index: any) {
        console.log("index", index, this.selectAssembling);
        let allEle: any;
        let newArr = this.selectAssembling;
        newArr?.forEach((ele: any, i: any) => {
            if (i == index) {
                console.log("iiiiiiii", ele);
                allEle = ele;
            }
        });
        this.selectAssembling = this.selectAssembling.map(function (num) {
            return allEle;
        });
        console.log("修改后的", allEle, this.selectAssembling);
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
            this.isForRoom = this.isForRoom
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

    getAllPeople() {
        return Number(this.informationForm.value.num_adult) + Number(this.informationForm.value.num_kid) + Number(this.informationForm.value.baby_num)
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
        // 基础保险

        if (this.detailModel?.insurance_base_info && this.detailModel?.include_insurance_fee == 0) {
            let insurance_expense = this.detailModel?.insurance_base_info?.data?.insurance_expense
            let money = (insurance_expense * 100 * this.getAllPeople()) / 100
            console.log('AAAA', insurance_expense, money);
            this.baseInsurancePrice = money.toFixed(2)
        }

        let extraMoney = 0
        this.extraInsurance.map(item => {
            extraMoney += Number(item.insurance_expense)
        })
        this.extraInsurancePrice = ((extraMoney * 100 * this.getAllPeople()) / 100).toFixed(2)
        console.log(this.insuranceArr, this.extraInsurance, this.extraInsuranceId);
        console.log('baseInsurancePrice', this.baseInsurancePrice, this.detailModel);
        this.difRoom = Number(this.isForRoom) * 2 - Number(this.informationForm.value.num_adult) - Number(this.isshared_status);
        // 房间数
        console.log('222222222222 :>> ', Number(this.isForRoom), Number(this.isForRoom) * 2, Number(this.informationForm.value.num_adult), Number(this.isshared_status));
        console.log('Number(this.difRoom) :>> ', Number(this.difRoom));
        this.difAllPrice = Number(this.difRoom) * Number(this.difPrice);
        console.log('是否拼房 :>> ', Number(this.isshared_status));
        // 包含基础分费用 baseInsurancePrice 设置为0
        if (this.detailModel?.include_insurance_fee != 0) {
            this.baseInsurancePrice = 0
        }
        this.totalPrice = (Number(this.audltAllPrice) * 100 + Number(this.childAllPrice) * 100 + Number(this.babyAllPrice) * 100 + Number(this.difAllPrice) * 100 - Number(this.discountPrice) * 100 + Number(this.other_price) * 100 + Number(this.baseInsurancePrice) * 100 + Number(this.extraInsurancePrice) * 100) / 100;



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
        return nums;
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
        // 必填，写的身份证
        if (this.isRequestIdNum) {
            this.orderGroupProduct.members.forEach((element: any) => {
                if (element.birthday != '') {
                    element.birthday = format(new Date(element.birthday), 'yyyy-MM-dd');
                }
            });
        }
        else {
            this.orderGroupProduct.members.forEach((element: any) => {
                if (element.birthday != '') {
                    element.birthday = format(new Date(element.birthday), 'yyyy-MM-dd');
                }
                if (element.id_type == '' || element.id_type == null) {
                    element.id_type = 0;
                }
            });
        }

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
        this.orderGroupProduct.discount_tit = this.discount_tit;
        // 附加收费
        this.orderGroupProduct.other_price = this.other_price;
        this.orderGroupProduct.other_price_tit = this.other_price_tit;
        // 计调备注
        this.orderGroupProduct.internal_remarks = this.planForm.value.internal_remarks;
        this.orderGroupProduct.referrer_phone = this.planForm.value.referrer_phone;
        // 保险
        this.orderGroupProduct.insurance_extra_ids = this.extraInsuranceId

        console.log("提交的", this.orderGroupProduct);
    }


    setSupplementaryInfoValue() {
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
        this.orderGroupProduct.discount_tit = this.discount_tit;
        // 附加收费
        this.orderGroupProduct.other_price = this.other_price;
        this.orderGroupProduct.other_price_tit = this.other_price_tit;
        // 计调备注
        this.orderGroupProduct.internal_remarks = this.planForm.value.internal_remarks;
        this.orderGroupProduct.referrer_phone = this.planForm.value.referrer_phone;
        // 保险
        this.orderGroupProduct.insurance_extra_ids = this.extraInsuranceId

        console.log("提交的", this.orderGroupProduct);
    }



    add() {
        // 后补信息
        if (this.supplementaryInfo == 1) {
            this.setSupplementaryInfoValue();
            this.isLoadingAdd = true;
            this.adminOrderGroupTravelService.addOrderGroup(this.orderGroupProduct).subscribe(res => {
                this.isLoadingAdd = false;
                this.router.navigate(['/admin/main/groupTravelOrder']);
                localStorage.removeItem("orderData");
            },
                error => {
                    this.isLoadingAdd = false;
                })
        }
        else {
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
                    // this.message.error("请正确填写出行人信息");
                    this.isLoadingAdd = false;
                    if (adultArr.length != Number(adult)) {
                        this.message.error("成人数与成人类型数量不匹配");
                        return
                    }
                    if (kidArr.length != Number(kid)) {
                        this.message.error("儿童数与儿童类型数量不匹配");
                    }
                    else if (babyArr.length != Number(baby)) {
                        this.message.error("婴儿数与婴儿类型数量不匹配");
                    }
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





    }



    // 选择年
    ngYearChange(year: any) {
        let month = this.nzPageIndex < 10 ? '0' + this.nzPageIndex : this.nzPageIndex;
        this.seletYearMonth = this.selectedYear + '-' + month;
        let str = this.seletYearMonth + '-' + new Date().getDate()
        this.selectedDateValue = new Date(str);
        this.nzPageIndex = Number(month);
        console.log('objec12111111t :>> ', str);
    }

    nzPageIndexChange(index: any) {
        console.log(index);
        let month = index < 10 ? '0' + index : index;
        let year = this.selectedYear;
        let day = new Date().getDate();
        this.selectedDateValue = new Date(year + '-' + month + '-' + '01');
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
        console.log('object :>> 111111', item);
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
            this.isdate_quotes_id = '';
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
                    rooms: Number(this.difRoom),
                    baseInsurancePrice: Number(this.baseInsurancePrice),
                    extraInsurancePrice: Number(this.extraInsurancePrice)
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
                this.discount_tit = res?.discount_tit;
                this.other_price_tit = res?.other_price_tit;
                this.baseInsurancePrice = res?.baseInsurancePrice;
                this.extraInsurancePrice = res?.extraInsurancePrice;
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


    // 查看基础保险条款
    seeDetail(id: any) {
        if (!id) {
            this.message.error('暂无保险信息')
            return
        }
        this.adminInsuranceService.getAdminInsuranceDetail(id).subscribe(res => {
            console.log('结果是 :>> ', res?.data);
            const editmodal = this.modal.create({
                nzTitle: '保险信息',
                nzWidth: 800,
                nzContent: APMBIIDComponent,
                nzComponentParams: {
                    data: res.data
                },
                nzFooter: [
                    {
                        label: '知道了',
                        type: 'primary',
                        onClick: componentInstance => {
                            componentInstance?.update()
                        }
                    }
                ]
            })
            editmodal.afterClose.subscribe(res => {

            })
        })
    }


    // 多选保险
    changeIns(a: any) {
        let arr: any[] = [];
        a?.forEach((element: any) => {
            let aArr = this.insuranceArr.filter(item => item?.id == element);
            arr = arr.concat(aArr);
        });
        this.extraInsurance = arr;
        this.extraInsuranceId = a;
        this.priceAll()
    }

    extraInsDetail(event: any) {
        console.log("event", event);
        this.adminInsuranceService.getAdminInsuranceDetail(event).subscribe(res => {
            console.log('结果是 :>> ', res);
            const editmodal = this.modal.create({
                nzTitle: '保险信息',
                nzWidth: 800,
                nzContent: APMBIIDComponent,
                nzComponentParams: {
                    data: res.data
                },
                nzFooter: [
                    {
                        label: '知道了',
                        type: 'primary',
                        onClick: componentInstance => {
                            componentInstance?.update()
                        }
                    }
                ]
            })
            editmodal.afterClose.subscribe(res => {

            })
        })
    }




    // 补录
    isChangeSupplementaryInfo(data: any) {
        console.log("选择的是", data);
        this.supplementaryInfo = data;
    }
}
