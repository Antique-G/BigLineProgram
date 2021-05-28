import { format } from 'date-fns';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AdminRefundLogEditModel } from '../../../../interfaces/store/storeRefund/storerefund';
import { AdminRefundService } from '../../../../services/admin/admin-refund.service';



@Component({
    selector: 'app-admin-order-refund-chang-status',
    templateUrl: './admin-order-refund-chang-status.component.html',
    styleUrls: ['./admin-order-refund-chang-status.component.css']
})
export class AdminOrderRefundChangStatusComponent implements OnInit {
    @Input() data: any
    addForm!: FormGroup;
    isShow = false;
    adminRefundLogEditModel: AdminRefundLogEditModel;
    isBalance = true;

    constructor(public adminRefundService: AdminRefundService) {
        this.addForm = new FormGroup({
            refund_no: new FormControl(''),
            pay_type: new FormControl('', [Validators.required]),
            bank_user: new FormControl(''),
            bank_address: new FormControl(''),
            bank_number: new FormControl(''),
            transaction_id: new FormControl(''),
            pay_at: new FormControl(null, [Validators.required]),
        })
        this.adminRefundLogEditModel = {
            pay_at: '',
            pay_type: 1,
            bank_address: '',
            bank_user: '',
            bank_number: '',
            transaction_id: '',
            refund_no: '',
            id: '',
        }
    }

    ngOnInit(): void {
    }


    setValue() {
        this.adminRefundLogEditModel.id = this.data?.id;
        this.adminRefundLogEditModel.pay_at = format(new Date(this.addForm.value.pay_at), 'yyyy-MM-dd HH:mm:ss');
        this.adminRefundLogEditModel.pay_type = this.addForm.value.pay_type;
        this.adminRefundLogEditModel.bank_address = this.addForm.value.bank_address;
        this.adminRefundLogEditModel.bank_user = this.addForm.value.bank_user;
        this.adminRefundLogEditModel.bank_number = this.addForm.value.bank_number;
        this.adminRefundLogEditModel.transaction_id = this.addForm.value.transaction_id;
        this.adminRefundLogEditModel.refund_no = this.addForm.value.refund_no;
    }

    update() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.adminRefundService.postAdminRefundLogEdit(this.adminRefundLogEditModel).subscribe(res => {
                console.log('res :>> ', res);
            })
        }
    }


    changeType(event: any) {
        if (event == 6) {
            this.isShow = true;
            this.isBalance = true;
            return
        }
        if (event == 7) {
            this.isBalance = false;
            this.isShow = false;
            return
        }
        else {
            this.isShow = false;
            this.isBalance = true;
            return
        }
    }
}
