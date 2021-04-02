import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AddStoreRequestModel, AddStoreResponseModel, AdminStoreListRequestModel, AdminStoreListResponseModel, StoreUpdateRequestModel } from '../../interfaces/adminStore/admin-store-model';
import { AdminUrls } from '../../api';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class AdminStoreService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 商户列表
  storeList(page: number, per_page: number, keyword: any, status: any,is_approve:any): Observable<AdminStoreListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('keyword', keyword ? keyword : '')
      .set('status', status ? status : '')
      .set('is_approve', is_approve ? is_approve : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminStoreListResponseModel>(this.urls.GetAdminStore, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 商户添加
  addStore(addStoreRequestModel: AddStoreRequestModel): Observable<AddStoreResponseModel> {
    return this.httpClient.post<AddStoreResponseModel>(this.urls.PostAdminStoreCreate, addStoreRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  //商户信息修改
  updateStore(storeUpdateRequestModel: StoreUpdateRequestModel): Observable<any> {
    const id = storeUpdateRequestModel.store_id;
    return this.httpClient.put(this.urls.PutAdminStoreUpdate + id, storeUpdateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
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
