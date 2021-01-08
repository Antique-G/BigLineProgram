import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductFreeTravelService } from '../../../../../../services/admin/admin-product-free-travel.service';
import { DeleteComfirmComponent } from '../../../../../../app/store-app/store-material/common/delete-comfirm/delete-comfirm.component';



@Component({
  selector: 'app-admin-choose-img',
  templateUrl: './admin-choose-img.component.html',
  styleUrls: ['./admin-choose-img.component.css']
})
export class AdminChooseImgComponent implements OnInit {
  @Input() dataFreeDetailModel: any;
  dataSource: any[] = [];   //1.4将数据添加到dataSource

  imgList: any[] = [];
  importImgList: any[] = [];
  detailUpdateModel: any;  //更新
  detailId: any;  //更新

  checked = false;
  setOfCheckedId = new Set<number>();



  constructor(public dialog: MatDialog,  public adminProductFreeTravelService: AdminProductFreeTravelService,
    public activatedRoute: ActivatedRoute, private modal: NzModalService) {
    this.detailUpdateModel = {
      step: 4,
      albums: []
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailId"]);
    });
    console.log("更新", this.dataFreeDetailModel?.albums?.data)
    this.dataSource = this.dataFreeDetailModel?.albums?.data;
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
    console.log("更新的meodl", this.dataSource);
    this.detailUpdateModel.albums = [];
    this.dataSource.forEach(element => {
      console.log("element", element);
      let a = { id: element.id, sort: element.sort }
      this.detailUpdateModel.albums.push(a)
    });
    console.log("更新", this.detailUpdateModel);

    this.adminProductFreeTravelService.freeTravelUpdate(this.detailUpdateModel).subscribe(res => {
      if (res === null) {
        this.adminProductFreeTravelService.freeTravelDetail(this.detailId).subscribe(res => {
          this.dataSource = res.data.albums.data;

        })
      }

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


