import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateGoodsOrderModel } from 'interfaces/store/storeGoods/store-goods-model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';


@Component({
    selector: 'app-store-goods-order-add-freight',
    templateUrl: './store-goods-order-add-freight.component.html',
    styleUrls: ['./store-goods-order-add-freight.component.css']
})
export class StoreGoodsOrderAddFreightComponent implements OnInit {
    public isSpinning = false;
    @Input() data: any;
    addForm: FormGroup;
    detailModel: any;
    updateGoodsOrderModel: UpdateGoodsOrderModel;
    precision1 = 2;



    constructor(public fb: FormBuilder, public storeGoodsService: StoreGoodsService, private modal: NzModalService) {
        this.addForm = this.fb.group({
            title: ['',],
            specificationValue: ['',],
            price: [''],
            unit: ['',],
            postage: ['',],
            goods_num: [''],
            freight: ['', [Validators.required]],
            extra:[''],
            discount:[''],
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
        this.addForm.patchValue({
            freight: this.data.freight_price
        })
    }


    setValue() {
        this.updateGoodsOrderModel.item_id = this.data.id;
        this.updateGoodsOrderModel.spec_id = this.data.spec_id;
        this.updateGoodsOrderModel.goods_num = this.data.goods_num;
        this.updateGoodsOrderModel.goods_price = this.data.goods_price;
        this.updateGoodsOrderModel.freight_price = this.addForm.value.freight;
        this.updateGoodsOrderModel.discount = this.addForm.value.discount;
        this.updateGoodsOrderModel.extra = this.addForm.value.extra;

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
