import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminRefundService } from 'services/admin/admin-refund.service';

@Component({
    selector: 'app-admin-order-refund-sale-approval-reject',
    templateUrl: './admin-order-refund-sale-approval-reject.component.html',
    styleUrls: ['./admin-order-refund-sale-approval-reject.component.css']
})
export class AdminOrderRefundSaleApprovalRejectComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    adminRefundCheckDataModel: any;


    constructor(public fb: FormBuilder, public adminRefundService: AdminRefundService,
        public router: Router,) {
        this.addForm = this.fb.group({
            reason: [''],
        })
        this.adminRefundCheckDataModel = {
            id: '',
            check: '',
            remark: '',
        }
     }

    ngOnInit(): void {
    }


    add() {
        this.adminRefundCheckDataModel.id = this.data;
        this.adminRefundCheckDataModel.check = 1;
        this.adminRefundCheckDataModel.remark = this.addForm.value.reason;
        this.adminRefundService.postAdminRefundDataCheck(this.adminRefundCheckDataModel).subscribe((res:any) => {
            this.router.navigate(['/admin/main/salesApproval'], { queryParams: { tabIndex: 1 } });
        })
    }
}
