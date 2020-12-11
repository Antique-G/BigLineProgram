import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AdminRegionDetailResponseModel, UpdateAdminRegionListRequestModel } from '../../../../interfaces/adminRegion/admin-region-model';

@Component({
  selector: 'app-admin-system-area-edit',
  templateUrl: './admin-system-area-edit.component.html',
  styleUrls: ['./admin-system-area-edit.component.css']
})
export class AdminSystemAreaEditComponent implements OnInit {
  addForm: FormGroup;
  adminRegionDetailResponseModel: AdminRegionDetailResponseModel;
  updateAdminRegionListRequestModel: UpdateAdminRegionListRequestModel;

  constructor(public dialogRef: MatDialogRef<AdminSystemAreaEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder, public adminRegionService: AdminRegionService) {
    this.adminRegionDetailResponseModel = data;

    this.addForm = this.fb.group({
      regionName: new FormControl({ value: this.adminRegionDetailResponseModel.region_name, disabled: true }, Validators.required),
      areaCode: new FormControl({ value: this.adminRegionDetailResponseModel.area_code, disabled: true }, Validators.required),
      status: new FormControl({ value: this.adminRegionDetailResponseModel.status }, Validators.required),
      sort: new FormControl({ value: this.adminRegionDetailResponseModel.sort, disabled: true }, Validators.required)
    });
    this.updateAdminRegionListRequestModel = {
      region_name: '',
      area_code: '',
      status: 0,
      sort: 0
    }
  }

  ngOnInit(): void {
  }


  close(): void {
    this.dialogRef.close();
  }

  update() {
    this.updateAdminRegionListRequestModel.region_name = this.adminRegionDetailResponseModel.region_name;
    this.updateAdminRegionListRequestModel.area_code = this.adminRegionDetailResponseModel.area_code;
    this.updateAdminRegionListRequestModel.status = this.addForm.value.status;
    this.updateAdminRegionListRequestModel.sort = this.adminRegionDetailResponseModel.sort;
    this.updateAdminRegionListRequestModel.id = this.adminRegionDetailResponseModel.region_id;
    console.log("this.updateAdminRegionListRequestModel.id",this.updateAdminRegionListRequestModel);
    this.adminRegionService.updateRegion(this.updateAdminRegionListRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res===null){
        // alert("更新成功"); 
        this.dialogRef.close(1);
      }
      else {
        // alert("更新失败");
       
      }
    })
  }


}
