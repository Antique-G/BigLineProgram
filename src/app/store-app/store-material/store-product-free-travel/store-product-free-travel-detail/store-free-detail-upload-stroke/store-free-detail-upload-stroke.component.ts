import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreProductDetailUploadStrokeCreateComponent } from '../../../store-product-management/store-product-management-detail/store-product-detail-upload-stroke/store-product-detail-upload-stroke-create/store-product-detail-upload-stroke-create.component';

@Component({
  selector: 'app-store-free-detail-upload-stroke',
  templateUrl: './store-free-detail-upload-stroke.component.html',
  styleUrls: ['./store-free-detail-upload-stroke.component.css']
})
export class StoreFreeDetailUploadStrokeComponent implements OnInit {
  detailId:any
  @Input() dataDetailModel: any;



  constructor(public modal:NzModalService, public dialog: MatDialog,public activatedRoute: ActivatedRoute,) {
  
  }

  ngOnInit(): void {
    console.log('this.dataDetailModel',this.dataDetailModel)
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('free',params)
      this.detailId = JSON.parse(params["detailDataId"]);
    });
  }
  
  add() {
    const dialogRef = this.dialog.open(StoreProductDetailUploadStrokeCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((result:any) => {
     
    });
  }


  nextTab(){}

}
