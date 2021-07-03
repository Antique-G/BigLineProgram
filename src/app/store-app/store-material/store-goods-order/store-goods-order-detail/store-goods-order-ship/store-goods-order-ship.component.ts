import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-store-goods-order-ship',
    templateUrl: './store-goods-order-ship.component.html',
    styleUrls: ['./store-goods-order-ship.component.css']
})
export class StoreGoodsOrderShipComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;

    constructor(public fb: FormBuilder, private message: NzMessageService,) {
        this.addForm = this.fb.group({
            goods_name: [''],
            courierList: this.fb.array([])
        })
    }

    ngOnInit(): void {
        console.log("data", this.data);
        let control = <FormArray>this.addForm.controls['courierList'];
        control.push(new FormGroup({
            courier_company: new FormControl('', [Validators.required]),
            courier_number: new FormControl('', [Validators.required])
        }));
    }



    // 快递
    get courierArray() {
        return this.addForm.get("courierList") as FormArray;
    }

    removeIcon(index: number) {
        if (this.courierArray.length > 1) {
            this.courierArray.removeAt(index);
        }
        else {
            this.message.create('warning', '无法删除，至少存在一组');
        }
    }


    addCourier() {
        this.courierArray.push(this.fb.group({
            courier_company: new FormControl('', [Validators.required]),
            courier_number: new FormControl('', [Validators.required])
        }))
    }

    add() {

    }
}
