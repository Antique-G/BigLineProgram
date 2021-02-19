import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import { NzUploadFile,NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CommonServiceService } from '../../../../../services/store/common-service/common-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AgreeComponent } from './agree/agree.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-common-model',
  templateUrl: './common-model.component.html',
  styleUrls: ['./common-model.component.css']
})

export class CommonModelComponent implements OnInit {
  addForm!: FormGroup;
  nzOptions: any[] | null = null;
  region_code: any[] = [];//出发城市
  count:number = 0
  isSpinning:Boolean = true
  uploading = false;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];
  imgUrl:any
  reqData:any
  previewImage: string | undefined = '';
  previewVisible = false;
  result:any[] = []
  agreeChecked:boolean = false

  constructor(private storeRegionService:StoreRegionService,
    private commonService:CommonServiceService,private msg: NzMessageService,private modalRef: NzModalRef,
    private modal:NzModalService,private viewContainerRef:ViewContainerRef,private sanitizer:DomSanitizer
  ) { 
    this.buildForm();
    }


  ngOnInit(): void {
    this.getRegionList()
  }


  // 表单初始化
  buildForm(): void {
    this.addForm = new FormGroup({
      region_code: new FormControl('',[Validators.required]),
      agree: new FormControl('',[Validators.required]),
      desc: new FormControl(''),
      // few_days: new FormControl('', [Validators.required]),
    });
  
  }

  // 区域
  getRegionList() {
    this.storeRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      this.isSpinning = false
    })
  }

  // 上传图片之前
  beforeUpload = (file: NzUploadFile): boolean => {
    // let url = window.URL.createObjectURL(file)
    // this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(url)
    // console.log(this.imgUrl,url);
    if(this.fileList.length <=10){
      let id:any = this.fileList.length
      // this.fileList = this.fileList.concat(file);
      this.fileList = this.fileList.concat({
        uid: id,
        name: file.name,
        // status: 'uploading',
      });
      this.imageList = this.imageList.concat(file);
    }
  
    return false
  };
  

  uploadCustomRequest= (file: any) => {
    const fd = new FormData();
    fd.append("file", file.file as any);
    console.log(123,'uploadCustomRequest');
  }

getExtraData = (file: NzUploadFile) => {
  return {
    region_code: this.region_code[this.region_code.length-1],
    desc: this.addForm.value.desc
  };
};


removeImg =  (file: NzUploadFile) => {
  console.log('this.imageList上传前',this.imageList);
  console.log('fileList',file);
  this.imageList = this.imageList.filter(d => d.name !==file.name);
  console.log('删除后',this.imageList);
  return true
}


getExtraHeader = ()=>{
  return {
    Authorization: 'Bearer '+(localStorage.getItem('userToken')!),
  }
}
handleChange(info:NzUploadChangeParam){
  const {file,type} = info
  if (type === 'success'){
    this.result.push(file.response.url)
  }
  console.log(info);
}

  add(){
    console.log(this.imageList);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if(this.imageList.length ===0 ){
      this.msg.error('请选择上传图片')
      return
    }
    if (this.addForm.valid) {
      this.isSpinning =true
      this.imageList.forEach((item:any,index)=>{
        const formData = new FormData();
        formData.append('image', item);
        formData.append('desc', this.addForm.value.desc);
        formData.append('region_code', this.region_code[this.region_code.length-1]);
        this.commonService.uploadImg(formData).subscribe(res=>{
          this.result.push(res)
          this.fileList[index].status= 'done';
          if(index === this.imageList.length-1){
            this.isSpinning = false
            this.modalRef.destroy({ data: this.result});
            this.modal.success({
              nzMask: false,
              nzTitle: `操作成功`,
            })
            this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
            setTimeout(() => this.modal.closeAll(), 1000);  //1s后消失

          }
        },err=>{
          this.fileList[index].status= 'done';
        })
      })
    }
   
  }

  showConfirm(): void {
    this.modal.create({
      nzWidth:600,
      nzContent:AgreeComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter:null
    })
    // const dialogRef = this.dialog.open(AgreeComponent, {
    //   width: '600px',
    //   disableClose: true
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // this.agreeChecked = result
    //   // 
    // });
    
  }



}
