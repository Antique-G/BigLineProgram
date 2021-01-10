import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { AddStoreTermsManagementRequestModel, AddStoreTermsManagementResponseModel, StoreTermsManagementDetailResponseModel, StoreTermsManagementListResponseModel, StoreTermsManagementRequestModel, TermplateModel, UpdateStoreTermsManagementeRequestModel, UpdateStoreTermsManagementResponseModel } from '../../../interfaces/store/storeTermsManagement/store-terms-management-model';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class StoreTermsManagementService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }


  // 条款管理列表
  storeTermsList(page: number, per_page: number, status: any, check_status: any): Observable<StoreTermsManagementListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('check_status', check_status ? check_status : '')

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreTermsManagementListResponseModel>(this.urls.GetStoreTermsList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 条款管理添加
  addStoreTerms(addStoreTermsManagementRequestModel: AddStoreTermsManagementRequestModel): Observable<AddStoreTermsManagementResponseModel> {
    return this.httpClient.post<AddStoreTermsManagementResponseModel>(this.urls.PostStoreTermsCreate, addStoreTermsManagementRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 更新
  updateStoreTerms(updateStoreTermsManagementeRequestModel: UpdateStoreTermsManagementeRequestModel): Observable<UpdateStoreTermsManagementResponseModel> {
    const id = updateStoreTermsManagementeRequestModel.id;
    return this.httpClient.put(this.urls.PutStoreTermsUpdate + id, updateStoreTermsManagementeRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 详情
  storeTermsDetail(id: any): Observable<StoreTermsManagementDetailResponseModel> {
    return this.httpClient.get<StoreTermsManagementDetailResponseModel>(this.urls.GetStoreTermsDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 删除
  deleteStoreTerms(id: any): Observable<UpdateStoreTermsManagementResponseModel> {
    return this.httpClient.delete<any>(this.urls.DeleteStoreTerms + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  //审核
  productCheckStatus(storeTermsManagementRequestModel: StoreTermsManagementRequestModel): Observable<UpdateStoreTermsManagementResponseModel> {
    return this.httpClient.post<UpdateStoreTermsManagementResponseModel>(this.urls.PostStoreTermsUpdateCheck, storeTermsManagementRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 条款模板
  termsTemplateList(page: number, per_page: number, title:any): Observable<TermplateModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('title', title ? title : '')

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<TermplateModel>(this.urls.GetStoreTemplate, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 上传图片
  uploadImg(image: any): Observable<any> {
    console.log('uploadImgModel',image);
    const imgHttpOptions = {
      reportProgress: true,    // headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    };
    return this.httpClient.post<any>(this.urls.PostStoreImgUpload, image, imgHttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }




  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        alert(error.message);
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
