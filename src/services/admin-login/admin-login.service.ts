import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Urls } from '../../api';
import { LoginRequestModel, LoginResponseModel } from '../../interfaces/adminLogin/login-model';
import { AdminAdminListRequestModel, AdminAdminListResponseModel } from '../../interfaces/adminAdmin/admin-admin-model';




const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  public urls = Urls;

  constructor(public httpClient: HttpClient) {
    // super();
  }


  // 获取token
  getToken() {
    return localStorage.getItem('userToken');
  }

  // 储存token
  setToken(t: string) {
    return localStorage.setItem('userToken', t);
  }

  logOut(loginType?: string) {
    localStorage.removeItem('isLoggedin');
  }


  // 登陆
  login(loginRequestModel: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(this.urls.AdminLogin, loginRequestModel, httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }

  // 管理员列表
  adminList(adminAdminListRequestModel: AdminAdminListRequestModel): Observable<AdminAdminListResponseModel> {
    let params = new HttpParams()
    params.append("page", adminAdminListRequestModel.page ? adminAdminListRequestModel.page : '');

    params.append("keyword", adminAdminListRequestModel.keyword ? adminAdminListRequestModel.keyword : '');
    let body = params;
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: body
    };
    return this.httpClient.get<AdminAdminListResponseModel>(this.urls.AdminList, findhttpOptions)
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
