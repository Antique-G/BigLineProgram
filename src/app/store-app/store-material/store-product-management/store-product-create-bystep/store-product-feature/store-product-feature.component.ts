import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';


@Component({
  selector: 'app-store-product-feature',
  templateUrl: './store-product-feature.component.html',
  styleUrls: ['./store-product-feature.component.css']
})
export class StoreProductFeatureComponent implements OnInit {
  @Output() tabIndex = new EventEmitter; 
  @Input() infoId: any;
  detailUpdateModel:any;



  constructor(public storeProductService: StoreProductService,) { }

  ngOnInit(): void {
    this.detailUpdateModel={
      step:2,
      feature:''
    }
  }

  ngAfterViewInit(): void {
    this.textChange();
  }

  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
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
  this.detailUpdateModel.id=this.infoId;
  this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res=>{
    if (res === null) {
      this.tabIndex.emit({id:this.infoId,tabIndex:3})
    }

  })
}

}