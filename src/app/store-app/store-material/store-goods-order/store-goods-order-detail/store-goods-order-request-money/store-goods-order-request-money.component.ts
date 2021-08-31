import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StoreCostService } from 'services/store/store-cost/store-cost.service';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';

@Component({
    selector: 'app-store-goods-order-request-money',
    templateUrl: './store-goods-order-request-money.component.html',
    styleUrls: ['./store-goods-order-request-money.component.css']
})
export class StoreGoodsOrderRequestMoneyComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    foodList: any[] = [];
    typeList: any[] = [];
    cashList: any[] = [];
    selected: any;
    goodsOrderRequestModel: any;
    precision = 2;
    cutValue = 0;
    cutNums = 0;
    allPrice: any;

    constructor(public fb: FormBuilder, private message: NzMessageService, public storeCostService: StoreCostService,
        public storeGoodsService: StoreGoodsService,) {
        this.addForm = this.fb.group({
            cost_type: new FormControl('', [Validators.required]),
            supplier_name: new FormControl('', [Validators.required]),
            select_food: new FormControl('', [Validators.required]),
            foodOrderList: this.fb.array([]),
            bank_account: new FormControl(''),
            bank_name: new FormControl(''),
            bank_open: new FormControl(''),
            remarks: new FormControl(''),
        });
        this.goodsOrderRequestModel = {
            order_id: '',
            sub_order_id: '',
            cost_type: '',
            suppiler_id: '',
            goods_info: '',
            content: '',
        };

    }


    ngOnInit(): void {
        this.addForm.controls['select_food'].setValue([]);
        console.log("this.data", this.data);
        this.foodList = this.data.order_item?.data;
        // 成本类型
        this.storeCostService.getTypeList(1, 100, 1).subscribe(res => {
            this.typeList = res?.data?.data;
            // 供应商
            this.storeCostService.getCashList(1, 100, 1).subscribe(res => {
                console.log('res', res);
                this.cashList = res?.data?.data;
            });
        });
    }


    get foodOrderArr() {
        return this.addForm.get('foodOrderList') as FormArray;
    }


    changeFood(data: any) {
        console.log("data", data)
        let iArr = data;
        this.clearFormArray(this.foodOrderArr);
        console.log("this.foodOrderArr", this.foodOrderArr)
        for (let i = 0; i < iArr.length; i++) {
            this.foodOrderArr.push(this.fb.group({
                goods_id: new FormControl(iArr[i].goods_id),
                goods_name: new FormControl(iArr[i].goods_name),
                goods_spec: new FormControl(iArr[i].spec_name),
                cash_price: new FormControl(1, [Validators.required]),
                num: new FormControl(1, [Validators.required]),
            }));
        }

    }


    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    changeSuppy(data: any) {
        console.log('data', data);
        const aArr = this.cashList.filter(item => item.id === data);
        console.log('arr', aArr);
        this.selected = aArr[0];

    }

    // changePrice(data: any,i:any) {
    //     // this.allPrice = (Number(this.addForm.value.price) * Number(this.addForm.value.nums) * 100) / 100;
    //     console.log("data",data,i)
    // }


    // changeNum(data: any,i:any) {
    //     this.allPrice = (Number(this.addForm.value.price) * Number(this.addForm.value.nums) * 100) / 100;
    // }


    add() {
        this.setValue();
        // 验证表单
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            this.storeGoodsService.goodsOrderRequest(this.goodsOrderRequestModel).subscribe(res => {
                console.log("结果是", res)
            })
        }
    }




    setValue() {
        this.goodsOrderRequestModel.order_id = this.data?.order_id;
        this.goodsOrderRequestModel.sub_order_id = this.data?.id;
        this.goodsOrderRequestModel.cost_type = this.addForm.value.cost_type;
        this.goodsOrderRequestModel.suppiler_id = this.addForm.value.supplier_name;
        this.goodsOrderRequestModel.goods_info = this.addForm.value.foodOrderList;
        this.goodsOrderRequestModel.content = this.addForm.value.remarks;
    }



}
