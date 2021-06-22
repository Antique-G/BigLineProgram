import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCateModel } from '../../../../../interfaces/admin-goods/admin-good-model';
import { AdminGoodsService } from '../../../../../services/admin/admin-goods.service';


@Component({
  selector: 'app-admin-goods-cate-edit',
  templateUrl: './admin-goods-cate-edit.component.html',
  styleUrls: ['./admin-goods-cate-edit.component.css']
})
export class AdminGoodsCateEditComponent implements OnInit {
    @Input() data: any;
    detailModel: any;

    addForm: FormGroup;
    addCateModel: AddCateModel;

    constructor(public fb: FormBuilder, public adminGoodsService: AdminGoodsService,) {
        this.addForm = this.fb.group({
            name: ['', [Validators.required]],
            desc: ['',],
            status: ['', [Validators.required]],
        });
        this.addCateModel = {
            name: '',
            desc: '',
            id: '',
            pid: '',
            status:''
        }
    }

    ngOnInit(): void {
        this.detailModel = this.data;
    }

    setValue() {
        this.addCateModel.name = this.addForm.value.name;
        this.addCateModel.desc = this.addForm.value.desc;
        this.addCateModel.status = this.addForm.value.status;
        this.addCateModel.pid = this.detailModel?.pid;
    }

    update() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("this.addForm.valid", this.addForm)
        if (this.addForm.valid) {
            this.addCateModel.id = this.detailModel?.detail.id;
            this.adminGoodsService.updateCate(this.addCateModel).subscribe(res => {
                console.log("12",res)
            },
                error => {
                    
                }
            )
        }

    }
}

