import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminProductAreaCreateComponent } from './admin-product-area-create/admin-product-area-create.component';


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
  { sort: '0', regionId: '020', regionName: '中国', regionCode: '001', areaCode: '000', regionLevel: '0', status: '0', action: '' },

];


@Component({
  selector: 'app-admin-product-area',
  templateUrl: './admin-product-area.component.html',
  styleUrls: ['./admin-product-area.component.css']
})
export class AdminProductAreaComponent implements AfterViewInit {
  nameForm: FormGroup;

  displayedColumns: string[] = ['sort', 'regionId', 'regionName', 'regionCode', 'areaCode', 'regionLevel', 'status', 'action'];
  // dataSource = new MatTableDataSource();
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);



  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  // testing
  constructor(public fb: FormBuilder, public dialog: MatDialog, public router: Router) {
    this.nameForm = fb.group({
      storeId: new FormControl(' ')
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  add() {
    const dialogRef = this.dialog.open(AdminProductAreaCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result)
     
    });

  }


  edit(index: any): void {

  }


  nextLevel(element: any) {
    this.router.navigate(['/admin/main/areaFirst'])
  }

}




