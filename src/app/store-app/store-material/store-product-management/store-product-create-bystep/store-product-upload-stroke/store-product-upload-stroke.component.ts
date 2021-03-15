import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreProductDetailUploadStrokeCreateComponent } from '../../store-product-management-detail/store-product-detail-upload-stroke/store-product-detail-upload-stroke-create/store-product-detail-upload-stroke-create.component';

@Component({
  selector: 'app-store-product-upload-stroke',
  templateUrl: './store-product-upload-stroke.component.html',
  styleUrls: ['./store-product-upload-stroke.component.css']
})
export class StoreProductUploadStrokeComponent implements OnInit {
  
  detailId:any;
  @Input() addDataDetailModel: any;

  constructor(public modal:NzModalService, public dialog: MatDialog,public activatedRoute: ActivatedRoute,) { 

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailDataId
    });
  }

  add() {

    const dialogRef = this.dialog.open(StoreProductDetailUploadStrokeCreateComponent, {
      width: '550px',
      data:this.addDataDetailModel.id
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      this.addDataDetailModel.schedule_file_url = result.url;
    });
  }

}
