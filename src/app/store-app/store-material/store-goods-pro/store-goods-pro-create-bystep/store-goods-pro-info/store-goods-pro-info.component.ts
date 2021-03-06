import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddGoodsModel } from '../../../../../../interfaces/store/storeGoods/store-goods-model';
import { StoreGoodsService } from '../../../../../../services/store/store-goods/store-goods.service';
import { StoreRegionService } from '../../../../../../services/store/store-region/store-region.service';



@Component({
    selector: 'app-store-goods-pro-info',
    templateUrl: './store-goods-pro-info.component.html',
    styleUrls: ['./store-goods-pro-info.component.css']
})
export class StoreGoodsProInfoComponent implements OnInit {
    @Output() tabIndex = new EventEmitter;
    @Input() isId: any;
    @Input() isShowId: any;
    @Input() getOneTab: any;
    isLoadingBtn = false;

    addForm!: FormGroup;
    public isSpinning: any = true;    //loading 
    detailId: any; //产品id
    dataModel: any;

    addGoodsModel: AddGoodsModel;

    //产地
    nzOptions: any[] | null = null;
    cityList: any[] = [];
    // 分类
    cateList: any;
    isCateId: any;
    isLevel: any;
    // 预售时间
    isShow = false;
    dateArray: any[] = [];


    // 详情的规格
    goods_specsArr: any;
    precision = 0;
    precision1 = 2;

    constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
        private storeRegionService: StoreRegionService, public storeGoodsService: StoreGoodsService,
        private msg: NzMessageService, private message: NzMessageService,
        private modal: NzModalService,) {
        // 表单初始化
        this.addForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            product_area: new FormControl('', [Validators.required]),
            is_order: new FormControl('0', [Validators.required]),
            date_starts: new FormControl(null),
            delivery_type: new FormControl('1'),
            specificationList: this.fb.array([], [Validators.required]),
            sales_note: new FormControl(''),
        });
        this.addGoodsModel = {
            title: '',
            cate_id: '',
            is_order: '',
            send_time_start: '',
            send_time_end: '',
            sales_note: '',
            product_area: '',
            delivery_type: '',
            goods_specs: [],
            id: '',
            step: ''
        }

    }

    ngOnInit(): void {
        // 初始化规格
        let control = <FormArray>this.addForm.controls['specificationList'];
        control.push(new FormGroup({
            spec_name: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            stock: new FormControl('', [Validators.required]),
            unit: new FormControl('', [Validators.required]),
            postage: new FormControl('2', [Validators.required]),
        }));
        this.activatedRoute.queryParams.subscribe(params => {
            this.detailId = params.detailId;
        });
        this.getRegionList();

    }

    // 规格
    get specificationArray() {
        return this.addForm.get("specificationList") as FormArray;
    }



    removeIcon(index: number) {
        if (this.specificationArray.length > 1) {
            this.specificationArray.removeAt(index);
        }
        else {
            this.message.create('warning', '无法删除，至少存在一组');
        }
    }

    addSpecification() {
        this.specificationArray.push(this.fb.group({
            spec_name: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            stock: new FormControl('', [Validators.required]),
            unit: new FormControl('', [Validators.required]),
            postage: new FormControl('2', [Validators.required]),
        }))
    }

    // 产地
    getRegionList() {
        this.storeRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
            this.getCateListTree();
        })
    }

    // 分类
    getCateListTree() {
        this.storeGoodsService.getCateListTree().subscribe(res => {
            console.log("11111", res);
            this.cateList = res;
            this.isSpinning = false;
        })
    }


    // 选择分类
    onChangeCate(event: any) {
        console.log("选择分类", event);
        this.isLevel = event;
        if (event !== null) {
            this.isCateId = event[event.length - 1];
        }
    }


    setValue() {
        this.addGoodsModel.title = this.addForm.value.title;
        this.addGoodsModel.cate_id = this.isCateId;
        this.addGoodsModel.product_area = this.cityList[this.cityList.length - 1];
        this.addGoodsModel.goods_specs = this.addForm.value.specificationList;
        this.addGoodsModel.is_order = this.addForm.value.is_order;
        this.addGoodsModel.send_time_start = this.addGoodsModel.is_order == '1' ? format(new Date(this.dateArray[0]), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
        this.addGoodsModel.send_time_end = this.addGoodsModel.is_order == '1' ? format(new Date(this.dateArray[1]), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
        this.addGoodsModel.delivery_type = this.addForm.value.delivery_type;
        this.addGoodsModel.sales_note = this.addForm.value.sales_note;
    }


    // 添加
    nextTab() {
        this.setValue();
        if (this.isLevel.length != 3) {
            this.message.error('当前商品的类型不是三级，请重新选择');
        }
        else {
            // 验证表单
            for (const i in this.addForm.controls) {
                this.addForm.controls[i].markAsDirty();
                this.addForm.controls[i].updateValueAndValidity();
            }
            console.log(this.addForm);
            if (this.addForm.valid) {
                this.isLoadingBtn = true;
                this.storeGoodsService.addGoods(this.addGoodsModel).subscribe(res => {
                    console.log("22222222", res)
                    if (res.id) {
                        this.isLoadingBtn = false;
                        localStorage.setItem("isGoodsCateId", this.addGoodsModel.cate_id);
                        this.tabIndex.emit({ id: res.id, tabIndex: 1 });
                        this.getOneTab();
                        // 拿到规格的东西
                        this.storeGoodsService.getGoodsDetail(res.id).subscribe(res => {
                            console.log("结果是12", res)
                            this.goods_specsArr = res.data.goods_specs;
                        })
                    }
                },
                    error => {
                        this.isLoadingBtn = false;
                    })



            }
            else {
                this.isLoadingBtn = false;
            }
        }

    }



    updateTab() {
        console.log("this.addGoodsModel.goods_specs", this.addGoodsModel.goods_specs);
        this.addGoodsModel.goods_specs.forEach((ele: any, index: any) => {
            ele['id'] = this.goods_specsArr[index].id;
        })
        console.log("this.addGoodsModel.goods_specs111", this.addGoodsModel.goods_specs);

        this.setValue();

        // 验证表单
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            this.isLoadingBtn = true;
            this.addGoodsModel.id = this.isId;
            this.addGoodsModel.step = 0;
            this.storeGoodsService.updateGoods(this.addGoodsModel).subscribe(res => {
                this.isLoadingBtn = false;
                localStorage.setItem("isGoodsCateId", this.addGoodsModel.cate_id);
            }
                , error => {
                    this.isLoadingBtn = false;
                })

        }

    }



    changePresell(data: any) {
        // 预售
        if (data == 1) {
            this.addForm?.controls['date_starts'].setValidators([Validators.required]);
            this.addForm?.controls['date_starts'].updateValueAndValidity();
            this.isShow = true;
            return;
        }
        else {
            this?.addForm?.controls['date_starts'].setValidators(null);
            this.isShow = false;
            return;
        }
    }

    // 时间
    onChangeSendDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }
}


