import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { LoginRequestModel, LoginResponseModel, LogOutResponseModel } from '../../interfaces/adminLogin/login-model';




const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  public urls = AdminUrls;

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

  // 移除token
  removeToken() {
    localStorage.removeItem('userToken');
  }


  // 登陆
  login(loginRequestModel: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(this.urls.AdminLogin, loginRequestModel, httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }



  // 登出
  logout(): Observable<LogOutResponseModel> {
    return this.httpClient.get<LogOutResponseModel>(this.urls.AdminLogout);
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
