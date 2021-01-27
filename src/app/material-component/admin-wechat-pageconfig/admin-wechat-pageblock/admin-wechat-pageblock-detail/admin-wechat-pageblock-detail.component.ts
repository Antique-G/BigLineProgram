import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddBlockRequestModel, BlockDetailModel, UpdateBlockRequestModel } from '../../../../../interfaces/adminWeChat/admin-admin-model';
import { AdminWechatPageconfigService } from '../../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { AdminWechatPageblockProlistComponent } from '../admin-wechat-pageblock-create/admin-wechat-pageblock-prolist/admin-wechat-pageblock-prolist.component';
import { AdminWechatPageblockUploadComponent } from '../admin-wechat-pageblock-create/admin-wechat-pageblock-upload/admin-wechat-pageblock-upload.component';


@Component({
  selector: 'app-admin-wechat-pageblock-detail',
  templateUrl: './admin-wechat-pageblock-detail.component.html',
  styleUrls: ['./admin-wechat-pageblock-detail.component.css']
})
export class AdminWechatPageblockDetailComponent implements OnInit {
  public isSpinning: any = true;    //loading 
  addForm!: FormGroup;

  typeList: any[] = []; //类型
  isTypeId: any;
  selectedType: any;

  status = '1';
  isStatus: any;
  blockId: any;

  blockDetailModel!: any;
  updateBlockRequestModel: UpdateBlockRequestModel;
  editModel: any;

  constructor(public activatedRoute: ActivatedRoute, public fb: FormBuilder, public dialog: MatDialog, public router: Router,
    public adminWechatPageconfigService: AdminWechatPageconfigService, public msg: NzMessageService, private message: NzMessageService) {
    this.forms();
    this.updateBlockRequestModel = {
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
      productList: this.fb.array([]),
      imageList: this.fb.array([]),
      iconList: this.fb.array([
      ]),
    });
  }


  ngOnInit(): void {
    this.adminWechatPageconfigService.typeList().subscribe(result => {
      this.typeList = result.data;
      this.activatedRoute.queryParams.subscribe(params => {
        this.blockId = params.blockId;
        this.adminWechatPageconfigService.pageBlockDetail(this.blockId).subscribe(res => {
          this.blockDetailModel = res.data;
          console.log("详情的结果是", this.blockDetailModel);
          this.getValue();
          this.isSpinning = false;
        })
      });
    })
  }



  // 初始化赋值
  getValue() {
    this.addForm.patchValue({
      name: this.blockDetailModel.block_name,
      key: this.blockDetailModel.block_key,
      status: this.blockDetailModel.status,
      type: this.blockDetailModel.type
    })
    this.isStatus = this.blockDetailModel.status;
    this.selectedType = this.blockDetailModel.type;
    this.isTypeId = this.blockDetailModel.type;
    if (this.isTypeId === 1) {
      const proArray = this.blockDetailModel.content;
      for (let i of proArray) {
        (this.addForm.controls['productList'] as FormArray).push(new FormGroup({
          product_id: new FormControl(i.product_id),
          type: new FormControl(i.type)
        }));
      }
    }
    else if (this.isTypeId === 2) {
      const imgArray = this.blockDetailModel.content;
      for (let i of imgArray) {
        (this.addForm.controls['imageList'] as FormArray).push(new FormGroup({
          title: new FormControl(i.title),
          img: new FormControl(i.img),
          url: new FormControl(i.url)
        }));
      }
    }
    else if (this.isTypeId === 3) {
      const iconArray = this.blockDetailModel.content;
      for (let i of iconArray) {
        (this.addForm.controls['iconList'] as FormArray).push(new FormGroup({
          name: new FormControl(i.name),
          icon: new FormControl(i.icon),
          url: new FormControl(i.url)
        }));
      }
    }

  }




  setValue() {
    this.updateBlockRequestModel.page_id = this.blockDetailModel.page_id;
    this.updateBlockRequestModel.block_name = this.addForm.value.name;
    this.updateBlockRequestModel.block_key = this.addForm.value.key;
    this.updateBlockRequestModel.status = this.addForm.value.status;
    this.updateBlockRequestModel.type = this.isTypeId;
    if (this.isTypeId === 1) {
      this.updateBlockRequestModel.content = this.addForm.value.productList;
    }
    else if (this.isTypeId === 2) {
      this.updateBlockRequestModel.content = this.addForm.value.imageList;
    }
    else if (this.isTypeId === 3) {
      this.updateBlockRequestModel.content = this.addForm.value.iconList;
    }

  }


  update() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("提交的valid", this.addForm)
    if (this.addForm.valid) {
      console.log("提交的model是什么", this.updateBlockRequestModel);
      this.updateBlockRequestModel.block_id = this.blockDetailModel.block_id;
      this.adminWechatPageconfigService.updatePageBlock(this.updateBlockRequestModel).subscribe(res => {
        console.log("res", res);
        if (res?.code) {
          console.log("res", res);
        }
        else {
          this.router.navigate(['/admin/main/pageBlock'], { queryParams: { pageId: this.blockDetailModel.page_id } });
        }
      })
    }
    else {
      if (this.addForm.controls.productList.valid === false) {
        this.message.create('error', '请选择产品内容');
      }
      else  if (this.addForm.controls.imageList.valid === false) {
        this.message.create('error', '请上传图片');
      }
      else if (this.addForm.controls.iconList.valid === false) {
        this.message.create('error', '请上传图标');
      }
    }

  }


  // 产品
  get productArray() {
    return this.addForm.get("productList") as FormArray;
  }

  // 添加
  addPro() {
    this.productArray.push(this.fb.group({
      product_id: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    }))

  }


  removePro(index: number) {
    if (this.productArray.length > 1) {
      this.productArray.removeAt(index);
    }
    else {
      this.message.create('warning', '无法删除，至少存在一组');
    }
  }


  // 图片
  get imgageArray() {
    return this.addForm.get("imageList") as FormArray;
  }

  //添加
  addMore() {
    this.imgageArray.push(this.fb.group({
      title: new FormControl(''),
      img: new FormControl('', Validators.required),
      url: new FormControl(''),
      imgTitle: new FormControl('')
    }))

  }
  //删除
  remove(index: number) {
    if (this.imgageArray.length > 1) {
      this.imgageArray.removeAt(index);
    }
    else {
      this.message.create('warning', '无法删除，至少存在一组');
    }
  }


  // 图标
  get iconArray() {
    return this.addForm.get("iconList") as FormArray;
  }

  //添加
  addIcon() {
    this.iconArray.push(this.fb.group({
      name: new FormControl(''),
      icon: new FormControl('', Validators.required),
      url: new FormControl(''),
      iconTitle: new FormControl('')
    }))

  }
  //删除
  removeIcon(index: number) {
    if (this.iconArray.length > 1) {
      this.iconArray.removeAt(index);
    }
    else {
      this.message.create('warning', '无法删除，至少存在一组');
    }
  }


  changeType(event: any) {
    console.log("event", event);
    this.isTypeId = event;
  }


  choicePro(i: any) {
    const dialogRef = this.dialog.open(AdminWechatPageblockProlistComponent, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.productArray.controls[i].patchValue({ 'product_id': result.id });
        console.log(" this.productArray", this.productArray);
      }

    });
  }



  choiceImg(i: any) {
    console.log("i是什么", i)
    const dialogRef = this.dialog.open(AdminWechatPageblockUploadComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.imgageArray.controls[i].patchValue({ 'img': result.url, 'imgTitle': result.title });
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
        this.iconArray.controls[i].patchValue({ 'icon': result.url, 'iconTitle': result.title });
        console.log(" this.iconArray", this.iconArray)
      }

    });
  }


  return() {
    this.router.navigate(['/admin/main/pageBlock'], { queryParams: { pageId: this.blockDetailModel.page_id } });
  }
}