import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';


@Component({
  selector: 'app-store-product-editordetail',
  templateUrl: './store-product-editordetail.component.html',
  styleUrls: ['./store-product-editordetail.component.css']
})
export class StoreProductEditordetailComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;
  @Input() infoId: any;
  detailUpdateModel:any;


  constructor(public storeProductService: StoreProductService,) {
    this.detailUpdateModel={
      step:1,
      details:''
    }
   }

  ngOnInit(): void {
    console.log("infoid是什么",this.infoId)
  }

  ngAfterViewInit(): void {
    this.textChange();
  }



  // 富文本
  textChange() {
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    editorDetail.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.details= newHtml;
    }
    editorDetail.create();
    // 上传图片
    editorDetail.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorDetail.config.customUploadImg = (files: any, insert: any) => {
      // 限制一次最多上传 1 张图片
      if (files.length !== 1) {
        alert('单次只能上传一个图片')
        return
      }
      console.log("files是什么", files);

      console.log(files[0]);
      let formDataDetail = new FormData();
      formDataDetail.append('image', files[0] as any);
      console.log("formData是什么", formDataDetail.get('file'));
      this.storeProductService.uploadImg(formDataDetail).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }
  }



  nextTab() {
    this.detailUpdateModel.id=this.infoId;
    this.storeProductService.updateProduct( this.detailUpdateModel).subscribe(res=>{
      if (res === null) {
        this.tabIndex.emit({id:this.infoId,tabIndex:2})
      }

    })
   }

}

