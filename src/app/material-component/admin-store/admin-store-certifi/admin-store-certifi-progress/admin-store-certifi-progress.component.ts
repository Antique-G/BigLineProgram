import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminStoreService } from '../../../../../services/admin/admin-store.service';
import { AdminStoreCertifiHistoryComponent } from './admin-store-certifi-history/admin-store-certifi-history.component';

@Component({
  selector: 'app-admin-store-certifi-progress',
  templateUrl: './admin-store-certifi-progress.component.html',
  styleUrls: ['./admin-store-certifi-progress.component.css']
})
export class AdminStoreCertifiProgressComponent implements OnInit {
  is_approve = 0;
  detailModel: any;
  store_id: any;
  reason: any;

  constructor(public dialog: MatDialog, public adminStoreService: AdminStoreService) { }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("certification")!);
    this.is_approve = Number(localStorage.getItem("certifiApprove"));
    this.store_id = this.detailModel?.store_id;
    this.adminStoreService.getDetailList(this.store_id).subscribe(res => {
      this.reason = res?.data[0]?.content;
      console.log('44444444 ', this.reason);
    })
  }


  history() {
    const dialogRef = this.dialog.open(AdminStoreCertifiHistoryComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res != undefined) {

      }
    });

  }
}
