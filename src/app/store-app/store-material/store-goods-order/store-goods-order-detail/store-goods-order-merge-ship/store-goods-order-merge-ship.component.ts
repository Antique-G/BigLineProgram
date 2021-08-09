import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreGoodsService } from 'services/store/store-goods/store-goods.service';

@Component({
    selector: 'app-store-goods-order-merge-ship',
    templateUrl: './store-goods-order-merge-ship.component.html',
    styleUrls: ['./store-goods-order-merge-ship.component.css']
})
export class StoreGoodsOrderMergeShipComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    companyList: any[] = [];
    sendStoreExpressCompany: any;
    order_itemList:any

    constructor(public fb: FormBuilder, public storeGoodsService: StoreGoodsService,) {
        this.addForm = this.fb.group({
            express_company: ['', [Validators.required]],
            express_number: ['', [Validators.required]]
        });
        this.sendStoreExpressCompany = {
            sub_order_id: '',
            express_company: '',
            express_number: '',
        }
    }

    ngOnInit(): void {
        console.log("data", this.data);
        this.order_itemList = this.data?.order_item?.data;
        this.storeGoodsService.expressCompanyList().subscribe(res => {
            console.log("结果是", res);
            this.companyList = res?.data;
        });
        this.addForm.patchValue({
            express_company: this.data?.express_company,
            express_number: this.data?.express_number
        })
    }


    add() {
        this.sendStoreExpressCompany.express_company = this.addForm.value.express_company;
        this.sendStoreExpressCompany.express_number = this.addForm.value.express_number;
        this.sendStoreExpressCompany.sub_order_id = this.data?.id;

        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("66666", this.addForm.valid)
        if (this.addForm.valid) {
            this.storeGoodsService.sendExpress(this.sendStoreExpressCompany).subscribe(res => {
                console.log("1231", res);
            })
        }
    }
}
