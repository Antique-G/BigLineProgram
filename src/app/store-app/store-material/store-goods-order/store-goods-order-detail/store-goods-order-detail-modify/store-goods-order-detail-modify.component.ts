import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateGoodsOrderModel } from 'interfaces/store/storeGoods/store-goods-model';
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


    constructor(public fb: FormBuilder, public storeGoodsService: StoreGoodsService, private modal: NzModalService) {
        this.addForm = this.fb.group({
            title: ['',],
            specificationValue: ['',],
            price: [1, [Validators.required]],
            unit: ['',],
            postage: ['',],
            goods_num: [1, [Validators.required]],
            freight: [1],
        });
        this.updateGoodsOrderModel = {
            item_id: '',
            spec_id: '',
            goods_num: '',
            goods_price: '',
            freight_price: '',
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
                price: this.data.goods_price
            });

        })
    }




    changeSpecs(data: any) {
        if (data) {
            console.log("选择的是", data);
            let select = this.specList?.filter((item: any) => item.id == data);
            console.log("1111", select);
            this.selectSpec = select[0];
            this.addForm.patchValue({
                price: this.data?.goods_id == this.selectSpec.id ? this.data.goods_price : this.selectSpec.price
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

        }
    }

    setValue() {
        this.updateGoodsOrderModel.item_id = this.data.id;
        this.updateGoodsOrderModel.spec_id = this.addForm.value.specificationValue;
        this.updateGoodsOrderModel.goods_num = this.addForm.value.goods_num;
        this.updateGoodsOrderModel.goods_price = this.addForm.value.price;
        this.updateGoodsOrderModel.freight_price = this.selectSpec?.postage == 0 ? 0 : this.addForm.value.freight;
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
