import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-product-management-detail-editornotice',
  templateUrl: './store-product-management-detail-editornotice.component.html',
  styleUrls: ['./store-product-management-detail-editornotice.component.css']
})
export class StoreProductManagementDetailEditornoticeComponent implements OnInit {
  detailUpdateModel: any;
  @Input() dataDetailModel: any;
  detailId: any;
  @ViewChild("noticeBox") noticeBox: any;     //获取dom



  constructor(public storeProductService: StoreProductService,public activatedRoute: ActivatedRoute,) {
    this.detailUpdateModel={
      step:3,
      notice:''
    }
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });

  }

  ngAfterViewInit(): void {
    this.textChange();
  }

  textChange() {
    // 预约须知
    const editorNotice = new wangEditor("#editorNotice", "#noticeContent");
    this.noticeBox.nativeElement.innerHTML = this.dataDetailModel.notice;    //赋值
    this.detailUpdateModel.notice = this.dataDetailModel.notice;

    editorNotice.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.notice= newHtml;
    }
    editorNotice.create();
    // 上传图片
    editorNotice.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorNotice.config.customUploadImg = (files: any, insert: any) => {
      // 限制一次最多上传 1 张图片
      if (files.length !== 1) {
        alert('单次只能上传一个图片')
        return
      }
      console.log("files是什么", files);
      console.log(files[0]);
      let formData = new FormData();
      formData.append('image', files[0] as any);
      console.log("formData是什么", formData.get('file'));
      this.storeProductService.uploadImg(formData).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }

  }


  
nextTab(){
  this.detailUpdateModel.id=this.detailId;
  this.storeProductService.updateProduct( this.detailUpdateModel).subscribe(res=>{

  })
}
}

