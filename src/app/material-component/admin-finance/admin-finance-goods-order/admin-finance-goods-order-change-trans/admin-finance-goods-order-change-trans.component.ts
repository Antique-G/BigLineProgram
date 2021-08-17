import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';


@Component({
  selector: 'app-admin-finance-goods-order-change-trans',
  templateUrl: './admin-finance-goods-order-change-trans.component.html',
  styleUrls: ['./admin-finance-goods-order-change-trans.component.css']
})
export class AdminFinanceGoodsOrderChangeTransComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];

    precision = 2;
    cutValue = 0;

    comfirmOrderModel: any;

    constructor(public modal: NzModalService, public adminGoodsService: AdminGoodsService, ) {
        this.comfirmOrderModel = {
            order_pay_id: '',
            fee: '',
            pay_type: '',
            pay_time: '',
            transaction_id: '',
        }
    }

    ngOnInit(): void {
        console.log("打开的是", this.data);
        this.dataSource.push(this.data);
        console.log("打开的是", this.dataSource);
        this.dataSource.forEach((ele: any) => {
            ele['edit'] = false;
        })
    }


    startEdit(data: any) {
        this.dataSource.filter(function (item: any, index: any) {
            if (item.id === data.id) {
                item.edit = true;
            }
        });
    }

    saveEdit(data: any) {
        this.comfirmOrderModel.order_pay_id = data.id;
        this.comfirmOrderModel.fee = data.fee;
        this.comfirmOrderModel.pay_type = data.pay_type;
        this.comfirmOrderModel.pay_time = format(new Date(data.pay_time), 'yyyy-MM-dd HH:mm:ss');
        this.comfirmOrderModel.transaction_id = data.transaction_id;
        this.modal.confirm({
            nzTitle: '修改支付流水信息',
            nzContent: '请确认是否修改，一旦确认不可撤销',
            nzOnOk: () => this.adminGoodsService.changeTrans(this.comfirmOrderModel).subscribe(res => {

            })
        });

    }

    cancelEdit(id: any) {
        this.dataSource.filter(function (item: any, index: any) {
            if (item.id === id) {
                item.edit = false;
            }
        });
    }


    add() {
        this.modal.closeAll();
    }
}

