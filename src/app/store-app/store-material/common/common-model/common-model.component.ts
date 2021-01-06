import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import { NzUploadFile,NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CommonServiceService } from '../../../../../services/store/common-service/common-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  isSpinning:Boolean = false
  uploading = false;
  fileList: NzUploadFile[] = [
   
  ];
  reqData:any
  previewImage: string | undefined = '';
  previewVisible = false;
  result:any[] = []

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<any>,private storeRegionService:StoreRegionService,
    private commonService:CommonServiceService,private msg: NzMessageService
  ) { 

    }


  ngOnInit(): void {
    this.buildForm();
  }


  // 表单初始化
  buildForm(): void {
    this.addForm = new FormGroup({
      region_code: new FormControl('',[Validators.required]),
      desc: new FormControl(''),
      // few_days: new FormControl('', [Validators.required]),
    });
    this.getRegionList()
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
    console.log(123);
    if(this.fileList.length <=10){
      this.fileList = this.fileList.concat(file);
    }
    return false
  };
  

getExtraData = (file: NzUploadFile) => {
  return {
    region_code: this.region_code[this.region_code.length-1],
    desc: this.addForm.value.desc
  };
};
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
    console.log(this.fileList);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if(this.fileList.length ===0 ){
      this.msg.error('请选择上传图片')
      return
    }
    if (this.addForm.valid) {
      this.isSpinning =true
      this.fileList.forEach((item:any,index)=>{
        const formData = new FormData();
        formData.append('image', item);
        formData.append('desc', this.addForm.value.desc);
        formData.append('region_code', this.region_code[this.region_code.length-1]);
        this.commonService.uploadImg(formData).subscribe(res=>{
          if(index === this.fileList.length-1){
            this.isSpinning = false
            this.dialogRef.close(this.result);
          }
          this.result.push(res.url)
        })
      })
    }
   
  }
  close(){
    if(this.result.length != this.fileList.length){
      this.msg.error('图片还在上传,请稍等片刻')
      return;
    }
    this.dialogRef.close(this.result);
  }
}
