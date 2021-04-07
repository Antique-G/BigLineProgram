import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminContractService } from '../../../../services/admin/admin-contract.service';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


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
  isSpinning = false;
  isLoadingBtn = false;
  accept = "pdf";  //image/png, image/jpeg,
  start_date = null;
  dateArray: any[] = [];



  constructor(public adminContractService: AdminContractService, private msg: NzMessageService,
    public adminStoreService: AdminStoreService, public activatedRoute: ActivatedRoute,
  ) {
    this.addForm = new FormGroup({
      contract_name: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedValue = params.id;
    });
    this.adminStoreService.storeList(1, 1000, '', '', '').subscribe((result: any) => {
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
        formData.append('store_id', this.selectedValue);
        formData.append('contract_name', this.addForm.value.contract_name);
        formData.append('start_date', this.dateArray[0]);
        formData.append('end_date', this.dateArray[1]);
        this.adminContractService.uploadImg(formData).subscribe(res => {
          console.log('res结果是 ', res);
          this.isLoadingBtn = false;
          this.isSpinning = false;


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



  onChangeDate(event: any) {
    this.dateArray = [];
    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray.push(myFormattedDate1);
    console.log("event", this.dateArray);
  }
}