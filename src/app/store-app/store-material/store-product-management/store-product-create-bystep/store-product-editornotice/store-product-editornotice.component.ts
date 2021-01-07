import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-store-product-editornotice',
  templateUrl: './store-product-editornotice.component.html',
  styleUrls: ['./store-product-editornotice.component.css']
})
export class StoreProductEditornoticeComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;
  @Input() infoId: any;
  detailUpdateModel: any;
  @ViewChild("noticeBox") noticeBox: any;     //获取dom
  noticeList: any[] = []    //图片



  constructor(public storeProductService: StoreProductService, public dialog: MatDialog,
    private msg: NzMessageService,) {
    this.detailUpdateModel = {
      step: 3,
      notice: ''
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
      this.detailUpdateModel.notice = newHtml;
    }
    // InsertABCMenu
    // 注册菜单
    editorNotice.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorNotice.config.menus = editorNotice.config.menus.concat('insertABC')
    editorNotice.config.customFunction = (insert: any) => {
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
    editorNotice.create();


  }

  importImg() {
    const dialogRef = this.dialog.open(ChooseGalleryComponent, {
      width: '1105px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
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
    this.detailUpdateModel.id = this.infoId;
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
      if (res === null) {
        this.tabIndex.emit({ id: this.infoId, tabIndex: 4 })
      }

    })
  }
}
