import { Component, OnInit,  Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-store-product-management-detail-feature',
  templateUrl: './store-product-management-detail-feature.component.html',
  styleUrls: ['./store-product-management-detail-feature.component.css']
})
export class StoreProductManagementDetailFeatureComponent implements OnInit {
  detailUpdateModel:any;

  @Input() dataDetailModel: any;
  @ViewChild("featureBox") featureBox: any;       //获取dom
  detailId: any;


  constructor(public storeProductService: StoreProductService, public activatedRoute: ActivatedRoute,) { 
    this.detailUpdateModel={
      step:2,
      feature:''
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

  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    this.featureBox.nativeElement.innerHTML = this.dataDetailModel?.feature;    //赋值
    this.detailUpdateModel.feature = this.dataDetailModel.feature;
    editorFeature.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.feature= newHtml;
    }
    editorFeature.create();
    // 上传图片
    editorFeature.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorFeature.config.customUploadImg = (files: any, insert: any) => {
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
  this.detailUpdateModel.id= this.detailId ;
  this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res=>{

  })
}

}