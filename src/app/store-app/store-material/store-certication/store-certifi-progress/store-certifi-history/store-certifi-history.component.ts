import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StoreApplyService } from '../../../../../../services/store/store-apply/store-apply.service';

@Component({
  selector: 'app-store-certifi-history',
  templateUrl: './store-certifi-history.component.html',
  styleUrls: ['./store-certifi-history.component.css']
})
export class StoreCertifiHistoryComponent implements OnInit {
  dataSource: any[] = [];
  store_id: any;

  constructor(public dialogRef: MatDialogRef<StoreCertifiHistoryComponent>, public storeApplyService: StoreApplyService,) { }

  ngOnInit(): void {
    let detailModel = JSON.parse(localStorage.getItem("storeAccountDetail")!);
    this.store_id = detailModel?.store?.store_id;
    this.storeApplyService.getDetailList(this.store_id).subscribe(res => {
      res?.data.forEach((element: any) => {
        if (element.check_time != 0) {
          element.check_time = new Date(element?.check_time * 1000)
        }
        else {
          element.check_time = '';
        }
      })
      this.dataSource = res?.data;

    })
  }





  close() {
    this.dialogRef.close();
  }

  reBase() {
    this.dialogRef.close(1);
  }
}
