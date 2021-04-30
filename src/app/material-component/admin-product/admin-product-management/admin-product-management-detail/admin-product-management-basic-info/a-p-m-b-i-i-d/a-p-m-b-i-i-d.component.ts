import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    console.log('this.insuredDateArray',this.insuredDateArray.value);
    if(this.insuredDateArray.value[0]==null){
     this.removeDate(0)
    }
    setValue.map((value: any) => {
      this.insuredDateArray.push(new FormControl(value));
    });
    console.log('insuredDateArray', this.insuredDateArray.value)
  }


  get insuredDateArray() {
    return this.validateForm.get('insured_date') as FormArray;
  }

  removeDate(index:any) {
    // (this.validateForm.get('phone') as FormArray).removeAt(index);
    this.insuredDateArray.removeAt(index);
  }
  update(){
    this.modal.closeAll();
  }
}

