import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { format } from 'date-fns';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminOrderGroupTravelService } from 'services/admin/admin-order-group-travel.service';
import { AdminUploadIdCardComponent } from '../../../admin-common/admin-upload-id-card/admin-upload-id-card.component';


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
    selector: 'app-admin-order-group-add-members',
    templateUrl: './admin-order-group-add-members.component.html',
    styleUrls: ['./admin-order-group-add-members.component.css']
})
export class AdminOrderGroupAddMembersComponent implements OnInit {
    @Input() data: any;
    informationForm!: FormGroup;
    isLoadingBtn = false;

    detailModel: any;
    // 原来的人数
    old_total_member = 0;
    old_total_audlt = 0;
    old_total_kid = 0;
    old_total_baby = 0;
    old_total_member_1 = 0;
    old_total_audlt_1 = 0;
    old_total_kid_1 = 0;
    old_total_baby_1 = 0;
    numIsShow = false;
    isshared_status = '0';
    assemblingPlaceList: any;
    isAssemblingPlace: any;

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

    totalPrice: any;
    feeAll: any;

    showRoom = true;
    isForRoom = 1;
    minNumber = 1;
    maxNumber = 1;
    isRequestIdNum = false;
    isChangebirthday: any;
    addGroupOrderMemberModel: any;




    constructor(public fb: FormBuilder, private message: NzMessageService,public dialog: MatDialog,
        private modal: NzModalService, public adminOrderGroupTravelService: AdminOrderGroupTravelService) {
        this.informationForm = this.fb.group({
            humanList: this.fb.array([]),
            babyList: this.fb.array([]),
            num_adult: [0, [Validators.required]],
            num_kid: [0,],
            num_room: [1, [Validators.required]],
            baby_num: [0],
            shared_status: [0, [Validators.required]],
        });
        this.addGroupOrderMemberModel = {
            id: '',
            add_adult: '',
            add_kid: '',
            add_baby: '',
            num_room: '',
            shared_status: '',
            members: []
        }
    }

    ngOnInit(): void {
        console.log("记过", this.data);
        this.detailModel = this.data;
        this.old_total_member = this.detailModel?.total_member[0];
        this.old_total_audlt = this.detailModel?.total_member[1];
        this.old_total_kid = this.detailModel?.total_member[2];
        this.old_total_baby = this.detailModel?.total_member[3];
        this.old_total_member_1 = this.detailModel?.total_member[0];
        this.old_total_audlt_1 = this.detailModel?.total_member[1];
        this.old_total_kid_1 = this.detailModel?.total_member[2];
        this.old_total_baby_1 = this.detailModel?.total_member[3];
        this.audltPrice = this.detailModel.price_adult;
        this.childPrice = this.detailModel.price_kid;
        this.babyPrice = this.detailModel.price_baby;
        this.difPrice = this.detailModel.price_diff;
        this.assemblingPlaceList = this.detailModel.product?.data?.assembling_place?.data;
        this.isRequestIdNum = this.detailModel?.product?.data?.request_id_num == 1 ? true : false;
        // 初始化时房间数为原订单的
        this.isForRoom = this.detailModel.num_room;
        // 拼房
        this.isshared_status = this.detailModel.shared_status.toString();


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
        let newbir = this.informationForm.value.humanList[i].id_num;
        let sex = this.getSex(newbir);
        // 性别数组
        this.idType[i] = sex;
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
        let allAudlt = Number(this.informationForm.value.num_adult) + Number(this.old_total_audlt);
        let allKid = Number(this.informationForm.value.num_kid) + Number(this.old_total_kid);
        this.isForRoom = Math.ceil(Number(allAudlt / 2));
        this.minNumber = Math.ceil(Number(allAudlt / 2));
        this.maxNumber = Math.ceil((Number(allAudlt) + Number(allKid)) / 2);
        this.isShowRoom();
        this.priceAll();
        this.old_total_audlt_1 = Number(allAudlt)
        this.old_total_kid_1 = Number(allKid);
        // 婴儿占位
        if (this.detailModel?.product?.data?.baby_occupy == 1) {
            this.old_total_baby_1 = Number(this.detailModel?.total_member[3]) + Number(this.informationForm.value.baby_num);
        }
        else {
            this.old_total_baby_1 = 0;
        }

        this.old_total_member_1 = Number(this.old_total_audlt_1) + Number(this.old_total_kid_1) + Number(this.old_total_baby_1);
    }

    onEnter1(data: any) {
        this.isNum();
        let allAudlt = Number(this.informationForm.value.num_adult) + Number(this.old_total_audlt);
        let allKid = Number(this.informationForm.value.num_kid) + Number(this.old_total_kid);
        this.isForRoom = Math.ceil(Number(allAudlt / 2));
        this.minNumber = Math.ceil(Number(allAudlt / 2));
        this.maxNumber = Math.ceil((Number(allAudlt) + Number(allKid)) / 2);
        this.isShowRoom();
        this.priceAll();
        this.old_total_audlt_1 = Number(allAudlt)
        this.old_total_kid_1 = Number(allKid);
        // 婴儿占位
        if (this.detailModel?.product?.data?.baby_occupy == 1) {
            this.old_total_baby_1 = Number(this.detailModel?.total_member[3]) + Number(this.informationForm.value.baby_num);
        }
        else {
            this.old_total_baby_1 = 0;
        }

        this.old_total_member_1 = Number(this.old_total_audlt_1) + Number(this.old_total_kid_1) + Number(this.old_total_baby_1);
    }


    // 是否有baby
    onEnter2(data: any) {
        console.log('data :>> ', data);
        this.isBabyNum();
        this.priceAll();
        let allAudlt = Number(this.informationForm.value.num_adult) + Number(this.old_total_audlt);
        let allKid = Number(this.informationForm.value.num_kid) + Number(this.old_total_kid);
        this.old_total_audlt_1 = Number(allAudlt)
        this.old_total_kid_1 = Number(allKid);
        // 婴儿占位
        if (this.detailModel?.product?.data?.baby_occupy == 1) {
            this.old_total_baby_1 = Number(this.detailModel?.total_member[3]) + Number(this.informationForm.value.baby_num);
        }
        else {
            this.old_total_baby_1 = 0;
        }

        this.old_total_member_1 = Number(this.old_total_audlt_1) + Number(this.old_total_kid_1) + Number(this.old_total_baby_1);
    }



    // 房间数校验
    roomChange(a: any) {
        let allAudlt = Number(this.informationForm.value.num_adult) + Number(this.old_total_audlt);
        let min = Math.ceil(Number(allAudlt / 2));
        let allKid = Number(this.informationForm.value.num_kid) + Number(this.old_total_kid);
        let max = Math.ceil((Number(allAudlt) + Number(allKid)) / 2);
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
        let rooms = Number(this.isForRoom) * 2 - (Number(this.informationForm.value.num_adult) + Number(this.old_total_audlt));
        console.log("666666", Number(rooms), (Number(this.informationForm.value.num_adult) + Number(this.old_total_audlt)))
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
        if (this.detailModel?.child_status == 1) {
            this.childAllPrice = Number(this.informationForm.value.num_kid) * Number(this.childPrice);
            this.babyAllPrice = Number(this.informationForm.value.baby_num) * Number(this.babyPrice);
        }
        else {
            this.childAllPrice = 0;
            this.babyAllPrice = 0
        }
        this.difRoom = Number(this.isForRoom) * 2 - (Number(this.informationForm.value.num_adult) + Number(this.old_total_audlt)) - Number(this.isshared_status);
        // 房间数
        console.log('Number(this.difRoom) :>> ', Number(this.difRoom));
        this.difAllPrice = Number(this.difRoom) * Number(this.difPrice);
        console.log('是否拼房 :>> ', Number(this.isshared_status));


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
        this.addGroupOrderMemberModel.id = this.detailModel.id;
        this.addGroupOrderMemberModel.add_adult = this.informationForm.value.num_adult;
        this.addGroupOrderMemberModel.add_kid = this.informationForm.value.num_kid;
        this.addGroupOrderMemberModel.num_room = this.isForRoom;
        this.addGroupOrderMemberModel.add_baby = this.informationForm.value.baby_num;
        this.addGroupOrderMemberModel.shared_status = this.isshared_status;
        // 处理出生日期
        this.addGroupOrderMemberModel.members = this.informationForm.value.humanList.concat(this.informationForm.value.babyList);
        // 必填，写的身份证
        if (this.isRequestIdNum) {
            this.addGroupOrderMemberModel.members.forEach((element: any) => {
                if (element.birthday != '') {
                    element.birthday = format(new Date(element.birthday), 'yyyy-MM-dd');
                }
            });
        }
        else {
            this.addGroupOrderMemberModel.members.forEach((element: any) => {
                if (element.birthday != '') {
                    element.birthday = format(new Date(element.birthday), 'yyyy-MM-dd');
                }
                if (element.id_type == '' || element.id_type == null) {
                    element.id_type = 0;
                }
            });
        }
    }

    add() {
        this.setValue();
        this.isLoadingBtn = true;
        // 校验出行人信息
        let adult = this.addGroupOrderMemberModel.add_adult;
        let kid = this.addGroupOrderMemberModel.add_kid;
        let baby = this.addGroupOrderMemberModel.add_baby;
        let allData = Number(adult) + Number(kid) + Number(baby);
        if (this.addGroupOrderMemberModel.members.length != allData) {
            this.message.error("请补充出行人信息");
            this.isLoadingBtn = false;
        }
        else {
            let adultArr: any[] = [];
            let kidArr: any[] = [];
            let babyArr: any[] = [];
            this.addGroupOrderMemberModel.members.forEach((ele: any, index: any) => {
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
                this.isLoadingBtn = false;
            }
            else {
                this.adminOrderGroupTravelService.addOrderMember(this.addGroupOrderMemberModel).subscribe(res => {
                    this.isLoadingBtn = false;
                },
                    error => {
                        this.isLoadingBtn = false;
                    })
            }
        }


    }


    cancel() {
        this.modal.closeAll();
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
            return undefined
        });
    }


    deleteImg(i: any, index: any) {
        console.log('删除的是 :>> ', i, index);
        this.newImgArr[i].splice(index, 1)
        console.log('this.newImgArr ', this.newImgArr);
        this.humanArray.controls[i].patchValue({ 'id_photo': this.newImgArr[i] });
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
