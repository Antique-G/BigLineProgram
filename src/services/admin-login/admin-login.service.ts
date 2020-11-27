import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { log } from 'console';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Urls } from '../../api';
import { environment } from '../../environments/environment';
import { LoginRequestModel, LoginResponseModel } from '../../interfaces/adminLogin/login-model';



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


  getToken() {
    return localStorage.getItem('userToken');
  }

  setToken(t:string){
    return localStorage.setItem('userToken',t);  
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


  private handleError(error: HttpErrorResponse) {
    console.log("1212",error);
    switch (error.status){
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
