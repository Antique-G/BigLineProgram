import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddBlockRequestModel } from '../../../../../interfaces/adminWeChat/admin-admin-model';
import { AdminWechatPageconfigService } from '../../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { AdminWechatPageblockProlistComponent } from './admin-wechat-pageblock-prolist/admin-wechat-pageblock-prolist.component';
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
  isSrc: any;
  isTitle: any;

  constructor(public activatedRoute: ActivatedRoute, public fb: FormBuilder, public dialog: MatDialog, public router: Router,
    public adminWechatPageconfigService: AdminWechatPageconfigService, public msg: NzMessageService, private message: NzMessageService) {
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
      productList: this.fb.array([]),
      imageList: this.fb.array([]),
      iconList: this.fb.array([])
    });
  }


  addProControl() {
    let control = <FormArray>this.addForm.controls['productList'];
    control.push(new FormGroup({
      product_id: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    }));
  }



  addImgControl() {
    let control = <FormArray>this.addForm.controls['imageList'];
    control.push(new FormGroup({
      title: new FormControl(''),
      img: new FormControl('', Validators.required),
      url: new FormControl(''),
      imgTitle: new FormControl('')
    }));
  }


  addIconControl() {
    let control = <FormArray>this.addForm.controls['iconList'];
    control.push(new FormGroup({
      name: new FormControl(''),
      icon: new FormControl('', Validators.required),
      url: new FormControl(''),
      iconTitle: new FormControl('')
    }));
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

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page_id = params.pageId;
      console.log("111", this.page_id);
    });
    this.adminWechatPageconfigService.typeList().subscribe(result => {
      this.typeList = result.data;
      this.isSpinning = false;
    });
  }



  setValue() {
    this.addBlockRequestModel.page_id = this.page_id;
    this.addBlockRequestModel.block_name = this.addForm.value.name;
    this.addBlockRequestModel.block_key = this.addForm.value.key;
    this.addBlockRequestModel.status = this.addForm.value.status;
    this.addBlockRequestModel.type = this.isTypeId;
    if (this.isTypeId === 1) {
      this.addBlockRequestModel.content = this.addForm.value.productList;
    }
    else if (this.isTypeId === 2) {
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
    console.log("this.addForm.valid", this.addForm)
    if (this.addForm.valid) {
      console.log("提交的model是什么", this.addBlockRequestModel);
      this.adminWechatPageconfigService.addPageBlock(this.addBlockRequestModel).subscribe(res => {
        console.log("res", res);
        if (res?.code) {
          console.log("res", res);
        }
        else {
          this.router.navigate(['/admin/main/pageBlock'], { queryParams: { pageId: this.page_id } });
        }
      })
    }
    else {
      if (this.addForm.controls.productList.valid === false) {
        this.message.create('error', '请选择产品内容');
      }
      else if (this.addForm.controls.imageList.valid === false) {
        this.message.create('error', '请上传图片');
      }
      else if (this.addForm.controls.iconList.valid === false) {
        this.message.create('error', '请上传图标');
      }
    }

  }


  changeType(event: any) {
    console.log("event", event);
    this.isTypeId = event;
    if (this.isTypeId === 1) {
      this.addPro();
      this?.addForm?.controls['productList'].setValidators(Validators.required);
      this?.addForm?.controls['productList'].updateValueAndValidity();
      this?.addForm?.controls['imageList'].setValidators(null);
      this?.addForm?.controls['imageList'].updateValueAndValidity();
      this?.addForm?.controls['iconList'].setValidators(null);
      this?.addForm?.controls['iconList'].updateValueAndValidity();
    }
    else if (this.isTypeId === 2) {
      // alert(1);
      this.addImgControl()
      this?.addForm?.controls['imageList'].setValidators(Validators.required);
      this?.addForm?.controls['imageList'].updateValueAndValidity();
      this?.addForm?.controls['iconList'].setValidators(null);
      this?.addForm?.controls['iconList'].updateValueAndValidity();
    }
    else if (this.isTypeId === 3) {
      // alert(2);
      this.addIconControl();
      this?.addForm?.controls['iconList'].setValidators(Validators.required);
      this?.addForm?.controls['iconList'].updateValueAndValidity();
      this?.addForm?.controls['imageList'].setValidators(null);
      this?.addForm?.controls['imageList'].updateValueAndValidity();
    }
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
        console.log(" this.imgageArray", this.imgageArray);
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
    this.router.navigate(['/admin/main/pageBlock'], { queryParams: { pageId: this.page_id } });
  }
}
