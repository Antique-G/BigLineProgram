import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AdminWechatPageconfigService } from '../../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-upload-id-card',
  templateUrl: './upload-id-card.component.html',
  styleUrls: ['./upload-id-card.component.css']
})
export class UploadIdCardComponent implements OnInit {
  addForm!: FormGroup;
  isLoadingBtn = false;


  // 上传
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];



  constructor(public dialogRef: MatDialogRef<UploadIdCardComponent>, private msg: NzMessageService,
    public adminWechatPageconfigService: AdminWechatPageconfigService,) {
    this.addForm = new FormGroup({
      title: new FormControl('')
    });
  }

  ngOnInit(): void {
  }


  // 上传图片之前
  beforeUpload = (file: NzUploadFile): boolean => {
    let id:any = this.fileList.length;
      this.fileList = this.fileList.concat({
        uid: id,
        name: file.name
      });
      this.imageList = this.imageList.concat(file);
    return false
  };
  


  removeImg = (file: NzUploadFile) => {
    this.imageList = this.imageList.filter(item=>item.name!=file.name);
    console.log('this.imageList删除',this.imageList);
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
      formData.append('title', this.addForm.value.title);
      this.adminWechatPageconfigService.uploadImg(formData).subscribe(res => {
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
      },error=>{
        this.isLoadingBtn = false;
      })
    })

  }

  close() {
    this.dialogRef.close();
  }
}