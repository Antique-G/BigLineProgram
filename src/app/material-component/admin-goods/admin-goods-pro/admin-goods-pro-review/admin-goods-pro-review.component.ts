import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';


@Component({
    selector: 'app-admin-goods-pro-review',
    templateUrl: './admin-goods-pro-review.component.html',
    styleUrls: ['./admin-goods-pro-review.component.css']
})
export class AdminGoodsProReviewComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    goodsSetCheckStatusModel: any;
    isSpinning = false;
    isReason = false;


    constructor(public fb: FormBuilder, private modal: NzModalService,
        public adminGoodsService: AdminGoodsService,) {
        this.addForm = this.fb.group({
            title: new FormControl(''),
            specificationList: this.fb.array([]),
            check_status: new FormControl(2, [Validators.required]),
            reason: new FormControl(''),
        });
        this.goodsSetCheckStatusModel = {
            id: '',
            check_status: '',
            reason: '',
        }
    }

    ngOnInit(): void {
        console.log("2323",this.data)
        // 初始化规格
        for (let i = 0; i < this.data.goods_specs.length; i++) {
            this.specificationArray.push(new FormGroup({
                spec_name: new FormControl({ value: this.data.goods_specs[i].spec_name, disabled: true }),
                price: new FormControl({ value: this.data.goods_specs[i].price, disabled: true }),
                stock: new FormControl({ value: this.data.goods_specs[i].stock, disabled: true }),
                unit: new FormControl({ value: this.data.goods_specs[i].unit, disabled: true }),
                postage: new FormControl({ value: this.data.goods_specs[i].postage.toString(), disabled: true })
            }));
        }
        this.addForm.patchValue({
            reason:this.data?.check_log?.reason
        })
    }

    // 规格
    get specificationArray() {
        return this.addForm.get("specificationList") as FormArray;
    }



    update() {
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            this.isSpinning = true;
            this.goodsSetCheckStatusModel.id = this.data.id;
            this.goodsSetCheckStatusModel.check_status = this.addForm.value.check_status;
            if (this.goodsSetCheckStatusModel.check_status == 3) {
                this.goodsSetCheckStatusModel.reason = this.addForm.value.reason;
            }
            else {
                this.goodsSetCheckStatusModel.reason = '';
            }
            this.adminGoodsService.setCheckStatus(this.goodsSetCheckStatusModel).subscribe(res => {
                console.log("1", res);
                this.isSpinning = false;
            }, error => {
                this.isSpinning = false;
            })
        }
    }


    cancel() {
        this.modal.closeAll()
    }



    isCheck(element: any) {
        console.log("element", element);
        if (element == 3) {
            this.isReason = true;
        }
        else {
            this.isReason = false;
        }
    }
}
