import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-admin-order-group-choose-export-excel',
    templateUrl: './admin-order-group-choose-export-excel.component.html',
    styleUrls: ['./admin-order-group-choose-export-excel.component.css']
})
export class AdminOrderGroupChooseExportExcelComponent implements OnInit {
    addForm!: FormGroup;

    constructor() {
        this.addForm = new FormGroup({
            show_type: new FormControl('0', [Validators.required]),
        })
    }

    ngOnInit(): void {
    }

    update() {
        return this.addForm.value.show_type
    }
}
