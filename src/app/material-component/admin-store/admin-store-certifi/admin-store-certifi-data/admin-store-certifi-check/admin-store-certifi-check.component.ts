import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplyCheckModel } from '../../../../../../interfaces/adminStore/admin-store-model';
import { AdminStoreService } from '../../../../../../services/admin/admin-store.service';

@Component({
  selector: 'app-admin-store-certifi-check',
  templateUrl: './admin-store-certifi-check.component.html',
  styleUrls: ['./admin-store-certifi-check.component.css']
})
export class AdminStoreCertifiCheckComponent implements OnInit {
  addForm!: FormGroup;
  detailModel: any;
  applyCheckModel: ApplyCheckModel;
  isShow = false;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreCertifiCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public adminStoreService: AdminStoreService) {
    this.addForm = this.fb.group({
      name: [''],
      status: ['', [Validators.required]],
      content: ['',]
    });
    this.applyCheckModel = {
      id: '',
      status: '',
      content: '',
    }
  }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("certification")!);
  }

  setValue() {
    this.applyCheckModel.id = this.data;
    this.applyCheckModel.status = this.addForm.value.status;
    this.applyCheckModel.content = this.addForm.value.content;
  }

  confirm() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("this.addForm.valid", this.addForm)
    if (this.addForm.valid) {
      this.adminStoreService.approveCheck(this.applyCheckModel).subscribe(res => {
        console.log('res :>> ', res);
        this.dialogRef.close(Number(this.applyCheckModel.status));
      })
    }
  }


  isChange(event: any) {
    console.log('event,event===1 :>> ', event, event === '1');
    if (event === '1') {
      this.isShow = false;
      this?.addForm?.controls['content'].setValidators(null);
      this?.addForm?.controls['content'].updateValueAndValidity();
    }
    else {
      this.isShow = true;
      this?.addForm?.controls['content'].setValidators(Validators.required);
      this?.addForm?.controls['content'].updateValueAndValidity();
    }
  }


  cancel() {
    this.dialogRef.close();
  }
}
