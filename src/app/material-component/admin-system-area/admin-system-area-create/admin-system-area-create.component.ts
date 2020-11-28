import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { AdminLoginService } from '../../../../services/admin-login/admin-login.service';


@Component({
  selector: 'app-admin-system-area-create',
  templateUrl: './admin-system-area-create.component.html',
  styleUrls: ['./admin-system-area-create.component.css']
})
export class AdminSystemAreaCreateComponent implements OnInit {
  addForm!: FormGroup;
  statusValue = '0';
  // registerRequestModel: RegisterRequestModel;



  // 上传
  loading = false;
  avatarUrl?: string;



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminSystemAreaCreateComponent>,
    public adminLoginService: AdminLoginService,
    private msg: NzMessageService) {
    this.addForm = this.fb.group({
      regionId: ['', [Validators.required]],
      parentCode: ['', [Validators.required]],
      regionDesc: ['', [Validators.required]],
      areaCode: ['', [Validators.required]],
      sort: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    // this.registerRequestModel = {
    //   account: '',
    //   password: '',
    //   password_confirmation: '',
    //   real_name: '',
    //   mobile: '',
    //   status: '',
    // }
  }




  ngOnInit(): void {

  }

  setValue() {
    // this.registerRequestModel.account = this.addForm.value.account;
    // this.registerRequestModel.password = this.addForm.value.password;
    // this.registerRequestModel.password_confirmation = this.addForm.value.checkPassword;
    // this.registerRequestModel.real_name = this.addForm.value.name;
    // this.registerRequestModel.mobile = this.addForm.value.phoneNumber
    // this.registerRequestModel.status = this.addForm.value.status;
  }


  add() {
    this.setValue();
    // console.log("提交的model是什么", this.registerRequestModel);
    // this.adminLoginService.register(this.registerRequestModel).subscribe(res => {
    //   console.log("res结果", res);
    //   if (res === null) {
    //     alert("创建成功");
    //     this.dialogRef.close(1);
    //   }
    //   else{
    //     alert("创建失败，请重新填写")
    //   }
    // })
  }


  close(): void {
    this.dialogRef.close();
  }



  // 上传
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}

