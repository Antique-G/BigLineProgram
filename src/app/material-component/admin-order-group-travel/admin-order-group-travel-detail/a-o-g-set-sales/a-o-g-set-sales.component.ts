import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminOrderGroupTravelService } from 'services/admin/admin-order-group-travel.service';

@Component({
    selector: 'app-a-o-g-set-sales',
    templateUrl: './a-o-g-set-sales.component.html',
    styleUrls: ['./a-o-g-set-sales.component.css']
})
export class AOGSetSalesComponent implements OnInit {
    @Input() data: any;
    addForm: FormGroup;
    adminList: any;
    addGroupOrderBindIdModel: any;

    constructor(public fb: FormBuilder, public adminOrderGroupTravelService: AdminOrderGroupTravelService,) {
        this.addForm = this.fb.group({
            bind_account_name: ['', [Validators.required]],
        });
        this.addGroupOrderBindIdModel = {
            order_id: '',
            key_word: ''
        }
    }

    ngOnInit(): void {
        console.log("拿到的值", this.data)
     
    }


    update() {
        this.addGroupOrderBindIdModel.order_id = this.data.order_id;
        this.addGroupOrderBindIdModel.key_word = this.addForm.value.bind_account_name;

        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.adminOrderGroupTravelService.addOrderBindid(this.addGroupOrderBindIdModel).subscribe(res => {
                console.log("jieguo ",res)
            })
        }
    }
}
