import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StoreManageListResponseModel } from '../../interfaces/adminStoreManage/admin-store-manage-model';
import { AdminUrls } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class AdminStoreManageService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 列表
  storeManageList(page: number, per_page: number, status: any, region_code: any,  shop_name: any): Observable<StoreManageListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('region_code', region_code ? region_code : '')
      .set('shop_name', shop_name ? shop_name : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreManageListResponseModel>(this.urls.GetAdminShopList, findhttpOptions)
      .pipe(
        
      )
  }



  // 注册
  // register(registerRequestModel: RegisterRequestModel): Observable<any> {
  //   return this.httpClient.post<any>(this.urls.PostAdminShopCreate, registerRequestModel, httpOptions)
  //     .pipe(
  //     )
  // }


  
}

