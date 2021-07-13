import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminRegionService } from 'services/admin/admin-region.service';



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
    selector: 'app-admin-goods-pro-add-order-detail',
    templateUrl: './admin-goods-pro-add-order-detail.component.html',
    styleUrls: ['./admin-goods-pro-add-order-detail.component.css']
})
export class AdminGoodsProAddOrderDetailComponent implements OnInit {
    addForm: FormGroup;
    detailModel: any;

    specificationValue: any;
    specList: any;
    selectSpec: any;

    nzOptions: any[] | null = null;
    isRegion_code: any;
    isPrice: any; //单价
    priceTotal: any;//商品价格
    allPriceTotal: any;//总价
    freightPrice = 8; //油费

    precision = 0;
    precision1 = 2;

    addGoodsOrderModel: any;

    constructor(public fb: FormBuilder, public adminGoodsService: AdminGoodsService,
        public activatedRoute: ActivatedRoute, public adminRegionService: AdminRegionService,
        public modal: NzModalService,public router: Router, ) {
        // 校验手机
        const { mobile } = MyValidators;
        this.addForm = this.fb.group({
            id: ['',],
            title: ['',],
            goods_cate: ['',],
            goods_area_name: ['',],
            delivery_type: ['',],
            is_order: ['',],
            send_time: ['',],
            store_name: ['',],
            specificationValue: ['',],
            price: ['',],
            unit: ['',],
            postage: ['',],
            goods_num: [1, [Validators.required]],
            freight: ['', [Validators.required]],
            consignee: ['', [Validators.required]],
            phone: ['', [Validators.required, mobile]],
            user_phone: ['', [Validators.required, mobile]],
            region_code: ['', [Validators.required]],
            address: ['', [Validators.required]],
            remarks: ['',],
        });
        this.addGoodsOrderModel = {
            region_code: '',
            address: '',
            consignee: '',
            phone: '',
            user_phone: '',
            price_total: '',
            goods_id: '',
            spec_id: '',
            goods_num: '',
            freight: '',
            remarks: '',
        }
    }


    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.adminRegionService.getAllRegionList().subscribe(res => {
                this.nzOptions = res;
                this.adminGoodsService.getGoodsDetail(params?.id).subscribe(res => {
                    console.log("结果是12", res)
                    this.detailModel = res.data;
                    this.specificationValue = this.detailModel?.goods_specs[0]?.id;
                    console.log("this.specificationValue", this.specificationValue);
                    this.specList = this.detailModel?.goods_specs;
                    this.freightPrice = this.addForm.value.freight;
                    this.feeAll();
                })
            })
        })

    }



    changeSpecs(data: any) {
        if (data) {
            console.log("选择的是", data);
            let select = this.specList?.filter((item: any) => item.id == data);
            console.log("1111", select);
            this.selectSpec = select[0];
            this.isPrice = this.selectSpec.price;
            // this.freightPrice = this.addForm.value.freightPrice;
            this.feeAll();
        }
    }

    // 区域
    onChangesCity(data: any) {
        console.log("点击的结果是", data);
        if (data !== null) {
            this.isRegion_code = data[data.length - 1];
        }
    }


    // 购买份数
    onEnterNums(data: any) {
        console.log("购买份数data", data);
        this.feeAll();
    }

    onEnterFreight(data: any) {
        console.log("油费", data);
        this.freightPrice = data;
        this.feeAll();
    }

    feeAll() {
        let nums = (Number(this.addForm.value.goods_num) * 100) / 100;
        let price = (Number(this.isPrice) * 100) / 100;
        this.priceTotal = Number(nums) * Number(price);
        // 包邮
        if (this.selectSpec?.postage == 0) {
            this.freightPrice = 0;
        }
        let freight = (Number(this.freightPrice) * 100) / 100;
        this.allPriceTotal = (Number(this.priceTotal) * 100) / 100 + (Number(freight) * 100) / 100;
        this.priceTotal = Math.round(this.priceTotal * 100) / 100;
        this.allPriceTotal = Math.round(this.allPriceTotal * 100) / 100;
    }


    setValue() {
        this.addGoodsOrderModel.region_code = this.isRegion_code;
        this.addGoodsOrderModel.address = this.addForm.value.address;
        this.addGoodsOrderModel.consignee = this.addForm.value.consignee;
        this.addGoodsOrderModel.phone = this.addForm.value.phone;
        this.addGoodsOrderModel.user_phone = this.addForm.value.user_phone;
        this.addGoodsOrderModel.price_total = this.allPriceTotal;
        this.addGoodsOrderModel.goods_id = this.detailModel.id;
        this.addGoodsOrderModel.spec_id = this.addForm.value.specificationValue;
        this.addGoodsOrderModel.goods_num = this.addForm.value.goods_num;
        this.addGoodsOrderModel.freight = this.freightPrice;
        this.addGoodsOrderModel.remarks = this.addForm.value.remarks;
    }



    commit() {
        this.setValue();
        // 验证表单
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            this.modal.confirm({
                nzTitle: '请确认',
                nzContent: `购买商品${this.detailModel?.title}：规格为${this.selectSpec.spec_name}, ${this.addGoodsOrderModel.goods_num}份，运费${this.addGoodsOrderModel.freight}元，总价${this.addGoodsOrderModel.price_total}元，确认无误请提交`,
                nzOnOk: () => this.adminGoodsService.addOrder(this.addGoodsOrderModel).subscribe(res => {
                    this.router.navigate(['/admin/main/goodsOrderList']);
                }, error => {
                 
                })
            });
        }
        else {
           
        }

    }
}
