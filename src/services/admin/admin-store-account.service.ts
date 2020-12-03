import { AdminStoreAccountListRequestModel, AdminStoreAccountListResponseModel } from './../../interfaces/adminStoreAccount/admin-store-account-model';
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
export class AdminStoreAccountService {  //创建店铺帐号管理服务
  public urls = AdminUrls;   //1.2引入定义的baseUrl：http://plat.beennn.cn
  
  constructor(public httpClient:HttpClient) { }   //1.3HttpClient 类，用于发送 HTTP 请求和接收来自通过 URI 确认的资源的 HTTP 响应。

  //商铺的账号创建
  addStoreAccount(addStoreAccountRequestModel:AddStoreAccountRequestModel):Observable<AddStoreAccountResponseModel>{
    return this.httpClient.post<AddStoreAccountResponseModel>(this.urls.PostAdminStoreAccountCreate,addStoreAccountRequestModel,httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //商铺帐号列表
  storeAccountList(store_id:number):Observable<AdminStoreAccountListResponseModel>{
    const params = new HttpParams().set('store_id',store_id.toString());
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type':'application/json'}),
      params:params
    };
    return this.httpClient.get<AdminStoreAccountListResponseModel>(this.urls.GetAdminStoreAccountList,findhttpOptions)
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
