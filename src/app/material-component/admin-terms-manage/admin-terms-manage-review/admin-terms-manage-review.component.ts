import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import wangEditor from 'wangeditor';
import { AdminTermsManagementSetCheckRequestModel } from '../../../../interfaces/adminTerms/admin-terms-manage-model';
import { AdminTermsManageService } from '../../../../services/admin/admin-terms-manage.service';

@Component({
  selector: 'app-admin-terms-manage-review',
  templateUrl: './admin-terms-manage-review.component.html',
  styleUrls: ['./admin-terms-manage-review.component.css']
})
export class AdminTermsManageReviewComponent implements OnInit {
  addForm!: FormGroup;
  statusValue: any;
  disabled = true;
  isdisabled = true;
  isReason = false;
  adminTermsManagementSetCheckRequestModel: AdminTermsManagementSetCheckRequestModel;
  @ViewChild("featureBox") featureBox: any;       //获取dom


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminTermsManageReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public adminTermsManageService: AdminTermsManageService) {
    this.addForm = this.fb.group({
      title: new FormControl({ value: this.data.title, disabled: true }, Validators.required),
      check_status: new FormControl({ value: this.data.check_status }, Validators.required),
      reason: new FormControl(this.data?.reason)

    });
    this.adminTermsManagementSetCheckRequestModel = {
      id: this.data.id,
      check_status: 0,
      reason: ''
    }
  }

  ngOnInit(): void {
   
  }

 
  ngAfterViewInit(): void {
    this.textChange();
  }

  setValue() {
    this.adminTermsManagementSetCheckRequestModel.check_status = parseInt(this.addForm.value.check_status);
    if(this.adminTermsManagementSetCheckRequestModel.check_status===3){
      this.adminTermsManagementSetCheckRequestModel.reason = this.addForm.value.reason;
    }
    else{
      this.adminTermsManagementSetCheckRequestModel.reason = ''
    }
  }



  close() {
    this.dialogRef.close();
  }


  review() {
    this.setValue();
    this.adminTermsManageService.termsCheckStatus(this.adminTermsManagementSetCheckRequestModel).subscribe(res => {
      console.log("222222", res)
      if (res?.status_code) {
        // alert("审核更新不成功");
      }
      else {
        // alert("审核更新成功");
        this.dialogRef.close(1);

      }
    })
  }

  
  isCheck(element: any) {
    console.log("element", element);
    if (element === '3') {
      this.isReason = true;
    }
    else {
      this.isReason = false;
    }
  }

  
  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    this.featureBox.nativeElement.innerHTML = this.data.content;    //赋值
    editorFeature.create();
    editorFeature.$textElem.attr('contenteditable', 'false')
  }
}
