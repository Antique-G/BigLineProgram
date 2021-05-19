import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StoreCostService } from 'services/store/store-cost/store-cost.service';

@Component({
    selector: 'app-store-order-request-money',
    templateUrl: './store-order-request-money.component.html',
    styleUrls: ['./store-order-request-money.component.css']
})
export class StoreOrderRequestMoneyComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    typeList: any[] = [];
    cashList: any[] = [];
    selected: any;
    allPrice = 1;
    requestMoneyModel: any;
    precision = 2;
    cutValue = 0;
    cutNums = 0;

    constructor(public fb: FormBuilder, private message: NzMessageService, public storeCostService: StoreCostService) {
        this.addForm = this.fb.group({
            // baseList: this.fb.array([]),
            cost_type: new FormControl('', [Validators.required]),
            supplier_name: new FormControl('', [Validators.required]),
            price: new FormControl(1, [Validators.required]),
            nums: new FormControl(1, [Validators.required]),
            price_total: new FormControl('', [Validators.required]),
            bank_account: new FormControl('', [Validators.required]),
            bank_name: new FormControl('', [Validators.required]),
            bank_open: new FormControl('', [Validators.required]),
            remarks: new FormControl(''),
        });
        this.requestMoneyModel = {
            group_id: '',
            cost_type: '',
            price: '',
            num: '',
            content: '',
            suppiler_id: ''
        };

    }

    ngOnInit(): void {
        // 初始化
        // const control = this.addForm.controls.baseList as FormArray;
        // control.push(new FormGroup({
        //     cost_type: new FormControl('', [Validators.required]),
        //     supplier_name: new FormControl('', [Validators.required]),
        //     price: new FormControl(1, [Validators.required]),
        //     nums: new FormControl(1, [Validators.required]),
        //     price_total: new FormControl('', [Validators.required]),
        //     bank_account: new FormControl('', [Validators.required]),
        //     bank_name: new FormControl('', [Validators.required]),
        //     bank_open: new FormControl('', [Validators.required]),
        //     remarks: new FormControl(''),
        // }));

        this.storeCostService.getTypeList(1, 100, 1).subscribe(res => {
            this.typeList = res?.data?.data;
            this.storeCostService.getCashList(1, 100, 1).subscribe(res => {
                console.log('res', res);
                this.cashList = res?.data?.data;
            });
        });
    }




    // get baseArray() {
    //     return this.addForm.get('baseList') as FormArray;
    // }


    // addBase() {
    //     this.baseArray.push(this.fb.group({
    //         cost_type: new FormControl('', [Validators.required]),
    //         supplier_name: new FormControl('', [Validators.required]),
    //         price: new FormControl('', [Validators.required]),
    //         nums: new FormControl(1, [Validators.required]),
    //         price_total: new FormControl('', [Validators.required]),
    //         bank_account: new FormControl('', [Validators.required]),
    //         bank_name: new FormControl('', [Validators.required]),
    //         bank_open: new FormControl('', [Validators.required]),
    //         remarks: new FormControl(''),
    //     }));
    // }

    // removeBase() {
    //     console.log('11', this.addForm.value.baseList, );
    //     if (this.baseArray.length > 1) {
    //         const index = this.baseArray.length - 1;
    //         this.baseArray.removeAt(index);
    //     }
    //     else {
    //         this.message.create('warning', '无法删除，至少存在一组');
    //     }
    // }




    changeSuppy(data: any) {
        console.log('data', data);
        const aArr = this.cashList.filter(item => item.id === data);
        console.log('arr', aArr);
        this.selected = aArr[0];

    }

    changePrice(data: any) {
        this.allPrice = (Number(this.addForm.value.price) * Number(this.addForm.value.nums) * 100) / 100;
    }


    changeNum(data: any) {
        this.allPrice = (Number(this.addForm.value.price) * Number(this.addForm.value.nums) * 100) / 100;
    }


    add() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.storeCostService.addCash(this.requestMoneyModel).subscribe(res => {
                console.log('请款', res);
            });
        }
    }


    setValue() {
        this.requestMoneyModel.group_id = this.data;
        this.requestMoneyModel.cost_type = this.addForm.value.cost_type;
        this.requestMoneyModel.price = this.addForm.value.price;
        this.requestMoneyModel.num = this.addForm.value.nums;
        this.requestMoneyModel.content = this.addForm.value.remarks;
        this.requestMoneyModel.suppiler_id = this.addForm.value.supplier_name;
    }

}
