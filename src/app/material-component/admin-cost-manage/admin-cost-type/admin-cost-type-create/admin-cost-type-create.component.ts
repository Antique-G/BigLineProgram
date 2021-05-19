import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-admin-cost-type-create',
    templateUrl: './admin-cost-type-create.component.html',
    styleUrls: ['./admin-cost-type-create.component.css']
})
export class AdminCostTypeCreateComponent implements OnInit {
    addForm!: FormGroup;
    addCostRequestModel: any;

    constructor(public fb: FormBuilder,) {
        this.addForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(16)]],
            status: [1, [Validators.required]]
        });
        this.addCostRequestModel = {
            name: '',
            status: 1,
        }

    }

    ngOnInit(): void {
    }


    add() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) { }
    }

    setValue() {
        this.addCostRequestModel.name = this.addForm.value.name;
        this.addCostRequestModel.status = parseInt(this.addForm.value.status);
    }

}
