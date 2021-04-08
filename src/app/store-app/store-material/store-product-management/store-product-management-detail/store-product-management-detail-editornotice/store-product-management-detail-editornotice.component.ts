import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import wangEditor from 'wangeditor';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { InsertABCMenu } from '../../../InsertABCMenu';

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
  isLoadingBtn = false;



  constructor(public storeProductService: StoreProductService, public activatedRoute: ActivatedRoute,
    private msg: NzMessageService, public dialog: MatDialog, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel = {
      step: 3,
      notice: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params?.detailDataId;
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
      'image'
    ];
    // 对粘贴的文本进行处理
    editorNotice.config.pasteFilterStyle = false;
    editorNotice.config.pasteTextHandle = function (pasteStr: any) {
      //  去除wps文档复制过来的style样式
      let str = pasteStr
      str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
      return str
    }
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
      nzComponentParams: {
        data: 1
      },
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res || []
      result.forEach((item: any) => {
        this.noticeList.push(item)
        // if (this.noticeList.length > 10) {
        //   this.msg.error('产品特色引用图片不能超过10张')
        //   return
        // }
        this.noticeBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });

  }




  nextTab() {
    this.isLoadingBtn = true;
    this.detailUpdateModel.id = this.detailId;
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
      this.isLoadingBtn = false;
    },
      error => {
        this.isLoadingBtn = false;
      })
  }
}

