import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { AdminTermsManagementListResponseModel, AdminTermsManagementSetCheckRequestModel, AdminTermsManagementSetCheckResponseModel, AdminTermsManagementSetStatusRequestModel } from '../../interfaces/adminTerms/admin-terms-manage-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class AdminTermsManageService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 条款管理列表
  adminTermsList(page: number, per_page: number, store_id: any, title: string, status: any): Observable<AdminTermsManagementListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('store_id', store_id ? store_id : '')
      .set('title', title ? title : '')
      .set('status', status ? status : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminTermsManagementListResponseModel>(this.urls.GetAdminTermsManageList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 条款管理审核
  termsCheckStatus(adminTermsManagementSetCheckRequestModel: AdminTermsManagementSetCheckRequestModel): Observable<AdminTermsManagementSetCheckResponseModel> {
    return this.httpClient.post<AdminTermsManagementSetCheckResponseModel>(this.urls.PostAdminTermsCheckStatus, adminTermsManagementSetCheckRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


    // 条款管理开启
    termsSetStatus(adminTermsManagementSetStatusRequestModel: AdminTermsManagementSetStatusRequestModel): Observable<AdminTermsManagementSetCheckResponseModel> {
      return this.httpClient.post<AdminTermsManagementSetCheckResponseModel>(this.urls.PostAdminTermsSetStatus, adminTermsManagementSetStatusRequestModel, httpOptions)
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
