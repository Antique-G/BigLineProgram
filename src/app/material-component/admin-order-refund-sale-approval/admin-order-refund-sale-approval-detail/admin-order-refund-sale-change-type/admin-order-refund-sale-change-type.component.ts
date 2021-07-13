import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminRefundService } from '../../../../../services/admin/admin-refund.service';

@Component({
    selector: 'app-admin-order-refund-sale-change-type',
    templateUrl: './admin-order-refund-sale-change-type.component.html',
    styleUrls: ['./admin-order-refund-sale-change-type.component.css']
})
export class AdminOrderRefundSaleChangeTypeComponent implements OnInit {
    @Input() data: any;
    addForm: FormGroup;
    refundChangeTypeModel: any;

    constructor(public fb: FormBuilder,public adminRefundService: AdminRefundService,) {
        this.addForm = fb.group({
            to_account: ['0', [Validators.required]],
        })
        this.refundChangeTypeModel = {
            id: '',
            to_account:''
        }
     }

    ngOnInit(): void {
        console.log("data", this.data)
    }

    confirm() {
        this.refundChangeTypeModel.id = this.data.id;
        this.refundChangeTypeModel.to_account = this.addForm.value.to_account;
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
          }
        if (this.addForm.valid) {
            this.adminRefundService.putRefundType(this.refundChangeTypeModel).subscribe(res => {
                console.log("23",res)
            })
         }
    }

}
