import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StoreContractService } from '../../../../../services/store/store-contract/store-contract.service';

@Component({
  selector: 'app-store-contract-create',
  templateUrl: './store-contract-create.component.html',
  styleUrls: ['./store-contract-create.component.css']
})
export class StoreContractCreateComponent implements OnInit {
  addForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];


  constructor(public storeContractService: StoreContractService, private msg: NzMessageService,) {
    this.addForm = new FormGroup({
      contract_name: new FormControl(''),
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
      this.msg.error('请选择上传图片')
      return
    }
    if (this.addForm.valid) {
      this.imageList.forEach((item: any, index) => {
        const formData = new FormData();
        formData.append('file', item);
        formData.append('contract_name', this.addForm.value.contract_name);
        this.storeContractService.uploadImg(formData).subscribe(res => {
          console.log('res结果是 ', res);
        }, err => {
          this.fileList[index].status = 'done';
        })
      })
    }

  }
}
