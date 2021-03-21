import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-order-refund-turnover-detail',
  templateUrl: './admin-order-refund-turnover-detail.component.html',
  styleUrls: ['./admin-order-refund-turnover-detail.component.css']
})
export class AdminOrderRefundTurnoverDetailComponent implements OnInit {
  addForm!: FormGroup;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminOrderRefundTurnoverDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.addForm = this.fb.group({
      refund_amount: [''],
      bank_user: [''],
      bank_address: [''],
      bank_number: [''],
      pay_at: [''],
      transaction_id: [''],
    });
  }

  ngOnInit(): void {
    console.log('data :>> ', this.data);
  }


  close() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close();
  }
}
