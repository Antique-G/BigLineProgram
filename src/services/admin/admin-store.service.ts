import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AddStoreRequestModel, AddStoreResponseModel, AdminStoreListRequestModel, AdminStoreListResponseModel, ApplyCheckModel, RewardSetModel, StoreUpdateRequestModel } from '../../interfaces/adminStore/admin-store-model';
import { AdminUrls } from '../../api';
import { StoreApplyCertifiDetailListModel, StoreApplyCertifiDetailModel } from '../../interfaces/store/storeApply/store-apply-model';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class AdminStoreService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 商户列表
  storeList(page: number, per_page: number, keyword: any, status: any, is_approve: any): Observable<AdminStoreListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('keyword', keyword ? keyword : '')
      .set('status', status ? status : '')
      .set('is_approve', is_approve ? is_approve : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminStoreListResponseModel>(this.urls.GetAdminStore, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 商户添加
  addStore(addStoreRequestModel: AddStoreRequestModel): Observable<AddStoreResponseModel> {
    return this.httpClient.post<AddStoreResponseModel>(this.urls.PostAdminStoreCreate, addStoreRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  //商户信息修改
  updateStore(storeUpdateRequestModel: StoreUpdateRequestModel): Observable<any> {
    const id = storeUpdateRequestModel.store_id;
    return this.httpClient.put(this.urls.PutAdminStoreUpdate + id, storeUpdateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 认证资料详情
  getDetail(store_id: any): Observable<StoreApplyCertifiDetailModel> {
    const params = new HttpParams().set('store_id', store_id)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<StoreApplyCertifiDetailModel>(this.urls.GetAdminApproveDetail, findhttpOptions)
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
    return this.httpClient.get<StoreApplyCertifiDetailListModel>(this.urls.GetAdminApproveList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 供应商的认证审核
  approveCheck(applyCheckModel: ApplyCheckModel): Observable<any> {
    let id = applyCheckModel?.id;
    return this.httpClient.post<any>(this.urls.PostAdminApproveCheck+id, applyCheckModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 店铺佣金设置
  rewardSet(rewardSetModel: RewardSetModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminRewardSet, rewardSetModel, httpOptions)
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
