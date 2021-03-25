import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { AdminRegionModel } from '../../../interfaces/adminRegion/admin-region-model';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class StoreRegionService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }


  // 区域三级联动数据
  getAllRegionList(): Observable<AdminRegionModel[]> {
    return this.httpClient.get<AdminRegionModel[]>(this.urls.GetStoreAllRegions,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }




  public handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        // alert(error.message);
        break
    }
    return throwError('');
  }

}
