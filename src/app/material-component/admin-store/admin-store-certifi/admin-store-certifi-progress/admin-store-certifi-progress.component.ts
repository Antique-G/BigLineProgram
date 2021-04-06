import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminStoreCertifiHistoryComponent } from './admin-store-certifi-history/admin-store-certifi-history.component';

@Component({
  selector: 'app-admin-store-certifi-progress',
  templateUrl: './admin-store-certifi-progress.component.html',
  styleUrls: ['./admin-store-certifi-progress.component.css']
})
export class AdminStoreCertifiProgressComponent implements OnInit {
  is_approve = 0;
  detailModel:any;


  constructor( public dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("certification")!);
    this.is_approve = Number(localStorage.getItem("certifiApprove"));
   
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
