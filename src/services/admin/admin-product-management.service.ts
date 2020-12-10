import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { AdminProductCheckStatusModel, AdminProductDetailResponseModel, AdminProductManagementListResponseModel, AdminProductManagementUpdateModel, AdminProductResponseModel, AdminProductSetStatusModel } from '../../interfaces/adminProduct/product-management-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})

export class AdminProductManagementService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


 // 产品列表
  productList(page:number, per_page:number): Observable<AdminProductManagementListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
    .set('per_page', per_page.toString());
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminProductManagementListResponseModel>(this.urls.GetAdminProductManagementList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 更新
  updateProduct(adminProductManagementUpdateModel: AdminProductManagementUpdateModel): Observable<any> {
    const id = adminProductManagementUpdateModel.id;
    return this.httpClient.put(this.urls.PutAdminProductManagementUpdate + id, adminProductManagementUpdateModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 详情
  productDetail(id:any): Observable<AdminProductDetailResponseModel> {
    return this.httpClient.get<AdminProductDetailResponseModel>(this.urls.GetAdminProductManagementDetail+id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  
  // 产品的上架/下架
  productSetStatus(adminProductSetStatusModel: AdminProductSetStatusModel): Observable<AdminProductResponseModel> {
    return this.httpClient.post<AdminProductResponseModel>(this.urls.PostAdminProductSetStatus, adminProductSetStatusModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


    // 产品的审核
    productCheckStatus(adminProductCheckStatusModel: AdminProductCheckStatusModel): Observable<AdminProductResponseModel> {
      return this.httpClient.post<AdminProductResponseModel>(this.urls.PostAdminProductCheckStatus, adminProductCheckStatusModel, httpOptions)
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
