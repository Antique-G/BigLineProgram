import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AddAdminTermsTemplateRequestModel, AdminTermsTemplateResponseModel, AdminTermsTemplateSetStatusRequestModel, AdminTermTemplateListResponseModel } from '../../interfaces/adminTermTemplate/admin-term-template-model';
import { AdminUrls } from '../../api';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class AdminTermTemplateService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 列表
  adminTermTemplateList(page: number, per_page: number, title: string): Observable<AdminTermTemplateListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('title', title ? title : '');
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminTermTemplateListResponseModel>(this.urls.GetAdminTermTemplateList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 管理开启
  termTemplateSetStatus(adminTermsTemplateSetStatusRequestModel: AdminTermsTemplateSetStatusRequestModel): Observable<AdminTermsTemplateResponseModel> {
    return this.httpClient.post<AdminTermsTemplateResponseModel>(this.urls.PostAdminTermTemplateSetStatus, adminTermsTemplateSetStatusRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 添加
  addTemplate(addAdminTermsTemplateRequestModel: AddAdminTermsTemplateRequestModel): Observable<AdminTermsTemplateResponseModel> {
    return this.httpClient.post<AdminTermsTemplateResponseModel>(this.urls.PostAdminTermTemplateCreate, addAdminTermsTemplateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 删除
  deleteTemplate(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urls.DeleteAdminTermTemplate + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
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
