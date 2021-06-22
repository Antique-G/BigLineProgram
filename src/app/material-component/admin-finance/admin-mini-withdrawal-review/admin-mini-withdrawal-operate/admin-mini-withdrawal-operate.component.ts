import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminUserWithdrawReview } from '../../../../../interfaces/adminUserCommissionList/admin-userCommissionList-model';
import { AdminUserCommissionListService } from '../../../../../services/admin/admin-user-commission-list.service';


@Component({
    selector: 'app-admin-mini-withdrawal-operate',
    templateUrl: './admin-mini-withdrawal-operate.component.html',
    styleUrls: ['./admin-mini-withdrawal-operate.component.css']
})
export class AdminMiniWithdrawalOperateComponent implements OnInit {
    @Input() data: any;
    addForm: FormGroup;
    detailModel: any;
    isLoadingBtn = false;
    adminUserWithdrawReview: AdminUserWithdrawReview;
    isReason = true;

    constructor(public fb: FormBuilder, private modal: NzModalService,
        public adminUserCommissionListService: AdminUserCommissionListService) {
        this.addForm = fb.group({
            date: [''],
            money: [''],
            user_id: [''],
            phone: [''],
            account_type: [''],
            bank: [''],
            bank_name: [''],
            bank_account: [''],
            status: ['2', [Validators.required]],
            payment_no: ['', [Validators.required]],
            pay_time: ['', [Validators.required]],
            error_desc: [''],
        });
        this.adminUserWithdrawReview = {
            status: '',
            error_desc: '',
            payment_no: '',
            pay_time: '',
            id: '',
        }
    }

    ngOnInit(): void {
        this.detailModel = this.data;
        console.log("111111", this.detailModel)
    }




    setValue() {
        this.adminUserWithdrawReview.id = this.detailModel.id;
        this.adminUserWithdrawReview.status = Number(this.addForm.value.status);
        this.adminUserWithdrawReview.payment_no = this.addForm.value.payment_no;
        this.adminUserWithdrawReview.pay_time = this.addForm.value.pay_time==''||this.addForm.value.pay_time==null?'':format(new Date(this.addForm.value.pay_time), 'yyyy-MM-dd HH:mm:ss');;
        this.adminUserWithdrawReview.error_desc = this.addForm.value.error_desc;
    }


    add() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.adminUserCommissionListService.withdrawReview(this.adminUserWithdrawReview).subscribe(res => {
                console.log("11111", res)
            })
        }
        else {
            this.isLoadingBtn = false;
        }
    }



    isCheck(data: any) {
        if (data == 2) {
            this.isReason = true;
            this?.addForm?.controls['payment_no'].setValidators(Validators.required);
            this?.addForm?.controls['payment_no'].updateValueAndValidity();
            this?.addForm?.controls['pay_time'].setValidators(Validators.required);
            this?.addForm?.controls['pay_time'].updateValueAndValidity();
        }
        else {
            this.isReason = false;
            this?.addForm?.controls['payment_no'].setValidators(null);
            this?.addForm?.controls['payment_no'].updateValueAndValidity();
            this?.addForm?.controls['pay_time'].setValidators(null);
            this?.addForm?.controls['pay_time'].updateValueAndValidity();
        }
    }


    cancel() {
        this.modal.closeAll();
    }
}
