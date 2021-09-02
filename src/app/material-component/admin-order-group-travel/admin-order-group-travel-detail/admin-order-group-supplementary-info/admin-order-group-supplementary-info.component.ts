import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminUploadIdCardComponent } from 'app/material-component/admin-common/admin-upload-id-card/admin-upload-id-card.component';
import { format } from 'date-fns';
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminOrderGroupTravelService } from 'services/admin/admin-order-group-travel.service';
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
    selector: 'app-admin-order-group-supplementary-info',
    templateUrl: './admin-order-group-supplementary-info.component.html',
    styleUrls: ['./admin-order-group-supplementary-info.component.css']
})
export class AdminOrderGroupSupplementaryInfoComponent implements OnInit {
    informationForm!: FormGroup;
    detailModel: any;
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
    isRequestIdNum = false;
    isLoadingAdd = false;
    fillOrderMemberModel: any;




    constructor(public fb: FormBuilder, public adminOrderGroupTravelService: AdminOrderGroupTravelService,
        private message: NzMessageService, public dialog: MatDialog, public router: Router, ) {
        this.informationForm = this.fb.group({
            humanList: this.fb.array([]),
            babyList: this.fb.array([]),
            num_adult: [0, [Validators.required]],
            num_kid: [0],
            baby_num: [0],
        });
        this.fillOrderMemberModel = {
            order_id: '',
            product_type: '',
            members: ''
        }
    }

    ngOnInit(): void {
        this.detailModel = JSON.parse(localStorage.getItem("groupOrderDetailForAddMem")!);
        console.log("结果是", this.detailModel);
        this.isRequestIdNum = this.detailModel?.product?.data?.request_id_num == 1 ? true : false;
        this.assemblingPlaceList = [];
        // 集合时间
        if (this.detailModel?.product?.data?.assembling_place?.data.length === 0) {
            this.assemblingPlaceList = [];
        }
        else {
            for (let i of this.detailModel?.product?.data?.assembling_place?.data) {
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
        // else {
        //     this.message.create('warning', '无法删除，至少存在一组');
        // }
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





    setValue() {
        this.fillOrderMemberModel.order_id = this.detailModel.id;
        this.fillOrderMemberModel.product_type = 0;
        // 处理出生日期
        this.fillOrderMemberModel.members = this.informationForm.value.humanList.concat(this.informationForm.value.babyList);
        // 必填，写的身份证
        if (this.isRequestIdNum) {
            this.fillOrderMemberModel.members.forEach((element: any) => {
                if (element.birthday != '') {
                    element.birthday = format(new Date(element.birthday), 'yyyy-MM-dd');
                }
            });
        }
        else {
            this.fillOrderMemberModel.members.forEach((element: any) => {
                if (element.birthday != '') {
                    element.birthday = format(new Date(element.birthday), 'yyyy-MM-dd');
                }
                if (element.id_type == '' || element.id_type == null) {
                    element.id_type = 0;
                }
            });
        }
        console.log("提交的", this.fillOrderMemberModel);
    }




    add() {
        this.setValue();
        this.isLoadingAdd = true;
        // 校验出行人信息
        let adult = this.informationForm.value.num_adult;
        let kid = this.informationForm.value.num_kid;
        let baby = this.informationForm.value.baby_num;
        let allData = Number(adult) + Number(kid) + Number(baby);
        console.log("adult,adult", adult, kid, baby, allData, this.fillOrderMemberModel.members.length)
        if (this.fillOrderMemberModel.members.length != allData) {
            this.message.error("请补充出行人信息");
            this.isLoadingAdd = false;
        }
        else {
            let adultArr: any[] = [];
            let kidArr: any[] = [];
            let babyArr: any[] = [];
            this.fillOrderMemberModel.members.forEach((ele: any, index: any) => {
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
            if (adultArr.length != Number(adult) || kidArr.length != Number(kid) || babyArr.length != Number(baby)) {
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
                this.adminOrderGroupTravelService.fillOrderMember(this.fillOrderMemberModel).subscribe(res => {
                    this.isLoadingAdd = false;
                    this.router.navigate(['/admin/main/groupTravelOrder/detail'], { queryParams: { detailId: this.detailModel?.id } });
                    localStorage.removeItem("groupOrderDetailForAddMem");
                },
                    error => {
                        this.isLoadingAdd = false;
                    })
            }
        }
    }

}
