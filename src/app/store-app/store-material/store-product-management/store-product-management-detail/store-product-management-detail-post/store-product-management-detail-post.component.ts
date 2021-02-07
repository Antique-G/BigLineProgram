import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-store-product-management-detail-post',
  templateUrl: './store-product-management-detail-post.component.html',
  styleUrls: ['./store-product-management-detail-post.component.css']
})
export class StoreProductManagementDetailPostComponent implements OnInit {
  @Input() dataDetailModel: any;
  imgSrc: any;
  isShow = false;
  detailUpdateModel: any;  //更新
  detailId: any;  //更新



  constructor(public dialog: MatDialog, public storeProductService: StoreProductService,
    public activatedRoute: ActivatedRoute, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel = {
      step: 5,
      poster_url: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });
  }


  upload() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '图片上传',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: CommonModelComponent,
      nzWidth: 660,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res?.data || []
      console.log('返回的结果是', result);
      this.imgSrc = result[0].url+'?x-oss-process=image/resize,w_450,m_lfit';
      this.isShow = true;
    });


  }

  import() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '从图库导入资源',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: ChooseGalleryComponent,
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res || []
      console.log('返回的结果是', result);
      this.imgSrc = result[0].url+'?x-oss-process=image/resize,w_450,m_lfit';
      this.isShow = true;
    });
  }


  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.detailUpdateModel.poster_url = this.imgSrc;
    console.log("更新", this.detailUpdateModel);
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {


    })

  }
}
