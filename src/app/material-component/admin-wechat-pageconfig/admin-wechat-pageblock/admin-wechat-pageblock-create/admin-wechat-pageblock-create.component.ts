import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  fileList: any[] = [];
  iconList: any[] = [];

  addBlockRequestModel: AddBlockRequestModel;

  constructor(public activatedRoute: ActivatedRoute, public fb: FormBuilder,
    public adminWechatPageconfigService: AdminWechatPageconfigService,) {
    this.forms();
    this.addBlockRequestModel={
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
      imageList: this.fb.group({
        title:[''],
        imgUrl:[''],
      }),
      sortList: this.fb.group({
        name:[''],
        sortUrl:[''],
      }),
    });
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
    this.addBlockRequestModel.page_id =  this.page_id ;
    this.addBlockRequestModel.block_name = this.addForm.value.name;
    this.addBlockRequestModel.block_key = this.addForm.value.key;
    this.addBlockRequestModel.status = this.addForm.value.status;
    this.addBlockRequestModel.type=this.isTypeId;
    // TODO
    // if(this.addBlockRequestModel.type===2){
    //   this.addBlockRequestModel.content=[{title:this.addForm.controls['imageList'].}];
    // }
    this.addBlockRequestModel.content=[{title:'',img:'',url:''}]
  }



  add() { 
    this.setValue();
    console.log("提交的model是什么", this.addBlockRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("this.addForm.valid", this.addForm)
    if (this.addForm.valid) {
      this.adminWechatPageconfigService.addPageBlock(this.addBlockRequestModel).subscribe(res=>{

      })
    }
  }



  changeType(event: any) {
    console.log("event", event);
    this.isTypeId = event;
  }



  

}
