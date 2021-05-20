import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreCostService } from '../../../../../services/store/store-cost/store-cost.service';



@Component({
  selector: 'app-store-cost-type-create',
  templateUrl: './store-cost-type-create.component.html',
  styleUrls: ['./store-cost-type-create.component.css']
})
export class StoreCostTypeCreateComponent implements OnInit {
    addForm!: FormGroup;
    addTypeRequestModel: any;


    constructor(public fb: FormBuilder, public storeCostService: StoreCostService ) {
        this.addForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(16)]],
            status: [1, [Validators.required]]
        });
        this.addTypeRequestModel = {
            title: '',
            status: 1,
        };

    }

    ngOnInit(): void {
    }


    add() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.storeCostService.addType(this.addTypeRequestModel).subscribe(res => {

            });
        }
    }

    setValue() {
        this.addTypeRequestModel.title = this.addForm.value.title;
        this.addTypeRequestModel.status = parseInt(this.addForm.value.status);
    }

}

