import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  sort: string;
  regionId: string;
  regionName: string;
  regionCode: string;
  areaCode: string;
  regionLevel: string;
  status: string;
  action?: '';
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sort: '0', regionId: '020', regionName: '深圳市', regionCode: '001', areaCode:'000001001',regionLevel: '0',status:'0', action: ''},
 
];


@Component({
  selector: 'app-admin-product-area-second',
  templateUrl: './admin-product-area-second.component.html',
  styleUrls: ['./admin-product-area-second.component.css']
})
export class AdminProductAreaSecondComponent  implements AfterViewInit  {
  nameForm: FormGroup;

  displayedColumns: string[] = ['sort', 'regionId', 'regionName', 'regionCode','areaCode', 'regionLevel', 'status','action'];
  // dataSource = new MatTableDataSource();
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);



  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

// testing
  constructor(public fb: FormBuilder, public dialog: MatDialog) {
    this.nameForm = fb.group({
      storeId: new FormControl(' ')
    });
   }

   ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  add(){
   
  }


  edit(index: any): void  {
   
  }


  nextLevel(element:any){

  }

}




