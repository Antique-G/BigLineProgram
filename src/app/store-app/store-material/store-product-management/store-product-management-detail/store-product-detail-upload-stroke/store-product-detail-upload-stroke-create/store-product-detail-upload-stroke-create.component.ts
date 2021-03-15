import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
// import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { StoreProductService } from '../../../../../../../services/store/store-product/store-product.service';

@Component({
  selector: 'app-store-product-detail-upload-stroke-create',
  templateUrl: './store-product-detail-upload-stroke-create.component.html',
  styleUrls: ['./store-product-detail-upload-stroke-create.component.css']
})
export class StoreProductDetailUploadStrokeCreateComponent implements OnInit {
  addForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];
  storeList: any[] = [];
  selectedValue: any;
  isSelectedValue = false;
  isSpinning = false;
  isLoadingBtn = false;
  productId:any

  // private msg: NzMessageService,
  constructor(public dialogRef: MatDialogRef<StoreProductDetailUploadStrokeCreateComponent>,public activatedRoute: ActivatedRoute, public storeProductService: StoreProductService,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.productId =data;
    this.addForm = new FormGroup({
      stroke_name: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('000',params)
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
    this.imageList.forEach((item: any, index) => {
      const formData = new FormData();
      formData.append('file', item);
      formData.append('product_id', this.selectedValue || this.productId);
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
