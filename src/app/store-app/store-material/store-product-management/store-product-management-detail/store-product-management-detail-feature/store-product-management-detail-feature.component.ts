import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-store-product-management-detail-feature',
  templateUrl: './store-product-management-detail-feature.component.html',
  styleUrls: ['./store-product-management-detail-feature.component.css']
})
export class StoreProductManagementDetailFeatureComponent implements OnInit {
  detailUpdateModel: any;

  @Input() dataDetailModel: any;
  @ViewChild("featureBox") featureBox: any;       //获取dom
  featureList: any[] = []    //图片

  detailId: any;


  constructor(public storeProductService: StoreProductService, public activatedRoute: ActivatedRoute,
    private msg: NzMessageService, public dialog: MatDialog,) {
    this.detailUpdateModel = {
      step: 2,
      feature: ''
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
      this.detailUpdateModel.feature = newHtml;
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
          insert(item.url)
        });
      });
    }
    editorFeature.create();

  }


  importImg() {
    const dialogRef = this.dialog.open(ChooseGalleryComponent, {
      width: '1105px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      result.forEach((item: any) => {
        this.featureList.push(item)
        if (this.featureList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        this.featureBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });
  }



  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {

    })
  }

}