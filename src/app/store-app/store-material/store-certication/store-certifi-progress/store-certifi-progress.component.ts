import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreCertifiHistoryComponent } from './store-certifi-history/store-certifi-history.component';

@Component({
  selector: 'app-store-certifi-progress',
  templateUrl: './store-certifi-progress.component.html',
  styleUrls: ['./store-certifi-progress.component.css']
})
export class StoreCertifiProgressComponent implements OnInit {
  is_approve: any;
  detailModel: any;


  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("storeAccountDetail")!);
    this.is_approve = Number(localStorage.getItem("storeApprove"));
  }


  history() {
    const dialogRef = this.dialog.open(StoreCertifiHistoryComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res != undefined) {
      
      }
    });

  }
}
