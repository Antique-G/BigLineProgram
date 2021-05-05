import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { CancelInsModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminOrderGroupTravelService } from '../../../../../services/admin/admin-order-group-travel.service';


@Component({
    selector: 'app-admin-order-surrender',
    templateUrl: './admin-order-surrender.component.html',
    styleUrls: ['./admin-order-surrender.component.css']
})
export class AdminOrderSurrenderComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    detail: any;
    isStandard: any;
    percentage: any;
    percent: any;
    advance: any;
    bascie_money: any
    basicRefund: any;
    refund_amount: any;
    cancelInsModel: CancelInsModel;

    constructor(public fb: FormBuilder, public message: NzMessageService, public adminOrderGroupTravelService: AdminOrderGroupTravelService,) {
        this.addForm = this.fb.group({
            insurance_name: [''],
            policy_no: [''],
            start_date: [''],
            end_date: [''],
            status: [''],
            price: [''],
            standard: [''],
            basicRefund: [''],
            amount_add: [''],
            amount_cut: [''],
            remarks: [''],
        });
        this.cancelInsModel = {
            order_insurance_id: '',
            refund_amount: ''
        }
    }

    ngOnInit(): void {
        this.detail = this.data;
        // 订单出发日期
        let date1 = new Date(format(new Date(this.detail?.start_date), 'yyyy,MM,dd'));
        // 当前申请时间
        let date2 = new Date(format(new Date(), 'yyyy,MM,dd'))
        this.advance = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
        console.log('312312312312312', date1, date2, this.advance);
        if (this.advance > 7) {
            this.isStandard = 0;
            this.percentage = 1;
            this.percent = 100;
        }
        else if (6 <= this.advance && this.advance <= 7) {
            this.isStandard = 1;
            this.percentage = 0.8;
            this.percent = 80;
        }
        else if (4 <= this.advance && this.advance <= 5) {
            this.isStandard = 2;
            this.percentage = 0.7;
            this.percent = 70;
        }
        else if (1 <= this.advance && this.advance <= 3) {
            this.isStandard = 3;
            this.percentage = 0.5;
            this.percent = 50;
        }
        else {
            this.isStandard = 4;
            this.percentage = 0;
            this.percent = 0;
        }
        this.priceAll();
    }

    setValue() {
        this.cancelInsModel.order_insurance_id = this.detail?.id;
        this.cancelInsModel.refund_amount = this.refund_amount;
    }

    update() {
        this.setValue();
        this.adminOrderGroupTravelService.insCancel(this.cancelInsModel).subscribe(res => {
            console.log("aaa",res)
        })
    }

    priceAll() {
        this.bascie_money = Number(this.detail?.price) * Number(this.detail?.num) * Number(this.percentage);
        this.bascie_money = this.toDecimal(this.bascie_money);
        this.basicRefund = this.toDecimal(this.bascie_money);
        this.refund_amount = Number(this.bascie_money) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
        this.refund_amount = this.toDecimal(this.refund_amount);
        if (this.refund_amount < 0) {
            this.message.create('error', `总金额不能小于0`)
        }
    }

    numTest(data: any) {
        console.log('2222222', data)
        this.refund_amount = Number(this.bascie_money) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
        this.refund_amount = this.toDecimal(this.refund_amount);
        if (this.refund_amount < 0) {
            this.message.create('error', `总金额不能小于0`)
        }
    }


    numTest1(data: any) {
        console.log('2222222', data)
        this.refund_amount = Number(this.bascie_money) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
        this.refund_amount = this.toDecimal(this.refund_amount);
        if (this.refund_amount < 0) {
            this.message.create('error', `总金额不能小于0`)
        }
    }


    numStay(data: any) {
        data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    }

    numStay1(data: any) {
        data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    }


    toDecimal(x: any) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }

}
