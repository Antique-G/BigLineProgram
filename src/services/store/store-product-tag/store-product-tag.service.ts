import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminProductTagListRequestModel } from '../../../interfaces/adminProduct/ProductTagModel';
import { StoreUrls } from '../../../api';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class StoreProductTagService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }

  // 产品标签列表
  getProductTagList(): Observable<AdminProductTagListRequestModel> {
    return this.httpClient.get<AdminProductTagListRequestModel>(this.urls.GetStoreProductTagList,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        // alert(error.message);
        break
     
    }
    return throwError('');
  }
}
