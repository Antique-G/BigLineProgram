import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreUpdateRequestModel, StoreDetailModel } from '../../../../interfaces/adminStore/admin-store-model';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';


@Component({
  selector: 'app-admin-store-detail',
  templateUrl: './admin-store-detail.component.html',
  styleUrls: ['./admin-store-detail.component.css']
})
export class AdminStoreDetailComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;


  addForm!: FormGroup;
  status = '1';

  storeDetailModel: StoreDetailModel;
  storeUpdateRequestModel: StoreUpdateRequestModel;

  constructor(public dialogRef: MatDialogRef<AdminStoreDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder,
    public adminRegionService: AdminRegionService, public adminStoreService: AdminStoreService) {
    this.storeDetailModel = this.data;


    const str = this.storeDetailModel.region_code;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    console.log("111", this.values);    //区域



    this.addForm = this.fb.group({
      name: [this.storeDetailModel.name, [Validators.required]],
      regionCode: [this.storeDetailModel.region_code, [Validators.required]],
      address: [this.storeDetailModel.address, [Validators.required]],
      fax: [this.storeDetailModel.fax, [Validators.required]],
      phone: [this.storeDetailModel.phone, [Validators.required]],
      status: [this.storeDetailModel.status, [Validators.required]]
    });
    this.storeUpdateRequestModel = {
      name: '',
      region_code: '',
      address: '',
      fax: '',
      phone: '',
      status: 0,
    }

  }

  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
    })

  }



  setValue() {
    this.storeUpdateRequestModel.name = this.addForm.value.name;
    this.storeUpdateRequestModel.region_code = this.addForm.value.regionCode;
    this.storeUpdateRequestModel.address = this.addForm.value.address;
    this.storeUpdateRequestModel.fax = this.addForm.value.fax;
    this.storeUpdateRequestModel.phone = this.addForm.value.phone
    this.storeUpdateRequestModel.status = this.addForm.value.status;
  }


  update() {
    this.setValue();
    this.storeUpdateRequestModel.store_id = this.storeDetailModel.store_id;
    this.storeUpdateRequestModel.region_code = this.idRegion;
    console.log("提交的model是什么", this.storeUpdateRequestModel);
    this.adminStoreService.updateStore(this.storeUpdateRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res.message) {
        alert("创建成功");
        this.dialogRef.close(1);
      }
      else {
        alert("创建失败，请重新填写")
      }
    })
  }


  close(): void {
    this.dialogRef.close();
  }

  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }
  }


}
