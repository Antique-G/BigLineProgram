import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { CommonServiceService } from '../../../../../../services/store/common-service/common-service.service';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';

@Component({
  selector: 'app-store-product-management-detail-desc',
  templateUrl: './store-product-management-detail-desc.component.html',
  styleUrls: ['./store-product-management-detail-desc.component.css']
})
export class StoreProductManagementDetailDescComponent implements OnInit {
  @Input() dataDetailModel: any;

  dataSource: any[] = [];   //1.4将数据添加到dataSource

  checked = false;
  setOfCheckedId = new Set<number>();


  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
    console.log("更新", this.dataDetailModel.product_album.data)
    this.dataSource = this.dataDetailModel.product_album.data;
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
    const dialogRef = this.dialog.open(ChooseGalleryComponent, {
      width: '1105px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
    });
  }

  upload() {
    const dialogRef = this.dialog.open(CommonModelComponent, {
      width: '660px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      // let str = ''
      // result.forEach((item: any) => {
      //   insert(item)
      // });
    });
  }


  nextTab() { }

}
