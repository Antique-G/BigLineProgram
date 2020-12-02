import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Datum, StoreMeetingPlaceListRequestModel } from '../../../../interfaces/store/storeMeetingPlace/store-meeting-place-model';
import { StoreMeetingPlaceService } from '../../../../services/store/store-meeting-place/store-meeting-place.service';
import { StoreMeetingPlaceCreateComponent } from './store-meeting-place-create/store-meeting-place-create.component';
import { StoreMeetingPlaceDetailComponent } from './store-meeting-place-detail/store-meeting-place-detail.component';


@Component({
  selector: 'app-store-meeting-place',
  templateUrl: './store-meeting-place.component.html',
  styleUrls: ['./store-meeting-place.component.css']
})
export class StoreMeetingPlaceComponent implements OnInit {
  storeMeetingPlaceListRequestModel: StoreMeetingPlaceListRequestModel;
  datum: Datum[] = [];


  displayedColumns: string[] = ['name', 'regionCode', 'address', 'status', 'action'];
  dataSource = new MatTableDataSource<Datum>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  constructor(public storeMeetingPlaceService: StoreMeetingPlaceService, public dialog: MatDialog) {
    this.storeMeetingPlaceListRequestModel = {
      page: 1,
      per_page: 20,
    }
  }


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.storeMeetingPlaceList();
  }

  storeMeetingPlaceList() {
    console.log("提交的model", this.storeMeetingPlaceListRequestModel)
    this.storeMeetingPlaceService.storeMeetingPlaceList(this.storeMeetingPlaceListRequestModel).subscribe(res => {
      this.dataSource.data = res.data;
      console.log("表格的数据", this.dataSource);
      this.resultsLength = res.meta.pagination.total //总数
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(res.data);
      console.log("this.paginator.page", this.paginator.pageIndex);
      merge(this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            this.storeMeetingPlaceListRequestModel.page = this.paginator.pageIndex + 1;
            return this.storeMeetingPlaceService.storeMeetingPlaceList(this.storeMeetingPlaceListRequestModel)
          }),
          map(data => {
            console.log("data", data)
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            return data;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return [];
          })
        ).subscribe(data => this.dataSource.data = data.data);


    })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


  edit(element: any): void {
    console.log("拿到的值", element);
    const dialogRef = this.dialog.open(StoreMeetingPlaceDetailComponent, {
      width: '550px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log("result", result);
      if (result !== undefined) {
        this.storeMeetingPlaceList();
      }

    });
  }

  add() {
    const dialogRef = this.dialog.open(StoreMeetingPlaceCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.storeMeetingPlaceList();
      }

    });
  }



  delete(element:any){
    
  }
}




