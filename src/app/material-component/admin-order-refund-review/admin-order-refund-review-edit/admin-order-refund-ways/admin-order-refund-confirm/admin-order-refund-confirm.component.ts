import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-order-refund-confirm',
  templateUrl: './admin-order-refund-confirm.component.html',
  styleUrls: ['./admin-order-refund-confirm.component.css']
})
export class AdminOrderRefundConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminOrderRefundConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close(1);
  }
}
