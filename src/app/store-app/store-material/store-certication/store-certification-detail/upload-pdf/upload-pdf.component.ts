import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { StoreApplyService } from '../../../../../../services/store/store-apply/store-apply.service';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.css']
})
export class UploadPdfComponent implements OnInit {
  addForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];
  isSpinning = false;
  isLoadingBtn = false;
  isAccept = '.pdf';


  constructor(public storeApplyService: StoreApplyService, private msg: NzMessageService,
    public dialogRef: MatDialogRef<UploadPdfComponent>,
  ) {
    this.addForm = new FormGroup({
      contract_name: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {

  }




  // 上传图片之前
  beforeUpload = (file: NzUploadFile): boolean => {
    if (this.fileList.length <= 10) {
      let id: any = this.fileList.length;
      this.fileList = this.fileList.concat({
        uid: id,
        name: file.name
      });
      this.imageList = this.imageList.concat(file);
    }
    const isLt5M = file.size! / 1024 / 1024 < 5;
    if (!isLt5M) {
      this.msg.error('请上传 ≤ 5MB 以内的文件!');
    }

    return false
  };


  removeImg = (file: NzUploadFile) => {
    console.log('this.imageList上传前', this.imageList);
    console.log('fileList', file);
    this.imageList = this.imageList.filter(d => d.name !== file.name);
    console.log('删除后', this.imageList);
    return true
  }


  add() {
    console.log(this.imageList);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.imageList.length === 0) {
      this.msg.error('请选择上传文件')
      return
    }
    console.log('5555555 ', this.addForm);
    if (this.addForm.valid) {
      this.isSpinning = true;
      this.isLoadingBtn = true;
      this.imageList.forEach((item: any, index) => {
        const formData = new FormData();
        formData.append('file', item);
        formData.append('contract_name', this.addForm.value.contract_name);
        this.storeApplyService.uploadPdf(formData).subscribe(res => {
          console.log('res结果是 ', res);
          this.isLoadingBtn = false;
          this.isSpinning = false;
          this.dialogRef.close(res);
        },
          err => {
            this.isLoadingBtn = false;
            this.isSpinning = false;

          })
      })
    }

  }


  log(daya: any) {

  }


  close() {
    this.dialogRef.close();

  }
}