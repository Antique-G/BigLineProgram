import { HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddBlockRequestModel } from '../../../../../interfaces/adminWeChat/admin-admin-model';
import { AdminWechatPageconfigService } from '../../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { AdminWechatPageblockUploadComponent } from './admin-wechat-pageblock-upload/admin-wechat-pageblock-upload.component';

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

  addBlockRequestModel: AddBlockRequestModel;

  constructor(public activatedRoute: ActivatedRoute, public fb: FormBuilder, public dialog: MatDialog,public router: Router,
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
      imageList: this.fb.array([
        new FormGroup({
          title: new FormControl(null),
          img: new FormControl(null),
          url: new FormControl(null),
        })
      ]),
      iconList: this.fb.array([
        new FormGroup({
          name: new FormControl(null),
          icon: new FormControl(null),
          url: new FormControl(null),
        })
      ]),
    });
  }


  // 图片
  get imgageArray() {
    return this.addForm.get("imageList") as FormArray;
  }

  //添加
  addMore() {
    this.imgageArray.push(this.fb.group({
      title: null,
      img: null,
      url: null,
    }))

  }
  //删除
  remove(index: number) {
    if (this.imgageArray.length > 1) {
      this.imgageArray.removeAt(index);
    }
  }


  // 图标
  get iconArray() {
    return this.addForm.get("iconList") as FormArray;
  }

  //添加
  addIcon() {
    this.iconArray.push(this.fb.group({
      name: null,
      icon: null,
      url: null,
    }))

  }
  //删除
  removeIcon(index: number) {
    if (this.iconArray.length > 1) {
      this.iconArray.removeAt(index);
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
    if (this.isTypeId === 2) {
      this.addBlockRequestModel.content = this.addForm.value.imageList;
    }
    else if (this.isTypeId === 3) {
      this.addBlockRequestModel.content = this.addForm.value.iconList;
    }

  }


  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      console.log("提交的model是什么", this.addBlockRequestModel);
      this.adminWechatPageconfigService.addPageBlock(this.addBlockRequestModel).subscribe(res=>{
        console.log("res",res);
        if(res?.code){
          console.log("res",res);
        }
        else{
          this.router.navigate(['/admin/main/pageBlock'], { queryParams: { pageId:this.page_id} });
        }
      })
    }


  }


  changeType(event: any) {
    console.log("event", event);
    this.isTypeId = event;
  }



  choiceImg(i: any) {
    console.log("i是什么", i)
    const dialogRef = this.dialog.open(AdminWechatPageblockUploadComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.imgageArray.controls[i].patchValue({ 'img': result.url });
        console.log(" this.imgageArray", this.imgageArray)
      }

    });
  }



  choiceIcon(i: any) {
    console.log("i是什么", i)
    const dialogRef = this.dialog.open(AdminWechatPageblockUploadComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.iconArray.controls[i].patchValue({ 'icon': result.url });
        console.log(" this.iconArray", this.iconArray)
      }

    });
  }


  return(){
    this.router.navigate(['/admin/main/pageBlock'], { queryParams: { pageId:this.page_id} });
  }
}
