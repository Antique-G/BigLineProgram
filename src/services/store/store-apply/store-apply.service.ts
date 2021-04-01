import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { StoreApplyRequestModel } from '../../../interfaces/store/storeApply/store-apply-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};



@Injectable({
  providedIn: 'root'
})
export class StoreApplyService {
  public urls = StoreUrls;


  constructor(public httpClient: HttpClient) { }



  // 注册
  storeApply(storeApplyRequestModel: StoreApplyRequestModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreApply, storeApplyRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        break
    }
    return throwError('');
  }

}
