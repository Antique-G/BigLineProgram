import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-store-order-refund-turnover-detail',
  templateUrl: './store-order-refund-turnover-detail.component.html',
  styleUrls: ['./store-order-refund-turnover-detail.component.css']
})
export class StoreOrderRefundTurnoverDetailComponent implements OnInit {
  addForm!: FormGroup;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreOrderRefundTurnoverDetailComponent>,
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
