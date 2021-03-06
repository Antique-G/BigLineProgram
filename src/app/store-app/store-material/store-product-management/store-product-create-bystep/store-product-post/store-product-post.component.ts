import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-store-product-post',
  templateUrl: './store-product-post.component.html',
  styleUrls: ['./store-product-post.component.css']
})
export class StoreProductPostComponent implements OnInit {
  @Input() addDataDetailModel: any;
  @Output() tabIndex = new EventEmitter;


  imgSrc: any;
  isShow = false;
  detailUpdateModel: any;  //更新



  constructor(public dialog: MatDialog, public storeProductService: StoreProductService, public router: Router,
    public activatedRoute: ActivatedRoute, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel = {
      step: 5,
      poster_url: ''
    }
  }

  ngOnInit(): void {
    if (this.addDataDetailModel.poster_url != "") {
      this.imgSrc = this.addDataDetailModel.poster_url;
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
      nzContent: ChooseGalleryComponent,
      nzComponentParams: {
        data: 1
      },
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      if (res != undefined) {
        let result = res || []
        console.log('返回的结果是', result);
        this.imgSrc = result[0].url;
        this.isShow = true;
      }


    });
  }


  nextTab() {
    this.detailUpdateModel.id = this.addDataDetailModel.id;
    this.detailUpdateModel.poster_url = this.imgSrc;
    console.log("更新", this.detailUpdateModel);
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
      // this.router.navigate(['/store/main/storeProduct'],);
      this.tabIndex.emit({ id: this.addDataDetailModel.id, tabIndex: 6 })

    })

  }


}
