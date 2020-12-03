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
  storeList(adminStoreListRequestModel: AdminStoreListRequestModel): Observable<AdminStoreListResponseModel> {
    let page = 1;  //页码
    let per_page = 10; //每一页的数
    const params = new HttpParams().set('page', page.toString())
    .set('per_page', per_page.toString())
    .set('keyword',adminStoreListRequestModel.keyword.toString());
   
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

    // if (error.error instanceof ErrorEvent) {
    //   // 客户端本身引起的错误信息
    //   alert()

    //   console.error(`客户端错误：${error.error.message}`);
    // } else {
    //   // 服务端返回的错误信息
    //   console.error(`服务端错误：HTTP 状态码：${error.status} \n\r 错误信息：${JSON.stringify(error.error)}`);
    // }

    // 反馈给用户的错误信息（用于组件中使用 error 回调时的错误提示）
    return throwError('');
  }

}
