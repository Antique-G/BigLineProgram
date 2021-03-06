import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddGoodsModel } from '../../../../../../interfaces/store/storeGoods/store-goods-model';
import { AdminGoodsService } from '../../../../../../services/admin/admin-goods.service';
import { AdminRegionService } from '../../../../../../services/admin/admin-region.service';



@Component({
    selector: 'app-admin-goods-pro-detail-info',
    templateUrl: './admin-goods-pro-detail-info.component.html',
    styleUrls: ['./admin-goods-pro-detail-info.component.css']
})
export class AdminGoodsProDetailInfoComponent implements OnInit {
    isLoadingBtn = false;

    addForm!: FormGroup;
    public isSpinning: any = true;    //loading 
    detailId: any; //产品id
    addDataDetailModel: any;

    addGoodsModel: AddGoodsModel;

    //产地
    nzOptions: any[] | null = null;
    cityList: any[] = [];

    // 分类
    cateList: any;
    isCateId: any;
    isLevel: any;
    cateListId: any;

    // 预售时间
    isShow = false;
    dateArray: any[] = [];

    precision = 0;
    precision1 = 2;

    constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
        public adminRegionService: AdminRegionService, public adminGoodsService: AdminGoodsService,
        private message: NzMessageService,) {
        // 表单初始化
        this.addForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            product_area: new FormControl('', [Validators.required]),
            is_order: new FormControl('0', [Validators.required]),
            date_starts: new FormControl(null),
            delivery_type: new FormControl('1'),
            specificationList: this.fb.array([]),
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
        this.adminRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
            this.getCateListTree();
        })
    }

    // 分类
    getCateListTree() {
        this.adminGoodsService.getCateListTree().subscribe(res => {
            console.log("11111", res);
            this.cateList = res;
            this.getGoodsDetail();
        })
    }

    getGoodsDetail() {
        this.adminGoodsService.getGoodsDetail(this.detailId).subscribe(res => {
            console.log("结果是12", res)
            this.addDataDetailModel = res.data;
            this.isSpinning = false;
            this.setFormValue();
        })
    }


    setFormValue() {
        this.addForm.get('title')?.setValue(this.addDataDetailModel.title);
        //产地
        const str = this.addDataDetailModel.product_area;
        for (let i = 0; i < str.length / 4; i++) {
            let temp = this.cityList[i] || '' + str.substr(0, 4 * (i + 1))
            this.cityList.push(temp);
        }
        console.log('this.values产地', this.cityList);
        this.addForm.get('product_area')?.setValue(this.cityList);

        // // 初始化规格
        for (let i = 0; i < this.addDataDetailModel.goods_specs.length; i++) {
            this.specificationArray.push(new FormGroup({
                spec_name: new FormControl(this.addDataDetailModel.goods_specs[i].spec_name, [Validators.required]),
                price: new FormControl(this.addDataDetailModel.goods_specs[i].price, [Validators.required]),
                stock: new FormControl(this.addDataDetailModel.goods_specs[i].stock, [Validators.required]),
                unit: new FormControl(this.addDataDetailModel.goods_specs[i].unit, [Validators.required]),
                postage: new FormControl(this.addDataDetailModel.goods_specs[i].postage.toString(), [Validators.required]),
                id: new FormControl(this.addDataDetailModel.goods_specs[i].id)
            }));
        }
        this.addForm.get('sort')?.setValue(this.addDataDetailModel.sort);
        this.addForm.get('sales_note')?.setValue(this.addDataDetailModel.sales_note);

        // 预售时间赋值
        if (this.addDataDetailModel.is_order == 1) {
            this.addForm.get('date_starts')?.setValue([this.addDataDetailModel.send_time_start, this.addDataDetailModel.send_time_end]);
            this.dateArray = [this.addDataDetailModel.send_time_start, this.addDataDetailModel.send_time_end]

        }

        //   给类别赋值
        this.cateListId = this.cateAnalyze(this.addDataDetailModel.cate_id);
        console.log("this.cateListId", this.cateListId, this.addDataDetailModel.cate_id)
        this.addForm.get('type')?.setValue(this.cateListId);
    }



    // 选择分类
    onChangeCate(event: any) {
        console.log("选择分类", event);
        this.isLevel = event;
        if (event) {
            this.isCateId = event[event.length - 1];
        }
    }


    // 分类解析
    cateAnalyze(data: any) {
        const arr: any[] = [];
        this.cateList.forEach((element: any) => {
            console.log("element", element);
            // 若一级的id就是则返回
            if (element?.id == data) {
                arr.push(data);
            }
            // 没有则对二级遍历
            else {
                element?.children?.forEach((ele: any) => {
                    // 若二级的id是
                    if (ele?.id == data) {
                        arr.push(ele.pid, ele.id);
                    }
                    else {
                        // 对三级遍历
                        ele?.children?.forEach((a: any) => {
                            if (a?.id == data) {
                                arr.push(ele.pid, a.pid, a.id);
                            }
                        });
                    }
                });
            }
        });
        return arr;

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






    updateTab() {
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
            console.log(this.addForm.valid);
            if (this.addForm.valid) {
                this.isLoadingBtn = true;
                this.addGoodsModel.id = this.addDataDetailModel.id;
                this.addGoodsModel.step = 0;
                this.adminGoodsService.updateGoods(this.addGoodsModel).subscribe(res => {
                    this.isLoadingBtn = false;
                }
                    , error => {
                        this.isLoadingBtn = false;
                    })
            }
            else {
                this.isLoadingBtn = false;
            }
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
        console.log("232", event)
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }
}



