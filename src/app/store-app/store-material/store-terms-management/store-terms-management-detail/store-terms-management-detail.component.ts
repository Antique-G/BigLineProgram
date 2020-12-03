import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataDetailModel, UpdateStoreTermsManagementeRequestModel } from '../../../../../interfaces/store/storeTermsManagement/store-terms-management-model';
import { StoreTermsManagementService } from '../../../../../services/store/store-terms-management/store-terms-management.service';

@Component({
  selector: 'app-store-terms-management-detail',
  templateUrl: './store-terms-management-detail.component.html',
  styleUrls: ['./store-terms-management-detail.component.css']
})
export class StoreTermsManagementDetailComponent implements OnInit {
  addForm: FormGroup;
  dataDetailModel: DataDetailModel;
  updateStoreTermsManagementeRequestModel: UpdateStoreTermsManagementeRequestModel;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreTermsManagementDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public storeTermsManagementService: StoreTermsManagementService) {
    this.dataDetailModel = this.data;

    this.addForm = this.fb.group({
      title: [this.dataDetailModel.title, [Validators.required]],
      content: [this.dataDetailModel.content, [Validators.required]],
    });

    this.updateStoreTermsManagementeRequestModel = {
      title: '',
      content: ''
    }
  }

  ngOnInit(): void {
  }


  setValue() {
    this.updateStoreTermsManagementeRequestModel.title = this.addForm.value.title;
    this.updateStoreTermsManagementeRequestModel.content = this.addForm.value.content; 
  }



  update() {
    this.setValue();
    this.updateStoreTermsManagementeRequestModel.id = this.dataDetailModel.id;
    console.log("提交的model是什么", this.updateStoreTermsManagementeRequestModel);
    this.storeTermsManagementService.updateStoreTerms(this.updateStoreTermsManagementeRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res === null) {
        alert("更新成功");
        this.dialogRef.close(1);
      }
      else {
        alert("更新失败");
      }
    })
  }


  close(): void {
    this.dialogRef.close();
  }
}
