import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-store-order-member',
  templateUrl: './store-order-member.component.html',
  styleUrls: ['./store-order-member.component.css']
})
export class StoreOrderMemberComponent implements OnInit {
    @Input() data: any;
    memberData: any[] = [];
    addForm: FormGroup;
    detail: any;

    constructor(public fb: FormBuilder,) {
        this.addForm = this.fb.group({
            insurance_name: [''],
            policy_no: [''],
        })
    }

    ngOnInit(): void {
        console.log("data", this.data);
        this.detail = this.data.data;
        let memArr: any[] = [];
        let arr = this.data?.detail?.member?.data;
        arr.forEach((element: any) => {
            if (element?.refund_status == 0) {
                memArr.push(element)
            }
        });
        this.memberData = memArr;
    }

    update() {

    }

}

