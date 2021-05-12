import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-admin-select-refund',
    templateUrl: './admin-select-refund.component.html',
    styleUrls: ['./admin-select-refund.component.css']
})
export class AdminSelectRefundComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AdminSelectRefundComponent>,) { }

    ngOnInit(): void {
    }


    all() {
        this.dialogRef.close(0);
    }

    part() {
        this.dialogRef.close(1);
    }

    close() {
        this.dialogRef.close();
        
    }
}
