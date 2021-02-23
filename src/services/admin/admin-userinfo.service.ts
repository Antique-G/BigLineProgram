import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AdminUrls } from '../../api';
import { AdminUserinfoListResponseModel, DetailModel, SetStatusRequestModel, UpdateInfoModel } from '../../interfaces/adminUserinfo/admin-userinfo-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminUserinfoService {
  public urls = AdminUrls;
  constructor(public httpClient: HttpClient) { }

  //用户信息列表
  userinfoList(page: number, per_page: number, keyword: any, status: any): Observable<AdminUserinfoListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('keyword', keyword ? keyword : '')
      .set('status', status ? status : '');
    const findhttpOptions = {
      header: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminUserinfoListResponseModel>(this.urls.GetAdminUserinfoList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 状态
  userinfoSetStatus(setStatusRequestModel: SetStatusRequestModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminUserinfoStatus, setStatusRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 详情
  userinfoDetail(id: any): Observable<DetailModel> {
    return this.httpClient.get<DetailModel>(this.urls.GetAdminUserinfoDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 更新
  updateUserinfo(updateInfoModel: UpdateInfoModel): Observable<any> {
    const id = updateInfoModel.id;
    return this.httpClient.put(this.urls.PutAdminUserinfoUpdate + id, updateInfoModel, httpOptions)
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
