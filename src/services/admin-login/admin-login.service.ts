import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PassWordModel } from '../../interfaces/store/common/password';
import { AdminUrls } from '../../api';
import { LoginRequestModel, LoginResponseModel, LogOutResponseModel } from '../../interfaces/adminLogin/login-model';
import { MobilCodeResponseModel, ResetPasswordModel } from '../../interfaces/store/storeForgetPassword/storeForgetPassword.model';


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
                catchError(this.handleError)
            )
    }


    // 登出
    logout(): Observable<LogOutResponseModel> {
        return this.httpClient.get<LogOutResponseModel>(this.urls.AdminLogout);
    }


    // 刷新token
    refreshToken(): Observable<LoginResponseModel> {
        return this.httpClient.post<LoginResponseModel>(this.urls.AdminRefresh, httpOptions);
    }



    // 修改密码
    changePassword(passWordModel: PassWordModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminPassword, passWordModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

      // 找回密码（第一步）
  adminForgetPassword(mobile: any,code: any): Observable<MobilCodeResponseModel> {
    const params = new HttpParams().set('mobile', mobile).set('code', code)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<MobilCodeResponseModel>(this.urls.GetAdminForgetPassword, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
    }
    

    // 重置密码
    adminResetPassword(resetPasswordModel: ResetPasswordModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminResetPasswordModel, resetPasswordModel, httpOptions)
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
        return throwError('');
    }



}
