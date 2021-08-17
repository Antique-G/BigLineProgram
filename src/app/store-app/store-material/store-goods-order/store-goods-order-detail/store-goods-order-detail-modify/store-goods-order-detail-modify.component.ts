import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateGoodsOrderModel } from 'interfaces/store/storeGoods/store-goods-model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';


@Component({
    selector: 'app-store-goods-order-detail-modify',
    templateUrl: './store-goods-order-detail-modify.component.html',
    styleUrls: ['./store-goods-order-detail-modify.component.css']
})
export class StoreGoodsOrderDetailModifyComponent implements OnInit {
    public isSpinning = false;
    @Input() data: any;
    addForm: FormGroup;
    specificationValue: any;
    specList: any;
    selectSpec: any;
    precision = 0;
    precision1 = 2;
    detailModel: any;
    updateGoodsOrderModel: UpdateGoodsOrderModel;
    isFreight = false;
    allPrice = 0;
    isDis = false;

    constructor(public fb: FormBuilder, public storeGoodsService: StoreGoodsService, private modal: NzModalService,
        private msg: NzMessageService,) {
        this.addForm = this.fb.group({
            title: ['',],
            specificationValue: ['',],
            price: [1, [Validators.required]],
            unit: ['',],
            postage: ['',],
            goods_num: [1, [Validators.required]],
            freight: [1],
            extra: [0],
            discount: [0],
        });
        this.updateGoodsOrderModel = {
            item_id: '',
            spec_id: '',
            goods_num: '',
            goods_price: '',
            freight_price: '',
            extra: '',
            discount: '',
        }
    }

    ngOnInit(): void {
        console.log("拿到的值", this.data);
        this.isSpinning = true;
        this.storeGoodsService.getGoodsDetail(this.data?.goods_id).subscribe(res => {
            this.isSpinning = false;
            console.log("23423", res);
            this.detailModel = res.data;
            this.specList = this.detailModel?.goods_specs;
            this.specificationValue = this.data.spec_id;
            // 初始化赋值
            console.log("1")
            this.addForm.patchValue({
                goods_num: this.data.goods_num,
                freight: this.data.freight_price,
                extra: this.data.extra,
                discount: this.data.discount,
            });
            this.allPrice = this.data.total_price;
        })
    }




    changeSpecs(data: any) {
        if (data) {
            console.log("选择的是", data);
            let select = this.specList?.filter((item: any) => item.id == data);
            console.log("1111", select);
            this.selectSpec = select[0];
            this.addForm.patchValue({
                price: this.selectSpec.price
            });
            // 包邮
            if (this.selectSpec?.postage == 0) {
                this.isFreight = false;
                this.addForm?.controls['freight'].setValidators(Validators.required);
                this?.addForm?.controls['freight'].updateValueAndValidity();
            }
            else {
                this.isFreight = true;
            }
            this.feeAll();
            if (this.allPrice < 0) {
                this.msg.error('优惠金额不能大于订单金额，请重新输入');
                this.isDis = true;
            }
            else {
                this.isDis = false;
            }
        }
    }

    // 商品数量
    onEnterNums(data: any) {
        this.feeAll();
        if (this.allPrice < 0) {
            this.msg.error('优惠金额不能大于订单金额，请重新输入');
            this.isDis = true;
        }
        else {
            this.isDis = false;
        }
    }

    // 运费
    onEnterFreight(data: any) {
        this.feeAll();
        if (this.allPrice < 0) {
            this.msg.error('优惠金额不能大于订单金额，请重新输入');
            this.isDis = true;
        }
        else {
            this.isDis = false;
        }
    }

    // 附加收费
    onEnterExtra(data: any) {
        this.feeAll();
        if (this.allPrice < 0) {
            this.msg.error('优惠金额不能大于订单金额，请重新输入');
            this.isDis = true;
        }
        else {
            this.isDis = false;
        }
    }

    // 优惠
    onEnterDis(data: any) {
        this.feeAll();
        if (this.allPrice < 0) {
            this.msg.error('优惠金额不能大于订单金额，请重新输入');
            this.isDis = true;
        }
        else {
            this.isDis = false;
        }
    }


    feeAll() {
        this.setValue();
        let goodsPrice = this.updateGoodsOrderModel.goods_price;
        let nums = this.updateGoodsOrderModel.goods_num;
        let freight = this.updateGoodsOrderModel.freight_price;
        let extra = this.updateGoodsOrderModel.extra;
        let discount = this.updateGoodsOrderModel.discount;
        this.allPrice = (Number(goodsPrice) * 100) / 100 * (Number(nums) * 100) / 100 + (Number(freight) * 100) / 100 + (Number(extra) * 100) / 100 - (Number(discount) * 100) / 100;
        this.allPrice = Math.round(this.allPrice * 100) / 100;
    }


    setValue() {
        this.updateGoodsOrderModel.item_id = this.data.id;
        this.updateGoodsOrderModel.spec_id = this.addForm.value.specificationValue;
        this.updateGoodsOrderModel.goods_num = this.addForm.value.goods_num;
        this.updateGoodsOrderModel.goods_price = this.addForm.value.price;
        this.updateGoodsOrderModel.freight_price = this.selectSpec?.postage == 0 ? 0 : this.addForm.value.freight;
        this.updateGoodsOrderModel.extra = this.addForm.value.extra;
        this.updateGoodsOrderModel.discount = this.addForm.value.discount;

    }


    update() {
        this.setValue();
        // 验证表单
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            this.storeGoodsService.updateGoodsOrderItem(this.updateGoodsOrderModel).subscribe(res => {

            }, error => {

            })
        }
        else {

        }
    }


    cancel() {
        this.modal.closeAll();
    }
}
