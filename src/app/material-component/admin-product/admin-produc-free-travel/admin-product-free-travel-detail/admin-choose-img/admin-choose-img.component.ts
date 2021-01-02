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
  listOfData:any=[]
  setOfCheckedId = new Set<number>();
  checked=false
  indeterminate = false;
  listOfCurrentPageData:[] = [];


  ngOnInit(): void {
    for (let index = 1; index <= 50; index++) {
      this.listOfData.push(index)
      
    }
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log(this.setOfCheckedId,'updateCheckedSet');

    // const requestData = this.listOfData.filter((data:any) => this.setOfCheckedId.has(data));
    // console.log(requestData);
  }

  onCurrentPageDataChange(listOfCurrentPageData: []): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item)) && !this.checked;
    
  }

  onAllChecked(checked: boolean): void {

    this.listOfCurrentPageData.forEach((item) => this.updateCheckedSet(item, checked));
    this.refreshCheckedStatus();

  }

  onItemChecked(id: number, checked: boolean): void {
    console.log(id,checked);
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }


  close(){
    this.dialogRef.close();
  }
}