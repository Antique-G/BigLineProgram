import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AdminContractService } from '../../../../../services/admin/admin-contract.service';


@Component({
  selector: 'app-admin-store-certifi-contracr',
  templateUrl: './admin-store-certifi-contracr.component.html',
  styleUrls: ['./admin-store-certifi-contracr.component.css']
})
export class AdminStoreCertifiContracrComponent implements OnInit {
  page = 1;
  per_page = 10;
  contract_name: any;
  total = 1;
  loading = true;
  dataSource: any;
  store_id: any;
  detailModel: any;


  addForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];
  isLoadingBtn = false;
  accept = "pdf";  //image/png, image/jpeg,
  start_date = null;
  dateArray: any[] = [];


  constructor(public dialog: MatDialog, public adminContractService: AdminContractService,
    private msg: NzMessageService,) {
    this.addForm = new FormGroup({
      contract_name: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("certification")!);
    this.store_id = this.detailModel?.store_id;
    this.getStoreContract();
  }

  getStoreContract() {
    this.adminContractService.getContract(this.page, this.per_page, this.contract_name, this.store_id).subscribe(res => {
      console.log("结果是", res)
      this.total = res.total;
      this.loading = false;
      res?.data.forEach((element: any) => {
        element['isStatus'] = '';
        element.isStatus =  this.nowInDateBetwen(element.start_date, element.end_date, element.isStatus);
        console.log('element.isStatus :>> ', element.isStatus);
      });
      this.dataSource = res?.data;
    })
  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getStoreContract();
  }


  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getStoreContract();
  }


  // 判断时间是否为有效期内
  nowInDateBetwen(d1: any, d2: any, isData: any) {
    let dateBegin = new Date(d1);//将-转化为/，使用new Date
    let dateEnd = new Date(d2);//将-转化为/，使用new Date
    let dateNow = new Date();//获取当前时间

    let beginDiff = dateNow.getTime() - dateBegin.getTime();//时间差的毫秒数       
    let beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000));//计算出相差天数

    let endDiff = dateEnd.getTime() - dateNow.getTime();//时间差的毫秒数
    let endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000));//计算出相差天数       
    console.log('1111', endDayDiff, beginDayDiff);
    if (endDayDiff > 0) {
      isData = '正常';
      return isData
    }
    else if (beginDayDiff > 0) {
      isData = '过期';
      return isData
    }
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
    const isLt5M = file.size! / 1024 / 1024 < 10;
    if (!isLt5M) {
      this.msg.error('请上传 ≤ 10MB 以内的文件!');
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

  onChangeDate(event: any) {
    this.dateArray = [];
    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
    this.dateArray.push(myFormattedDate);
    const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
    this.dateArray.push(myFormattedDate1);
    console.log("event", this.dateArray);
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
      this.isLoadingBtn = true;
      this.imageList.forEach((item: any, index) => {
        const formData = new FormData();
        formData.append('file', item);
        formData.append('store_id', this.store_id);
        formData.append('contract_name', this.addForm.value.contract_name);
        formData.append('start_date', this.dateArray[0]);
        formData.append('end_date', this.dateArray[1]);
        this.adminContractService.uploadImg(formData).subscribe(res => {
          console.log('res结果是 ', res);
          this.isLoadingBtn = false;
          this.getStoreContract();
        },
          err => {
            this.isLoadingBtn = false;

          })
      })
    }

  }

}
