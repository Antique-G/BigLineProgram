import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';

@Component({
    selector: 'app-admin-finance-goods-order-confirm',
    templateUrl: './admin-finance-goods-order-confirm.component.html',
    styleUrls: ['./admin-finance-goods-order-confirm.component.css']
})
export class AdminFinanceGoodsOrderConfirmComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    itemModel: any;


    constructor(public fb: FormBuilder, private modal: NzModalService, public adminGoodsService: AdminGoodsService,  ) {
        this.addForm = this.fb.group({
            order_id: [''],
            fee: [''],
            pay_number: [''],
            pay_type: [''],
            transaction_id: [''],
        })
    }

    ngOnInit(): void {
        console.log("data", this.data);
        this.itemModel = this.data;

    }

    update() {
        this.modal.confirm({
            nzTitle: '财务确认收款',
            nzContent: '请确认是否该操作,确认后不可撤销',
            nzOnOk: () => this.adminGoodsService.confirmGoodPayLog(this.data.id).subscribe(res => console.log("res",res))
        });
    }


    cancel(){
        this.modal.closeAll();
    }

}
