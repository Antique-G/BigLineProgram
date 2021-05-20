import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminProductFreeTravelService } from 'services/admin/admin-product-free-travel.service';


@Component({
    selector: 'app-admin-travel-detail-presell',
    templateUrl: './admin-travel-detail-presell.component.html',
    styleUrls: ['./admin-travel-detail-presell.component.css']
})
export class AdminTravelDetailPresellComponent implements OnInit {
    @Input() dataFreeDetailModel: any;
    detailUpdateModel: any;

    addForm!: FormGroup;

    // 日期有效期
    dateArray: any[] = [];
    dateUseArray: any[] = [];
    isLoadingBtn = false;
    isShow = false;

    constructor(public fb: FormBuilder, public adminProductFreeTravelService: AdminProductFreeTravelService,
        public router: Router,) {
        this.addForm = new FormGroup({
            is_presell: new FormControl(0, [Validators.required]),
            dateValid: new FormControl(null, [Validators.required]),
            useDateValid: new FormControl(null, [Validators.required]),
            ticket_price: new FormControl('', [Validators.required]),
            inventory: new FormControl('', [Validators.required]),
            subsidy_price: new FormControl('', [Validators.required]),
            ticket_rules: new FormControl(' ', [Validators.required]),
        });
        this.detailUpdateModel = {
            step: 7,
            is_presell: '',
            start_date: '',
            end_date: '',
            use_start_date: '',
            use_end_date: '',
            ticket_price: '',
            inventory: '',
            subsidy_price: '',
            ticket_rules: '',
            id: ''
        }
    }

    ngOnInit(): void {
        this.setFormValue();
    }


    // 日期有效期
    onChangeDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        console.log('object :>> ', event);
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }

    onChangeUseDate(event: any) {
        this.dateUseArray = [];
        const datePipe = new DatePipe('en-US');
        console.log('object :>> ', event);
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateUseArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateUseArray.push(myFormattedDate1);
        console.log("event", this.dateUseArray);
    }


    setFormValue() {
        this.addForm.get('dateValid')?.setValue([this.dataFreeDetailModel?.product_ticket?.data[0]?.start_date, this.dataFreeDetailModel?.product_ticket?.data[0]?.end_date]);
        this.addForm.get('useDateValid')?.setValue([this.dataFreeDetailModel?.product_ticket?.data[0]?.use_start_date, this.dataFreeDetailModel?.product_ticket?.data[0]?.use_end_date]);
        this.addForm.get('ticket_price')?.setValue(this.dataFreeDetailModel?.product_ticket?.data[0]?.ticket_price);
        this.addForm.get('inventory')?.setValue(this.dataFreeDetailModel?.product_ticket?.data[0]?.inventory);
        this.addForm.get('show_price')?.setValue(this.dataFreeDetailModel?.product_ticket?.data[0]?.show_price);
        this.addForm.get('subsidy_price')?.setValue(this.dataFreeDetailModel?.product_ticket?.data[0]?.subsidy_price);
        this.addForm.get('ticket_rules')?.setValue(this.dataFreeDetailModel?.product_ticket?.data[0]?.ticket_rules);
    }

    setValue() {
        console.log("this.dateArray[0]",)
        this.detailUpdateModel.is_presell = this.addForm.value.is_presell;
        this.detailUpdateModel.start_date = this.dateArray.length == 0 ? this.dataFreeDetailModel?.product_ticket?.data[0]?.start_date : this.dateArray[0];
        this.detailUpdateModel.end_date = this.dateArray.length == 0 ? this.dataFreeDetailModel?.product_ticket?.data[0]?.end_date : this.dateArray[1];
        this.detailUpdateModel.use_start_date = this.dateUseArray.length == 0 ? this.dataFreeDetailModel?.product_ticket?.data[0]?.use_start_date : this.dateUseArray[0];
        this.detailUpdateModel.use_end_date = this.dateUseArray.length == 0 ? this.dataFreeDetailModel?.product_ticket?.data[0]?.use_end_date : this.dateUseArray[1];
        this.detailUpdateModel.ticket_price = this.addForm.value.ticket_price;
        this.detailUpdateModel.inventory = this.addForm.value.inventory;
        this.detailUpdateModel.subsidy_price = this.addForm.value.subsidy_price;
        this.detailUpdateModel.ticket_rules = this.addForm.value.ticket_rules==null?'':this.addForm.value.ticket_rules;
        console.log("this.dateArray[0]", this.detailUpdateModel)
    }

    nextTab() {
        this.isLoadingBtn = true;
        this.setValue();
        // 验证表单
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            this.detailUpdateModel.id = this.dataFreeDetailModel.id;
            this.adminProductFreeTravelService.freeTravelUpdate(this.detailUpdateModel).subscribe(res => {
                this.isLoadingBtn = false;
                console.log("结果是", res);
            },
                error => {
                    this.isLoadingBtn = false;
                })
        }
        //   
    }


    changePresell(data: any) {
        if (data == 1) {
            this.addForm?.controls['dateValid'].setValidators([Validators.required]);
            this.addForm?.controls['dateValid'].updateValueAndValidity();
            this.addForm?.controls['useDateValid'].setValidators([Validators.required]);
            this.addForm?.controls['useDateValid'].updateValueAndValidity();
            this.addForm?.controls['ticket_price'].setValidators([Validators.required]);
            this.addForm?.controls['ticket_price'].updateValueAndValidity();
            this.addForm?.controls['inventory'].setValidators([Validators.required]);
            this.addForm?.controls['inventory'].updateValueAndValidity();
            this.addForm?.controls['subsidy_price'].setValidators([Validators.required]);
            this.addForm?.controls['subsidy_price'].updateValueAndValidity();
            this.addForm?.controls['ticket_rules'].setValidators([Validators.required]);
            this.addForm?.controls['ticket_rules'].updateValueAndValidity();
            this.isShow = true;
            return;
        }
        else {
            this?.addForm?.controls['dateValid'].setValidators(null);
            this?.addForm?.controls['dateValid'].updateValueAndValidity();
            this?.addForm?.controls['useDateValid'].setValidators(null);
            this?.addForm?.controls['useDateValid'].updateValueAndValidity();
            this?.addForm?.controls['ticket_price'].setValidators(null);
            this?.addForm?.controls['ticket_price'].updateValueAndValidity();
            this?.addForm?.controls['inventory'].setValidators(null);
            this?.addForm?.controls['inventory'].updateValueAndValidity();
            this?.addForm?.controls['subsidy_price'].setValidators(null);
            this?.addForm?.controls['subsidy_price'].updateValueAndValidity();
            this?.addForm?.controls['ticket_rules'].setValidators(null);
            this?.addForm?.controls['ticket_rules'].updateValueAndValidity();
            this.isShow = false;
            return;
        }
    }
}

