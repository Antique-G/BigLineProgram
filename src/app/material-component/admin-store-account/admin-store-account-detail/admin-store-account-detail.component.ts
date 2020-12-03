import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-store-account-detail',
  templateUrl: './admin-store-account-detail.component.html',
  styleUrls: ['./admin-store-account-detail.component.css']
})
export class AdminStoreAccountDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminStoreAccountDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log(this.data)
   }

  ngOnInit(): void {
  }

}
