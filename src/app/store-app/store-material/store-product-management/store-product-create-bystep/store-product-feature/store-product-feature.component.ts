import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import wangEditor from 'wangeditor';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { InsertABCMenu } from '../../../InsertABCMenu';


@Component({
  selector: 'app-store-product-feature',
  templateUrl: './store-product-feature.component.html',
  styleUrls: ['./store-product-feature.component.css']
})
export class StoreProductFeatureComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;
  @Input() addDataDetailModel: any;

  detailUpdateModel: any;
  @ViewChild("featureBox") featureBox: any;       //获取dom
  featureList: any[] = []    //图片
  regionData: any;
  isLoadingBtn = false;




  constructor(public storeProductService: StoreProductService, public dialog: MatDialog,
    private msg: NzMessageService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.detailUpdateModel = {
      step: 1,
      feature: ''
    }
    console.log('55555 ', this.addDataDetailModel, this.addDataDetailModel?.destination_city);

  }

  ngAfterViewInit(): void {
    this.textChange();
  }

  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    if (this.addDataDetailModel?.feature === undefined) {
      this.featureBox.nativeElement.innerHTML = '';
    }
    else {
      this.featureBox.nativeElement.innerHTML = this.addDataDetailModel.feature;    //赋值
    }
    this.detailUpdateModel.feature = this.addDataDetailModel?.feature;
    editorFeature.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.feature = newHtml;
    }
    // 配置菜单栏
    editorFeature.config.menus = [
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
    editorFeature.config.pasteFilterStyle = false;
    editorFeature.config.pasteTextHandle = function (pasteStr: any) {
      //  去除wps文档复制过来的style样式
      let str = pasteStr
      str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
      return str
    }
    // InsertABCMenu
    // 注册菜单
    editorFeature.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorFeature.config.menus = editorFeature.config.menus.concat('insertABC')
    editorFeature.config.customFunction = (insert: any) => {
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
    editorFeature.create();

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
        //   this.msg.error('产品特色引用图片不能超过10张')
        //   return
        // }
        this.featureBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });

  }


  nextTab() {
    this.isLoadingBtn = true;
    this.detailUpdateModel.id = this.addDataDetailModel.id;
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
      this.isLoadingBtn = false;
      if (res === null) {
        this.tabIndex.emit({ id: this.addDataDetailModel.id, tabIndex: 2 })
      }

    },
      error => {
        this.isLoadingBtn = false;
      })
  }

}