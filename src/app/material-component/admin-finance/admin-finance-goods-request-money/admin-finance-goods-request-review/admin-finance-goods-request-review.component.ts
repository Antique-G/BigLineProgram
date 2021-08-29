import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';


@Component({
  selector: 'app-admin-finance-goods-request-review',
  templateUrl: './admin-finance-goods-request-review.component.html',
  styleUrls: ['./admin-finance-goods-request-review.component.css']
})
export class AdminFinanceGoodsRequestReviewComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    dataModel: any;
    detail: any;
    cashReqReviwqModel: any;

    constructor(public fb: FormBuilder, public adminGoodsService: AdminGoodsService, 
                private modal: NzModalService, ) {
        this.addForm = this.fb.group({
            order_id: new FormControl(''),
            product_name: new FormControl(''),
            cost_type: new FormControl(''),
            supplier_name: new FormControl(''),
            bank_account: new FormControl(''),
            bank_name: new FormControl(''),
            bank_open: new FormControl(''),
            remarks: new FormControl(''),
            price: new FormControl(''),
            payed_money: new FormControl(''),
            money: new FormControl('', [Validators.required]),
        });
        this.cashReqReviwqModel = {
            id: '',
            money: ''
        };
    }

    ngOnInit(): void {
        console.log('data11111', this.data);
        this.dataModel = this.data?.dataModel;
        this.detail = this.data?.detail;
    }

    setValue() {
        this.cashReqReviwqModel.id = this.detail.id;
        this.cashReqReviwqModel.money = this.addForm.value.money;
    }

    update() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.modal.confirm({
                nzTitle: '提示',
                nzContent: '请确认是否审批该金额？',
                nzOnOk: () => this.adminGoodsService.cashReview(this.cashReqReviwqModel).subscribe(res => {
                    console.log('12', res);
                })
            });

        }
    }

}

