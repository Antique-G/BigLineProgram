import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { log } from 'console';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoginRequestModel, LoginResponseModel } from '../../interfaces/adminLogin/login-model';





const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
  // .set("Access-Control-Allow-Origin", "*")
};


@Injectable({
  providedIn: 'root'
})
export class AdminLoginService{

  constructor(public httpClient:HttpClient) {
    // super();
  }


   getToken() {
    return localStorage.getItem('userToken');
  }

  logOut(loginType?: string) {
    localStorage.removeItem('isLoggedin');        
  }


  // 登陆
  login(loginRequestModel: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>('http://p.carl.beennn.cn/admin/login', loginRequestModel, httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
        )
      
  }


  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // 客户端本身引起的错误信息
      console.error(`客户端错误：${error.error.message}`);
    } else {
      // 服务端返回的错误信息
      console.error(`服务端错误：HTTP 状态码：${error.status} \n\r 错误信息：${JSON.stringify(error.error)}`);
    }

    // 反馈给用户的错误信息（用于组件中使用 error 回调时的错误提示）
    return throwError('不好的事情发生了，毕竟我们都有不顺利的时候。。。');
  }



}
