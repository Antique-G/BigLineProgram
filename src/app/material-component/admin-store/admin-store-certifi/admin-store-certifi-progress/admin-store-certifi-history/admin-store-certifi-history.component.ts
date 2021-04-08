import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminStoreService } from '../../../../../../services/admin/admin-store.service';

@Component({
  selector: 'app-admin-store-certifi-history',
  templateUrl: './admin-store-certifi-history.component.html',
  styleUrls: ['./admin-store-certifi-history.component.css']
})
export class AdminStoreCertifiHistoryComponent implements OnInit {
  dataSource: any[] = [];
  store_id: any;
  name: any;

  constructor(public dialogRef: MatDialogRef<AdminStoreCertifiHistoryComponent>, public adminStoreService: AdminStoreService) { }

  ngOnInit(): void {
    let detailModel = JSON.parse(localStorage.getItem("certification")!);
    this.store_id = detailModel?.store_id;
    this.name = detailModel?.name;
    this.adminStoreService.getDetailList(this.store_id).subscribe(res => {
      console.log('res :>> ', res);
      res?.data.forEach((element: any) => {
        if (element.check_time != 0) {
          element.check_time = new Date(element?.check_time * 1000)
        }
        else {
          element.check_time=''
        }
      })
      this.dataSource = res?.data;
      console.log('  this.dataSource :>> ', this.dataSource);
    })
  }



  close() {
    this.dialogRef.close();
  }

  reBase() {
    this.dialogRef.close(1);
  }
}
