import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';



export interface PeriodicElement {
  name: string;
  account: string;
  password: string;
  tel: string;
  status: string;
  action?: '';
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'kobin', account: 'kobin', password: '', tel: '2324242', status: '0', action: ''},
  {name: 'anya', account: 'anya', password: '', tel: '111112', status: '1', action: ''},
  {name: 'Odyn', account: 'Odyn', password: '', tel: '23244324', status: '1', action: ''},
  {name: 'Harley', account: 'Harley', password: '', tel: '43545', status: '0', action: ''},
  {name: 'caijuntao', account: 'caijuntao', password: '', tel: '6557567', status: '1', action: ''},
  {name: 'yannie', account: 'yannie', password: '', tel: '8786785', status: '1', action: ''},
];



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})



export class AdminComponent  implements AfterViewInit  {
  nameForm: FormGroup;

  displayedColumns: string[] = ['name', 'account', 'password', 'tel', 'status', 'action'];
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


  edit(index: any): void  {
    const dialogRef = this.dialog.open(AdminDetailComponent, {
      width: '550px',
      data: index
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}




