import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';

@Component({
    selector: 'app-admin-generate-contract',
    templateUrl: './admin-generate-contract.component.html',
    styleUrls: ['./admin-generate-contract.component.css']
})
export class AdminGenerateContractComponent implements OnInit {
    @Input() data: any;
    addForm: FormGroup;
    sendCreateContractModel: any;
    isLoadingBtn = false;

    constructor(public fb: FormBuilder, public adminOrderGroupTravelService: AdminOrderGroupTravelService,) {
        this.addForm = fb.group({
            status: ['0', [Validators.required]],
        });
        this.sendCreateContractModel = {
            order_id: '',
            has_shopping: '',
        }
    }

    ngOnInit(): void {
        console.log("123", this.data);
    }


    confirm() {
        this.isLoadingBtn = true;
        this.sendCreateContractModel.order_id = this.data.id;
        this.sendCreateContractModel.has_shopping = this.addForm.value.status;
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.isLoadingBtn = true;
            this.adminOrderGroupTravelService.createContract(this.sendCreateContractModel).subscribe(res => {
                console.log("32", res)
                this.isLoadingBtn = false;
            }, error => {
                this.isLoadingBtn = false;
            })
        }
        else {
            this.isLoadingBtn = false;
        }
    }
}
