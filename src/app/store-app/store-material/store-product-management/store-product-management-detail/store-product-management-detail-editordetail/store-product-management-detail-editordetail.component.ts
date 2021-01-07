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
  selector: 'app-store-product-management-detail-editordetail',
  templateUrl: './store-product-management-detail-editordetail.component.html',
  styleUrls: ['./store-product-management-detail-editordetail.component.css']
})
export class StoreProductManagementDetailEditordetailComponent implements OnInit {
  detailUpdateModel: any;
  @Input() dataDetailModel: any;
  @ViewChild("detailBox") detailBox: any;     //获取dom
  detailList: any[] = []    //图片

  detailId: any;


  constructor(public storeProductService: StoreProductService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,private msg: NzMessageService,) {
    this.detailUpdateModel = {
      step: 1,
      details: ''
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
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    this.detailBox.nativeElement.innerHTML = this.dataDetailModel.details;    //赋值
    this.detailUpdateModel.details = this.dataDetailModel.details;
    editorDetail.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.details = newHtml;
    }
    // InsertABCMenu
    // 注册菜单
    editorDetail.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorDetail.config.menus = editorDetail.config.menus.concat('insertABC')
    editorDetail.config.customFunction = (insert: any) => {
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
    editorDetail.create();
   
  }


  importImg() {
    const dialogRef = this.dialog.open(ChooseGalleryComponent, {
      width: '1105px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      result.forEach((item: any) => {
        this.detailList.push(item)
        if (this.detailList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        this.detailBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });
  }



  nextTab() {
    this.detailUpdateModel.id =  this.detailId;
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => { 
    })
  }

}


