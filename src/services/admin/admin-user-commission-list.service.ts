import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUrls } from '../../api';
import { AdminUserCommissionListResponseModel, AdminUserWithdrawListResponseModel, UserCommissionAuditModel, UserCommissionAuditResponseModel } from '../../interfaces/adminUserCommissionList/admin-userCommissionList-model';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers : new HttpHeaders().set('Content-Type','application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminUserCommissionListService {
  public urls = AdminUrls;
  constructor(public httpClient:HttpClient) { }

  //用户分销的佣金列表
  UserCommissionList(page:number,per_page:number,order_id:any,user_id:any):Observable<AdminUserCommissionListResponseModel>{
    const params = new HttpParams().set('page',page.toString()).set('per_page',per_page.toString()).set('order_id',order_id ? order_id:'').set('user_id',user_id ? user_id : '');
    const findhttpOptions = {
      header: new HttpHeaders({ 'content-Type' : 'application/json'}),
      params:params
    }
    return this.httpClient.get<AdminUserCommissionListResponseModel>(this.urls.GetAdminUserCommissionList,findhttpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  //佣金审核
  UserCommissionAudit(userCommissionAuditModel:UserCommissionAuditModel):Observable<UserCommissionAuditResponseModel>{
    return this.httpClient.post<UserCommissionAuditResponseModel>(this.urls.PostAdminUserCommissionAudit,userCommissionAuditModel,httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //批量佣金审核
  AllUserCommissionAudit(ids:any):Observable<UserCommissionAuditResponseModel>{
    return this.httpClient.post<UserCommissionAuditResponseModel>(this.urls.PostAdminAllUserCommissionAudit,{ids},httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //提现列表
  UserWithdrawList(page:number,per_page:number,status:any,user_id:any):Observable<AdminUserWithdrawListResponseModel>{
    const params = new HttpParams().set('page',page.toString()).set('per_page',per_page.toString()).set('status',status ? status:'').set('user_id',user_id ? user_id : '');
    const findhttpOptions = {
      header: new HttpHeaders({ 'content-Type' : 'application/json'}),
      params:params
    }
    return this.httpClient.get<AdminUserWithdrawListResponseModel>(this.urls.GetAdminUserWithdrawList,findhttpOptions)
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
