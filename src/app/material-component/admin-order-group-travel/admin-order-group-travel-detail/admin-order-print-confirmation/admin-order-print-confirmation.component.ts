import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-order-print-confirmation',
  templateUrl: './admin-order-print-confirmation.component.html',
  styleUrls: ['./admin-order-print-confirmation.component.css']
})
export class AdminOrderPrintConfirmationComponent implements OnInit {
    detailModel: any;

    
    constructor(public dialogRef: MatDialogRef<AdminOrderPrintConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
      
  }

    ngOnInit(): void {
      console.log("data",this.data)
  }

}
