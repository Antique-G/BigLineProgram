import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';
import { StoreProUSCreateComponent } from '../../store-product-create-bystep/store-product-upload-stroke/store-pro-u-s-create/store-pro-u-s-create.component';

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
    const dialogRef = this.dialog.open(StoreProUSCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      this.dataDetailModel.schedule_file_url = result.url;
    });
  }



}
