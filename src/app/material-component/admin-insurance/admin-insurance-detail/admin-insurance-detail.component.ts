import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AdminInsuranceUpdateRequestModel, InsuranceDetailModel } from '../../../../interfaces/adminInsurance/admin-insurance-model';
import { AdminInsuranceService } from '../../../../services/admin/admin-insurance.service';
import { Observable, Observer } from 'rxjs';
// import { isNumber } from '../../../../app/util/validators';

@Component({
  selector: 'app-admin-insurance-detail',
  templateUrl: './admin-insurance-detail.component.html',
  styleUrls: ['./admin-insurance-detail.component.css']
})
export class AdminInsuranceDetailComponent implements OnInit {
  validateForm!: FormGroup;
  insuranceDetailModel!:InsuranceDetailModel;
  adminInsuranceUpdateRequestModel!: AdminInsuranceUpdateRequestModel;

  @Input() data:any;

  validationMessage: any = {
    name: {
      'maxlength': '保险名称长度最多为32个字符',
      'required': '请输入保险名称！'
    },
  };
  formErrors: any = {
    name: '',
  };
  
  constructor(public fb:FormBuilder,private adminInsuranceService:AdminInsuranceService) { 
    this.forms();
    this.adminInsuranceUpdateRequestModel = {
      name : '',
      insured_date: [],
      id: 0,
      status: 1,
    }
  };
  forms(){
    this.validateForm = this.fb.group({
      name: new FormControl(null, [Validators.required,Validators.maxLength(32)]),
      insured_date: new FormArray([
        new FormControl(null, [
          Validators.required,
          Validators.min(0),
        ]),
      ]),
      
    });
  
  };

  ngOnInit(): void {
   console.log('detail',this.data)
    this.insuranceDetailModel = this.data;
    this.patchValue();
  }
  get insuredDateArray() {
    return this.validateForm.get('insured_date') as FormArray;
  }
  //添加
  add() {
    this.insuredDateArray.push(new FormControl(null,[Validators.required,Validators.min(0),]));
  }
  //删除
  remove(index: number) {
    if(this.insuredDateArray.length > 1) {
      this.insuredDateArray.removeAt(index);
    }
  }
  removeNull(){
    let dataList = this.insuredDateArray.value;
    dataList.forEach((value:any,index:any) =>{
      if (value == null || value == 0 || value == '') {
        this.insuredDateArray.removeAt(index);
      }
    })
  }
  //赋值
  patchValue() {
    this.removeNull();
    const setValue = this.insuranceDetailModel.insured_date;
    setValue.forEach((value:any) => {
      this.insuredDateArray.push(new FormControl(value));
    });
    console.log('insuredDateArray',this.insuredDateArray.value)
  }
  setValue(){
    // let flag = newList.every((item:any)=>item!=null || item!='' || item!='0')
    // console.log(flag);
    // if(!flag) return false
    // console.log('newList',newList)
    if(this.insuredDateArray.length > 1) {
      this.removeNull();
    }
    this.adminInsuranceUpdateRequestModel.name = this.validateForm.value.name;
    this.adminInsuranceUpdateRequestModel.insured_date = this.insuredDateArray.value;
    this.adminInsuranceUpdateRequestModel.id = this.insuranceDetailModel.id;
    this.adminInsuranceUpdateRequestModel.status = this.insuranceDetailModel.status;
    console.log('this.adminInsuranceUpdateRequestModel',this.adminInsuranceUpdateRequestModel)
  }
  update(){
    this.setValue();
    // console.log(t,'t');
    // if(t != undefined ) return
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if ( this.validateForm.valid ) {
      this.adminInsuranceService.insuranceUpdate(this.adminInsuranceUpdateRequestModel).subscribe(res => {
        console.log('res结果',res)
        if (res === null) {

        } else {
          
        }
      })
    }
  }
}
