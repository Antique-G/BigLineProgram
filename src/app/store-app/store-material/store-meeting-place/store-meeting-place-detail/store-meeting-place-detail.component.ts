import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import { AddStoreMeetingPlaceRequestModel, Datum, UpdateStoreMeetingPlaceRequestModel } from '../../../../../interfaces/store/storeMeetingPlace/store-meeting-place-model';
import { StoreMeetingPlaceService } from '../../../../../services/store/store-meeting-place/store-meeting-place.service';


@Component({
  selector: 'app-store-meeting-place-detail',
  templateUrl: './store-meeting-place-detail.component.html',
  styleUrls: ['./store-meeting-place-detail.component.css']
})
export class StoreMeetingPlaceDetailComponent implements OnInit {
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;


  addForm!: FormGroup;


  updateStoreMeetingPlaceRequestModel: UpdateStoreMeetingPlaceRequestModel;
  detailModel: Datum;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreMeetingPlaceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public storeRegionService: StoreRegionService, public storeMeetingPlaceService: StoreMeetingPlaceService) {
    this.detailModel = this.data;


    const str = this.detailModel.region_code;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    console.log("111", this.values);    //区域


    this.addForm = this.fb.group({
      name: [this.detailModel.name, [Validators.required]],
      regionCode: [this.detailModel.region_code, [Validators.required]],
      address: [this.detailModel.address, [Validators.required]],
      status: [this.detailModel.status, [Validators.required]],
    });
    this.updateStoreMeetingPlaceRequestModel = {
      name: '',
      region_code: '',
      address: '',
      status: 1,
    }
  }

  ngOnInit(): void {
    this.storeRegionService.getAllRegionList().subscribe(res => {
      console.log("结果是", res);
      this.nzOptions = res;
    })


  }



  setValue() {
    this.updateStoreMeetingPlaceRequestModel.name = this.addForm.value.name;
    this.updateStoreMeetingPlaceRequestModel.region_code = this.addForm.value.regionCode;
    this.updateStoreMeetingPlaceRequestModel.address = this.addForm.value.address;
    this.updateStoreMeetingPlaceRequestModel.status = this.addForm.value.status;
  }


  add() {
    this.setValue();
    this.updateStoreMeetingPlaceRequestModel.region_code = this.idRegion;
    this.updateStoreMeetingPlaceRequestModel.id = this.detailModel.id;
    console.log("提交的model是什么", this.updateStoreMeetingPlaceRequestModel);
    this.storeMeetingPlaceService.updateStoreMeetingPlace(this.updateStoreMeetingPlaceRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res === null) {
        alert("更新成功");
        this.dialogRef.close(1);
      }
      else {
        alert("更新失败，请重新填写");
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
