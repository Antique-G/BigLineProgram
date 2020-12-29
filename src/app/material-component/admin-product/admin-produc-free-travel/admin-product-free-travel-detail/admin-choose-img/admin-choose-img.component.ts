import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {AdminTravelDetailProinfoComponent} from '../admin-travel-detail-proinfo/admin-travel-detail-proinfo.component';
import { never } from 'rxjs';
@Component({
  selector: 'app-admin-choose-img',
  templateUrl: './admin-choose-img.component.html',
  styleUrls: ['./admin-choose-img.component.css']
})
export class AdminChooseImgComponent implements OnInit {
  addForm!: FormGroup;
  constructor(private dialogRef:MatDialogRef<AdminTravelDetailProinfoComponent>) { }
  listOfData:any=[1,2,3,4,5,6,7]
  ngOnInit(): void {
   
  }
  close(){
    this.dialogRef.close();
  }
}
