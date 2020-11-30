import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Urls } from '../../api';
import { AdminAdminListRequestModel, AdminAdminListResponseModel, RegisterRequestModel, RegisterResponseModel, UpdateRequestModel } from '../../interfaces/adminAdmin/admin-admin-model';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class AdminAdminService {
  public urls = Urls;

  constructor(public httpClient: HttpClient) { }


  // 管理员列表
  adminList(adminAdminListRequestModel: AdminAdminListRequestModel): Observable<AdminAdminListResponseModel> {
    let params = new HttpParams()
    params.append("page", adminAdminListRequestModel.page ? adminAdminListRequestModel.page : '');
    params.append("per_page", adminAdminListRequestModel.per_page ? adminAdminListRequestModel.per_page : '');
    params.append("keyword", adminAdminListRequestModel.keyword ? adminAdminListRequestModel.keyword : '');
    let body = params;
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: body
    };
    return this.httpClient.get<AdminAdminListResponseModel>(this.urls.GetAdminAccount, findhttpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }



  // 注册
  register(registerRequestModel: RegisterRequestModel): Observable<RegisterResponseModel> {
    return this.httpClient.post<RegisterResponseModel>(this.urls.PostAdminAccountCreate, registerRequestModel, httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }


  // 更新
  updateUser(updateRequestModel: UpdateRequestModel): Observable<any> {
    const id = updateRequestModel.admin_id;
    return this.httpClient.put(this.urls.PutAdminAccountUpdate+id, updateRequestModel, httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }







  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        alert(error.message);
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
