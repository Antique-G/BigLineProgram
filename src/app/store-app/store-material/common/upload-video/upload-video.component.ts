import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreRegionService } from '../../../../../services/store/store-region/store-region.service';
import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CommonServiceService } from '../../../../../services/store/common-service/common-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { AgreeComponent } from '../common-model/agree/agree.component';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {
  addForm!: FormGroup;
  nzOptions: any[] | null = null;
  region_code: any
  count: number = 0
  isSpinning: Boolean = true
  uploading = false;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];
  imgUrl: any
  reqData: any
  previewImage: string | undefined = '';
  previewVisible = false;
  result: any[] = []
  agreeChecked: boolean = false
  region_codes: any
  // fileType="video/quicktime,video/x-mpeg2,video/x-msvideo,.mp4"
  accept="video/quicktime,video/x-mpeg2,video/x-msvideo,.mp4"


  constructor(private storeRegionService: StoreRegionService,
    private commonService: CommonServiceService, private msg: NzMessageService, private modalRef: NzModalRef,
    private modal: NzModalService, private viewContainerRef: ViewContainerRef, private sanitizer: DomSanitizer
  ) {
    this.buildForm();
  }


  ngOnInit(): void {
    this.region_code = localStorage.getItem("regionData")?.split(',');
    this.region_codes = this.region_code
    console.log('object :>> ', this.region_codes);
    this.getRegionList()
  }


  // 表单初始化
  buildForm(): void {
    this.addForm = new FormGroup({
      region_code: new FormControl('', [Validators.required]),
      agree: new FormControl('', [Validators.required]),
      desc: new FormControl(''),
    });

  }

  // 区域
  getRegionList() {
    this.storeRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      this.isSpinning = false;
      this.region_code = localStorage.getItem("regionData")?.split(',');
    })
  }


  // 上传图片之前
  beforeUpload = (file: NzUploadFile): boolean => {
    console.log('file, file.size ', file, file.size);
    let fileSize = file.size! / 1024 / 1024;
    if (fileSize > 50) {
      this.msg.error("视频文件过大，请重新上传！")
      return false
    }
    console.log('this.fileList ', this.fileList);
    if (this.fileList.length <= 2) {
      let id: any = this.fileList.length
      this.fileList = this.fileList.concat({
        uid: id,
        name: file.name,
      });
      this.imageList = this.imageList.concat(file);
    }

    return false
  };


  onDestChange(values: any): void {
    if (values !== null) {
      this.region_codes = values[values.length - 1];
    }
  }



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
      this.msg.error('请选择上传视频')
      return
    }
    if (this.addForm.valid) {
      this.isSpinning = true
      this.imageList.forEach((item: any, index) => {
        const formData = new FormData();
        formData.append('video', item);
        formData.append('desc', this.addForm.value.desc);
        formData.append('region_code', this.region_code[this.region_code.length - 1]);
        this.commonService.uploadVideo(formData).subscribe(res => {
          this.result.push(res)
          this.fileList[index].status = 'done';
          if (index === this.imageList.length - 1) {
            this.modalRef.destroy({ data: this.result });
            this.modal.success({
              nzMask: false,
              nzTitle: `操作成功`,
            })
            this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
            setTimeout(() => this.modal.closeAll(), 1000);  //1s后消失
            this.isSpinning = false;

          }
        }, err => {
          this.fileList[index].status = 'done';
        })
      })
    }

  }

  showConfirm(): void {
    this.modal.create({
      nzWidth: 600,
      nzContent: AgreeComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null
    })
   
  }



}
