import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';


@Component({
  selector: 'app-store-free-detail-post',
  templateUrl: './store-free-detail-post.component.html',
  styleUrls: ['./store-free-detail-post.component.css']
})
export class StoreFreeDetailPostComponent implements OnInit {
  @Input() dataDetailModel: any;
  imgSrc: any;
  isShow = false;
  detailUpdateModel: any;  //更新
  detailId: any;  //更新



  constructor(public dialog: MatDialog, private freeTravelService:StoreProductTreeTravelService,
    public activatedRoute: ActivatedRoute, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel = {
      step: 5,
      poster_url: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('object :>> ', params);
      this.detailId = params["detailId"];
    });
    if(this.dataDetailModel.poster_url!=""){
      this.imgSrc=this.dataDetailModel.poster_url;
      this.isShow = true;
    }
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
    this.freeTravelService.UpdateFreeTravelInfo(this.detailUpdateModel).subscribe(res => {


    })

  }
}
