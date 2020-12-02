import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AdminProductTagComponent} from '../admin-product-tag.component';
@Component({
  selector: 'app-admin-product-tag-create',
  templateUrl: './admin-product-tag-create.component.html',
  styleUrls: ['./admin-product-tag-create.component.css']
})
export class AdminProductTagCreateComponent implements OnInit {

  addForm: FormGroup;
  statusValue = '0';
  constructor(public fb:FormBuilder,public dialogRef: MatDialogRef<AdminProductTagComponent>) { 
    this.addForm = fb.group({
      name:['',Validators.required],
      cateId:['',Validators.required],
      status:['',Validators.required],
    })
  }

  ngOnInit(): void {
  }
  addProductTag(){

  }

  close(){
    this.dialogRef.close();
  }

}
