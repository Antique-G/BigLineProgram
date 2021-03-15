import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import wangEditor from 'wangeditor';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { ChooseGalleryComponent } from '../../../../../layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { InsertABCMenu } from '../../../InsertABCMenu';


@Component({
  selector: 'app-store-travel-detail-notice',
  templateUrl: './store-travel-detail-notice.component.html',
  styleUrls: ['./store-travel-detail-notice.component.css']
})
export class StoreTravelDetailNoticeComponent implements OnInit {

  @Input() dataDetailModel: any;
  dataModel: any
  featureList: any[] = []
  reqModel = {
    id: 0,
    step: 3,
    notice: '',
  }
  @ViewChild("noticeBox") noticeBox: any;       //获取dom
  constructor(public dialog: MatDialog, private msg: NzMessageService,
    private freeTravelService: StoreProductTreeTravelService, public router: Router,
    private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataDetailModel'] && changes['dataDetailModel'].currentValue) {
      this.dataModel = changes['dataDetailModel'].currentValue
      console.log('dataDetailModel', this.dataModel);
      this.reqModel.id = this.dataModel.id
    }
    // this.textChange();
  }
  ngAfterViewInit() {
    this.textChange();
  }
  updateInfo() {
    console.log('请求值', this.reqModel);
    this.freeTravelService.UpdateFreeTravelInfo(this.reqModel).subscribe(res => {
      if (res.message == "更新成功") {
        // this.router.navigate(['/store/main/storeFreeTravel']);
      }
    })
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

        this.featureList.push(item)
        // if (this.featureList.length > 10) {
        //   this.msg.error('产品详情引用图片不能超过10张')
        //   return
        // }
        this.noticeBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });

  }

  // 富文本
  textChange() {
    const editorDetail = new wangEditor("#editorNotice", "#editorNoticeContent");
    // 产品详情
    if (this.dataModel != undefined) {
      this.noticeBox.nativeElement.innerHTML = this.dataModel.notice
      this.reqModel.notice = this.dataModel.notice
    }
    editorDetail.config.onchange = (newHtml: any) => {
      this.reqModel.notice = newHtml;
    }
    // 配置菜单栏
    editorDetail.config.menus = [
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
    editorDetail.config.pasteFilterStyle = false;
    editorDetail.config.pasteTextHandle = function (pasteStr: any) {
      //  去除wps文档复制过来的style样式
      let str = pasteStr
      str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
      return str
    }
    // InsertABCMenu
    // 注册菜单
    editorDetail.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorDetail.config.menus = editorDetail.config.menus.concat('insertABC')
    editorDetail.config.customFunction = (insert: any) => {
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
    editorDetail.create();




  }

}
