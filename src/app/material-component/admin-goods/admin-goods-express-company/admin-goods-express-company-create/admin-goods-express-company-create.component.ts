import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminGoodsService } from 'services/admin/admin-goods.service';

@Component({
    selector: 'app-admin-goods-express-company-create',
    templateUrl: './admin-goods-express-company-create.component.html',
    styleUrls: ['./admin-goods-express-company-create.component.css']
})
export class AdminGoodsExpressCompanyCreateComponent implements OnInit {
    @Input() data: any;

    addForm: FormGroup;
    addExpressCompanyModel: any;
    updateExpressCompanyModel: any;


    constructor(public fb: FormBuilder, public adminGoodsService: AdminGoodsService,) {
        this.addForm = this.fb.group({
            name: ['', [Validators.required]],
            status: ['1', [Validators.required]],
        });
        this.addExpressCompanyModel = {
            name: '',
            status: '',
        };
        this.updateExpressCompanyModel = {
            name: '',
            status: '',
            id: ''
        };
    }

    ngOnInit(): void {
    }


    add() {
        this.addExpressCompanyModel.name = this.addForm.value.name;
        this.addExpressCompanyModel.status = this.addForm.value.status;
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("this.addForm.valid", this.addForm)
        if (this.addForm.valid) {
            this.adminGoodsService.addExpressCompany(this.addExpressCompanyModel).subscribe(res => {
                console.log("12", res)
            },
                error => {

                }
            )
        }
    }


    update() {
        this.updateExpressCompanyModel.name = this.addForm.value.name;
        this.updateExpressCompanyModel.status = this.addForm.value.status;
        this.updateExpressCompanyModel.id = this.data.id;
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log("this.addForm.valid", this.addForm)
        if (this.addForm.valid) {
            this.adminGoodsService.updateExpressCompany(this.updateExpressCompanyModel).subscribe(res => {
                console.log("12", res)
            },
                error => {

                }
            )
        }
    }
}
