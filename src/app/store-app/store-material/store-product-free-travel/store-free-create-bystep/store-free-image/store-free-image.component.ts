import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ChooseGalleryComponent } from '../../../../../layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';

import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { DeleteComfirmComponent } from '../../../common/delete-comfirm/delete-comfirm.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-store-free-image',
  templateUrl: './store-free-image.component.html',
  styleUrls: ['./store-free-image.component.css']
})
export class StoreFreeImageComponent implements OnInit {
  @Input() dataDetailModel: any;
  dataSource: any[] = [];   //1.4将数据添加到dataSource

  imgList: any[] = [];
  importImgList: any[] = [];
  detailUpdateModel: any;  //更新


  checked = false;
  setOfCheckedId = new Set<number>();



  constructor(public dialog: MatDialog, private msg: NzMessageService, private modal: NzModalService,
    private freeTravelService: StoreProductTreeTravelService, public router: Router,
    private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel = {
      step: 4,
      albums: []
    }
  }

  ngOnInit(): void {
    console.log("更新", this.dataDetailModel?.albums?.data)
    this.dataSource = this.dataDetailModel?.albums?.data;
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


  import() {
    const modal:NzModalRef = this.modal.create({
      nzTitle:'从图库导入资源',
      nzViewContainerRef: this.viewContainerRef,
      nzContent:ChooseGalleryComponent,
      nzWidth:1105,
      nzFooter:null
    })
    modal.afterClose.subscribe(res =>{
      let result = res||[]
      let idx = this.dataSource?.length ? this.dataSource.length : 0;
      result.forEach((ele: any) => {
        ele['sort'] = idx;
        idx++
      });
      this.importImgList = result;
      console.log("this.dataSource", this.dataSource);
      this.dataSource = this.dataSource.concat(this.importImgList);
    });
    
  }

  upload() {
    const modal:NzModalRef = this.modal.create({
      nzTitle:'图片上传',
      nzViewContainerRef: this.viewContainerRef,
      nzContent:CommonModelComponent,
      nzWidth:660,
      nzFooter:null
    })
    modal.afterClose.subscribe(res =>{
      let result = res?.data||[]
      let idx = this.dataSource?.length ? this.dataSource.length : 0;
      result.forEach((ele: any) => {
        ele['sort'] = idx;
        idx++
      });
      this.imgList = result;
      console.log("this.imgList", this.imgList);
      console.log("this.dataSource", this.dataSource);
      this.dataSource = this.dataSource.concat(this.imgList);
    });

  }


  nextTab() {
    this.detailUpdateModel.id = this.dataDetailModel.id;
    console.log("更新的meodl", this.dataSource);
    this.detailUpdateModel.albums = [];
    this.dataSource.forEach(element => {
      console.log("element", element);
      let a = { id: element.id, sort: element.sort }
      this.detailUpdateModel.albums.push(a)
    });
    console.log("更新", this.detailUpdateModel);

    this.freeTravelService.UpdateFreeTravelInfo(this.detailUpdateModel).subscribe(res => {
      this.freeTravelService.GetFreeTravelDetail( this.dataDetailModel.id).subscribe((res: any) => {
        this.dataSource = res.data.albums.data;

      })
    })
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


}

