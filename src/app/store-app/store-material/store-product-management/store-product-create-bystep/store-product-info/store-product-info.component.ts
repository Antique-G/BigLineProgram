import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import wangEditor from 'wangeditor';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { AddStoreProductModel } from '../../../../../../interfaces/store/storeProduct/ProductModel';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { StoreRegionService } from '../../../../../../services/store/store-region/store-region.service';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { StoreInsuranceDetailComponent } from './store-insurance-detail/store-insurance-detail.component';


@Component({
    selector: 'app-store-product-info',
    templateUrl: './store-product-info.component.html',
    styleUrls: ['./store-product-info.component.css']
})
export class StoreProductInfoComponent implements OnInit {
    @Output() tabIndex = new EventEmitter;
    @Input() isId: any;
    @Input() isShowId: any;

    @Input() getOneTab: any;




    addForm!: FormGroup;

    // 区域联动
    nzOptions: any[] | null = null;
    // 集合地以及标题
    assemblingPlaceList: any[] = [];
    tagList: any[] = [];

    // 预定截止日期
    earlierTime = new Date('2021-01-01 18:00');

    // 添加model
    addStoreProductModel: AddStoreProductModel;

    @ViewChild("feeBox") feeBox: any;       // 费用 获取dom
    feeList: any[] = []    //图片

    isReserveChildren = '0';
    isReserveAhead = '1';

    isLoadingBtn = false;
    isPlaceRegion: any;

    store_id: any;


    cateId: any;

    validationMessage: any = {
        title: {
            'maxlength': '产品主标题长度最多为50个字符',
            'required': '请填写产品主标题'
        },
        sub_title: {
            'maxlength': '副标题长度最多为225个字符',
            'required': '请填写副标题'
        },
        few_days: {
            'isNumber': '请输入非零的正整数',
            'required': '请输入出行几天！'
        },
        few_nights: {
            'isNumber': '请输入非零的正整数',
            'required': '请输入出行几晚！'
        },
        tag_id: {
            'required': '请选择产品标签'!
        },
        departure_city: {
            'required': '请输入出发城市！'
        },
        destination_city: {
            'required': '请输入目的城市！'
        },
        reserve_num_min: {
            'required': '请输入最少成团人数！'
        },
    };
    formErrors: any = {
        title: '',
        sub_title: '',
        few_days: '',
        few_nights: '',
        tag_id: '',
        departure_city: '',
        destination_city: '',
        reserve_num_min: '',
    }


    insuranceArr: any[] = [];
    baseInsuranceId: any;      //基础保险id
    baseInsuranceName: any;      //基础保险名称
    extraInsurance: any[] = [];          //额外保险名称
    extraInsuranceId: any[] = [];


    constructor(public fb: FormBuilder, public router: Router, public dialog: MatDialog,
        public storeProductService: StoreProductService, private msg: NzMessageService,
        public storeRegionService: StoreRegionService,
        private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
        this.buildForm();
        this.addStoreProductModel = {
            title: '',
            sub_title: '',
            departure_city: '',
            destination_city: '',
            earlier: 0,
            few_days: 0,
            few_nights: 0,
            child_status: 0,
            child_age_max: 0,
            child_age_min: 0,
            child_height_min: 0,
            child_height_max: 0,
            reserve_num_min: 0,
            reserve_num_max: 0,
            contacts_status: 0,
            assembling_place_id: [],
            fee: '',
            tag_id: [],
            reserve_ahead: 1,
            request_id_num: 0,
            baby_occupy: 0,
            include_insurance_fee: 0,
            insurance_base: '',
            insurance_extra: [],
        }
    }

    buildForm(): void {
        this.addForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(50)]],
            sub_title: ['', [Validators.required]],
            few_days: [2, [Validators.required]],
            few_nights: [1, [Validators.required]],
            tag_id: ['', [Validators.required]],
            departure_city: ['', [Validators.required]],
            destination_city: ['', [Validators.required]],
            assembling_place_id: ['', [Validators.required]],
            contacts_status: ['1', [Validators.required]],
            reserve_ahead: new FormControl(1, [Validators.required]),
            child_status: ['1', [Validators.required]],
            child_age_max: [14],
            child_age_min: [2],
            child_height_min: [0],
            child_height_max: [0],
            reserve_num_min: [1, [Validators.required]],
            reserve_num_max: [0],
            earlier1: new FormControl(1, [Validators.required]),
            earlier2: new FormControl(null),
            request_id_num: ['0', [Validators.required]],
            baby_occupy: ['1', [Validators.required]],
            include_insurance_fee: ['0', [Validators.required]],
            insurance_base: ['', [Validators.required]],
            insurance_extra: [''],
        });
        // 每次表单数据发生变化的时候更新错误信息
        this.addForm.valueChanges.subscribe(data => {
            this.onValueChanged(data);
        });
        // 初始化错误信息
        this.onValueChanged();
    }



    ngOnInit(): void {
        console.log("isId111111111", this.isId)
        this.addForm.controls['assembling_place_id'].setValue([]);
        this.addForm.controls['tag_id'].setValue([]);
        this.addForm.controls['insurance_extra'].setValue([]);
        this.store_id = localStorage.getItem('storeId');
        this.storeProductService.insuranceDayList(this.addForm.value.few_days).subscribe(res => {
            console.log('保险 :>> ', res);
            this.insuranceArr = res?.data;
            this.getCateList();
        })

    }

    ngAfterViewInit(): void {
        this.textChange();
    }

    // 根据行程天数拿取保险
    changeDay(day: any) {
        this.storeProductService.insuranceDayList(this.addForm.value.few_days).subscribe(res => {
            console.log('保险 :>> ', res);
            this.insuranceArr = res?.data;
        })
    }

    // 标签分类列表
    getCateList() {
        this.storeProductService.productCateList().subscribe(res => {
            console.log("结果是111", res.data)
            console.log("name", res.data[0].name)
            console.log("name", res.data[1].name)
            let name1 = res.data[0].name;
            let name2 = res.data[1].name;
            if (name1 === '跟团游') {
                this.cateId = res.data[0].id
            }
            else if (name2 === '跟团游') {
                this.cateId = res.data[1].id
            }

            this.getTagList();
        })
    }


    // 标签  --按顺序执行
    getTagList() {
        this.storeProductService.productTagList(this.cateId).subscribe(res => {
            console.log("标签", res.data);
            for (let i of res.data) {
                let a = { value: i.id, label: i.name };
                this.tagList.push(a);
            }
            this.regionList();
        })
    }

    // 区域
    regionList() {
        this.storeRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
            this.getAccemList();
        })
    }


    // 集合地点
    getAccemList() {
        this.storeProductService.productAssemblingPlaceList('', this.isPlaceRegion, this.store_id).subscribe(res => {
            console.log("集合地点", res.data);
            this.assemblingPlaceList = [];
            if (res.data.length === 0) {
                this.assemblingPlaceList = [];
            }
            else {
                for (let i of res.data) {
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
            console.log("this.assemblingPlaceList", this.assemblingPlaceList)

        });

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


    setValue() {
        this.addStoreProductModel.title = this.addForm.value.title;
        this.addStoreProductModel.sub_title = this.addForm.value.sub_title;
        this.addStoreProductModel.few_days = this.addForm.value.few_days;
        this.addStoreProductModel.few_nights = this.addForm.value.few_nights;
        this.addStoreProductModel.contacts_status = this.addForm.value.contacts_status;
        this.addStoreProductModel.child_status = this.addForm.value.child_status;
        this.addStoreProductModel.reserve_ahead = this.addForm.value.reserve_ahead;
        if (parseInt(this.isReserveAhead) === 0) {
            this.addStoreProductModel.earlier = 0;
        }
        else if (parseInt(this.isReserveAhead) === 1) {
            // 时间处理
            let earlier1 = this.addForm.value.earlier1;
            let date = new Date(this.addForm.value.earlier2);
            let min = date.getMinutes();
            let hour = date.getHours();
            if (min > 0) {
                let resMin = earlier1 * 24 * 60 + ((24 - hour - 1) * 60 + (60 - min));
                this.addStoreProductModel.earlier = resMin;
            }
            else if (min === 0) {
                let resMin = earlier1 * 24 * 60 + (24 - hour) * 60;
                this.addStoreProductModel.earlier = resMin;
            }
            console.log('date是多少', this.addStoreProductModel.earlier);

        }

        this.addStoreProductModel.child_age_min = this.addForm.value.child_age_min;
        this.addStoreProductModel.child_age_max = this.addForm.value.child_age_max;
        this.addStoreProductModel.child_height_min = this.addForm.value.child_height_min;
        this.addStoreProductModel.child_height_max = this.addForm.value.child_height_max;
        this.addStoreProductModel.reserve_num_min = this.addForm.value.reserve_num_min;
        this.addStoreProductModel.reserve_num_max = this.addForm.value.reserve_num_max;
        this.addStoreProductModel.request_id_num = this.addForm.value.request_id_num;
        this.addStoreProductModel.baby_occupy = this.addForm.value.baby_occupy;
        this.addStoreProductModel.insurance_base = this.baseInsuranceId;
        this.addStoreProductModel.insurance_extra = this.extraInsuranceId;
        this.addStoreProductModel.include_insurance_fee = this.addForm.value.include_insurance_fee;

    }


    changePlace(a: any): void {
        console.log('选择的值是sss', a);
        this.addStoreProductModel.assembling_place_id = a;
    }

    changeTag(a: any): void {
        console.log('选择的值是vvv', a);
        this.addStoreProductModel.tag_id = a;
    }


    onChanges(values: any): void {
        console.log("点击的结果是", values);
        if (values !== null) {
            this.addStoreProductModel.departure_city = values[values.length - 1];
            this.isPlaceRegion = this.addStoreProductModel.departure_city;
            this.getAccemList();
        }
    }


    onDestChange(values: any): void {
        console.log("点击的结果是", values);
        localStorage.setItem('regionData', values);
        if (values !== null) {
            this.addStoreProductModel.destination_city = values[values.length - 1];
        }
    }

    // 富文本
    textChange() {
        // 预约须知
        const editorFee = new wangEditor("#editorFee", "#feeContent");
        editorFee.config.onchange = (newHtml: any) => {
            console.log("213123", newHtml);
            this.addStoreProductModel.fee = newHtml;
        }
        // 配置菜单栏
        editorFee.config.menus = [
            'head',
            'bold',
            'fontSize',
            'fontName',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'list',
            'todo',
            'justify',
            'quote',
            'emoticon',
            'table',
            'splitLine',
            'undo',
            'redo',
            'image'
        ];
        // 对粘贴的文本进行处理
        editorFee.config.pasteFilterStyle = false;
        editorFee.config.pasteTextHandle = function (pasteStr: any) {
            //  去除wps文档复制过来的style样式
            let str = pasteStr
            str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
            return str
        }
        // InsertABCMenu
        // 注册菜单
        editorFee.menus.extend('insertABC', InsertABCMenu)
        // 重新配置 editor.config.menus
        editorFee.config.menus = editorFee.config.menus.concat('insertABC')
        editorFee.config.customFunction = (insert: any) => {
            const modal: NzModalRef = this.modal.create({
                nzTitle: '图片上传',
                nzViewContainerRef: this.viewContainerRef,
                nzContent: CommonModelComponent,
                nzWidth: 660,
                nzFooter: null
            })
            modal.afterClose.subscribe(result => {
                let res = result?.data || []
                res.forEach((item: any) => {
                    insert(item.url)
                });
            });

        }
        editorFee.create();


    }

    importImg() {
        console.log('this.addStoreProductModel.destination_city', this.addStoreProductModel.destination_city);
        const modal: NzModalRef = this.modal.create({
            nzTitle: '从图库导入资源',
            nzViewContainerRef: this.viewContainerRef,
            nzContent: ChooseGalleryComponent,
            nzComponentParams: {
                data: 1
            },
            nzWidth: 1105,
            nzFooter: null
        })
        modal.afterClose.subscribe(res => {
            let result = res || []
            result.forEach((item: any) => {
                this.feeList.push(item)
                // if (this.feeList.length > 10) {
                //   this.msg.error('产品特色引用图片不能超过10张')
                //   return
                // }
                this.feeBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`;
                console.log("this.addStoreProductModel.fee", this.addStoreProductModel.fee)
            });
        });

    }

    // 刷新区域和集合地点，标签
    refreshRegion() {
        this.regionList();
    }

    refreshPlace() {
        this.assemblingPlaceList = [];
        this.storeProductService.productAssemblingPlaceList('', this.isPlaceRegion, this.store_id).subscribe(res => {
            console.log("集合地点", res.data);
            for (let i of res.data) {
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
        });
    }


    refreshTag() {
        this.tagList = [];
        this.storeProductService.productTagList(this.cateId).subscribe(res => {
            console.log("标签", res.data);
            for (let i of res.data) {
                let a = { value: i.id, label: i.name };
                this.tagList.push(a);
            }
        })
    }


    nextTab() {

        this.setValue();
        // 验证表单
        console.log("this.addForm", this.addForm)
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("66666", this.addForm.valid)
        if (this.addForm.valid) {
            if (Number(this.addStoreProductModel.child_height_min) > Number(this.addStoreProductModel.child_height_max)) {
                this.msg.error("儿童最大身高不能小于最小身高");
            }
            else {
                // 添加
                this.isLoadingBtn = true;
                this.storeProductService.createProduct(this.addStoreProductModel).subscribe(res => {
                    console.log("res结果", res);
                    if (res.id) {
                        this.isLoadingBtn = false;
                        this.tabIndex.emit({ id: res.id, tabIndex: 1 });
                        localStorage.setItem("few_days", this.addForm.value.few_days);
                        this.getOneTab()
                    }
                },
                    error => {
                        this.isLoadingBtn = false;
                    })
            }

        }

    }


    isReserveAheadChange(status: any) {
        console.log(status, 'status');
        this.isReserveAhead = status;
        this.addForm.value.reserve_ahead = this.isReserveAhead;
    }




    // 只输入整数
    numTest($event: any) {
        $event.target.value = $event.target.value.replace(/[^\d]/g, '');
    }




    updateTab() {
        this.setValue();
        // 验证表单
        console.log("this.addForm", this.addForm)
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("66666", this.addForm.valid)
        if (this.addForm.valid) {
            if (Number(this.addStoreProductModel.child_height_min) > Number(this.addStoreProductModel.child_height_max)) {
                this.msg.error("儿童最大身高不能小于最小身高");
            }
            else {
                //更新
                this.isLoadingBtn = true;
                this.addStoreProductModel.id = this.isId;
                this.addStoreProductModel.step = 0;
                this.storeProductService.updateProduct(this.addStoreProductModel).subscribe(res => {
                    console.log("res结果", res);
                    this.isLoadingBtn = false;
                    localStorage.setItem("few_days", this.addForm.value.few_days);
                    this.tabIndex.emit({ id: this.isId, tabIndex: 1 });

                })
            }

        }
    }


    // 单选保险
    changeInsuranceBase(data: any) {
        console.log('data :>> ', data);
        let aArr = this.insuranceArr.filter(item => item.id === data);
        this.baseInsuranceId = aArr[0].id;
        this.baseInsuranceName = aArr[0].name;
    }

    baseInsDetail() {
        this.storeProductService.getInsuranceDetail(this.baseInsuranceId).subscribe(res => {
            console.log('结果是 :>> ', res?.data);
            const editmodal = this.modal.create({
                nzTitle: '保险信息',
                nzWidth: 800,
                nzContent: StoreInsuranceDetailComponent,
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
        a.forEach((element: any) => {
            let aArr = this.insuranceArr.filter(item => item.id == element);
            arr = arr.concat(aArr);
        });
        this.extraInsurance = arr;
        this.extraInsuranceId = a;
    }

    extraInsDetail(event: any) {
        console.log("event", event);
        this.storeProductService.getInsuranceDetail(event).subscribe(res => {
            console.log('结果是 :>> ', res);
            const editmodal = this.modal.create({
                nzTitle: '保险信息',
                nzWidth: 800,
                nzContent: StoreInsuranceDetailComponent,
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



}




