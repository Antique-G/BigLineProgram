import { AdminStoreAccountListResponseModel, StoreAccountDetailUpdateRequestModel } from './../../interfaces/adminStoreAccount/admin-store-account-model';
import { retry, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUrls } from '../../api';
import { throwError, Observable } from 'rxjs';
import { AddStoreAccountRequestModel, AddStoreAccountResponseModel } from '../../interfaces/adminStoreAccount/admin-store-account-model';

const httpOptions = {   //1.1定义请求头信息
  headers : new HttpHeaders().set('Content-Type','application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminStoreAccountService {  
  public urls = AdminUrls;  
  
  constructor(public httpClient:HttpClient) { }   

  //商铺的账号创建
  addStoreAccount(addStoreAccountRequestModel:AddStoreAccountRequestModel):Observable<AddStoreAccountResponseModel>{
    return this.httpClient.post<AddStoreAccountResponseModel>(this.urls.PostAdminStoreAccountCreate,addStoreAccountRequestModel,httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //商铺帐号列表
  storeAccountList(store_id:number, page:number, per_page:number):Observable<AdminStoreAccountListResponseModel>{
    const params = new HttpParams().set('per_page',per_page.toString()).set('page',page.toString()).set('store_id',store_id.toString());
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type':'application/json'}),
      params:params
    };
    return this.httpClient.get<AdminStoreAccountListResponseModel>(this.urls.GetAdminStoreAccountList,findhttpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //商铺帐号修改
  updateStoreAccount(storeAccountDetailUpdateRequestModel:StoreAccountDetailUpdateRequestModel):Observable<any>{
    const id = storeAccountDetailUpdateRequestModel.account_id
    return this.httpClient.put(this.urls.PutAdminStoreAccountUpdate + id, storeAccountDetailUpdateRequestModel, httpOptions)
    .pipe(
      catchError(this.handleError)
    )

  }

  //http请求失败的响应返回对象
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
