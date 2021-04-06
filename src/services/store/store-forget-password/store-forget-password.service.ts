import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MobilCodeResponseModel, ResetPasswordModel } from '../../../interfaces/store/storeForgetPassword/storeForgetPassword.model';
import { StoreUrls } from '../../../api';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class StoreForgetPasswordService {
  public urls = StoreUrls;
  constructor(public httpClient: HttpClient) { }

  // 找回密码（第一步）
  storeForgetPassword(mobile: any,code: any): Observable<MobilCodeResponseModel> {
    const params = new HttpParams().set('mobile', mobile).set('code', code)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<MobilCodeResponseModel>(this.urls.GetStoreForgetPassword, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 重置密码
  storeResetPassword(resetPasswordModel: ResetPasswordModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreResetPasswordModel, resetPasswordModel, httpOptions)
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
