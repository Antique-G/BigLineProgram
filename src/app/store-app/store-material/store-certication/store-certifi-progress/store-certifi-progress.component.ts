import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreApplyService } from '../../../../../services/store/store-apply/store-apply.service';
import { StoreCertifiHistoryComponent } from './store-certifi-history/store-certifi-history.component';

@Component({
  selector: 'app-store-certifi-progress',
  templateUrl: './store-certifi-progress.component.html',
  styleUrls: ['./store-certifi-progress.component.css']
})
export class StoreCertifiProgressComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;

  is_approve: any;
  detailModel: any;
  store_id: any;
  reason: any;

  constructor(public dialog: MatDialog, public storeApplyService: StoreApplyService,) { }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("storeAccountDetail")!);
    this.is_approve = Number(localStorage.getItem("storeApprove"));
    this.store_id = this.detailModel?.store?.store_id;
    this.storeApplyService.getDetailList(this.store_id).subscribe(res => {
      this.reason = res?.data[0]?.content;
      console.log('44444444 ', this.reason);
    })
  }


  history() {
    const dialogRef = this.dialog.open(StoreCertifiHistoryComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res != undefined) {
        this.tabIndex.emit({ tabIndex: 1 })
      }
    });

  }
}
