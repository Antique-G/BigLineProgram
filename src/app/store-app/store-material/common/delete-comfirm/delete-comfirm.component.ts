import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-comfirm',
  templateUrl: './delete-comfirm.component.html',
  styleUrls: ['./delete-comfirm.component.css']
})
export class DeleteComfirmComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DeleteComfirmComponent>) { }

  ngOnInit(): void {
  }
  
  //确认删除
  delete(){
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
