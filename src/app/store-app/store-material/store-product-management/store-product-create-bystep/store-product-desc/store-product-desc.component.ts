import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { DeleteComfirmComponent } from '../../../common/delete-comfirm/delete-comfirm.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-store-product-desc',
  templateUrl: './store-product-desc.component.html',
  styleUrls: ['./store-product-desc.component.css']
})
export class StoreProductDescComponent implements OnInit {
  @Input() addDataDetailModel: any;

  dataSource: any[] = [];   //1.4将数据添加到dataSource
  detailUpdateModel: any;  //更新

  imgList: any[] = [];
  importImgList: any[] = [];


  checked = false;
  setOfCheckedId = new Set<number>();


  constructor(public dialog: MatDialog, public storeProductService: StoreProductService,
    public activatedRoute: ActivatedRoute, private modal: NzModalService,public router: Router,
   private viewContainerRef: ViewContainerRef) {
    this.detailUpdateModel = {
      step: 4,
      store_image: []
    }
  }

  ngOnInit(): void {
    this.storeProductService.getProductDetail(this.addDataDetailModel.id).subscribe(res => {
      this.dataSource = res.data?.store_image?.data;
    })
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
      this.dataSource = this.dataSource.concat(this.imgList);
    });
   
  }


  nextTab() {
    this.detailUpdateModel.id = this.addDataDetailModel.id;
    console.log("更新的meodl", this.dataSource);
    this.detailUpdateModel.store_image = [];
    this.dataSource.forEach(element => {
      console.log("element", element);
      let a = { id: element.id, sort: element.sort }
      this.detailUpdateModel.store_image.push(a)
    });
    console.log("更新", this.detailUpdateModel);

    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
      if (res === null) {
        this.storeProductService.getProductDetail(this.addDataDetailModel.id).subscribe(res => {
          this.dataSource = res.data.store_image.data;
          this.router.navigate(['/store/main/storeProduct'],);

        })
      }

    })

  }



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

