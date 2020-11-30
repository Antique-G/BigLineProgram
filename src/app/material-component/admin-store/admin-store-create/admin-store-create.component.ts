import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStoreRequestModel } from '../../../../interfaces/adminStore/admin-store-model';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';



@Component({
  selector: 'app-admin-store-create',
  templateUrl: './admin-store-create.component.html',
  styleUrls: ['./admin-store-create.component.css']
})
export class AdminStoreCreateComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  idRegion: any;


  addForm!: FormGroup;
  status = '1';

  addStoreRequestModel: AddStoreRequestModel;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreCreateComponent>,
    public adminRegionService: AdminRegionService, public adminStoreService: AdminStoreService) {

    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      regionCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      status: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      mobile: ['', [Validators.required]],

    });
    this.addStoreRequestModel = {
      name: '',
      region_code: '',
      address: '',
      fax: '',
      phone: '',
      status: '',
      contact:'',
      mobile:''
    }
  }

  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
    })

 
  }



  setValue() {
    this.addStoreRequestModel.name = this.addForm.value.name;
    this.addStoreRequestModel.region_code = this.addForm.value.regionCode;
    this.addStoreRequestModel.address = this.addForm.value.address;
    this.addStoreRequestModel.fax = this.addForm.value.fax;
    this.addStoreRequestModel.phone = this.addForm.value.phone
    this.addStoreRequestModel.status = this.addForm.value.status;
    this.addStoreRequestModel.contact = this.addForm.value.contact;
    this.addStoreRequestModel.mobile = this.addForm.value.mobile;


  }


  add() {
    this.setValue();
    this.addStoreRequestModel.region_code = this.idRegion;
    console.log("提交的model是什么", this.addStoreRequestModel);
    this.adminStoreService.addStore(this.addStoreRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res.message) {
        alert("创建成功");
        this.dialogRef.close(1);
      }
      else {
        alert("创建失败，请重新填写");
      }
    })
  }


  close(): void {
    this.dialogRef.close();
  }

  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
   if(values!==null){
    this.idRegion = values[values.length - 1];
   }
  }


}
