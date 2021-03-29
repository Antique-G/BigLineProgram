import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreLoginRequestModel, StoreLoginResponseModel, StoreLogOutResponseModel } from '../../../interfaces/store/storeLogin/store-login-model';
import { StoreUrls } from '../../../api';
import { PassWordModel } from '../../../interfaces/store/common/password';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class StoreLoginService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }


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
  storeLogin(storeLoginRequestModel: StoreLoginRequestModel): Observable<StoreLoginResponseModel> {
    return this.httpClient.post<StoreLoginResponseModel>(this.urls.StoreLogin, storeLoginRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 登出
  storeLogout(): Observable<StoreLogOutResponseModel> {
    return this.httpClient.get<StoreLogOutResponseModel>(this.urls.StoreLogout);
  }



  // 修改密码
  changePassword(passWordModel: PassWordModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStorePassword, passWordModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        break
    }
    return throwError('');
  }



}
