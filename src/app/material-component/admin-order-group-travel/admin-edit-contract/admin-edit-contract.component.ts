import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-admin-edit-contract',
    templateUrl: './admin-edit-contract.component.html',
    styleUrls: ['./admin-edit-contract.component.css']
})
export class AdminEditContractComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;
    detailModel: any;
    dataMember: any[] = [];

    constructor(public fb: FormBuilder,) {
        this.addForm = this.fb.group({
            travel_name: ['',],
            travel_address: ['',],
            businsess_number: ['',],
            travel_manager: ['',],
            manager_phone: ['',],
            business_address: ['',],
            product_name: ['',],
            date_start: ['',],
            date_end: ['',],
            few_days: ['',],
            few_night: ['',],
            group_id: ['',],
            audlt: ['',],
            child: ['',],
            tour_fee: ['',],
            price_diff: ['',],
            pay_time: ['',],
            pay_type: ['',],
            price_total: ['',],
            fee_remark: ['',],
            contact_name: ['',],
            contact_phone: ['',],
            id_type: ['',],
            id_num: ['',],
            tourist_category: ['',],
            tourist_company: ['',],
            unified_credit_code: ['',],
            tourist_address: ['',],
            tourist_email: ['',],
            contact_group: ['',],
            contact_nation: ['',],
            contact_sex: ['',],
            contact_health: ['',],
            tourist: ['',],
            group_min: ['',],
            insurance_name: ['',],
            group_ways: ['',],
            third_party_travel: ['',],
            agree_group: ['',],
            agree_group_travel: ['',],
            dispute_ways: ['',],
            dispute_arbitration_commission: ['',],
            dispute_law: ['',],
            additionalTerms: ['',],
            dayList: this.fb.array([]),
        })
    }

    ngOnInit(): void {
    }

    // 行程
    get dayArray() {
        return this.addForm.get("dayList") as FormArray;
    }

}
