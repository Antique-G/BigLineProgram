import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStoreTermsManagementRequestModel } from '../../../../../interfaces/store/storeTermsManagement/store-terms-management-model';
import { StoreTermsManagementService } from '../../../../../services/store/store-terms-management/store-terms-management.service';


@Component({
  selector: 'app-store-terms-management-create',
  templateUrl: './store-terms-management-create.component.html',
  styleUrls: ['./store-terms-management-create.component.css']
})
export class StoreTermsManagementCreateComponent implements OnInit {
  addForm: FormGroup;
  addStoreTermsManagementRequestModel: AddStoreTermsManagementRequestModel;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreTermsManagementCreateComponent>,
    public storeTermsManagementService: StoreTermsManagementService) {

    this.addForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
    this.addStoreTermsManagementRequestModel = {
      title: '',
      content: ''
    }
  }

  ngOnInit(): void {}



  setValue() {
    this.addStoreTermsManagementRequestModel.title = this.addForm.value.title;
    this.addStoreTermsManagementRequestModel.content = this.addForm.value.content; 
  }


  add() {
    this.setValue();
    console.log("提交的model是什么", this.addStoreTermsManagementRequestModel);
    this.storeTermsManagementService.addStoreTerms(this.addStoreTermsManagementRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res === null) {
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


}
