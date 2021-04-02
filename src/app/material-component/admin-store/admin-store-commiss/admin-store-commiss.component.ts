import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-store-commiss',
  templateUrl: './admin-store-commiss.component.html',
  styleUrls: ['./admin-store-commiss.component.css']
})
export class AdminStoreCommissComponent implements OnInit {
  addForm!: FormGroup;
  settlement = '7';
  isShow = false;

  constructor(public dialogRef: MatDialogRef<AdminStoreCommissComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,) {
    this.addForm = this.fb.group({
      settlement_cycle: ['', [Validators.required]],
      day: [''],
      reward_percent: ['', [Validators.required]],
      remark: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  add() { }

  close() {
  }


  change(event: any) {
    console.log('event :>> ', event,event === '1');
    if (event === '1') {
      this.isShow = true;
    }
    else {
      this.isShow = false;
    }
  }
}
