import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { StoreApplyService } from '../../../../../../services/store/store-apply/store-apply.service';

@Component({
  selector: 'app-upload-certification',
  templateUrl: './upload-certification.component.html',
  styleUrls: ['./upload-certification.component.css']
})
export class UploadCertificationComponent implements OnInit {
  isLoadingBtn = false;
  // 上传
  imgList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];



  constructor(public dialogRef: MatDialogRef<UploadCertificationComponent>, private msg: NzMessageService,
    public storeApplyService: StoreApplyService,) {
   
  }

  ngOnInit(): void {
  }


  // 上传图片之前
  beforeUpload = (file: NzUploadFile): boolean => {
    let id: any = this.imgList.length;
    this.imgList = this.imgList.concat({
      uid: id,
      name: file.name
    });
    this.imageList = this.imageList.concat(file);
    return false
  };



  removeImg = (file: NzUploadFile) => {
    this.imageList = this.imageList.filter(item => item.name != file.name);
    console.log('this.imageList删除', this.imageList);
    return true
  }


  add() {
    this.isLoadingBtn = true;
    console.log('this.imageList提交', this.imageList);
    if (this.imageList.length === 0) {
      this.msg.error('请选择上传图片');
      this.isLoadingBtn = false;
      return
    }
    this.imageList.forEach((item: any, index) => {
      const formData = new FormData();
      formData.append('image', item);
      this.storeApplyService.approveUpload(formData).subscribe(res => {
        this.isLoadingBtn = true;
        console.log("res", res);
        if (res?.message) {
          console.log("res", res);
          this.isLoadingBtn = false;
        }
        else {
          this.dialogRef.close(res);
          this.isLoadingBtn = true;
        }
      }, error => {
        this.isLoadingBtn = false;
      })
    })

  }

  close() {
    this.dialogRef.close();
  }
}