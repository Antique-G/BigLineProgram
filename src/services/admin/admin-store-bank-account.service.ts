import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AdminStoreBankAccountListRequestModel, AdminStoreBankAccountListResponseModel, StoreBankAccountRequestModel, StoreBankAccountResponseModel, StoreBankAccountUpdateRequestModel } from '../../interfaces/adminStoreBankAccount/admin-store-bank-account-model';
import { AdminUrls } from '../../api';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})

export class AdminStoreBankAccountService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 银行卡列表
  storeBankList(store_id: AdminStoreBankAccountListRequestModel): Observable<AdminStoreBankAccountListResponseModel> {
    const params = new HttpParams({
      fromString: 'store_id=' + store_id.store_id
    });
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminStoreBankAccountListResponseModel>(this.urls.PostAdminStoreBankCreate, findhttpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }



  // 银行卡添加
  addStoreBankAccount(storeBankAccountRequestModel: StoreBankAccountRequestModel): Observable<StoreBankAccountResponseModel> {
    return this.httpClient.post<StoreBankAccountResponseModel>(this.urls.PostAdminStoreBankCreate, storeBankAccountRequestModel, httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }


  // 商铺的银行卡更新
  updateStoreBank(storeBankAccountUpdateRequestModel: StoreBankAccountUpdateRequestModel): Observable<any> {
    const id = storeBankAccountUpdateRequestModel.bank_id;
    return this.httpClient.put(this.urls.PutAdminStoreBankUpdate + id, storeBankAccountUpdateRequestModel, httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }



  public handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        alert(error.message);
        break;
      case 422:
        alert("请输入正确的值");
        break;
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
