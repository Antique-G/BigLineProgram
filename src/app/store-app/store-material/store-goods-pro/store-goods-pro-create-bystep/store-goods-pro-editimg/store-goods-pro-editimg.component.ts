import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { StoreGoodsService } from '../../../../../../services/store/store-goods/store-goods.service';
import { ChooseGoodsGalleryComponent } from '../../../common/choose-goods-gallery/choose-goods-gallery.component';
import { DeleteComfirmComponent } from '../../../common/delete-comfirm/delete-comfirm.component';
import { UploadGoodsImgComponent } from '../../../common/upload-goods-img/upload-goods-img.component';
import { UploadGoodsVideoComponent } from '../../../common/upload-goods-video/upload-goods-video.component';



@Component({
    selector: 'app-store-goods-pro-editimg',
    templateUrl: './store-goods-pro-editimg.component.html',
    styleUrls: ['./store-goods-pro-editimg.component.css']
})
export class StoreGoodsProEditimgComponent implements OnInit {
    @Input() addDataDetailModel: any;
    @Output() tabIndex = new EventEmitter;

    dataSource: any[] = [];   //1.4将数据添加到dataSource
    dataSourceVideo: any[] = [];


    imgList: any[] = [];
    importImgList: any[] = [];
    detailUpdateModel: any;  //更新


    checked = false;
    setOfCheckedId = new Set<number>();



    constructor(public dialog: MatDialog, private msg: NzMessageService, private modal: NzModalService,
        public storeGoodsService: StoreGoodsService, public router: Router,
        private viewContainerRef: ViewContainerRef) {
        this.detailUpdateModel = {
            step: 3,
            album: []
        }
    }

    ngOnInit(): void {
        console.log("更新", this.addDataDetailModel?.album)

        let arr: any[] = [];
        let arr1: any[] = [];
        this.addDataDetailModel?.album?.forEach((element: any, value: any) => {
            this.dataSourceVideo = [];
            this.dataSource = [];
            if (element.type ==1) {
                arr1.push(element)
            }
            else if (element.type ==0) {
                arr.push(element)
            }
        });
        this.dataSourceVideo = arr1;
        this.dataSource = arr;

    }


    onItemChecked(id: number, checked: boolean): void {
        this.updateCheckedSet(id, checked);
    }

    onAllChecked(checked: boolean): void {
        this.dataSource.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));

    }

    updateCheckedSet(id: number, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
    }


    // 拖拽
    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
        console.log("this.dataSource1111111", this.dataSource)
        console.log("event.previousIndex", event.previousIndex)
        console.log("event.currentIndex", event.currentIndex)
        if (this.dataSourceVideo.length === 0) {
            this.dataSource.forEach((ele: any, index: any) => {
                console.log("22222", ele, index)
                ele.sort = index;
            });
        }
        else {
            this.dataSource.forEach((ele: any, index: any) => {
                console.log("22222", ele, index)
                ele.sort = index + 1;
            });
        }
        console.log("排序后", this.dataSource);
    }



    import() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: '从图库导入资源',
            nzViewContainerRef: this.viewContainerRef,
            nzContent: ChooseGoodsGalleryComponent,
            nzComponentParams: {
                data: '0'
            },
            nzWidth: 1105,
            nzFooter: null
        })
        modal.afterClose.subscribe(res => {
            if (this.dataSourceVideo.length === 0) {
                let result = res || []
                let idx = this.dataSource?.length ? this.dataSource.length : 0;
                result.forEach((ele: any) => {
                    ele['sort'] = idx;
                    idx++
                });
                this.importImgList = result;
                console.log("this.dataSource", this.dataSource);
                this.dataSource = this.dataSource.concat(this.importImgList);
            }
            else {
                let result = res || []
                let idx = this.dataSource?.length ? this.dataSource.length + 1 : 1;
                result.forEach((ele: any) => {
                    ele['sort'] = idx;
                    idx++
                });
                this.importImgList = result;
                console.log("this.dataSource", this.dataSource);
                this.dataSource = this.dataSource.concat(this.importImgList);
            }
        });

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
            if (this.dataSourceVideo.length === 0) {
                let result = res?.data || []
                console.log(res);
                let idx = this.dataSource?.length ? this.dataSource.length : 0;
                result.forEach((ele: any) => {
                    ele['sort'] = idx;
                    idx++
                });
                this.imgList = result;
                console.log("this.imgList", this.imgList);
                console.log("this.dataSource", this.dataSource);
                this.dataSource = this.dataSource.concat(this.imgList);
            }
            else {
                let result = res?.data || []
                console.log(res);
                let idx = this.dataSource?.length ? this.dataSource.length + 1 : 1;
                result.forEach((ele: any) => {
                    ele['sort'] = idx;
                    idx++
                });
                this.imgList = result;
                console.log("this.imgList", this.imgList);
                console.log("this.dataSource", this.dataSource);
                this.dataSource = this.dataSource.concat(this.imgList);
            }
        });

    }


    nextTab() {
        this.detailUpdateModel.id = this.addDataDetailModel.id;
        console.log("更新的meodl", this.dataSource, this.detailUpdateModel.album);
        if (this.dataSourceVideo.length === 0) {
            this.detailUpdateModel.album = [];
            this.dataSource.forEach(element => {
                console.log("element", element);
                let a = { id: element.id, sort: element.sort }
                this.detailUpdateModel.album.push(a)
            });
            console.log("更新", this.detailUpdateModel);
            this.storeGoodsService.updateGoods(this.detailUpdateModel).subscribe(res => {
                if (res === null) {
                    this.storeGoodsService.getGoodsDetail(this.addDataDetailModel.id).subscribe((res: any) => {
                        let arr: any[] = [];
                        let arr1: any[] = [];
                        res?.data.album?.forEach((element: any, value: any) => {
                            this.dataSourceVideo = [];
                            this.dataSource = [];
                            if (element.type ==1) {
                                arr1.push(element)
                            }
                            else if (element.type ==0) {
                                arr.push(element)
                            }
                        });
                        this.dataSourceVideo = arr1;
                        this.dataSource = arr;
                        this.tabIndex.emit({ id: this.detailUpdateModel.id, tabIndex: 4 })
                    })
                }
                this.tabIndex.emit({ id: this.detailUpdateModel.id, tabIndex: 4 })
            })
        }
        else if (this.dataSourceVideo.length != 0) {
            let arr: any[] = [];
            let arr1: any[] = [];
            this.detailUpdateModel.album = [];
            this.dataSourceVideo.forEach(element => {
                console.log("element", element);
                let a = { id: element.id, sort: element.sort, type: 2 }
                arr.push(a)
            });
            this.dataSource.forEach(element => {
                console.log("element", element);
                let a = { id: element.id, sort: element.sort }
                arr1.push(a);
            });
            this.detailUpdateModel.album = arr.concat(arr1);
            this.storeGoodsService.updateGoods(this.detailUpdateModel).subscribe(res => {
                if (res === null) {
                    this.storeGoodsService.getGoodsDetail(this.addDataDetailModel.id).subscribe((res: any) => {
                        let arr: any[] = [];
                        let arr1: any[] = [];
                        res?.data.album?.forEach((element: any, value: any) => {
                            this.dataSourceVideo = [];
                            this.dataSource = [];
                            if (element.type ==1) {
                                arr1.push(element)
                            }
                            else if (element.type ==0) {
                                arr.push(element)
                            }
                        });
                        this.dataSourceVideo = arr1;
                        this.dataSource = arr;
                        this.tabIndex.emit({ id: this.detailUpdateModel.id, tabIndex: 4 })
                    })

                }
                this.tabIndex.emit({ id: this.detailUpdateModel.id, tabIndex: 4 })
            })
        }
    }


    // 删除
    deleteIt(id: any) {
        console.log("nadao", id);
        const dialogRef = this.dialog.open(DeleteComfirmComponent, {
            width: '550px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log("result", result);
            if (result !== undefined) {
                console.log("nadao", id);
                this.dataSource = this.dataSource.filter(d => d.id !== id);
            }
        });
    }

    // 批量删除
    allDelete() {
        console.log("setOfCheckedId", this.setOfCheckedId)
        console.log("1212", [...this.setOfCheckedId])
        let newArr = [...this.setOfCheckedId];
        for (let i of newArr) {
            console.log("3333", i)
            this.dataSource = this.dataSource.filter(d => d.id !== i);
        }

    }

    top(data: any) {
        this.modal.confirm({
            nzTitle: '<h4>提示</h4>',
            nzContent: '<h6>请确认操作</h6>',
            nzOnOk: () => {
                let clickSort = data.sort;
                console.log("第1条数据", this.dataSource[0]);
                this.dataSource[0].sort = clickSort;
                console.log("点击的那条数据的sort", clickSort);
                data.sort = 0;
                this.nextTab()
            }

        });
    }



    // 视频更新
    nextTabVideo() {
        this.detailUpdateModel.id = this.addDataDetailModel.id;
        let arr: any[] = [];
        let arr1: any[] = [];
        this.detailUpdateModel.album = [];
        this.dataSourceVideo.forEach(element => {
            console.log("element", element);
            let a = { id: element.id, sort: element.sort }
            arr.push(a)
        });
        this.dataSource.forEach(element => {
            console.log("element", element);
            let a = { id: element.id, sort: element.sort }
            arr1.push(a);
        });
        this.detailUpdateModel.album = arr.concat(arr1);
        console.log('this.detailUpdateModel提交的', this.detailUpdateModel);
        this.storeGoodsService.updateGoods(this.detailUpdateModel).subscribe(res => {
            if (res === null) {
                this.storeGoodsService.getGoodsDetail(this.addDataDetailModel.id).subscribe((res: any) => {
                    let arr: any[] = [];
                    let arr1: any[] = [];
                    res?.data.album?.forEach((element: any, value: any) => {
                        this.dataSourceVideo = [];
                        this.dataSource = [];
                        if (element.type ==1) {
                            arr1.push(element)
                        }
                        else if (element.type ==0) {
                            arr.push(element)
                        }
                    });
                    this.dataSourceVideo = arr1;
                    this.dataSource = arr;
                })
            }
        })
    }


    // //视频 
    uploadVideo() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: '视频上传',
            nzViewContainerRef: this.viewContainerRef,
            nzContent: UploadGoodsVideoComponent,
            nzWidth: 660,
            nzFooter: null
        })
        modal.afterClose.subscribe(res => {
            let result = res?.data || []
            if (result.length === 0) {
                console.log("视频的", this.dataSourceVideo)
            }
            else {
                this.dataSourceVideo = []
                result.forEach((ele: any) => {
                    ele['sort'] = 0;
                });
                this.dataSourceVideo = result;
                console.log("视频的", this.dataSourceVideo)
            }
        });

    }

    importVideo() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: '从视频库导入资源',
            nzViewContainerRef: this.viewContainerRef,
            nzContent: ChooseGoodsGalleryComponent,
            nzComponentParams: {
                data: 1
            },
            nzWidth: 1105,
            nzFooter: null
        })
        modal.afterClose.subscribe(res => {
            let result = res || [];
            if (result.length === 0) {
                console.log("视频的", this.dataSourceVideo)
            }
            else {
                this.dataSourceVideo = []
                result.forEach((ele: any) => {
                    ele['sort'] = 0;
                });
                this.dataSourceVideo = result;
                console.log("视频的", this.dataSourceVideo)
            }
        });

    }


    deleteItVideo(id: any) {
        console.log("nadao", id);
        const dialogRef = this.dialog.open(DeleteComfirmComponent, {
            width: '550px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log("result", result);
            if (result !== undefined) {
                console.log("nadao", id);
                this.dataSourceVideo = this.dataSourceVideo.filter(d => d.id !== id);
            }
        });
    }


}


