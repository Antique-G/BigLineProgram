import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { EditContractModel, StoreApplyCertifiDetailListModel, StoreApplyCertifiDetailModel, StoreApplyCertifiModel, StoreApplyRequestModel } from '../../../interfaces/store/storeApply/store-apply-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};



@Injectable({
  providedIn: 'root'
})
export class StoreApplyService {
  public urls = StoreUrls;


  constructor(public httpClient: HttpClient) { }

  // 申请供应商
  storeApply(storeApplyRequestModel: StoreApplyRequestModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreApply, storeApplyRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  //提交认证资料
  storeApproveDetail(storeApplyCertifiModel: StoreApplyCertifiModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreApproveDetail, storeApplyCertifiModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 认证资料的上传
  approveUpload(reqData: any): Observable<any> {
    const imgHttpOptions = {
      reportProgress: true,
    };
    return this.httpClient.post<any>(this.urls.PostStoreApproveUpload, reqData, imgHttpOptions)
      .pipe(
      )
  }



  // 上传pdf
  uploadPdf(reqData: any): Observable<any> {
    const imgHttpOptions = {
      reportProgress: true,
    };
    return this.httpClient.post<any>(this.urls.PostStoreContractCreate, reqData, imgHttpOptions)
      .pipe(
      )
  }


  // 认证资料详情
  getDetail(store_id: any): Observable<StoreApplyCertifiDetailModel> {
    const params = new HttpParams().set('store_id', store_id)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<StoreApplyCertifiDetailModel>(this.urls.GetStoreApproveDetail, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 认证资料的历史记录
  getDetailList(store_id: any): Observable<StoreApplyCertifiDetailListModel> {
    const params = new HttpParams().set('store_id', store_id)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreApplyCertifiDetailListModel>(this.urls.GetStoreApproveList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 修改账户
  editContract(editContractModel: EditContractModel): Observable<any> {
    let id = editContractModel?.id;
    return this.httpClient.post<any>(this.urls.PostStoreEditContract + id, editContractModel, httpOptions)
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
