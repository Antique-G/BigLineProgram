import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCateModel } from '../../../../../interfaces/admin-goods/admin-good-model';
import { AdminGoodsService } from '../../../../../services/admin/admin-goods.service';

@Component({
    selector: 'app-admin-goods-cate-add',
    templateUrl: './admin-goods-cate-add.component.html',
    styleUrls: ['./admin-goods-cate-add.component.css']
})
export class AdminGoodsCateAddComponent implements OnInit {
    addForm: FormGroup;
    addCateModel: AddCateModel;
    @Input() data: any;
    detailModel: any;

    constructor(public fb: FormBuilder, public adminGoodsService: AdminGoodsService,) {
        this.addForm = this.fb.group({
            name: ['', [Validators.required]],
            desc: ['',],
        });
        this.addCateModel = {
            name: '',
            desc: '',
            pid:''
        }
    }

    ngOnInit(): void {
        this.detailModel = this.data;
    }

    setValue() {
        this.addCateModel.name = this.addForm.value.name;
        this.addCateModel.desc = this.addForm.value.desc;
        this.addCateModel.pid = this.detailModel?.pid;
    }

    add() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("this.addForm.valid", this.addForm)
        if (this.addForm.valid) {
            this.adminGoodsService.addCate(this.addCateModel).subscribe(res => {
                console.log("12",res)
            },
                error => {
                    
                }
            )
        }

    }
}
