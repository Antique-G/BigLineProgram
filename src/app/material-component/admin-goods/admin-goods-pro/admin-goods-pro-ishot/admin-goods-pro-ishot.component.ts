import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';


@Component({
    selector: 'app-admin-goods-pro-ishot',
    templateUrl: './admin-goods-pro-ishot.component.html',
    styleUrls: ['./admin-goods-pro-ishot.component.css']
})
export class AdminGoodsProIshotComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    goodsSetHotModel: any;

    constructor(public fb: FormBuilder, private modal: NzModalService,
        public adminGoodsService: AdminGoodsService,) {
        this.addForm = this.fb.group({
            is_hot: new FormControl('', Validators.required),
            sort: new FormControl('')
        });
        this.goodsSetHotModel = {
            id: '',
            is_hot: '',
            sort:'',
        }
    }

    ngOnInit(): void {
        this.addForm.patchValue({
            sort:this.data.sort
        })
    }

    setValue() {
        this.goodsSetHotModel.id = this.data.id;
        this.goodsSetHotModel.is_hot = this.addForm.value.is_hot;
        this.goodsSetHotModel.sort = this.addForm.value.sort;
    }

    update() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            this.adminGoodsService.setHot(this.goodsSetHotModel).subscribe(res => {
                console.log("1",res)
            }, error => {
                // this.isLoadingBtn = false;
            })
        }
    }


    cancel() {
        this.modal.closeAll()
    }
}
