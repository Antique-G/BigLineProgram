import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUrls } from '../../api';
import { AdminSaleTitleListResponseModel, SaleTitleCreateRequestModel, SaleTitleCreateResponseModel, SaleTitleUpdateRequestModel } from '../../interfaces/adminSaleTitle/admin-sale-title-model';


const httpOptions = {   //1.1定义请求头信息
  headers : new HttpHeaders().set('Content-Type','application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminSaleTitleService {
  public urls = AdminUrls;

  constructor(public httpClient:HttpClient) { }
  //销售头衔列表
  saleTitleList(page:number, per_page:number,keyword:any,status:any):Observable<AdminSaleTitleListResponseModel>{
    const params = new HttpParams().set('page', page.toString())
      .set('per_page',per_page.toString())
      .set('keyword',keyword ? keyword : '')
      .set('status',status ? status : '');
      
      const findhttpOptions = {
        headers: new HttpHeaders({ 'content-Type' : 'application/json'}),
        params:params
      };
      return this.httpClient.get<AdminSaleTitleListResponseModel>(this.urls.GetAdminSaleTitleList,findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //销售头衔添加
  saleTitleCreate(saleTitleCreateRequestModel:SaleTitleCreateRequestModel):Observable<SaleTitleCreateResponseModel>{
    return this.httpClient.post<SaleTitleCreateResponseModel>(this.urls.PostAdminSaleTitleCreate,saleTitleCreateRequestModel,httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  //销售头衔修改
  saleTitleUpdate(saleTitleUpdateRequestModel:SaleTitleUpdateRequestModel):Observable<any>{
    const id = saleTitleUpdateRequestModel.id;
    return this.httpClient.put(this.urls.PutAdminSaleTitleUpdate + id, saleTitleUpdateRequestModel,httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  };
  
  //销售头衔审核
  saleTitleStatus(data:any): Observable<any> {
    const id=data.id;
    return this.httpClient.put(this.urls.PutAdminSaleTitleStatus+id,data,httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  };

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
