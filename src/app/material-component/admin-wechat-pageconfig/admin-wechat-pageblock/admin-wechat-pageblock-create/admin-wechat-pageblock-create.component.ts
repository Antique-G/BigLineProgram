import { HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AddBlockRequestModel } from '../../../../../interfaces/adminWeChat/admin-admin-model';
import { AdminWechatPageconfigService } from '../../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';

@Component({
  selector: 'app-admin-wechat-pageblock-create',
  templateUrl: './admin-wechat-pageblock-create.component.html',
  styleUrls: ['./admin-wechat-pageblock-create.component.css']
})
export class AdminWechatPageblockCreateComponent implements OnInit {
  public isSpinning: any = true;    //loading 
  addForm!: FormGroup;

  typeList: any[] = []; //类型
  isTypeId: any;

  status = '1';
  page_id: any;

  // 上传图片
  iconList: any[] = [];
  result: any[] = [];

  firmwareFileList: NzUploadFile[] = [];   // 上传文件列表


  addBlockRequestModel: AddBlockRequestModel;

  constructor(public activatedRoute: ActivatedRoute, public fb: FormBuilder,
    public adminWechatPageconfigService: AdminWechatPageconfigService, public msg: NzMessageService,) {
    this.forms();
    this.addBlockRequestModel = {
      page_id: '',
      block_name: '',
      block_key: '',
      type: 0,
      status: 1,
      content: []
    }
  }


  forms() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: [1],
      imageList: new FormArray([
        new FormControl(null, [Validators.required]),
      ]),
      sortList: this.fb.group({
        name: [''],
        sortUrl: [''],
      }),
    });
  }


  get imgageArray() {
    return this.addForm.get("imageList") as FormArray;
  }

  //添加
  addMore() {
    this.imgageArray.push(new FormControl(null));
  }
  //删除
  remove(index: number) {
    if (this.imgageArray.length > 1) {
      this.imgageArray.removeAt(index);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page_id = params.pageId;
      console.log("111", this.page_id);
    });
    this.adminWechatPageconfigService.typeList().subscribe(result => {
      this.typeList = result.data;
      this.isSpinning = false;
    })
  }



  setValue() {
    this.addBlockRequestModel.page_id = this.page_id;
    this.addBlockRequestModel.block_name = this.addForm.value.name;
    this.addBlockRequestModel.block_key = this.addForm.value.key;
    this.addBlockRequestModel.status = this.addForm.value.status;
    this.addBlockRequestModel.type = this.isTypeId;
    this.addBlockRequestModel.content = [{ title: '', img: '', url: '' }]
  }


  changeType(event: any) {
    console.log("event", event);
    this.isTypeId = event;
  }




  add() {
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.isSpinning = true;
    }



  }


  // 上传
  beforeUpload = (file: NzUploadFile): any => {
    this.firmwareFileList = this.firmwareFileList.concat(file);
  }

  firmwareFileCustomRequest = (file: any) => {
    console.log("file是什么", file)
    const fd = new FormData();
    fd.append("image", file.file as any);
    fd.append('title', '');
    console.log('dddddd', fd);
    this.adminWechatPageconfigService.uploadImg(fd).subscribe((event: HttpEvent<{}>) => {
      (event as any).percent = 100;  // 进度条的值直接设置为100
      console.log("event", event);
      file.onProgress!(event, file.file!);  // 进度事件回调

    },
      err => {
        file.onError!(err, file.file!);
      }
    );
  }


  removeImg = (file: NzUploadFile) => {
    console.log(this.firmwareFileList);

    let index = this.firmwareFileList.indexOf(file)
    if (index > -1) {
      this.firmwareFileList.splice(index, 1);
    }
    console.log(this.firmwareFileList);
    return true
  }


}
