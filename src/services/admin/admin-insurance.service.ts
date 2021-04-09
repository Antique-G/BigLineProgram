import { catchError } from 'rxjs/operators';
import { AdminInsuranceCreateRequestModel, AdminInsuranceListResponseModel, AdminInsuranceUpdateRequestModel } from '../../interfaces/adminInsurance/admin-insurance-model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminInsuranceService {
  public urls = AdminUrls;
  constructor(public httpClient: HttpClient) { }

  //保险列表
  insuranceList(page: number, per_page: number, name: any, status: any): Observable<AdminInsuranceListResponseModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('name', name ? name : '')
      .set('status', status ? status : '');
    const findhttpOptions = {
      header: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminInsuranceListResponseModel>(this.urls.GetAdminInsuranceList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //保险添加
  addAdminInsurance(adminInsuranceCreateRequestModel: AdminInsuranceCreateRequestModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminInsuranceCreate, adminInsuranceCreateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //保险详情
  getAdminInsuranceDetail(id: any) {
    return this.httpClient.get<any>(this.urls.GetAdminInsuranceDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //保险详情更新
  insuranceUpdate(adminInsuranceUpdateRequestModel: AdminInsuranceUpdateRequestModel): Observable<any> {
    const id = adminInsuranceUpdateRequestModel.id;
    return this.httpClient.put(this.urls.PutAdminInsuranceUpdate + id, adminInsuranceUpdateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //保险状态修改
  insuranceStatus(data: any): Observable<any> {
    return this.httpClient.post(this.urls.PostAdminInsuranceStatus, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //删除
  deleteInsurance(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urls.DeleteAdminInsurance + id, httpOptions)
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
