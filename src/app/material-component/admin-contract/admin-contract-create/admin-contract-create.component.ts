import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminContractService } from '../../../../services/admin/admin-contract.service';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-contract-create',
  templateUrl: './admin-contract-create.component.html',
  styleUrls: ['./admin-contract-create.component.css']
})
export class AdminContractCreateComponent implements OnInit {
  addForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];
  storeList: any[] = [];
  selectedValue: any;
  isSelectedValue = false;


  constructor(public adminContractService: AdminContractService, private msg: NzMessageService,
    public adminStoreService: AdminStoreService, public activatedRoute: ActivatedRoute,
    ) {
    this.addForm = new FormGroup({
      contract_name: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedValue = params.id;
    });
    this.adminStoreService.storeList(1, 1000, '', '').subscribe((result: any) => {
      console.log("商铺的结果", result.data);
      this.storeList = result.data;

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
    console.log(this.imageList);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.imageList.length === 0) {
      this.msg.error('请选择上传图片')
      return
    }
    console.log('5555555 ', this.addForm);
    if (this.addForm.valid) {
      this.imageList.forEach((item: any, index) => {
        const formData = new FormData();
        formData.append('file', item);
        formData.append('store_id',  this.selectedValue);
        formData.append('contract_name', this.addForm.value.contract_name);
        this.adminContractService.uploadImg(formData).subscribe(res => {
          console.log('res结果是 ', res);
        }, err => {
          this.fileList[index].status = 'done';
        })
      })
    }

  }


  log(daya: any) {

  }
}