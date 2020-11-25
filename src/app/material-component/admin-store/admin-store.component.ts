import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AdminStoreCreateComponent } from './admin-store-create/admin-store-create.component';



export interface PeriodicElement {
  name: string;
  regionCode: string;
  address: string;
  fax: string;
  phone: string;
  status: string;
  action?: '';
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'kobin', regionCode: '020', address: '', fax: '2324242', phone:'1245752',status: '0', action: ''},
  {name: 'anya', regionCode: '0755', address: '', fax: '111112',  phone:'1245752',status: '1', action: ''},
  {name: 'Odyn', regionCode: '0755', address: '', fax: '23244324', phone:'1245752', status: '1', action: ''},
  {name: 'Harley', regionCode: '020', address: '', fax: '43545',  phone:'1245752',status: '0', action: ''},
  {name: 'caijuntao', regionCode: '0755', address: '', fax: '6557567', phone:'1245752', status: '1', action: ''},
  {name: 'yannie', regionCode: '0755', address: '', fax: '8786785',  phone:'1245752',status: '1', action: ''},
];



@Component({
  selector: 'app-admin-store',
  templateUrl: './admin-store.component.html',
  styleUrls: []
})
export class AdminStoreComponent  implements AfterViewInit  {
  nameForm: FormGroup;

  displayedColumns: string[] = ['name', 'regionCode', 'address', 'fax','phone', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  constructor(public fb: FormBuilder, public dialog: MatDialog) {
    this.nameForm = fb.group({
      name: new FormControl(' ')
    });
   }

   ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  add(){
    const dialogRef = this.dialog.open(AdminStoreCreateComponent, {
      width: '550px',
      data: 1
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  edit(index: any): void  {
  
  }


}




