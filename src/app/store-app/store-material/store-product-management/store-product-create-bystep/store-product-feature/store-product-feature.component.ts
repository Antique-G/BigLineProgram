import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { MatDialog } from '@angular/material/dialog';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';


@Component({
  selector: 'app-store-product-feature',
  templateUrl: './store-product-feature.component.html',
  styleUrls: ['./store-product-feature.component.css']
})
export class StoreProductFeatureComponent implements OnInit {
  @Output() tabIndex = new EventEmitter; 
  @Input() infoId: any;
  detailUpdateModel:any;



  constructor(public storeProductService: StoreProductService, public dialog: MatDialog,) { }

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
    // InsertABCMenu
    // 注册菜单
    editorFeature.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorFeature.config.menus = editorFeature.config.menus.concat('insertABC')
    editorFeature.config.customFunction = (insert: any) => {
      const dialogRef = this.dialog.open(CommonModelComponent, {
        width: '660px',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("result", result);
        let str = ''
        result.forEach((item: any) => {
          insert(item)
        });
      });
    }
    editorFeature.create();

}


importImg(){
  const dialogRef = this.dialog.open(ChooseGalleryComponent, {
    width: '1105px'
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log("result", result);
  });
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