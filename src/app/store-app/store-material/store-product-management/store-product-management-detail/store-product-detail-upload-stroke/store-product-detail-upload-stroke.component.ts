import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreProductDetailUploadStrokeCreateComponent } from './store-product-detail-upload-stroke-create/store-product-detail-upload-stroke-create.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-product-detail-upload-stroke',
  templateUrl: './store-product-detail-upload-stroke.component.html',
  styleUrls: ['./store-product-detail-upload-stroke.component.css']
})
export class StoreProductDetailUploadStrokeComponent implements OnInit {

  detailId:any
  @Input() dataDetailModel: any;
  

  constructor(public modal:NzModalService, public dialog: MatDialog,public activatedRoute: ActivatedRoute,) {
  
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
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



}
