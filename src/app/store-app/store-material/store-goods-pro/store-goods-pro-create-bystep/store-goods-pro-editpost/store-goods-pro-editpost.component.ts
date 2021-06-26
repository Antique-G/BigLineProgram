import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { StoreGoodsService } from '../../../../../../services/store/store-goods/store-goods.service';
import { ChooseGoodsGalleryComponent } from '../../../common/choose-goods-gallery/choose-goods-gallery.component';
import { UploadGoodsImgComponent } from '../../../common/upload-goods-img/upload-goods-img.component';



@Component({
  selector: 'app-store-goods-pro-editpost',
  templateUrl: './store-goods-pro-editpost.component.html',
  styleUrls: ['./store-goods-pro-editpost.component.css']
})
export class StoreGoodsProEditpostComponent implements OnInit {
    @Input() addDataDetailModel: any;
    @Output() tabIndex = new EventEmitter;



    imgSrc: any;
    isShow = false;
    detailUpdateModel: any;  //更新
    detailId: any;  //更新

    isLoadingBtn = false;



    constructor(public dialog: MatDialog, private msg: NzMessageService, private modal: NzModalService,
         public router: Router, public storeGoodsService: StoreGoodsService,
        public activatedRoute: ActivatedRoute, private viewContainerRef: ViewContainerRef) {
        this.detailUpdateModel = {
            step: 4,
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
            if (res != undefined) {
                let result = res || []
                console.log('返回的结果是', result);
                this.imgSrc = result[0].url;
                this.isShow = true;
            }
        });
    }


    nextTab() {
        this.isLoadingBtn = true;
        this.detailUpdateModel.id = this.addDataDetailModel.id;
        this.detailUpdateModel.poster_url = this.imgSrc;
        console.log("更新", this.detailUpdateModel);
        this.storeGoodsService.updateGoods(this.detailUpdateModel).subscribe(res => {
            this.isLoadingBtn = false;
            this.router.navigate(['/store/main/storeGoods']);
        }
            ,
            error => {
                this.isLoadingBtn = false;
            })
    }


}