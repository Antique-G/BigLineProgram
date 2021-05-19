import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CancelOrderModel } from 'interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminOrderGroupTravelService } from 'services/admin/admin-order-group-travel.service';

@Component({
    selector: 'app-admin-order-cancel',
    templateUrl: './admin-order-cancel.component.html',
    styleUrls: ['./admin-order-cancel.component.css']
})
export class AdminOrderCancelComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    cancelOrderModel: CancelOrderModel;

    constructor(public fb: FormBuilder, public adminOrderGroupTravelService: AdminOrderGroupTravelService,) {
        this.addForm = this.fb.group({
            id: ['',],
            reason: ['', [Validators.required]],
        });
        this.cancelOrderModel = {
            id: '',
            reason: ''
        }
    }

    ngOnInit(): void {

    }



    //  cancelOrder(cancelOrderModel: CancelOrderModel

    add() {
        this.cancelOrderModel.id = this.data;
        this.cancelOrderModel.reason = this.addForm.value.reason;
        this.adminOrderGroupTravelService.cancelOrder(this.cancelOrderModel).subscribe(res => {
            console.log("res")
        })

    }
}
