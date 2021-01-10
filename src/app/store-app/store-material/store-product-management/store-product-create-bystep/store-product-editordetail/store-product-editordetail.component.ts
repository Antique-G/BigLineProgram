import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { MatDialog } from '@angular/material/dialog';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-store-product-editordetail',
  templateUrl: './store-product-editordetail.component.html',
  styleUrls: ['./store-product-editordetail.component.css']
})
export class StoreProductEditordetailComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;
  @Input() addDataDetailModel: any;

  detailUpdateModel:any;
  @ViewChild("detailBox") detailBox: any;     //获取dom
  detailList: any[] = []    //图片


  constructor(public storeProductService: StoreProductService,  public dialog: MatDialog,private msg: NzMessageService,
    private modal: NzModalService,private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel={
      step:1,
      details:''
    }
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.textChange();
  }



  // 富文本
  textChange() {
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    if(this.addDataDetailModel?.details===undefined){
      this.detailBox.nativeElement.innerHTML = '';
    }
    else{
      this.detailBox.nativeElement.innerHTML = this.addDataDetailModel.details;    //赋值
    }
    this.detailUpdateModel.details = this.addDataDetailModel?.details;
    editorDetail.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.details= newHtml;
    }
    // InsertABCMenu
    // 注册菜单
    editorDetail.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorDetail.config.menus = editorDetail.config.menus.concat('insertABC')
    editorDetail.config.customFunction = (insert: any) => {
      const modal:NzModalRef = this.modal.create({
        nzTitle:'图片上传',
        nzViewContainerRef: this.viewContainerRef,
        nzContent:CommonModelComponent,
        nzWidth:660,
        nzFooter:null
      })
      modal.afterClose.subscribe(result =>{
        let res = result?.data||[]
        res.forEach((item: any) => {
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
    this.detailUpdateModel.id=this.addDataDetailModel.id;
    this.storeProductService.updateProduct( this.detailUpdateModel).subscribe(res=>{
      if (res === null) {
        this.tabIndex.emit({id:this.addDataDetailModel.id,tabIndex:2})
      }

    })
   }

}

