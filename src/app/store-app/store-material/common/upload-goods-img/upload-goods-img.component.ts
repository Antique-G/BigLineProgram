import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CommonServiceService } from '../../../../../services/store/common-service/common-service.service';
import { AgreeComponent } from '../common-model/agree/agree.component';


@Component({
    selector: 'app-upload-goods-img',
    templateUrl: './upload-goods-img.component.html',
    styleUrls: ['./upload-goods-img.component.css']
})
export class UploadGoodsImgComponent implements OnInit {
    addForm!: FormGroup;

    isSpinning: Boolean = false;

    fileList: NzUploadFile[] = [];
    imageList: NzUploadFile[] = [];
    result: any[] = [];
    agreeChecked: boolean = false;
    cate_id: any;

    constructor(private commonService: CommonServiceService, private msg: NzMessageService, private modalRef: NzModalRef,
        private modal: NzModalService, private viewContainerRef: ViewContainerRef, private sanitizer: DomSanitizer
    ) {
        this.buildForm();
    }


    ngOnInit(): void {
        this.cate_id = localStorage.getItem("isGoodsCateId");
    }


    // 表单初始化
    buildForm(): void {
        this.addForm = new FormGroup({
            agree: new FormControl('', [Validators.required]),
            desc: new FormControl(''),
        });

    }


    // 上传图片之前
    beforeUpload = (file: NzUploadFile): boolean => {
        console.log('object :>> ', file, file.size);
        let fileSize = file.size! / 1024 / 1024;
        if (fileSize > 10) {
            this.msg.error("图片大小必须10M以内,请重新上传图片!")
            return false
        }
        if (this.fileList.length <= 10) {
            let id: any = this.fileList.length;
            this.fileList = this.fileList.concat({
                uid: id,
                name: file.name,
            });
            this.imageList = this.imageList.concat(file);
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
            this.msg.error('请选择上传图片')
            return
        }
        if (this.addForm.valid) {
            this.isSpinning = true;
            let count = 0;
            let iArrLength = this.imageList.length;
            this.imageList.forEach((item: any, index) => {
                const formData = new FormData();
                formData.append('image', item);
                formData.append('desc', this.addForm.value.desc);
                formData.append('cate_id', this.cate_id);
                this.commonService.uploadGoodImg(formData).subscribe(res => {
                    if (res) {
                        this.result.push(res)
                        count++;
                        if (count == iArrLength) {
                            this.modalRef.destroy({ data: this.result });
                            this.modal.success({
                                nzMask: false,
                                nzTitle: `操作成功`,
                            })
                            this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
                            setTimeout(() => this.modal.closeAll(), 1000);  //1s后消失
                            this.isSpinning = false;

                        }
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
