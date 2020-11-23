import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  editForm: FormGroup;



  constructor( public fb: FormBuilder, public dialogRef: MatDialogRef<AdminDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.editForm = fb.group({
        name: new FormControl(' '),
        account: new FormControl(' '),
        password: new FormControl(' '),
        tel: new FormControl(' '),
        status: new FormControl(' '),
      });
     }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
