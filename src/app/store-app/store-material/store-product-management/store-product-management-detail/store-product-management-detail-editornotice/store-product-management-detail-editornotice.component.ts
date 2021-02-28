import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

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
  noticeList: any[] = []    //图片



  constructor(public storeProductService: StoreProductService, public activatedRoute: ActivatedRoute,
    private msg: NzMessageService, public dialog: MatDialog, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel = {
      step: 3,
      notice: ''
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
      this.detailUpdateModel.notice = newHtml;
    }
    // 配置菜单栏
    editorNotice.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      'list',
      'todo',
      'justify',
      'quote',
      'emoticon',
      'table',
      'splitLine',
      'undo',
      'redo',
    ]
    // InsertABCMenu
    // 注册菜单
    editorNotice.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorNotice.config.menus = editorNotice.config.menus.concat('insertABC')
    editorNotice.config.customFunction = (insert: any) => {
      const modal: NzModalRef = this.modal.create({
        nzTitle: '图片上传',
        nzViewContainerRef: this.viewContainerRef,
        nzContent: CommonModelComponent,
        nzWidth: 660,
        nzFooter: null
      })
      modal.afterClose.subscribe(result => {
        let res = result?.data || []
        res.forEach((item: any) => {
          insert(item.url)
        });
      });
    }
    editorNotice.create();

  }

  importImg() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '从图库导入资源',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: ChooseGalleryComponent,
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res || []
      result.forEach((item: any) => {
        this.noticeList.push(item)
        if (this.noticeList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        this.noticeBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });

  }




  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {

    })
  }
}

