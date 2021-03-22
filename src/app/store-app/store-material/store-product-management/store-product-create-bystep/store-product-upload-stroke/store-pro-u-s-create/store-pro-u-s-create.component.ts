import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { StoreProductService } from '../../../../../../../services/store/store-product/store-product.service';


@Component({
  selector: 'app-store-pro-u-s-create',
  templateUrl: './store-pro-u-s-create.component.html',
  styleUrls: ['./store-pro-u-s-create.component.css']
})
export class StoreProUSCreateComponent implements OnInit {
  addForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];
  storeList: any[] = [];
  selectedValue: any;
  isSelectedValue = false;
  isSpinning = false;
  isLoadingBtn = false;
  productId:any

  constructor( private msg: NzMessageService,public dialogRef: MatDialogRef<StoreProUSCreateComponent>,public activatedRoute: ActivatedRoute, public storeProductService: StoreProductService,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.productId =data;
    this.addForm = new FormGroup({
      stroke_name: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedValue = params.detailDataId;
    });

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
    const isLt10M = file.size! / 1024 / 1024 < 10;
    if (!isLt10M) {
      this.msg.error('请上传 ≤ 10MB 以内的文件!');
      // return;
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
    if (this.fileList.length === 0) {
      this.msg.error('请选择上传文件')
      return
    }
    this.imageList.forEach((item: any, index) => {
      this.isLoadingBtn = true;
      const formData = new FormData();
      formData.append('file', item);
      formData.append('product_id', this.selectedValue || this.productId);
      console.log('addForm11111111',formData)
      this.storeProductService.uploadStroke(formData).subscribe(res => {
        console.log('res结果是 ', res);
        this.isLoadingBtn = false;
        this.dialogRef.close(res);

      }, err => {
        this.fileList[index].status = 'done';
        this.isLoadingBtn = false;

      })
    })

  }

  close() {
    this.dialogRef.close();

  }
}
