import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-admin-store-create',
  templateUrl: './admin-store-create.component.html',
  styleUrls: ['./admin-store-create.component.css']
})
export class AdminStoreCreateComponent implements OnInit {
  editForm: FormGroup;



  constructor( public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.editForm = fb.group({
        name: new FormControl(' '),
        regionCode: new FormControl(' '),
        address: new FormControl(' '),
        fax: new FormControl(' '),
        phone: new FormControl(' '),
        status: new FormControl(' '),
      });
     }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
