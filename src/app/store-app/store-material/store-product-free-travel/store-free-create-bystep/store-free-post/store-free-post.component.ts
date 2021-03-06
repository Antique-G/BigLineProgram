import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
    selector: 'app-store-free-post',
    templateUrl: './store-free-post.component.html',
    styleUrls: ['./store-free-post.component.css']
})
export class StoreFreePostComponent implements OnInit {
    @Input() dataDetailModel: any;
    @Output() tabIndex = new EventEmitter;



    imgSrc: any;
    isShow = false;
    detailUpdateModel: any;  //更新
    detailId: any;  //更新

    isLoadingBtn = false;



    constructor(public dialog: MatDialog, private msg: NzMessageService, private modal: NzModalService,
        private freeTravelService: StoreProductTreeTravelService, public router: Router,
        public activatedRoute: ActivatedRoute, private viewContainerRef: ViewContainerRef) {
        this.detailUpdateModel = {
            step: 5,
            poster_url: ''
        }
    }

    ngOnInit(): void {
        if (this.dataDetailModel.poster_url != "") {
            this.imgSrc = this.dataDetailModel.poster_url;
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
        this.isLoadingBtn = true;
        this.detailUpdateModel.id = this.dataDetailModel.id;
        this.detailUpdateModel.poster_url = this.imgSrc;
        console.log("更新", this.detailUpdateModel);
        this.freeTravelService.UpdateFreeTravelInfo(this.detailUpdateModel).subscribe(res => {
            this.isLoadingBtn = false;
            this.tabIndex.emit({ id: this.detailUpdateModel.id, tabIndex: 6 })
        }
            ,
            error => {
                this.isLoadingBtn = false;
            })
    }


}