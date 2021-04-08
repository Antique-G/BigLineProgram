import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-store-free-upload-stroke',
  templateUrl: './store-free-upload-stroke.component.html',
  styleUrls: ['./store-free-upload-stroke.component.css']
})
export class StoreFreeUploadStrokeComponent implements OnInit {
  detailId:any
  @Input() dataDetailModel: any;



  constructor(public modal:NzModalService, public dialog: MatDialog,public activatedRoute: ActivatedRoute,) {
  
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params?.detailDataId;
    });
  }
  
  add() {
    // const dialogRef = this.dialog.open(StoreProUSCreateComponent, {
    //   width: '550px',
    //   data:this.dataDetailModel.id
    // });
    // dialogRef.afterClosed().subscribe((result:any) => {
     
    // });
  }


  nextTab(){}
}
