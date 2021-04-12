import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-a-p-m-b-i-i-d',
  templateUrl: './a-p-m-b-i-i-d.component.html',
  styleUrls: ['./a-p-m-b-i-i-d.component.css']
})
export class APMBIIDComponent implements OnInit {
  validateForm!: FormGroup;
  insuranceDetailModel: any;

  @Input() data: any;


  constructor(public fb: FormBuilder, private modal: NzModalService, ) {
    this.validateForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(32)]),
      code: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      insured_date: new FormArray([new FormControl(null, [Validators.required, Validators.min(0)])]),
      insurance_amount: new FormControl(null, [Validators.required]),
      article: new FormControl(null, [Validators.required]),
      status: new FormControl('1'),
    });
  };


  ngOnInit(): void {
    console.log('detail', this.data);
    this.insuranceDetailModel = this.data;
    let setValue = this.insuranceDetailModel.insured_date;
    setValue.forEach((value: any) => {
      this.insuredDateArray.push(new FormControl(value));
    });
    console.log('insuredDateArray', this.insuredDateArray.value)
  }


  get insuredDateArray() {
    return this.validateForm.get('insured_date') as FormArray;
  }


  update(){
    this.modal.closeAll();
  }
}

