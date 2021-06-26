import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { StoreGoodsService } from '../../../../../../services/store/store-goods/store-goods.service';
import { ChooseGoodsGalleryComponent } from '../../../common/choose-goods-gallery/choose-goods-gallery.component';
import { UploadGoodsImgComponent } from '../../../common/upload-goods-img/upload-goods-img.component';


@Component({
  selector: 'app-store-goods-pro-detai-post',
  templateUrl: './store-goods-pro-detai-post.component.html',
  styleUrls: ['./store-goods-pro-detai-post.component.css']
})
export class StoreGoodsProDetaiPostComponent implements OnInit {
    @Input() addDataDetailModel: any;
    imgSrc: any;
    isShow = false;
    detailUpdateModel: any;  //更新
    detailId: any;  //更新
  
  
  
    constructor(public dialog: MatDialog, public storeGoodsService: StoreGoodsService,
      public activatedRoute: ActivatedRoute, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
      this.detailUpdateModel = {
        step: 4,
        poster_url: ''
      }
    }
  
    ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log('object :>> ', params);
        this.detailId = params["detailId"];
      });
      if (this.addDataDetailModel.poster_url != "") {
        this.imgSrc = this.addDataDetailModel.poster_url;
        this.isShow = true;
      }
    }
  
  
    upload() {
      const modal: NzModalRef = this.modal.create({
        nzTitle: '图片上传',
        nzViewContainerRef: this.viewContainerRef,
        nzContent: UploadGoodsImgComponent,
        nzWidth: 660,
        nzFooter: null
      })
      modal.afterClose.subscribe(res => {
        if (res != undefined) {
          let result = res?.data || []
          console.log('返回的结果是', result);
          this.imgSrc = result[0].url;
          this.isShow = true;
        }
       
  
      });
  
  
    }
  
    import() {
      const modal: NzModalRef = this.modal.create({
        nzTitle: '从图库导入资源',
        nzViewContainerRef: this.viewContainerRef,
        nzContent: ChooseGoodsGalleryComponent,
        nzComponentParams: {
          data: 1
        },
        nzWidth: 1105,
        nzFooter: null
      })
      modal.afterClose.subscribe(res => {
        console.log('res :>> ', res);
        if (res != undefined) {
          let result = res || []
          console.log('返回的结果是', result);
          this.imgSrc = result[0].url;
          this.isShow = true;
        }
      });
    }
  
  
    nextTab() {
      this.detailUpdateModel.id = this.detailId;
      this.detailUpdateModel.poster_url = this.imgSrc;
      console.log("更新", this.detailUpdateModel);
      this.storeGoodsService.updateGoods(this.detailUpdateModel).subscribe(res => {
  
  
      })
  
    }
  }
  