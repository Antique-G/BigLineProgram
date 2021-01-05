import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';

@Component({
  selector: 'app-store-product-editornotice',
  templateUrl: './store-product-editornotice.component.html',
  styleUrls: ['./store-product-editornotice.component.css']
})
export class StoreProductEditornoticeComponent implements OnInit {
  @Output() tabIndex = new EventEmitter; 
  @Input() infoId: any;
  detailUpdateModel:any;



  constructor(public storeProductService: StoreProductService,) {
    this.detailUpdateModel={
      step:3,
      notice:''
    }
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.textChange();
  }

  textChange() {
    // 预约须知
    const editorNotice = new wangEditor("#editorNotice", "#noticeContent");
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
  this.detailUpdateModel.id=this.infoId;
  this.storeProductService.updateProduct( this.detailUpdateModel).subscribe(res=>{
    if (res === null) {
      this.tabIndex.emit({id:this.infoId,tabIndex:4})
    }

  })
}
}
