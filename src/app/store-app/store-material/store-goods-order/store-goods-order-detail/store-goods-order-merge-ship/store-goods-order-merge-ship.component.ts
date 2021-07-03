import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-store-goods-order-merge-ship',
    templateUrl: './store-goods-order-merge-ship.component.html',
    styleUrls: ['./store-goods-order-merge-ship.component.css']
})
export class StoreGoodsOrderMergeShipComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;

    constructor(public fb: FormBuilder,) {
        this.addForm = this.fb.group({
            courier_company: ['', [Validators.required]],
            courier_number: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {
        console.log("data", this.data);
    }


    add() {

    }
}
