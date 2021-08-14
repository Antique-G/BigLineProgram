import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-admin-order-print-confirmation',
    templateUrl: './admin-order-print-confirmation.component.html',
    styleUrls: ['./admin-order-print-confirmation.component.css']
})
export class AdminOrderPrintConfirmationComponent implements OnInit {
    detailModel: any;
    ifFree: any;
    dateNow: any;
    membersArr: any;

    constructor(public dialogRef: MatDialogRef<AdminOrderPrintConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {

    }

    ngOnInit(): void {
        console.log("data", this.data);
        this.detailModel = this.data[0];
        this.ifFree = this.data[1];
        this.dateNow = new Date();
        this.membersArr=this.detailModel.member?.data.filter((item: any) => item.refund_status == 0);
        console.log("v",this.membersArr)
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
