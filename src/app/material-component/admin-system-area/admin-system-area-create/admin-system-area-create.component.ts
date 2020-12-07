import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AddAdminRegionListRequestModel } from '../../../../interfaces/adminRegion/admin-region-model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-system-area-create',
  templateUrl: './admin-system-area-create.component.html',
  styleUrls: ['./admin-system-area-create.component.css']
})
export class AdminSystemAreaCreateComponent implements OnInit {
  addForm: FormGroup;
  statusValue = 2;
  addAdminRegionListRequestModel: AddAdminRegionListRequestModel;
  isGrade: any;  //弹窗等级

  // 上传
  loading = false;
  avatarUrl?: string;



  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminSystemAreaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public activatedRoute: ActivatedRoute,
    public adminRegionService: AdminRegionService,
    private msg: NzMessageService) {
    console.log("data", data);
    this.isGrade = data;

    this.addForm = this.fb.group({
      regionName: ['', [Validators.required]],
      parentCode: ['', [Validators.required]],
      regionDesc: ['', [Validators.required]],
      areaCode: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.addAdminRegionListRequestModel = {
      region_name: 0,
      parent_code: 0,
      region_desc: '',
      area_code: 0,
      region_img: '',
      status: 0
    }
  }




  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const parentCode = params['parentCode'];
      console.log('11111', parentCode);
      if (parentCode != undefined) {
        this.addAdminRegionListRequestModel.parent_code = parentCode;
      }
      const parentName = params['name'];
      console.log('222', parentName);
    });

  }

  setValue() {
    this.addAdminRegionListRequestModel.region_name = this.addForm.value.regionName;
    this.addAdminRegionListRequestModel.region_desc = this.addForm.value.regionDesc;
    this.addAdminRegionListRequestModel.area_code = this.addForm.value.areaCode;
    this.addAdminRegionListRequestModel.status = this.addForm.value.status;
  }


  add() {
    this.setValue();
    console.log("提交的model是什么", this.addAdminRegionListRequestModel);
    this.adminRegionService.addRegion(this.addAdminRegionListRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res === null) {
        alert("创建成功");
        this.dialogRef.close(1);
      }
      else{
        alert("创建失败，请重新填写")
      }
    })
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
    console.log("dianji", info)
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          console.log("this.avatarUrl ", this.avatarUrl)
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}

