import { catchError } from 'rxjs/operators';
import { AdminInsuranceCreateRequestModel, AdminInsuranceListResponseModel, AdminInsuranceUpdateRequestModel } from '../../interfaces/adminInsurance/admin-insurance-model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUrls } from '../../api';

const httpOptions = {
  headers : new HttpHeaders().set('Content-Type','application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminInsuranceService {
  public urls = AdminUrls;
  constructor(public httpClient:HttpClient) { }

  //保险列表
  insuranceList(page:number,per_page:number,keyword:any,status:any):Observable<AdminInsuranceListResponseModel>{
    const params = new HttpParams().set('page',page.toString())
    .set('per_page',per_page.toString())
    .set('keyword',keyword ? keyword : '')
    .set('status',status ? status : '');
    const findhttpOptions = {
      header: new HttpHeaders({ 'content-Type' : 'application/json'}),
      params:params
    };
    return this.httpClient.get<AdminInsuranceListResponseModel>(this.urls.GetAdminInsuranceList,findhttpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //保险添加
  addAdminInsurance(adminInsuranceCreateRequestModel:AdminInsuranceCreateRequestModel):Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminInsuranceCreate,adminInsuranceCreateRequestModel,httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //保险详情
  getAdminInsuranceDetail(id:any) {
    return this.httpClient.get<any>(this.urls.GetAdminInsuranceDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

 //保险详情更新
  insuranceUpdate(adminInsuranceUpdateRequestModel:AdminInsuranceUpdateRequestModel):Observable<any>{
    const id = adminInsuranceUpdateRequestModel.id;
    return this.httpClient.put(this.urls.PutAdminInsuranceUpdate + id, adminInsuranceUpdateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
    }
    
  //保险状态修改
  insuranceStatus(data:any):Observable<any>{
    return this.httpClient.post(this.urls.PostAdminInsuranceStatus, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //删除
  deleteInsurance(id: any):Observable<any> {
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
