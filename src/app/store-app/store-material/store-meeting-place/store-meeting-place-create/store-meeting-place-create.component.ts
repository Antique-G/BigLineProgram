import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStoreMeetingPlaceRequestModel } from '../../../../../interfaces/store/storeMeetingPlace/store-meeting-place-model';
import { AdminRegionService } from '../../../../../services/admin/admin-region.service';
import { StoreMeetingPlaceService } from '../../../../../services/store/store-meeting-place/store-meeting-place.service';


@Component({
  selector: 'app-store-meeting-place-create',
  templateUrl: './store-meeting-place-create.component.html',
  styleUrls: ['./store-meeting-place-create.component.css']
})
export class StoreMeetingPlaceCreateComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  idRegion: any;


  addForm!: FormGroup;
  status = 3;

  addStoreMeetingPlaceRequestModel: AddStoreMeetingPlaceRequestModel;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreMeetingPlaceCreateComponent>,
    public adminRegionService: AdminRegionService, public storeMeetingPlaceService: StoreMeetingPlaceService) {

    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      regionCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.addStoreMeetingPlaceRequestModel = {
      name: '',
      region_code: '',
      address: '',
      status: 1,
    }
  }

  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
    })

 
  }



  setValue() {
    this.addStoreMeetingPlaceRequestModel.name = this.addForm.value.name;
    this.addStoreMeetingPlaceRequestModel.region_code = this.addForm.value.regionCode;
    this.addStoreMeetingPlaceRequestModel.address = this.addForm.value.address;
    this.addStoreMeetingPlaceRequestModel.status = this.addForm.value.status;
    


  }


  add() {
    this.setValue();
    this.addStoreMeetingPlaceRequestModel.region_code = this.idRegion;
    console.log("提交的model是什么", this.addStoreMeetingPlaceRequestModel);
    this.storeMeetingPlaceService.addStoreMeetingPlace(this.addStoreMeetingPlaceRequestModel).subscribe(res => {
      console.log("res结果", res);
      // if (res.message) {
      //   alert("创建成功");
      //   this.dialogRef.close(1);
      // }
      // else {
      //   alert("创建失败，请重新填写");
      // }
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
