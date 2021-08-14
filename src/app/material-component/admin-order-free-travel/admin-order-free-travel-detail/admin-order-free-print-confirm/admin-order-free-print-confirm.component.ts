import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-admin-order-free-print-confirm',
    templateUrl: './admin-order-free-print-confirm.component.html',
    styleUrls: ['./admin-order-free-print-confirm.component.css']
})
export class AdminOrderFreePrintConfirmComponent implements OnInit {
    detailModel: any;
    dateNow: any;

    constructor(public dialogRef: MatDialogRef<AdminOrderFreePrintConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {

    }

    ngOnInit(): void {
        console.log("data", this.data);
        this.detailModel = this.data;
        this.dateNow = new Date();
    }


    print() {
        const printContent = document.getElementById("report")!;
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0')!;
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
    }

    cancel() {
        this.dialogRef.close();
    }


}

