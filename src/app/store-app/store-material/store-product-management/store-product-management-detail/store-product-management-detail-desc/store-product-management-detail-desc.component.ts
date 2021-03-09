import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { DeleteComfirmComponent } from '../../../common/delete-comfirm/delete-comfirm.component';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UploadVideoComponent } from '../../../common/upload-video/upload-video.component';

@Component({
  selector: 'app-store-product-management-detail-desc',
  templateUrl: './store-product-management-detail-desc.component.html',
  styleUrls: ['./store-product-management-detail-desc.component.css']
})
export class StoreProductManagementDetailDescComponent implements OnInit {
  @Input() dataDetailModel: any;
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  dataSourceVideo: any[] = [];

  imgList: any[] = [];
  importImgList: any[] = [];
  detailUpdateModel: any;  //更新
  detailId: any;  //更新

  checked = false;
  setOfCheckedId = new Set<number>();



  constructor(public dialog: MatDialog, public storeProductService: StoreProductService,
    public activatedRoute: ActivatedRoute, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel = {
      step: 4,
      album: []
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });
    console.log("更新", this.dataDetailModel?.album?.data)
    if (this.dataDetailModel?.album?.data[0].type === 2) {
      let i: any[] = [];
      i.push(this.dataDetailModel?.album?.data[0]);
      this.dataSourceVideo = i;
      let ii = this.dataDetailModel?.album?.data;
      ii.forEach((element: any) => {
        if (element.type != 2) {
          this.dataSource.push(element)
        }
      });
    }
    else if (this.dataDetailModel?.album?.data[0].type === 1) {
      this.dataSourceVideo = [];
      this.dataSource = this.dataDetailModel?.album?.data;
      this.dataSource.forEach((ele: any, index: any) => {
        console.log("22222", ele, index)
        ele.sort = index;
      });
    }

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
    console.log("this.dataSource1111111", this.dataSource);
    console.log("event.previousIndex", event.previousIndex);
    console.log("event.currentIndex", event.currentIndex);
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
      nzContent: ChooseGalleryComponent,
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      console.log('this.dataSourceVideo.length :>> ', this.dataSourceVideo.length);
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
      nzContent: CommonModelComponent,
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



  // 设为封面
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


  //视频 
  uploadVideo() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '视频上传',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: UploadVideoComponent,
      nzWidth: 660,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res?.data || []
      console.log("上传的结果", res, res?.data.length);
      result.forEach((ele: any) => {
        ele['sort'] = 0;
      });
      this.dataSourceVideo = result;
      console.log("视频的", this.dataSourceVideo)
    });

  }

  importVideo() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '从图库导入资源',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: ChooseGalleryComponent,
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res || [];
      result.forEach((ele: any) => {
        ele['sort'] = 0;
      });
      this.dataSourceVideo = result;
      console.log("视频的", this.dataSourceVideo)
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


  // 视频更新
  nextTabVideo() {
    this.detailUpdateModel.id = this.detailId;
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
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
      if (res === null) {
        this.storeProductService.getProductDetail(this.detailId).subscribe(res => {
          let i: any[] = [];
          i.push(this.dataDetailModel?.album?.data[0]);
          this.dataSourceVideo = [];
          this.dataSource = [];
          this.dataSourceVideo = i;
          let ii = this.dataDetailModel?.album?.data;
          ii.forEach((element: any) => {
            if (element.type != 2) {
              this.dataSource.push(element)
            }
          });
        })
      }
    })
  }


  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    console.log("更新的meodl", this.dataSource, this.detailUpdateModel.album);
    if (this.dataSourceVideo.length === 0) {
      this.detailUpdateModel.album = [];
      this.dataSource.forEach(element => {
        console.log("element", element);
        let a = { id: element.id, sort: element.sort }
        this.detailUpdateModel.album.push(a)
      });
      console.log("更新", this.detailUpdateModel);
      this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
        if (res === null) {
          this.storeProductService.getProductDetail(this.detailId).subscribe(res => {
            this.dataSource = [];
            this.dataSource = res.data.album.data;
            this.dataSource.forEach((ele: any, index: any) => {
              console.log("22222", ele, index)
              ele.sort = index;
            });
            this.dataSourceVideo = [];
          })
        }
      })
    }
    else if(this.dataSourceVideo.length != 0){
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
      this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
        if (res === null) {
          this.storeProductService.getProductDetail(this.detailId).subscribe(res => {
            let i: any[] = [];
            i.push(this.dataDetailModel?.album?.data[0]);
            this.dataSourceVideo = [];
            this.dataSource = [];
            this.dataSourceVideo = i;
            let ii = this.dataDetailModel?.album?.data;
            ii.forEach((element: any) => {
              if (element.type != 2) {
                this.dataSource.push(element)
              }
            });
          })
        }
      })
    }

  }
}

