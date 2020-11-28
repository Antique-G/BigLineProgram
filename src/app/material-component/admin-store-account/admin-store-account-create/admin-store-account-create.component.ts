import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-store-account-create',
  templateUrl: './admin-store-account-create.component.html',
  styleUrls: ['./admin-store-account-create.component.css']
})
export class AdminStoreAccountCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminStoreAccountCreateComponent>,) { }

  ngOnInit(): void {
  }

}
