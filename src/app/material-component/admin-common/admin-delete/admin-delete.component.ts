import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrls: ['./admin-delete.component.css']
})
export class AdminDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminDeleteComponent>) { }

  ngOnInit(): void {
  }

  //确认删除
  delete() {
    this.dialogRef.close(1);
  }

  //取消
  cancel() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
