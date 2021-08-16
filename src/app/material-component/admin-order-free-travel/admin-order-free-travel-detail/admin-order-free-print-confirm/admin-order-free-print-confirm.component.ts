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
    membersArr: any;

    
    constructor(public dialogRef: MatDialogRef<AdminOrderFreePrintConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {

    }

    ngOnInit(): void {
        console.log("data", this.data);
        this.detailModel = this.data;
        this.dateNow = new Date();
        this.membersArr = this.detailModel.member?.data.filter((item: any) => item.refund_status == 0);
        this.membersArr.forEach((element:any) => {
            if (element.birthday) {
                element['age'] = this.ages(element.birthday);
            }
            else {
                element['age'] = '';
            }
        });
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


    ages(str: any) {
        var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) return false;
        var d = new Date(r[1], r[3] - 1, r[4]);
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
            var Y = new Date().getFullYear();
            return ((Y - r[1]));
        }
    }
}

