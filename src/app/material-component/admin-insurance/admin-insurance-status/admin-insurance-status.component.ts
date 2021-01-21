import { Component, Input, OnInit } from '@angular/core';
import { AdminInsuranceService } from '../../../../services/admin/admin-insurance.service';
import { AdminInsuranceStatusResponseModel, InsuranceDetailModel } from '../../../../interfaces/adminInsurance/admin-insurance-model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-insurance-status',
  templateUrl: './admin-insurance-status.component.html',
  styleUrls: ['./admin-insurance-status.component.css']
})
export class AdminInsuranceStatusComponent implements OnInit {
  addForm!:FormGroup;
  insuranceDetailModel!: InsuranceDetailModel;
  adminInsuranceStatusResponseModel:AdminInsuranceStatusResponseModel;

  @Input() data:any;

  constructor(public fb:FormBuilder,public adminInsuranceService:AdminInsuranceService) {
    this.adminInsuranceStatusResponseModel = {
      id:0,
      status:0
    }
   }

  ngOnInit(): void {
    this.insuranceDetailModel = this.data;
    console.log(this.insuranceDetailModel);
    this.addForm = this.fb.group({
      name: new FormControl({ value: this.insuranceDetailModel.name, disabled: true }),
      status: new FormControl({ value: this.insuranceDetailModel.status,}),
    })
  }
  setStatus(){
    console.log('thisaddform',this.addForm.value,this.insuranceDetailModel.id)
    this.adminInsuranceStatusResponseModel.id = this.insuranceDetailModel.id;
    this.adminInsuranceStatusResponseModel.status = this.addForm.value.status;
    this.adminInsuranceService.insuranceStatus(this.adminInsuranceStatusResponseModel).subscribe(res => {
      console.log(res)
      if(res === null) {

      }else {
        
      }
    })
  }
}
