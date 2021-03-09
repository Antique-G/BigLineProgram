import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DeleteComfirmComponent } from '../../../../../../app/store-app/store-material/common/delete-comfirm/delete-comfirm.component';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';

@Component({
  selector: 'app-admin-product-management-img',
  templateUrl: './admin-product-management-img.component.html',
  styleUrls: ['./admin-product-management-img.component.css']
})
export class AdminProductManagementImgComponent implements OnInit {
  @Input() adminProductDetailModel: any;
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  dataSourceVideo: any[] = [];


  imgList: any[] = [];
  importImgList: any[] = [];
  detailUpdateModel: any;  //更新
  detailId: any;  //更新

  checked = false;
  setOfCheckedId = new Set<number>();



  constructor(public dialog: MatDialog, public adminProductManagementService: AdminProductManagementService,
    public activatedRoute: ActivatedRoute, private modal: NzModalService) {
    this.detailUpdateModel = {
      step: 4,
      album: []
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });
    console.log("更新", this.adminProductDetailModel?.albums?.data)
    if (this.adminProductDetailModel?.albums?.data[0].type === 2) {
      let i: any[] = [];
      i.push(this.adminProductDetailModel?.albums?.data[0]);
      this.dataSourceVideo = i;
      let ii = this.adminProductDetailModel?.albums?.data;
      ii.forEach((element: any) => {
        if (element.type != 2) {
          this.dataSource.push(element)
        }
      });
    }
    else if (this.adminProductDetailModel?.albums?.data[0].type === 1) {
      this.dataSourceVideo = [];
      this.dataSource = this.adminProductDetailModel?.albums?.data;
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


  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    console.log("更新的meodl", this.dataSource, this.detailUpdateModel.album);
    if (this.dataSourceVideo.length === 0) {
      this.detailUpdateModel.album = [];
      this.dataSource.forEach(element => {
        console.log("element", element);
        let a = { id: element.id, sort: element.sort }
        this.detailUpdateModel.albums.push(a)
      });
      console.log("更新", this.detailUpdateModel);
      this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
        if (res === null) {
          this.adminProductManagementService.productDetail(this.detailId).subscribe((res:any) => {
            this.dataSource = [];
            this.dataSource = res.data.albums.data;
            this.dataSource.forEach((ele: any, index: any) => {
              console.log("22222", ele, index)
              ele.sort = index;
            });
            this.dataSourceVideo = [];
          })
        }
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
      this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
        if (res === null) {
          this.adminProductManagementService.productDetail(this.detailId).subscribe((res:any) => {
            let i: any[] = [];
            i.push(res.data?.albums?.data[0]);
            this.dataSourceVideo = [];
            this.dataSource = [];
            this.dataSourceVideo = i;
            let ii = res.data?.albums?.data;
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
    console.log("更新的meodl", this.dataSource, this.detailUpdateModel.album);
    if (this.dataSourceVideo.length === 0) {
      this.detailUpdateModel.album = [];
      this.dataSource.forEach(element => {
        console.log("element", element);
        let a = { id: element.id, sort: element.sort }
        this.detailUpdateModel.albums.push(a)
      });
      console.log("更新", this.detailUpdateModel);
      this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
        if (res === null) {
          this.adminProductManagementService.productDetail(this.detailId).subscribe((res:any) => {
            this.dataSource = [];
            this.dataSource = res.data.albums.data;
            this.dataSource.forEach((ele: any, index: any) => {
              console.log("22222", ele, index)
              ele.sort = index;
            });
            this.dataSourceVideo = [];
          })
        }
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
      this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
        if (res === null) {
          this.adminProductManagementService.productDetail(this.detailId).subscribe((res:any) => {
            let i: any[] = [];
            i.push(res.data?.albums?.data[0]);
            this.dataSourceVideo = [];
            this.dataSource = [];
            this.dataSourceVideo = i;
            let ii = res.data?.albums?.data;
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


