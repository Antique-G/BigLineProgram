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
  storeBankList(store_id: number, page: number, per_page: number): Observable<AdminStoreBankAccountListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('store_id', store_id.toString());
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminStoreBankAccountListResponseModel>(this.urls.GetAdminStoreBank, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 银行卡添加
  addStoreBankAccount(storeBankAccountRequestModel: StoreBankAccountRequestModel): Observable<StoreBankAccountResponseModel> {
    return this.httpClient.post<StoreBankAccountResponseModel>(this.urls.PostAdminStoreBankCreate, storeBankAccountRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 商铺的银行卡更新
  updateStoreBank(storeBankAccountUpdateRequestModel: StoreBankAccountUpdateRequestModel): Observable<any> {
    const id = storeBankAccountUpdateRequestModel.bank_id;
    return this.httpClient.put(this.urls.PutAdminStoreBankUpdate + id, storeBankAccountUpdateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  public handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        // alert(error.message);
        break;
      case 422:
        // alert("请输入正确的值");
        break;
    }
    return throwError('');
  }
}
